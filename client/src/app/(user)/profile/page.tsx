import { PageLayout, PageTitle } from '@/components/common/ui/page';
import { PageContent } from './page-content';
import profileTiawai from '@public/profile-tiawai.webp';

export default function ProfilePage() {
    return (
        <PageLayout>
            <PageTitle
                title="Thông tin cá nhân"
                imageSrc={profileTiawai}
                imageAlt="Profile Tiawai"
            />
            <PageContent />
        </PageLayout>
    );
}
