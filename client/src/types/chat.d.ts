export interface Message {
    content: string;
    isBot: boolean;
}

export interface ChatSession {
    id: string;
    userId: string;
    topic: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
}
