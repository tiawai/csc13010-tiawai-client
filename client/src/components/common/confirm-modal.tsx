'use client';
import { Modal, Button } from 'antd';

interface ConfirmModalProps {
    open: boolean;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    content,
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            title="Xác nhận"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="confirm" type="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>,
            ]}
            destroyOnClose
        >
            <p>{content}</p>
        </Modal>
    );
};

export default ConfirmModal;
