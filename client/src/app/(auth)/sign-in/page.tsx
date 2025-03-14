import {
    FormLayout,
    FormTitle,
    FormNavigation,
} from '@/components/auth/ui/form';
import { FormSignIn } from '@/components/auth/forms/form-sign-in';

export default function SignInPage() {
    return (
        <FormLayout>
            <FormTitle title="Đăng nhập" />
            <FormSignIn />
            <FormNavigation
                href="/sign-up"
                textHref="Đăng ký"
                description="Bạn chưa có tài khoản?"
            />
        </FormLayout>
    );
}
