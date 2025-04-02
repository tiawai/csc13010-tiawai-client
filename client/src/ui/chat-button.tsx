'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    FloatButton,
    Form,
    Input,
    Button,
    Typography,
    Flex,
    Avatar,
    Skeleton,
} from 'antd';
import { SendOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import chatIcon from '@public/chat-icon.svg';
import logo from '@public/logo.svg';
import {
    useSendMessageMutation,
    useGetBotAnswerMutation,
    useGetMessagesBySessionQuery,
} from '@/services/chat';
import { useAppSelector } from '@/lib/hooks/hook';
import { Message } from '@/types/chat';
const { Title, Text } = Typography;
import { ChatButtonTheme } from './chat-button-theme';

const initMessage: Message = {
    content: 'Xin chào! Mình là Tia. Mình có thể giúp được gì cho bạn ?',
    isBot: true,
};

const ChatButton = () => {
    const user = useAppSelector((state) => state.auth.user);
    const chatSessionId = useAppSelector((state) => state.auth.chatSessionId);
    const { data: messages, isLoading: isMessagesLoading } =
        useGetMessagesBySessionQuery(chatSessionId || '', {
            skip: !chatSessionId,
        });
    const [isOpen, setIsOpen] = useState(false);

    const [sendMessage] = useSendMessageMutation();

    const [getBotAnswer, { isLoading: isAnswering }] =
        useGetBotAnswerMutation();
    const [chatMessages, setChatMessages] = useState<Message[]>([initMessage]);

    const [inputMessage, setInputMessage] = useState<string>('');
    const [needBotAnswer, setNeedBotAnswer] = useState(false);

    useEffect(() => {
        const getBotResponse = async () => {
            try {
                if (!chatSessionId) return;
                const res = await getBotAnswer(chatSessionId).unwrap();
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        };

        if (needBotAnswer) {
            console.log('Getting bot response');
            getBotResponse();
            setNeedBotAnswer(false);
        }
    }, [needBotAnswer, chatSessionId, getBotAnswer]);

    useEffect(() => {
        if (messages) {
            setChatMessages((prev) => [prev[0], ...messages]);
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (!user) return;
        try {
            await sendMessage({
                sessionId: chatSessionId,
                content: inputMessage,
                isBot: false,
            }).unwrap();
            setInputMessage('');
            setNeedBotAnswer(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (isMessagesLoading) return null;

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
                    count: 1,
                    showZero: false,
                    offset: ['-1rem', '0.125rem'],
                }}
                className="transition-all hover:scale-110"
                onClick={toggleChat}
            />

            {/* Chat Box */}
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
                                    online
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
                        {chatMessages.map((msg, index) => (
                            <Flex
                                key={index}
                                vertical
                                align={msg.isBot ? 'start' : 'end'}
                                className="mb-3"
                            >
                                <Flex align="center">
                                    <Text
                                        className={`mb-1 max-w-[90%] rounded-xl p-2 text-justify ${
                                            msg.isBot
                                                ? 'ml-3 bg-[#E8EBF0]'
                                                : 'mr-3 bg-[#D1E6F0]'
                                        }`}
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {msg.content}
                                    </Text>
                                </Flex>

                                <Flex gap={8}>
                                    {msg.isBot ? (
                                        <Image
                                            className="h-auto rounded-full bg-[#5369A1]"
                                            src={msg.isBot ? chatIcon : logo}
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
                        {isAnswering && (
                            <Flex vertical align="start" className="mb-3">
                                <Skeleton.Input
                                    active
                                    style={{ width: '90%' }}
                                    className="!ml-2 !rounded-xl"
                                />
                                <Image
                                    className="h-auto rounded-full bg-[#5369A1]"
                                    src={chatIcon}
                                    alt="Chat with us"
                                    width={36}
                                />
                            </Flex>
                        )}
                    </div>

                    {/* Input */}
                    <Form onFinish={handleSendMessage} className="relative p-3">
                        <Input
                            size="small"
                            name="content"
                            disabled={isAnswering}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Viết tin nhắn của bạn"
                            style={{ borderRadius: '1.5rem' }}
                            className="!rounded-xl !bg-[#E8EBF0] !pl-4 !pr-8 !placeholder-black/75"
                        />

                        <SendOutlined
                            onClick={handleSendMessage}
                            className="absolute right-6 top-1/2 -translate-y-1/2"
                        />
                    </Form>
                </div>
            )}
        </ChatButtonTheme>
    );
};

export default ChatButton;
