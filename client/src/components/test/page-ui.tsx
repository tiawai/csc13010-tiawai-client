import { memo, useCallback } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';

import Title from 'antd/es/typography/Title';

export const PageTitle = ({ title }: { title: string }) => {
    return (
        <Title className="!text-center" level={1}>
            {title}
        </Title>
    );
};

export const FormNavigation = memo(
    ({
        formIndex,
        onNavigate,
    }: {
        formIndex: number;
        onNavigate: (index: number) => void;
    }) => {
        const handleClick = useCallback(
            (index: number) => () => onNavigate(index),
            [onNavigate],
        );

        return (
            <>
                {['TOEIC Reading', 'TOEIC Listening', 'National'].map(
                    (title, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && <div className="w-px bg-black"></div>}
                            <Button
                                className={clsx(
                                    '!text-2xl !font-semibold',
                                    index === formIndex &&
                                        '!border-tia-jacarta bg-tia-platinum !text-tia-jacarta hover:!bg-tia-platinum/75',
                                )}
                                onClick={handleClick(index)}
                                size="large"
                                shape="round"
                            >
                                {title}
                            </Button>
                        </div>
                    ),
                )}
            </>
        );
    },
);

FormNavigation.displayName = 'FormNavigation';
