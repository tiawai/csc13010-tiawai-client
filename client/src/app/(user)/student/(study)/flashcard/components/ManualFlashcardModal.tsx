'use client';

import { useEffect, useState } from 'react';
import {
    Modal,
    Space,
    Typography,
    Flex,
    Input,
    Select,
    Button,
    List,
    Tag,
    message,
    Spin,
} from 'antd';
import { Flashcard } from '@/types/flashcard';
import CreateWordModal, { WordData } from './CreateWordModal';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetFlashcardByIdQuery } from '@/services/flashcard';

interface ManualFlashcardModalProps {
    isOpen: boolean;
    onOk: (flashcardData: ManualFlashcardData, isUpdate: boolean) => void;
    onCancel: () => void;
    topics: Flashcard[] | undefined;
    isLoading?: boolean;
}

export interface ManualFlashcardData {
    topic: string;
    flashcards: WordData[];
    totalFlashcards: number;
    id?: string; // Added id field for updates
}

export default function ManualFlashcardModal({
    isOpen,
    onOk,
    onCancel,
    topics,
    isLoading = false,
}: ManualFlashcardModalProps) {
    const [flashcardData, setFlashcardData] = useState<ManualFlashcardData>({
        topic: '',
        flashcards: [],
        totalFlashcards: 0,
    });
    const [isCreatingNewList, setIsCreatingNewList] = useState(false);
    const [isUpdatingExistingTopic, setIsUpdatingExistingTopic] =
        useState(false);
    const [isWordModalOpen, setIsWordModalOpen] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

    // Query to fetch flashcards for a selected topic
    const {
        data: existingFlashcardData,
        isLoading: isLoadingExistingFlashcard,
    } = useGetFlashcardByIdQuery(selectedTopicId || '', {
        skip: !selectedTopicId,
        refetchOnMountOrArgChange: true,
    });

    // When an existing topic is selected, update the flashcard data
    useEffect(() => {
        if (existingFlashcardData && selectedTopicId) {
            setFlashcardData({
                topic: existingFlashcardData.topic,
                flashcards: existingFlashcardData.flashcards || [],
                totalFlashcards: existingFlashcardData.totalFlashcards || 0,
                id: selectedTopicId,
            });
            setIsUpdatingExistingTopic(true);
        }
    }, [existingFlashcardData, selectedTopicId]);

    const handleChange = (
        field: keyof ManualFlashcardData,
        value: string | WordData[] | number,
    ) => {
        setFlashcardData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOk = () => {
        if (flashcardData.flashcards.length > 0 && flashcardData.topic) {
            // Update totalFlashcards before submitting
            const updatedData = {
                ...flashcardData,
                totalFlashcards: flashcardData.flashcards.length,
            };
            onOk(updatedData, isUpdatingExistingTopic);
            resetForm();
        } else {
            // Show a message that both topic and at least one word are required
            if (!flashcardData.topic) {
                message.error('Vui lòng chọn hoặc tạo danh sách');
            } else {
                message.error('Vui lòng thêm ít nhất một từ vào danh sách');
            }
        }
    };

    const handleCancel = () => {
        onCancel();
        resetForm();
    };

    const resetForm = () => {
        setFlashcardData({
            topic: '',
            flashcards: [],
            totalFlashcards: 0,
        });
        setIsCreatingNewList(false);
        setIsUpdatingExistingTopic(false);
        setSelectedTopicId(null);
    };

    const handleAddWord = (wordData: WordData) => {
        // Validate word data before adding
        if (!wordData.word || !wordData.meaning || !wordData.wordType) {
            message.error('Thông tin từ vựng không đầy đủ');
            return;
        }

        // Check if word already exists in the list
        const wordExists = flashcardData.flashcards.some(
            (card) => card.word.toLowerCase() === wordData.word.toLowerCase(),
        );

        if (wordExists) {
            message.warning(`Từ "${wordData.word}" đã tồn tại trong danh sách`);
            return;
        }

        setFlashcardData((prev) => ({
            ...prev,
            flashcards: [...prev.flashcards, wordData],
            totalFlashcards: prev.flashcards.length + 1,
        }));
        setIsWordModalOpen(false);
    };

    const handleRemoveWord = (index: number) => {
        setFlashcardData((prev) => ({
            ...prev,
            flashcards: prev.flashcards.filter((_, i) => i !== index),
            totalFlashcards: prev.flashcards.length - 1,
        }));
    };

    // Handle topic selection
    const handleTopicChange = (value: string) => {
        if (value === 'new') {
            setIsCreatingNewList(true);
            setIsUpdatingExistingTopic(false);
            handleChange('topic', '');
            setSelectedTopicId(null);
        } else {
            setIsCreatingNewList(false);

            // Find the selected topic
            const selectedTopic = topics?.find(
                (topic) => topic.topic === value,
            );
            if (selectedTopic) {
                // Set the selected topic ID and fetch its flashcards
                setSelectedTopicId(selectedTopic.id);
                handleChange('topic', selectedTopic.topic);
            } else {
                // If topic not found, just update the name
                setIsUpdatingExistingTopic(false);
                handleChange('topic', value);
                setSelectedTopicId(null);
            }
        }
    };

    // Get topic options from API topics
    const allTopicOptions = [
        ...(topics?.map((topic) => ({
            label: topic.topic,
            value: topic.topic,
        })) || []),
        { label: 'Tạo danh sách mới', value: 'new' },
    ];

    return (
        <>
            <Modal
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ top: 100 }}
                title={
                    isUpdatingExistingTopic
                        ? 'Cập nhật danh sách Flashcard'
                        : 'Tạo danh sách Flashcard'
                }
                width={600}
                confirmLoading={isLoading}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                >
                    <div>
                        <Typography.Text strong>Chọn danh sách</Typography.Text>
                        <Flex gap={10} vertical={isCreatingNewList}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn danh sách"
                                value={
                                    isCreatingNewList
                                        ? 'new'
                                        : flashcardData.topic
                                }
                                onChange={handleTopicChange}
                                options={allTopicOptions}
                                disabled={isLoadingExistingFlashcard}
                            />
                            {isCreatingNewList && (
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Tên danh sách mới"
                                    value={flashcardData.topic}
                                    onChange={(e) =>
                                        handleChange('topic', e.target.value)
                                    }
                                />
                            )}
                        </Flex>
                    </div>

                    {isLoadingExistingFlashcard ? (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <Spin tip="Đang tải danh sách từ..." />
                        </div>
                    ) : (
                        <>
                            <Flex justify="space-between" align="center">
                                <Typography.Text strong>
                                    Từ vựng trong danh sách{' '}
                                    {isUpdatingExistingTopic && '(đã có sẵn)'}
                                </Typography.Text>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsWordModalOpen(true)}
                                >
                                    Thêm từ
                                </Button>
                            </Flex>

                            {flashcardData.flashcards.length > 0 ? (
                                <List
                                    bordered
                                    dataSource={flashcardData.flashcards}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="delete"
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        handleRemoveWord(index)
                                                    }
                                                />,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <span>
                                                        <b className="mr-3">
                                                            {item.word}
                                                        </b>
                                                        <Tag color="blue">
                                                            {item.wordType}
                                                        </Tag>
                                                    </span>
                                                }
                                                description={item.meaning}
                                            />
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <Typography.Text
                                    type="secondary"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '20px 0',
                                    }}
                                >
                                    Chưa có từ nào trong danh sách. Nhấn
                                    &quot;Thêm từ&quot; để bắt đầu tạo danh
                                    sách.
                                </Typography.Text>
                            )}
                        </>
                    )}
                </Space>
            </Modal>

            <CreateWordModal
                isOpen={isWordModalOpen}
                onOk={handleAddWord}
                onCancel={() => setIsWordModalOpen(false)}
            />
        </>
    );
}
