import { Banner, BannerDescription, BannerTitle } from '@/ui/components/banner';
import { CHALLENGE_RULES, CHALLENGE_BANNER } from '@/strings/challenge';
import { Avatar, Button, Col, Flex, Row } from 'antd';
import Image from 'next/image';
import bigTiawai from '@public/big-tiawai-2.svg';
import { CustomTitle } from '@/ui/components/title';
import ArrowButton from '@/ui/components/button';
import { twJoin } from 'tailwind-merge';
import crown from '@public/challenge/crown.svg';
import trophy from '@public/challenge/trophy.svg';

const time = [
    { title: 'Ngày', value: 360 },
    { title: 'Giờ', value: 24 },
    { title: 'Phút', value: 60 },
    { title: 'Giây', value: 60 },
];

const TOP10_COLORS = [
    'bg-[#B21D1D]',
    'bg-[#3C0101]',
    'bg-[#C7AEAE]',
    'bg-[#D1A7D1]',
    'bg-[#DDBEDD]',
    'bg-[#E9DAE9]',
    'bg-[#F4EDF4]',
    'bg-[#FBF3FB]',
    'bg-[#FCF4FC]',
    'bg-[#FEF5FE]',
];

const top10 = [
    {
        name: 'A',
        email: '@gmail.com',
        score: '39/40',
        time: '30 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '40/40',
        time: '30 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '30 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '40 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '50 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '60 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '70 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '80 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '90 phút',
        avatar: '',
    },
    {
        name: 'A',
        email: '@gmail.com',
        score: '38/40',
        time: '100 phút 30 giấy',
        avatar: '',
    },
];

