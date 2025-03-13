'use client';
import Image from 'next/image';
import { Row, Col, Typography } from 'antd';
import chatbotIcon from '@public/mascot/chatbot-icon.png';
import mascot from '@public/mascot/full.webp';
import mascotBgBlur from '@public/mascot/bg-blur-1.png';
import mascotBgBlur2 from '@public/mascot/bg-blur-3.png';
import Tiawai from '@public/tiawai.png';
const { Title } = Typography;

export const TiawaiIntroductionHeader = () => {
    return (
        <section className="tiawai__intro--header relative select-none">
            <Row justify="center">
                <Col span={16} className="content-center">
                    <div className="flex items-center justify-center gap-4">
                        <Title className="!m-0 !font-roboto !text-5xl !font-bold">
                            Về tiawai và Tia - chatbot AI
                        </Title>
                        <Image
                            src={chatbotIcon}
                            alt="tiawai chatbot icon"
                            width={75}
                            height={75}
                        />
                    </div>
                </Col>
                <Col span={6} className="z-20">
                    <Image src={mascot} alt="tiawai mascot" height={700} />
                </Col>
            </Row>
        </section>
    );
};

export const TiawaiIntroduction = () => {
    return (
        <section className="relative flex select-none items-center gap-24 px-10 py-16">
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <Image
                    className="w-[180%] h-[180%] scale-150 blur-2xl"
                    src={mascotBgBlur}
                    alt="maskot-bg-blur"
                    priority
                />
            </div>

            <Col span={16}>
                <Title level={3} className="text-justify !font-normal">
                    <i>
                        <b>tiawai </b>
                        tiawai là <b>nền tảng học tập hiện đại</b>, giúp bạn chinh phục kỳ thi <b>TOEIC và THPTQG</b> một cách hiệu quả. Bên cạnh đó, bạn có thể tham gia lớp học theo lộ trình bài bản, làm đề thi thử, nhận hỗ trợ từ giáo viên và luyện thi THPTQG với ngân hàng đề thi chất lượng, được cập nhật thường xuyên.
                    </i>
                </Title>
            </Col>

            <Col span={6} className="text-center">
                <Title className="!font-chango !text-5xl !font-normal">
                    tiawai
                </Title>
            </Col>
        </section>
    );
};


export const TiawaiDescription = () => {
    return (
        <section className="relative flex select-none items-center gap-24 px-10 py-16">
            {/* Nền mở rộng bao quanh nội dung */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center space-y-20">
                <Image
                    className="w-[180%] h-[180%] scale-100 blur-2xl"
                    src={mascotBgBlur2}
                    alt="mascot-bg-blur"
                    priority
                />
            </div>

            <Col span={6} className="flex justify-center">
                <div className="relative">
                    <Image
                        className="m-auto h-[300px] w-auto scale-100"
                        src={Tiawai}
                        alt="tiawai mascot"
                    />
                </div>
            </Col>

            <Col span={16}>
                <Title level={3} className="!text-justify !font-normal">
                    <i>
                        Tia không chỉ là một
                        <b> linh vật </b>
                        mà còn là <b> một chatbot thông minh </b>
                        trong ứng dụng tiawai. Là
                        <b> người bạn đồng hành </b>
                        của người dùng, Tia luôn sẵn sàng giải đáp mọi thắc mắc
                        và hỗ trợ học sinh trong quá trình học tiếng Anh. Với sự
                        thân thiện và linh hoạt, Tia giúp tạo ra một môi trường
                        học tập tích cực, khuyến khích học sinh tham gia và
                        tương tác nhiều hơn.
                    </i>
                </Title>
            </Col>
        </section>
    );
};
