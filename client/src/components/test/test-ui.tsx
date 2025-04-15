import { Button, Result } from 'antd';

export const TestNotFound = ({ onClick }: { onClick: () => void }) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Đề thi không tồn tại."
            extra={
                <Button type="primary" shape="round" onClick={onClick}>
                    Quay lại trang đề thi
                </Button>
            }
        />
    );
};
