'use client';
import { useState } from 'react';
import {
    FormLayout,
    FormTitle,
    FormNavigation,
} from '@/components/auth/ui/form-ui';
import { FormSignIn } from '@/components/auth/forms/form-sign-in';
import { FormRole } from '@/components/auth/forms/form-role';

export default function SignInPage() {
    const [role, setRole] = useState<number | null>(null);

    return (
        <FormLayout showBackground={role !== null}>
            {role === null ? (
                <FormRole setRole={setRole} />
            ) : (
                <>
                    <FormTitle title="Đăng nhập" />
                    <FormSignIn role={role} />
                    <FormNavigation
                        href="/sign-up"
                        textHref="Đăng ký"
                        description="Bạn chưa có tài khoản?"
                    />
                </>
            )}
        </FormLayout>
    );
}
