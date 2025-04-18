'use client';

import { useState } from 'react';
import { Modal, Space, Typography, Input, Select } from 'antd';

export interface WordData {
    word: string;
    meaning: string; // Changed from definition to meaning to match API
    wordType: string;
}

interface CreateWordModalProps {
    isOpen: boolean;
    onOk: (wordData: WordData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export default function CreateWordModal({
    isOpen,
    onOk,
    onCancel,
    isLoading = false,
}: CreateWordModalProps) {
    const [wordData, setWordData] = useState<WordData>({
        word: '',
        meaning: '',
        wordType: '',
    });

    const handleChange = (field: keyof WordData, value: string) => {
        setWordData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOk = () => {
        if (wordData.word && wordData.meaning && wordData.wordType) {
            onOk(wordData);
            resetForm();
        } else {
            // Simple validation
            alert('Vui lòng điền đầy đủ thông tin từ vựng');
        }
    };

    const handleCancel = () => {
        onCancel();
        resetForm();
    };

    const resetForm = () => {
        setWordData({
            word: '',
            meaning: '',
            wordType: '',
        });
    };

    return (
        <Modal
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ top: 150 }}
            title="Thêm từ mới"
            width={500}
            confirmLoading={isLoading}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                    <Typography.Text strong>Từ vựng</Typography.Text>
                    <Input
                        placeholder="Nhập từ vựng"
                        value={wordData.word}
                        onChange={(e) => handleChange('word', e.target.value)}
                    />
                </div>

                <div>
                    <Typography.Text strong>Loại từ</Typography.Text>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Chọn loại từ"
                        value={wordData.wordType}
                        onChange={(value) => handleChange('wordType', value)}
                        options={[
                            { label: 'Danh từ (Noun)', value: 'danh từ' },
                            { label: 'Động từ (Verb)', value: 'động từ' },
                            {
                                label: 'Tính từ (Adjective)',
                                value: 'tính từ',
                            },
                            { label: 'Trạng từ (Adverb)', value: 'trạng từ' },
                            {
                                label: 'Giới từ (Preposition)',
                                value: 'giới từ',
                            },
                            {
                                label: 'Liên từ (Conjunction)',
                                value: 'liên từ',
                            },
                            { label: 'Đại từ (Pronoun)', value: 'đại từ' },
                            { label: 'Khác (Other)', value: 'khác' },
                        ]}
                    />
                </div>

                <div>
                    <Typography.Text strong>Nghĩa của từ</Typography.Text>
                    <TextArea
                        placeholder="Nhập nghĩa của từ"
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        value={wordData.meaning}
                        onChange={(e) =>
                            handleChange('meaning', e.target.value)
                        }
                    />
                </div>
            </Space>
        </Modal>
    );
}
