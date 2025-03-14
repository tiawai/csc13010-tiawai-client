import { useState } from 'react';
import { Modal, Select, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import {
    setIsExporting,
    selectIsExporting,
} from '@/lib/slices/toeic-test-creator';
import { ConfigProvider } from 'antd';
import clsx from 'clsx';

export const FormToeicExport = () => {
    const dispatch = useAppDispatch();
    const isExport = useAppSelector(selectIsExporting);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

    const classList = [
        { id: 'class1', name: 'Lớp TOEIC A' },
        { id: 'class2', name: 'Lớp TOEIC B' },
        { id: 'class3', name: 'Lớp TOEIC C' },
        { id: 'class4', name: 'Lớp TOEIC D' },
        { id: 'class5', name: 'Lớp TOEIC E' },
        { id: 'class6', name: 'Lớp TOEIC F' },
        { id: 'class7', name: 'Lớp TOEIC G' },
        { id: 'class8', name: 'Lớp TOEIC H' },
        { id: 'class9', name: 'Lớp TOEIC J' },
    ];

    const handleExport = () => {
        if (selectedClasses.length === 0) {
            return;
        }
        console.log(`Xuất bài test cho các lớp: ${selectedClasses.join(', ')}`);
        // TODO: Dispatch action xuất bản bài test
        dispatch(setIsExporting(false));
    };

    return (
        <Modal
            title="Xuất bản bài kiểm tra"
            closeIcon={null}
            open={isExport}
            footer={[
                <Button
                    key="cancel"
                    danger
                    type="primary"
                    shape="round"
                    onClick={() => dispatch(setIsExporting(false))}
                >
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="default"
                    shape="round"
                    onClick={handleExport}
                    disabled={selectedClasses.length === 0}
                    className={clsx(
                        '!bg-tia-platinum',
                        selectedClasses.length !== 0 && '!text-black',
                    )}
                >
                    Xuất bản
                </Button>,
            ]}
        >
            <p>Chọn các lớp học để xuất bản bài kiểm tra:</p>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#E9DAE9',
                    },
                }}
            >
                <Select
                    mode="multiple"
                    placeholder="Chọn lớp học"
                    className="w-full"
                    onChange={setSelectedClasses}
                    options={classList.map((cls) => ({
                        value: cls.id,
                        label: cls.name,
                    }))}
                />
            </ConfigProvider>
        </Modal>
    );
};
