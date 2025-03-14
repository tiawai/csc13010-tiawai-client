import { useState, useCallback, memo } from 'react';
import clsx from 'clsx';
import { Button, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hook';
import {
    resetQuestiionsByTestType,
    setIsExporting,
    setCurrentPart,
    selectCurrentPart,
    selectLastPart,
    selectPreviousPart,
    selectNextPart,
} from '@/lib/slices/toeic-test-creator';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {
    NavigationButtonCancel,
    NavigationButtonExport,
    NavigationButtonSave,
} from './form-ui';

export const PartTitle = ({ title }: { title: string }) => {
    return <Title className="!text-center">{title}</Title>;
};

export const PartDescription = ({ description }: { description: string }) => {
    return (
        <Title className="!text-center !font-normal" level={4}>
            {description}
        </Title>
    );
};

export interface PartMap {
    title: string;
    description: string;
}

export interface PartNavigationProps<T extends string> {
    partMap: Record<T, { title: string; description: string }>;
}

export const PartNavigation = memo(
    <T extends string>({ partMap }: PartNavigationProps<T>) => {
        const currentPart = useAppSelector(selectCurrentPart);
        const dispatch = useAppDispatch();
        const onNavigate = useCallback(
            (part: T) => {
                dispatch(setCurrentPart(part));
            },
            [dispatch],
        );

        return (
            <div className="flex justify-center gap-4">
                {Object.keys(partMap).map((part) => (
                    <Button
                        key={part}
                        className={clsx(
                            'hover:!border-tia-slate-blue',
                            currentPart === part &&
                                '!border-tia-slate-blue !bg-tia-alice-blue !text-tia-slate-blue',
                        )}
                        onClick={() => onNavigate(part as T)}
                        size="large"
                    >
                        {partMap[part as T].title}
                    </Button>
                ))}
            </div>
        );
    },
);

export const PartNavigationFooter = memo(
    <T extends string>({ partMap }: PartNavigationProps<T>) => {
        const dispatch = useAppDispatch();
        const currentPart = useAppSelector(selectCurrentPart);
        const prevPart = useAppSelector(selectPreviousPart);
        const nextPart = useAppSelector(selectNextPart);
        const lastPart = useAppSelector(selectLastPart);

        const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

        const onNavigate = useCallback(
            (part: T) => {
                dispatch(setCurrentPart(part));
            },
            [dispatch],
        );

        const handleCancelTest = () => {
            dispatch(resetQuestiionsByTestType());
            setIsConfirmModalOpen(false);
        };

        return (
            <>
                <div className="flex justify-end gap-4">
                    {prevPart && prevPart !== currentPart && (
                        <Button
                            className="!bg-tia-platinum-2"
                            icon={<ArrowLeftOutlined />}
                            iconPosition="start"
                            shape="round"
                            onClick={() => onNavigate(prevPart as T)}
                        >
                            {partMap[prevPart as T].title}
                        </Button>
                    )}

                    {nextPart && nextPart !== currentPart && (
                        <Button
                            className="!bg-tia-platinum-2"
                            icon={<ArrowRightOutlined />}
                            iconPosition="end"
                            shape="round"
                            onClick={() => onNavigate(nextPart as T)}
                        >
                            {partMap[nextPart as T].title}
                        </Button>
                    )}

                    {lastPart === currentPart && (
                        <>
                            <NavigationButtonCancel
                                text="Hủy"
                                onClick={() => setIsConfirmModalOpen(true)}
                            />
                            <NavigationButtonSave
                                text="Lưu"
                                onClick={() => {}}
                            />
                            <NavigationButtonExport
                                text="Xuất bản"
                                onClick={() => dispatch(setIsExporting(true))}
                            />
                        </>
                    )}
                </div>

                <Modal
                    title="Xác nhận hủy bài kiểm tra"
                    open={isConfirmModalOpen}
                    onCancel={() => setIsConfirmModalOpen(false)}
                    footer={[
                        <Button
                            key="cancel"
                            onClick={() => setIsConfirmModalOpen(false)}
                        >
                            Hủy
                        </Button>,
                        <Button
                            key="confirm"
                            danger
                            type="primary"
                            onClick={handleCancelTest}
                        >
                            Xác nhận hủy
                        </Button>,
                    ]}
                >
                    <p>
                        Bạn có chắc chắn muốn hủy bài kiểm tra không? Hành động
                        này không thể hoàn tác.
                    </p>
                </Modal>
            </>
        );
    },
);

PartNavigation.displayName = 'PartNavigation';
PartNavigationFooter.displayName = 'PartNavigationFooter';
