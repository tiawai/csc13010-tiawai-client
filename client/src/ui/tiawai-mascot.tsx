'use client';
import Image from 'next/image';
import { Typography } from 'antd';
import mascotCap from '@public/mascot/cap.png';
import mascotBody from '@public/mascot/body.png';
import mascotBgBlur from '@public/mascot/bg-blur.png';
const { Title } = Typography;

export default function TiawaiMascot() {
    return (
        <div className="tiawai-mascot flex flex-[1] select-none flex-col justify-end py-8 drop-shadow-xl">
            <div className="tiawai-mascot__container relative max-w-max">
                <Image
                    className="tiawai-mascot__cap absolute left-[40px] top-[-95px] z-10"
                    src={mascotCap}
                    alt="tiawai-cap"
                />
                <Image
                    className="tiawai-mascot__body z-50"
                    height={250}
                    src={mascotBody}
                    alt="tiawai-ai"
                />
                <Image
                    className="tiawai-mascot__cap absolute -left-[5%] right-0 top-[40%] -z-10 -translate-y-1/2 -rotate-[5deg] -scale-y-[250%]"
                    src={mascotBgBlur}
                    alt="tiawai-cap"
                    priority
                />
                <Title
                    className="tiawai-mascot__name text-center !font-chango !font-normal"
                    level={2}
                >
                    tiawai
                </Title>
            </div>
        </div>
    );
}
