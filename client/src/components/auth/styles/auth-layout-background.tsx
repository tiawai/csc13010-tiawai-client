import Image from 'next/image';
import './auth-layout-background.css';

export const AuthLayoutBackground = () => {
    return (
        <>
            <Image
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/auth-bg.png'
                }
                alt="Auth Background"
                priority
                fill
            />
            <Image
                className="absolute left-[-7%] top-[15%] animate-[backpack_20s_ease-in-out_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/backpack.png'
                }
                alt="backpack"
                width={400}
                height={400}
                loading="lazy"
            />
            <Image
                className="absolute bottom-[-15%] left-0 animate-[globe_100s_linear_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/globe.png'
                }
                alt="globe"
                width={500}
                height={500}
                loading="lazy"
            />
            <Image
                className="absolute bottom-[-15%] right-1/4 animate-[calculator_15s_ease-in-out_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/calculator.png'
                }
                alt="calculator"
                width={400}
                height={400}
                loading="lazy"
            />
            <Image
                className="absolute right-[-10%] top-[25%] animate-[scissors_20s_ease-in-out_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/scissors.png'
                }
                alt="scissors"
                width={400}
                height={400}
                loading="lazy"
            />
            <Image
                className="absolute right-[15%] top-[-10%] animate-[pencil_25s_ease-in-out_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/pencil.png'
                }
                alt="pencil"
                width={400}
                height={400}
                loading="lazy"
            />
            <Image
                className="absolute left-[15%] top-[-10%] animate-[crayons_30s_ease-in-out_infinite]"
                src={
                    'https://tiawai-storage.sgp1.cdn.digitaloceanspaces.com/auth-bg/crayons.png'
                }
                alt="crayons"
                width={400}
                height={400}
                loading="lazy"
            />
        </>
    );
};
