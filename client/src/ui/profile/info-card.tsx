import { Card, Col, Flex, Form, Input, Row } from 'antd';

interface InfoCardProps {
    [key: string]: string | number | boolean | undefined;
    title: string;
    isUpdatingInfo?: boolean;
}

const keyMap: { [key: string]: string } = {
    name: 'Họ và tên',
    email: 'Email',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    birthday: 'Ngày sinh',
    address: 'Địa chỉ',
    examTaken: 'Số đề thi đã làm',
    practiceTaken: 'Số chuyên đề đã tạo',
    vocabularies: 'Số từ vựng đã học',
};

const InfoCard = (props: InfoCardProps) => {
    const { title, isUpdatingInfo } = props;
    return (
        <Card
            className="font-roboto"
            style={{
                width: 700,
                borderRadius: '50px',
                borderWidth: '2px',
                borderColor: 'black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '10px',
            }}
            bordered={true}
        >
            <div className="mb-8">
                <p className="m-auto w-max rounded-full bg-[#DAE3E9] px-12 py-[6px] text-lg font-bold">
                    {title}
                </p>
            </div>
            {!isUpdatingInfo ? (
                Object.entries(props)
                    .filter(
                        ([key]) => key !== 'title' && key !== 'isUpdatingInfo',
                    )
                    .map(([key, value]) => (
                        <Row key={key} className="mb-4">
                            <Col span={12} className="font-roboto text-lg">
                                {keyMap[key] || key}
                            </Col>
                            <Col
                                span={12}
                                className="font-roboto text-lg font-bold"
                            >
                                {value?.toString() || ''}
                            </Col>
                        </Row>
                    ))
            ) : (
                <Form
                    name="user-info"
                    labelCol={{ span: 12 }}
                    labelAlign="left"
                    wrapperCol={{ span: 12 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    variant="borderless"
                    size="small"
                    colon={false}
                >
                    {Object.entries(props)
                        .filter(
                            ([key]) =>
                                key !== 'title' && key !== 'isUpdatingInfo',
                        )
                        .map(([key, value]) => (
                            <Form.Item
                                className="mb-[1rem] h-7"
                                key={key}
                                name={key}
                                label={
                                    <span className="font-roboto text-lg">
                                        {keyMap[key] || key}
                                    </span>
                                }
                            >
                                <Input
                                    className="font-roboto font-bold"
                                    placeholder={value?.toString() || ''}
                                />
                            </Form.Item>
                        ))}
                    <Flex align="center" justify="center">
                        <button className="rounded-full bg-[#E9DAE9] px-12 py-[3px] text-lg font-bold">
                            Cập nhật thông tin
                        </button>
                    </Flex>
                </Form>
            )}
        </Card>
    );
};

export default InfoCard;
