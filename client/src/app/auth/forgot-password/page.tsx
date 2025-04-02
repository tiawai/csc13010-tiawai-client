import {
    FormTitle,
    FormDescription,
    FormNavigation,
    FormLayout,
} from '@/components/auth/ui/form';
import { FormForgotPassword } from '@/components/auth/forms/form-forgot-password';

export default function ForgotPasswordPage() {
    return (
        <FormLayout>
            <FormTitle title="Quên mật khẩu" />
            <FormDescription description="Vui lòng nhập email để nhận mã OTP." />
            <FormForgotPassword />
            <FormNavigation
                href="sign-in"
                textHref="Đăng nhập"
                description="Nhớ mật khẩu?"
            />
        </FormLayout>
    );
}
