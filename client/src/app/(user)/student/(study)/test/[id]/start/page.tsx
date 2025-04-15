'use client';
import { useRouter } from 'next/navigation';
import { TestNotFound } from '@/components/test/test-ui';
import { TestType } from '@/types/test.type';
import { useAppSelector } from '@/lib/hooks/hook';
import {
    StartNationalTest,
    StartToeicTest,
} from '@/components/test/test-start-ui';

export default function StartTestPage() {
    const router = useRouter();
    const testType = useAppSelector((state) => state.test.test.type);

    if (!testType) {
        return <TestNotFound onClick={() => router.push('/test')} />;
    }

    if (testType === TestType.NATIONAL_TEST) {
        return <StartNationalTest />;
    }

    return <StartToeicTest />;
}
