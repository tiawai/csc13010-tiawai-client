import {
    BannerBackground,
    BannerLayout,
    BannerTitle,
} from '@/components/common/ui/banner';
import { twJoin } from 'tailwind-merge';
import Image, { StaticImageData } from 'next/image';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="space-y-20">{children}</div>;
};

const PageTitle = ({
    title,
    imageSrc,
    imageAlt,
    imagePosition = 'left',
}: {
    title: string;
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
                    'h-auto w-[200px]',
                    imagePosition === 'left' ? 'order-first' : 'order-last',
                )}
            />
            <BannerTitle title={title} />
        </BannerLayout>
    );
};

export { PageLayout, PageTitle };
