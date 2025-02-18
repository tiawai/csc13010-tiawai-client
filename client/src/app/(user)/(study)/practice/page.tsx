'use client';
import Image from 'next/image';
import { Empty, Flex, Modal, Select, Space, Typography } from 'antd';
import GenerateButton from '@/ui/generate-button';
import Banner from '@/app/(user)/(study)/_ui/banner';
import TestBox from '@/app/(user)/(study)/_ui/test-box';
import bigTiawai2 from '@public/big-tiawai-2.svg';
import { BannerTitle } from '@/ui/common/title';
const { Title } = Typography;
import { useGetExamPracticesQuery } from '@/services/exam';
import { useState } from 'react';
import { useGeneratePracticeMutation } from '@/services/practice';

enum Category {
    PHAT_AM = 'Phát âm',
    TRONG_AM = 'Trọng âm',
    TINH_HUONG_GIAO_TIEP = 'Tình huống giao tiếp',
    NGU_PHAP = 'Ngữ pháp',
    KIEM_TRA_TU_VUNG = 'Kiểm tra từ vựng',
    TIM_LOI_SAI = 'Tìm lỗi sai',
    VIET_LAI_CAU = 'Viết lại câu và kết hợp câu',
}

const categories = [
    {
        value: encodeURIComponent(Category.PHAT_AM),
        label: 'Phát âm',
    },
    {
        value: encodeURIComponent(Category.TRONG_AM),
        label: 'Trọng âm',
    },
    {
        value: encodeURIComponent(Category.TINH_HUONG_GIAO_TIEP),
        label: 'Tình huống giao tiếp',
    },
    {
        value: encodeURIComponent(Category.NGU_PHAP),
        label: 'Ngữ pháp',
    },
    {
        value: encodeURIComponent(Category.KIEM_TRA_TU_VUNG),
        label: 'Kiểm tra từ vựng',
    },
    {
        value: encodeURIComponent(Category.TIM_LOI_SAI),
        label: 'Tìm lỗi sai',
    },
    {
        value: encodeURIComponent(Category.VIET_LAI_CAU),
        label: 'Viết lại câu và kết hợp câu',
    },
];

const Practice = () => {
    const { data: practiceData, isLoading } = useGetExamPracticesQuery();
    const [generatePractice, { isLoading: isGeneratingPractice }] =
        useGeneratePracticeMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(categories[0].value);
    if (isLoading) return null;

    const testsData = [
        {
            title: 'Chuyên đề của bạn',
            examData: practiceData,
        },
    ];
    console.log(value);
    const handleOk = async () => {
        try {
            await generatePractice(value).unwrap();
        } catch (error) {
            console.log(error);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="select-none space-y-32">
            <Banner>
                <Image src={bigTiawai2} alt="big tiawai 2" height={400} />
                <BannerTitle>
                    Luyện thi hiệu quả với các chuyên đề Tiếng Anh
                </BannerTitle>
            </Banner>
            <Flex align="center" className="mb-24">
                <Space size="large">
                    <Title className="!font-normal" level={2}>
                        <i>
                            Trải nghiệm tạo ra{' '}
                            <b>bộ đề riêng theo dạng mà bạn mong muốn</b> dựa
                            trên năng lực của bạn bằng <b>AI - Tia</b>
                        </i>
                    </Title>
                    <GenerateButton
                        className="mr-8 h-[6.5rem] min-w-[31.25rem]"
                        textStyle="text-3xl"
                        big={true}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        style={{ top: 300 }}
                        title="Hãy chọn chuyên đề mà bạn muốn Tia tạo ra"
                        confirmLoading={isGeneratingPractice}
                    >
                        <Select
                            value={value}
                            onChange={handleChange}
                            loading={isGeneratingPractice}
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                                marginBottom: '1rem',
                            }}
                            size="large"
                            options={categories}
                        />
                    </Modal>
                </Space>
            </Flex>
            <Space className="w-full" direction="vertical" size={125}>
                {testsData[0].examData?.length ? (
                    testsData.map((test, index) => (
                        <TestBox key={index} theme="blue" {...test} />
                    ))
                ) : (
                    <Empty
                        className="!m-auto"
                        description="Không có dữ liệu"
                        imageStyle={{ height: 100 }}
                    />
                )}
            </Space>
        </div>
    );
};

export default Practice;
