export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentType {
    CLASSROOM = 'CLASSROOM',
    BALANCE = 'BALANCE',
}

export enum PayoutStatus {
    PENDING = 'PENDING',
    PROCESSED = 'PROCESSED',
    FAILED = 'FAILED',
}

export interface Payment {
    id: string;
    studentId: string;
    teacherId?: string;
    classroomId?: string;
    amount: number;
    orderCode: number;
    status: PaymentStatus;
    type: PaymentType;
    paymentLink?: string;
    payoutStatus?: PayoutStatus;
    payoutDate?: Date;
}

export interface CreatePayment {
    type: PaymentType;
    amount: number;
    teacherId?: string;
    classroomId?: string;
}

export interface PaymentVerify {
    code: string;
    id: string;
    cancel: boolean;
    status: string;
    orderCode: string;
}

export interface PaymentWebhook {
    code: string;
    id: string;
    cancel: boolean;
    status: string;
    orderCode: string;
}

export interface PaymentContent {
    success: {
        title: string;
        subtitle: string;
    };
    error: {
        title: string;
        subtitle: string;
    };
}

export interface Payout {
    index: number;
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    amount: number;
    message: string;
}

export interface PayoutDto {
    payouts: Payout[];
    payments: string[];
}

export interface BankAccount {
    id: string;
    userId: string;
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
}

export interface BankAccountDto {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
}
