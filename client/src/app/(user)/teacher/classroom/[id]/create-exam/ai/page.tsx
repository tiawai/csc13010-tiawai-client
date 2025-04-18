import { Row, Col, Input, Button } from 'antd';

const CreateExamByAI = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mb-16 text-center text-3xl font-bold">
                Tạo Đề Với AI
            </h1>

            <div className="w-[900px] rounded-2xl border border-black p-12 shadow-lg">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <label className="block font-semibold">Tên đề</label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>
                    <Col span={12}>
                        <label className="block font-semibold">
                            Thời gian làm bài
                        </label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>

                    <Col span={12}>
                        <label className="block font-semibold">
                            Ngày bắt đầu
                        </label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>
                    <Col span={12}>
                        <label className="block font-semibold">
                            Ngày kết thúc
                        </label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>

                    <Col span={12}>
                        <label className="block font-semibold">
                            Số lượng câu hỏi
                        </label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>
                    <Col span={12}>
                        <label className="block font-semibold">
                            Nội dung câu hỏi
                        </label>
                        <Input className="mt-1 !rounded-full !bg-purple-100" />
                    </Col>
                </Row>

                <div className="mt-6 flex justify-end space-x-4">
                    <Button className="!rounded-full !bg-red-400 !px-6 !py-2 !text-white">
                        Huỷ
                    </Button>
                    <Button className="!rounded-full !bg-[#DAE3E9] !px-6 !py-2 !font-semibold">
                        Tạo đề với AI (20.000)
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateExamByAI;
