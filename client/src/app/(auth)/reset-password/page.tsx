import { FormLayout, FormTitle } from '@/components/auth/ui/form-ui';
import { FormResetPassword } from '@/components/auth/forms/form-reset-passowrd';

export default function ResetPasswordPage() {
    return (
        <FormLayout>
            <FormTitle title="Khôi phục mật khẩu" />
            <FormResetPassword />
        </FormLayout>
    );
}
