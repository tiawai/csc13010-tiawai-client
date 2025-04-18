import { User } from './user.type';

export enum ReportStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    RESOLVED = 'Resolved',
}

export interface Report {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    content: string;
    status: ReportStatus;
    manageBy: User | null;
    createdAt: string;
}

export interface CreateReport {
    fullname: string;
    content: string;
    email: string;
    phone: string;
}

export interface UpadateReportStatus {
    id: string;
    status: ReportStatus;
}
