import { useContext } from 'react';
import { NotificationContext } from '@/components/common/notification';

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            'useNotificationContext must be used within a NotificationProvider',
        );
    }
    return context;
};
