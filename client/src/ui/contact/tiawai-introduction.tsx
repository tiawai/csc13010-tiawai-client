'use client';
import Image from 'next/image';
import { Row, Col, Typography } from 'antd';
import chatbotIcon from '@public/mascot/chatbot-icon.png';
import mascot from '@public/mascot/full.webp';
import mascotBgBlur from '@public/mascot/bg-blur.png';
import bigTiawai from '@public/big-tiawai.svg';
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
        <section className="flex select-none items-center gap-24">
            <Col span={16}>
                <Title level={3} className="text-justify !font-normal">
                    <i>
                        <b>tiawai </b>
                        là một ứng dụng tiên tiến được thiết kế để hỗ trợ học
                        sinh trong việc học tiếng Anh, đặc biệt là chuẩn bị cho
                        kỳ thi THPT Quốc gia. <b>tiawai </b> tích hợp
                        <b> công nghệ </b>
                        AI để mang đến cho người dùng trải nghiệm học tập cá
                        nhân hóa và hiệu quả.
                    </i>
                </Title>
            </Col>
            <Col span={6}>
                <div className="relative h-full w-full content-center text-center">
                    <Image
                        className="absolute left-0 right-0 top-1/2 -z-10 -translate-y-1/2 scale-150"
                        src={mascotBgBlur}
                        alt="maskot-bg-blur"
                        priority
                    />
                    <Title className="!font-chango !text-5xl !font-normal">
                        tiawai
                    </Title>
                </div>
            </Col>
        </section>
    );
};

export const TiawaiDescription = () => {
    return (
        <section className="flex select-none items-center gap-24">
            <Col span={6}>
                <div className="relative h-full w-full content-center text-center">
                    <Image
                        className="absolute -left-[15%] right-0 top-1/2 -z-10 -translate-y-1/2 scale-150"
                        src={mascotBgBlur}
                        alt="maskot-bg-blur"
                        priority
                    />
                    <Image
                        className="m-auto h-[500px] scale-[180%]"
                        src={bigTiawai}
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
                        tương tác nhiều hơn
                    </i>
                </Title>
            </Col>
        </section>
    );
};
