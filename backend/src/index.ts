import {  
    type User, 
    type Goal, 
    type Expense 
} from './types.ts';

const user: User = {
    id: 1,
    name: 'Joao Colen',
    email: 'joao@email.com'
}

const goal: Goal = {
    id: 1,
    title: 'Learn TypeScript',
    description: 'Complete the TypeScript course on Udemy',
    status: 'active',
    createdAt: new Date(),
    current: 50,
    target: 100
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