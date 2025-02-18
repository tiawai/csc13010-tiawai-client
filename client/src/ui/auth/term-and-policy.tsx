"use client";
import { useState } from "react";
import { Button, Modal } from "antd";

export const TermAndPolicy = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            Tôi đã đọc và chấp nhận{" "}
            <Button
                className="!m-0 !inline !p-0"
                type="link"
                onClick={showModal}
            >
                <span className="!font-medium">điều khoản và chính sách.</span>
            </Button>
            <Modal
                title="Điều khoản và chính sách"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TermAndPolicyContent />
            </Modal>
        </>
    );
};

const TermAndPolicyContent = () => {
    return (
        <>
            <h1>1. Hello world</h1>
            <p>2. Hello Tiawai</p>
        </>
    );
};
