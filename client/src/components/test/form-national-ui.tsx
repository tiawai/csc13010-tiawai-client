import { Button, Modal } from 'antd';
import { memo, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks/hook';
import {
    resetTHPGQGTestCreator,
    setNationalIsExporting,
} from '@/lib/slices/national-test-creator';
import {
    NavigationButtonCancel,
    NavigationButtonExport,
    NavigationButtonSave,
} from './form-ui';

export const FormFooter = memo(() => {
    const dispatch = useAppDispatch();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleCancelTest = () => {
        dispatch(resetTHPGQGTestCreator());
        setIsConfirmModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-end gap-4">
                <NavigationButtonCancel
                    text="Hủy"
                    onClick={() => setIsConfirmModalOpen(true)}
                />
                <NavigationButtonSave
                    text="Lưu"
                    onClick={() => dispatch(setNationalIsExporting(false))}
                />
                <NavigationButtonExport
                    text="Xuất bản"
                    onClick={() => dispatch(setNationalIsExporting(true))}
                />
            </div>

            <Modal
                title="Xác nhận hủy bài kiểm tra"
                open={isConfirmModalOpen}
                onCancel={() => setIsConfirmModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsConfirmModalOpen(false)}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="confirm"
                        danger
                        type="primary"
                        onClick={handleCancelTest}
                    >
                        Xác nhận hủy
                    </Button>,
                ]}
            >
                <p>
                    Bạn có chắc chắn muốn hủy bài kiểm tra không? Hành động này
                    không thể hoàn tác.
                </p>
            </Modal>
        </>
    );
});

FormFooter.displayName = 'FormFooter';
