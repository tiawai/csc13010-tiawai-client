'use client';
import { createStyles } from 'antd-style';

export const FormButtonGradientStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(
                .${prefixCls}-btn-dangerous
            ) {
            border-width: 0;

            > span {
                position: relative;
            }

            &::before {
                content: '';
                background: linear-gradient(0deg, #e9dae9, #4d2c5e);
                position: absolute;
                inset: 0;
                opacity: 1;
                transition: all 0.3s;
                border-radius: inherit;
            }

            &:hover::before {
                background: linear-gradient(0deg, #e9dae9, #4d2c5e);
            }

            &:hover {
                background: linear-gradient(0deg, #e9dae9, #4d2c5e);
            }
        }
    `,
}));
