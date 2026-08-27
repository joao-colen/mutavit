import { type Expense } from './types.ts';

export function calculateTotalInstallments(expense: Expense): number {
    return expense.totalInstallments * expense.installmentAmount;
}

