import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface CustomNotificationArgsProps extends NotificationArgsProps {
    notiType?: NotificationType;
}

type NotificationContextType = {
    notify: (config: CustomNotificationArgsProps) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [api, contextHolder] = notification.useNotification();

    const notify = (config: CustomNotificationArgsProps) => {
        api[config.notiType || 'success']({
            ...config,
            placement: 'topRight',
            showProgress: true,
            duration: 3,
        });
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            'useNotificationContext must be used within a NotificationProvider',
        );
    }
    return context;
};
