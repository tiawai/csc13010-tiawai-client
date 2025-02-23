import {
    FormLayout,
    FormTitle,
    FormNavigation,
} from '@/components/auth/ui/form-ui';
import { FormSignUp } from '@/components/auth/forms/form-sign-up';

export default function SignUpPage() {
    return (
        <FormLayout>
            <FormTitle title="Đăng ký" />
            <FormSignUp />
            <FormNavigation
                href="/sign-in"
                textHref="Đăng nhập"
                description="Bạn đã là thành viên?"
            />
        </FormLayout>
    );
}
