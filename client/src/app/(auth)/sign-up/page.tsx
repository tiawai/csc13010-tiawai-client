'use client';
import { useState } from 'react';
import {
    FormLayout,
    FormTitle,
    FormNavigation,
} from '@/components/auth/ui/form-ui';
import { FormSignUp } from '@/components/auth/forms/form-sign-up';
import { FormRole } from '@/components/auth/forms/form-role';

export default function SignUpPage() {
    const [role, setRole] = useState<number | null>(null);
    return (
        <FormLayout showBackground={role !== null}>
            {role === null ? (
                <FormRole setRole={setRole} />
            ) : (
                <>
                    <FormTitle title="Đăng ký" />
                    <FormSignUp role={role} />
                    <FormNavigation
                        href="/sign-in"
                        textHref="Đăng nhập"
                        description="Bạn đã là thành viên?"
                    />
                </>
            )}
        </FormLayout>
    );
}
