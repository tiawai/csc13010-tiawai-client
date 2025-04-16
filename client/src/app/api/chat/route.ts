import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { CHAT_TEMPLATE } from '@/strings/templates';

// Allow responses up to 30 seconds
export const maxDuration = 30;

// Backend API URL - can be moved to environment variable
const BACKEND_API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

/**
 * Retrieves relevant context from vector store
 */
async function getVectorSearchResults(query: string, limit: number = 5) {
    try {
        console.log('Querying vector store with:', query);

        const response = await fetch(`${BACKEND_API_URL}/chatbot/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: query,
                limit,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Vector search failed with status: ${response.status}`,
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(`Vector search error: ${data.error}`);
        }

        console.log(`Retrieved ${data.count} results from vector store`);
        return data.results;
    } catch (error) {
        console.error('Error querying vector store:', error);
        return []; // Return empty array on error
    }
}

/**
 * Format retrieved documents into context string
 */
interface Document {
    pageContent?: string;
    content?: string;
}

function formatContextFromDocs(docs: Document[]): string {
    if (!docs.length) return '';

    let context = '';
    docs.forEach((doc, i) => {
        context += `Tài liệu ${i + 1}:\n${doc.pageContent || doc.content}\n\n`;
    });

    return context;
}

export async function POST(req: Request) {
    console.log('Chat API called');

    const { messages } = await req.json();
    console.log('Received messages:', messages.length);

    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;
    console.log('User message:', userMessage);

    // Fetch relevant information from vector store
    const searchResults = await getVectorSearchResults(userMessage);

    // Generate context from search results
    const rawContext = formatContextFromDocs(searchResults);

    // Create a new message array
    const augmentedMessages = [...messages];

    // Check if we already have a system message with our template content
    let hasSystemPrompt = false;
    for (const msg of augmentedMessages) {
        if (
            msg.role === 'system' &&
            msg.content?.includes('Hướng dẫn cho Chatbot Tiawai')
        ) {
            hasSystemPrompt = true;
            break;
        }
    }

    // Build the context with our template
    const contextMessage = {
        role: 'system',
        content: CHAT_TEMPLATE.replace(
            '{context}',
            rawContext || 'Không có thông tin ngữ cảnh cụ thể.',
        ),
    };

    if (!hasSystemPrompt) {
        // Add at the beginning of conversation
        augmentedMessages.unshift(contextMessage);
        console.log('Added system prompt with context');
    } else {
        // Update the most recent system message before user's last message
        for (let i = augmentedMessages.length - 2; i >= 0; i--) {
            if (augmentedMessages[i].role === 'system') {
                augmentedMessages[i] = contextMessage;
                console.log('Updated existing system prompt with new context');
                break;
            }
        }
    }

    console.log('Generating response with OpenAI...');

    // Stream the response with augmented messages
    const result = streamText({
        model: openai('gpt-4o-mini-2024-07-18'),
        messages: augmentedMessages,
    });

    return result.toDataStreamResponse();
}