const Challenge = () => {
    return (
        <Flex vertical>
            <Banner className="mb-40">
                <Flex vertical className="mt-10">
                    <BannerTitle>{CHALLENGE_BANNER.title}</BannerTitle>
                    <BannerDescription>
                        {CHALLENGE_BANNER.description}
                    </BannerDescription>
                </Flex>
                <Image
                    src={bigTiawai}
                    sizes="100vw"
                    className="h-auto w-[70%]"
                    alt="big tiawai"
                />
            </Banner>

            <Flex vertical gap={40} className="mb-32">
                <div>
                    <CustomTitle className="!text-center !text-5xl !font-bold !text-[#FF0000]">
                        Challenge 1 đang diễn ra! ⏳🔥
                    </CustomTitle>
                    <div className="text-center font-montserrat text-xl">
                        Tham gia ngay để không bỏ lỡ cơ hội tranh tài!
                    </div>
                </div>
                <ArrowButton>Vào bài test</ArrowButton>
                <Flex justify="center" gap={40}>
                    <Button
                        size="large"
                        className="w-[15%] rounded-full border-black font-montserrat font-bold capitalize"
                    >
                        Quy định
                    </Button>
                    <Button
                        size="large"
                        className="w-[15%] rounded-full border-black font-montserrat font-bold capitalize"
                    >
                        Bảng xếp hạng
                    </Button>
                </Flex>
                <Flex
                    className="mx-32 rounded-[40px] border border-black px-20 pb-20 pt-12"
                    vertical
                    gap={20}
                >
                    <CustomTitle className="!text-center !font-bold" level={2}>
                        Challenge kết thúc trong
                    </CustomTitle>
                    <Row gutter={[4, 20]} justify="center" className="">
                        {time.map((item, index) => (
                            <Col key={index} lg={6} md={12}>
                                <div className="size-44 content-center justify-self-center rounded-3xl bg-[#CFEBF1] text-center font-montserrat capitalize">
                                    <strong className="text-6xl font-black">
                                        {item.value}
                                    </strong>
                                    <br />
                                    {item.title}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Flex>
            </Flex>
            <Flex vertical gap={10} className="mb-32">
                <CustomTitle level={2} className="!font-bold !text-[#FF0000]">
                    📌 Quy định thi đấu challenge 🏆
                </CustomTitle>
                <ul className="mb-6 list-inside list-disc">
                    {CHALLENGE_RULES.map((item, index) => (
                        <li key={index} className="font-montserrat text-xl">
                            <strong>{item.title}:</strong> {item.description}
                        </li>
                    ))}
                </ul>
                <strong className="font-montserrat text-xl italic">
                    🚀 Bạn đã sẵn sàng thử thách bản thân? Hãy tham gia ngay!
                </strong>
            </Flex>
            <Flex vertical>
                <CustomTitle className="!text-center !font-bold uppercase !text-[#FF0000]">
                    🏆 BẢNG XẾP HẠNG – AI SẼ DẪN ĐẦU? 🔥
                </CustomTitle>
                <Flex vertical gap={40}>
                    <Flex
                        justify="center"
                        align="end"
                        className="h-[60vh]"
                        gap={35}
                    >
                        {top10.slice(0, 3).map((item, index) => (
                            <Flex
                                vertical
                                align="center"
                                justify="end"
                                className="h-full"
                                key={index}
                            >
                                <Avatar
                                    size={140}
                                    shape="circle"
                                    className={twJoin(
                                        'mb-2',
                                        TOP10_COLORS[index],
                                    )}
                                />
                                <CustomTitle level={2} className="!mb-6">
                                    {item.name}
                                </CustomTitle>
                                <span className="mb-2 font-montserrat">
                                    {item.email}
                                </span>
                                <Flex
                                    vertical
                                    align="center"
                                    justify="center"
                                    gap={10}
                                    className={twJoin(
                                        'rounded-t-[35px] bg-gradient-to-b px-24 font-montserrat font-medium',
                                        index === 0
                                            ? 'h-[45%] from-[#aeaeae]/60 to-[#d9d9d9]/60'
                                            : index === 1
                                              ? 'h-[55%] from-[#d8b801]/80 to-[#f5e486]/80'
                                              : 'h-[35%] from-[#bd5a13]/50 to-[#dbc4b4]/50',
                                    )}
                                >
                                    <strong className="text-3xl text-white">
                                        {index === 0
                                            ? '2nd'
                                            : index === 1
                                              ? '1st'
                                              : '3rd'}
                                    </strong>
                                    <strong className="rounded-[60px] bg-white/30 px-4 py-1 text-2xl">
                                        {item.score}
                                    </strong>
                                    <span>{item.time}</span>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                    <Flex vertical gap={20}>
                        {top10.slice(3).map((item, index) => (
                            <Flex
                                className={twJoin(
                                    'rounded-full px-8 py-3 backdrop-blur-[2px]',
                                    TOP10_COLORS[index + 3],
                                )}
                                gap={20}
                                key={index}
                            >
                                <Flex className="relative">
                                    <Image
                                        src={crown}
                                        alt="crown"
                                        className="self-center"
                                    />
                                    <Flex className="absolute inset-0 items-center justify-center font-bold text-white">
                                        {index + 4}
                                    </Flex>
                                </Flex>
                                <Flex className="flex-1" gap={12}>
                                    <Avatar
                                        shape="circle"
                                        size={64}
                                        className="border-[3px] border-white/60 bg-[#B45C5C]"
                                    />
                                    <Flex
                                        vertical
                                        align="start"
                                        justify="center"
                                        className="font-montserrat"
                                    >
                                        <span className="text-xl font-semibold">
                                            {item.name}
                                        </span>
                                        <span>{item.email}</span>
                                    </Flex>
                                </Flex>
                                <Image
                                    src={trophy}
                                    alt="trophy"
                                    className="h-full w-auto self-center"
                                />
                                <Flex
                                    vertical
                                    flex={0.12}
                                    align="end"
                                    justify="center"
                                    className="font-montserrat"
                                >
                                    <span className="text-xl font-semibold">
                                        {item.score}
                                    </span>
                                    <span className="text-[#B09393]">
                                        {item.time}
                                    </span>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Challenge;
