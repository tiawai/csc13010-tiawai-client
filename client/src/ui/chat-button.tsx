'use client';
import { useState, useEffect, useRef } from 'react';
import {
    FloatButton,
    Form,
    Input,
    Button,
    Typography,
    Flex,
    Avatar,
} from 'antd';
import { SendOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import chatIcon from '@public/chat-icon.svg';
import logo from '@public/logo.svg';
const { Title, Text } = Typography;
import { ChatButtonTheme } from './chat-button-theme';
import { useChat } from '@ai-sdk/react';
import TypingEffect from './typing-effect';
import Image from 'next/image';

const initMessage = {
    id: 'welcome-message',
    role: 'assistant' as const,
    content: 'Xin chào! Mình là Tia. Mình có thể giúp được gì cho bạn?',
    parts: [
        {
            type: 'text' as const,
            text: 'Xin chào! Mình là Tia. Mình có thể giúp được gì cho bạn?',
        },
    ],
};

const ChatButton = () => {
    const {
        messages: chatMessages,
        input,
        status,
        handleInputChange,
        handleSubmit,
    } = useChat();

    const [isOpen, setIsOpen] = useState(false);
    const [showTypingForId, setShowTypingForId] = useState<string | null>(null);
    const [allMessages, setAllMessages] = useState<typeof chatMessages>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [typingCompleted, setTypingCompleted] = useState<
        Record<string, boolean>
    >({});

    // Track the previous status to prevent infinite loops
    const prevStatusRef = useRef(status);
    const lastProcessedMessageIdRef = useRef<string | null>(null);

    // Add initial welcome message if no messages exist
    useEffect(() => {
        if (chatMessages.length === 0) {
            setAllMessages([initMessage]);
        } else {
            setAllMessages(chatMessages);
        }
    }, [chatMessages]);

    // Handle typing effect logic
    useEffect(() => {
        if (status !== prevStatusRef.current) {
            prevStatusRef.current = status;

            if (status === 'streaming') {
                const lastAssistantMsg = [...chatMessages]
                    .reverse()
                    .find(
                        (msg) =>
                            msg.role === 'assistant' &&
                            msg.id !== lastProcessedMessageIdRef.current,
                    );

                if (lastAssistantMsg) {
                    lastProcessedMessageIdRef.current = lastAssistantMsg.id;
                    setShowTypingForId(lastAssistantMsg.id);
                    setTypingCompleted((prev) => ({
                        ...prev,
                        [lastAssistantMsg.id]: false,
                    }));
                }
            }
        }
    }, [status, chatMessages]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages, status]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const onTypingComplete = (msgId: string) => {
        setTypingCompleted((prev) => ({ ...prev, [msgId]: true }));
    };

    return (
        <ChatButtonTheme>
            <FloatButton
                icon={
                    <Image
                        src={chatIcon}
                        alt="Chat with us"
                        className="-ml-1 h-auto w-auto"
                        priority
                    />
                }
                type="primary"
                badge={{
                    count: isOpen ? 0 : 1,
                    showZero: false,
                    offset: ['-1rem', '0.125rem'],
                }}
                className="transition-all hover:scale-110"
                onClick={toggleChat}
            />

            {isOpen && (
                <div className="fixed bottom-24 right-24 z-50 flex h-[600px] max-h-[600px] w-[400px] flex-col overflow-clip rounded-xl bg-white shadow-xl">
                    {/* Header */}
                    <Flex
                        justify="space-between"
                        align="center"
                        className="bg-[#5369A1] p-3"
                    >
                        <Flex align="center" gap={4}>
                            <Image
                                className="h-auto"
                                src={logo}
                                alt="logo"
                                width={32}
                                priority
                            />
                            <Flex vertical justify="center">
                                <Title level={4} className="!m-0 !text-white">
                                    Tia
                                </Title>
                                <Text className="!m-0" type="success">
                                    <div className="mr-1 inline-block h-2 w-2 rounded-full bg-green-600"></div>
                                    {status === 'submitted'
                                        ? 'đang xử lý...'
                                        : status === 'streaming'
                                          ? 'đang nhập...'
                                          : 'online'}
                                </Text>
                            </Flex>
                        </Flex>
                        <Button
                            type="text"
                            icon={<CloseOutlined className="text-white" />}
                            onClick={toggleChat}
                            size="small"
                            shape="circle"
                        />
                    </Flex>

                    {/* Chat Body */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {allMessages.map((msg) => (
                            <Flex
                                key={msg.id}
                                vertical
                                align={
                                    msg.role === 'assistant' ? 'start' : 'end'
                                }
                                className="mb-3"
                            >
                                <Flex align="center">
                                    <Text
                                        className={`mb-1 max-w-[90%] rounded-xl p-2 text-justify ${
                                            msg.role === 'assistant'
                                                ? 'ml-3 bg-[#E8EBF0]'
                                                : 'mr-3 bg-[#D1E6F0]'
                                        }`}
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {msg.role === 'assistant' &&
                                        showTypingForId === msg.id &&
                                        !typingCompleted[msg.id] ? (
                                            <TypingEffect
                                                text={msg.content}
                                                onComplete={() =>
                                                    onTypingComplete(msg.id)
                                                }
                                            />
                                        ) : (
                                            msg.content
                                        )}
                                    </Text>
                                </Flex>
                                <Flex gap={8}>
                                    {msg.role === 'assistant' ? (
                                        <Image
                                            className="h-auto rounded-full bg-[#5369A1]"
                                            src={chatIcon}
                                            alt="Chat with us"
                                            width={36}
                                        />
                                    ) : (
                                        <Avatar
                                            icon={<UserOutlined />}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                order: 2,
                                            }}
                                        />
                                    )}
                                </Flex>
                            </Flex>
                        ))}
                        {status === 'submitted' && (
                            <Flex vertical align="start" className="mb-3">
                                <Flex align="center">
                                    <Text className="mb-1 ml-3 max-w-[90%] rounded-xl bg-[#E8EBF0] p-2 text-justify">
                                        <span className="animate-pulse">
                                            Đang xử lý...
                                        </span>
                                    </Text>
                                </Flex>
                                <Flex gap={8}>
                                    <Image
                                        className="h-auto rounded-full bg-[#5369A1]"
                                        src={chatIcon}
                                        alt="Chat with us"
                                        width={36}
                                    />
                                </Flex>
                            </Flex>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <Form
                        onFinish={handleSubmit}
                        style={{ display: 'flex' }}
                        className="!m-3"
                    >
                        <Input
                            name="content"
                            disabled={status === 'streaming'}
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Viết tin nhắn của bạn"
                            className="!mr-2 !rounded-xl !bg-[#E8EBF0] !pl-4 !pr-12 !placeholder-black/75"
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="text"
                            htmlType="submit"
                            disabled={status === 'streaming' || !input.trim()}
                            icon={<SendOutlined />}
                            style={{ border: 'none' }}
                        />
                    </Form>
                </div>
            )}
        </ChatButtonTheme>
    );
};

export default ChatButton;
