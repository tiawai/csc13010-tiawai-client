'use client';

import {
    TiawaiIntroductionHeader,
    TiawaiIntroduction,
    TiawaiDescription,
} from '@/ui/contact/tiawai-introduction';
import { FormLayout } from '@/components/auth/ui/form';
import { ContactForm } from '@/ui/contact/contact-form';
import Image from 'next/image';
import FeaturesBox from '@/ui/home/features-box';
import SectionBgGradient from '@public/section-bg-gradient.png';

export default function ContactPage() {
    return (
        <div className="contact__page mb-12 min-h-screen">
            <Image
                className="absolute bottom-0 left-0 right-0 top-0 -z-50 w-svw"
                src={SectionBgGradient}
                alt="home-gradient-bg"
                priority
            />

            <TiawaiIntroductionHeader />

            <div className="-translate-y-[15%]">
                <FeaturesBox />
            </div>
            <div className="-space-y-3">
                <TiawaiIntroduction />
                <TiawaiDescription />
            </div>
            <div className="mt-20">
                <FormLayout>
                    <ContactForm />
                </FormLayout>
            </div>
        </div>
    );
}
