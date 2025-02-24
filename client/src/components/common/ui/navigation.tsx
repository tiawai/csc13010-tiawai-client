import { Button, ConfigProvider } from 'antd';
import React from 'react';

const NavigationButtonTheme = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultActiveColor: '#AF3FAF',
                        defaultActiveBorderColor: '#E9DAE999',
                        defaultHoverBorderColor: '#E9DAE9',
                        defaultHoverColor: '#AF3FAF',
                        defaultColor: '#AF3FAF',
                        defaultHoverBg: '#E9DAE999',
                        defaultBg: '#E9DAE9',
                        defaultActiveBg: '#E9DAE999',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

const NavigationButton = ({
    text,
    onClick,
}: {
    text: string;
    onClick?: () => void;
}) => (
    <Button
        shape="round"
        onClick={onClick}
        style={{ width: '100%', fontWeight: 600 }}
    >
        {text}
    </Button>
);

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex w-full flex-col gap-3">{children}</div>;
};

interface NavigationProps {
    navigationItems: string[];
    currentItem: number;
    onNavigationChange: (index: number) => void;
}

const Navigation = ({
    navigationItems,
    currentItem,
    onNavigationChange,
}: NavigationProps) => {
    return (
        <NavigationLayout>
            {navigationItems.map((item, index) =>
                index === currentItem ? (
                    <NavigationButtonTheme key={index}>
                        <NavigationButton
                            text={item}
                            onClick={() => onNavigationChange(index)}
                        />
                    </NavigationButtonTheme>
                ) : (
                    <NavigationButton
                        key={index}
                        text={item}
                        onClick={() => onNavigationChange(index)}
                    />
                ),
            )}
        </NavigationLayout>
    );
};

export {
    NavigationButtonTheme,
    NavigationButton,
    NavigationLayout,
    Navigation,
};
