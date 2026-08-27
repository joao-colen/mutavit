import { type Expense } from './types'

export function calculateTotalInstallments(expense: Expense): number {
    return expense.totalInstallments * expense.installmentAmount;
}

