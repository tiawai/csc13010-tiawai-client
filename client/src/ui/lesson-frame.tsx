'use client';
import { useRouter } from 'next/navigation';
import { Flex, Button, Typography } from 'antd';
import IconFrame from './icon-frame';
import videoIcon from '@public/teacher/video.svg';
const { Title } = Typography;

interface LessonFrameProps {
    lesson: {
        id: string;
        title: string;
    };
}

const LessonFrame = ({ lesson }: Readonly<LessonFrameProps>) => {
    const router = useRouter();
    const { id, title } = lesson;

    const bgColor = '#E9DAE9';
    const objColor = '#4D2C5E';

    return (
        <Flex
            className="!w-full !gap-3 !rounded-xl !py-4 px-3"
            style={{
                backgroundColor: bgColor,
                boxShadow: '0px 4px 25px 0px rgba(0,0,0,0.10)',
            }}
            align="center"
        >
            <IconFrame
                className="aspect-square min-h-max min-w-max"
                bgColor={objColor}
                src={videoIcon}
                alt="lesson icon"
                width={62}
                height={62}
            />
            <Flex className="!max-w-full gap-4" vertical>
                <Title
                    className="!m-0 !max-w-full truncate text-wrap !font-montserrat !text-xl"
                    level={5}
                >
                    {title}
                </Title>
                {/* Removed date display section */}
                <div>
                    <Button
                        shape="round"
                        type="primary"
                        className="bg-secondary-button"
                        size="small"
                        onClick={() => router.push(`/student/lesson/${id}`)}
                    >
                        Xem bài học
                    </Button>
                </div>
            </Flex>
        </Flex>
    );
};

export default LessonFrame;
