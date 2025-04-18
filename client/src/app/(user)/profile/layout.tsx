import { PageLayout, PageTitle } from '@/components/common/page';
import profileTiawai from '@public/profile-tiawai.webp';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PageLayout>
            <PageTitle
                title="Thông tin cá nhân"
                imageSrc={profileTiawai}
                imageAlt="Profile Tiawai"
            />
            {children}
        </PageLayout>
    );
}
