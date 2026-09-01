export interface User {
    id: number;
    name: string;
    email: string;
}

export type Status = 'active' | 'completed' | 'archived' | 'new';

export interface Goal {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    current: number;
    target: number;
}

export interface CreateGoalDTO {
    title: string;
    current: number;
    target: number;
}

export interface Habit {
    id: number;
    title: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    createdAt: Date;
}

export interface Category{
    id: number;
    title: string;
    maxAmount: number;
}

export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: Category;
    paymentMethod: 'cash' | 'credit' | 'debit' | 'pix';
    totalInstallments: number;
    installmentAmount: number;
    currentInstallment: number;
    firstInstallmentDate: Date;
    bank?: string;
    date: Date;
}

export interface JournalEntry {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

interface Project {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
}
