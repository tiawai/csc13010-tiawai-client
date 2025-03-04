'use client';
import { useState } from 'react';
import { Input, Button, Typography, Tabs, notification, Space } from 'antd';
import type { TabsProps } from 'antd';
import Banner from '@/app/(user)/(study)/_ui/banner';
import Image from 'next/image';
import { BannerTitle } from '@/ui/common/title';
import { useParaphraseMutation } from '@/services/ai';
import bigTiawai from '@public/big-tiawai.svg';

const { TextArea } = Input;
const { Title } = Typography;
const tabItems: TabsProps['items'] = [
    { key: 'Paraphrase', label: 'Tiêu chuẩn' },
    { key: 'Fluency', label: 'Trôi chảy' },
    { key: 'Coherence', label: 'Mạch lạc' },
    { key: 'Simplification', label: 'Thu gọn' },
    { key: 'Formalize', label: 'Trang trọng' },
    { key: 'Neutralize', label: 'Trung lập' },
];

export default function Paraphrasing() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [tabItem, setTabItem] = useState<string>('Paraphrase');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paraphrase] = useParaphraseMutation();

    const onChangeTab = (key: string) => {
        setTabItem(key);
    };

    const isEnglish = (inputText: string) => {
        const regex = /[^\w\s~!$@#$%^&*(){}\[\]_+-=:;"'’<>.,?/ ]+/;
        return regex.test(inputText);
    };

    const handleParaphrase = async () => {
        const [result] = await Promise.all([
            paraphrase(
                `paraphrase with style ${tabItem} the following text: ${inputText}`,
            ),
        ]);

        if (!result.error) {
            setOutputText(`${result.data?.data}`);
            return false;
        }
        return true;
    };

    const handleParaphraseWithRetry = async () => {
        if (isEnglish(inputText)) {
            notification.error({
                message: 'Chỉ hỗ trợ tiếng Anh',
                description: 'Vui lòng nhập hoặc sao chép văn bản tiếng Anh',
            });
            return;
        }

        setIsLoading(true);
        for (let i = 0; i < 5; i++) {
            const failed = await handleParaphrase();
            if (failed) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                continue;
            }
            return setIsLoading(false);
        }
        setIsLoading(false);
        notification.error({
            message: 'Đã xảy ra lỗi',
            description: 'Vui lòng thử lại sau',
        });
    };

    return (
        <Space direction="vertical" className="select-none" size={60}>
            <Banner>
                <BannerTitle>
                    Công cụ paraphrase mạnh mẽ với nhiều lựa chọn
                </BannerTitle>
                <Image
                    className="max-h-[400px] w-auto"
                    src={bigTiawai}
                    alt="big tiawai 2"
                />
            </Banner>

            <Title className="!font-normal" level={3}>
                <i>
                    Công cụ paraphrasing hoạt động cùng bạn để giúp bạn tạo ra{' '}
                    <b>những bài viết rõ ràng, mạch lạc và chuyên nghiệp</b> —
                    trong một khoảng
                    <b> thời gian ngắn</b>. Tia - AI của chúng tôi ngay lập tức
                    diễn đạt lại đoạn văn của bạn{' '}
                    <b>
                        mà không làm thay đổi ý nghĩa hay chất lượng của từ ngữ.
                    </b>
                </i>
            </Title>

            <div className="m-auto mb-5 rounded-xl border border-black">
                <div className="flex translate-y-4 items-start justify-center gap-4 px-4">
                    <Title
                        className="!mt-3 rounded-full bg-[#DAE3E9] px-4 py-1 !font-bold"
                        level={5}
                    >
                        Chế Độ:
                    </Title>
                    <Tabs
                        defaultActiveKey="standard"
                        items={tabItems}
                        size="large"
                        onChange={onChangeTab}
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div className="relative">
                        <TextArea
                            className="!rounded-none !rounded-bl-xl"
                            placeholder="Để viết lại câu, viết hoặc sao chép vào đây, sau đó nhấn Paraphrase"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            autoSize={{ minRows: 20, maxRows: 20 }}
                            size="large"
                            showCount
                            minLength={200}
                            maxLength={1000}
                        />
                        <div className="absolute bottom-4 right-4 mt-4 flex justify-center">
                            <Button
                                className="!z-50 !bg-[#E9DAE9] !font-bold"
                                onClick={handleParaphraseWithRetry}
                                shape="round"
                                size="large"
                                loading={isLoading}
                            >
                                Paraphrasing
                            </Button>
                        </div>
                    </div>
                    <TextArea
                        className="!rounded-none !rounded-br-xl"
                        value={outputText}
                        autoSize={{ minRows: 20, maxRows: 20 }}
                        rows={24}
                        size="large"
                        showCount
                        maxLength={1000}
                        readOnly
                    />
                </div>
            </div>
        </Space>
    );
}
