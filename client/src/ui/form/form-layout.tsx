import Image from "next/image";
import circle1 from "./circle-1.png";
import circle2 from "./circle-2.png";
import TiawaiMascot from "@/ui/tiawai-mascot";
import { twMerge } from "tailwind-merge";

export const FormLayout = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <>
            <div
                className={twMerge(
                    "form__layout relative m-auto flex min-h-[600px] w-full max-w-3xl overflow-clip rounded-3xl p-12 shadow-xl",
                    className || "bg-white",
                )}
            >
                <FormBackground />
                <TiawaiMascot />
                <div className="form__content flex-[1.4] content-center">
                    {children}
                </div>
            </div>
        </>
    );
};

const FormBackground = () => {
    return (
        <>
            <Image
                className="absolute left-[15%] top-0"
                src={circle1}
                alt="circle1"
                width={225}
                height={225}
                style={{ height: "auto", width: "auto" }}
            />

            <Image
                className="absolute left-0 top-[15%]"
                src={circle2}
                alt="circle2"
                width={150}
                height={150}
                style={{ height: "auto", width: "auto" }}
            />
        </>
    );
};
