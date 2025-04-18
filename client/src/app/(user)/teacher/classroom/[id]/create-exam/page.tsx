import TiawaiMascot from '@public/mascot/full.webp';
import Image from 'next/image';
import Link from 'next/link';

const CreateExam = () => {
    return (
        <div>
            <h1 className="mb-16 text-center text-4xl font-bold capitalize">
                Tạo đề thi / Bài tập mới
            </h1>

            <div className="flex min-h-[500px] items-center justify-around">
                <Link
                    href="create-exam/manual"
                    className="cursor-pointer rounded-3xl bg-[#DAE3E9] px-20 py-16 text-2xl font-bold capitalize text-black transition duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                >
                    Tạo đề thi thủ công
                </Link>

                <Link
                    href="create-exam/ai"
                    className="relative cursor-pointer rounded-3xl bg-[#E9DAE9] px-20 py-16 text-2xl font-bold capitalize text-black transition duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                >
                    Tạo đề thi với AI
                    <Image
                        src={TiawaiMascot}
                        alt="tiawai mascot"
                        width={70}
                        height={70}
                        className="absolute -right-10 -top-14"
                    />
                </Link>
            </div>
        </div>
    );
};

export default CreateExam;
