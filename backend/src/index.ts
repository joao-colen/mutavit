interface User {
    id: number;
    name: string;
    email: string;
}

type Status = 'active' | 'completed' | 'archived' | 'new';

interface Goal {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
}

interface Habit {
    id: number;
    title: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    createdAt: Date;
}

interface Category{
    id: number;
    title: string;
    maxAmount: number;
}

interface Expense {
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

interface JournalEntry {
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

const user: User = {
    id: 1,
    name: 'Joao Colen',
    email: 'joaovictorcolen@hotmail.com'
}

const goal: Goal = {
    id: 1,
    title: 'Learn TypeScript',
    description: 'Complete the TypeScript course on Udemy',
    status: 'active',
    createdAt: new Date()
}

const expense: Expense = {
    id: 1,
    title: 'Groceries',
    amount: 150.00,
    category: {
        id: 1,
        title: 'Food',
        maxAmount: 500.00
    },
    paymentMethod: 'credit',
    totalInstallments: 3,
    installmentAmount: 50.00,
    currentInstallment: 1,
    firstInstallmentDate: new Date('2024-06-01'),
    bank: 'Bank of America',
    date: new Date()
}
// console.log(user);
// console.log(goal);
// console.log(expense);

function calculateTotalInstallments(expense: Expense): number {
    return expense.totalInstallments * expense.installmentAmount;
}

console.log(calculateTotalInstallments(expense));