import {
    BannerBackground,
    BannerDescription,
    BannerLayout,
    BannerTitle,
} from '@/components/common/banner';
import { twJoin } from 'tailwind-merge';
import Image, { StaticImageData } from 'next/image';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="space-y-20">{children}</div>;
};

const PageTitle = ({
    title,
    description,
    imageSrc,
    imageAlt,
    imagePosition = 'left',
}: {
    title: string;
    description?: string;
    imageSrc: string | StaticImageData;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
}) => {
    return (
        <BannerLayout>
            <BannerBackground />
            <Image
                src={imageSrc}
                alt={imageAlt}
                priority
                className={twJoin(
                    'h-[325px] w-auto',
                    imagePosition === 'left' ? 'order-first' : 'order-last',
                )}
            />
            <div className="">
                <BannerTitle title={title} />
                {description && <BannerDescription title={description} />}
            </div>
        </BannerLayout>
    );
};

export { PageLayout, PageTitle };
