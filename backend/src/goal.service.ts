import { type CreateGoalDTO, type Goal, type Status, type UpdateGoalDTO } from "./types";

const status: Status = 'active';

export const goals: Goal[] = [
    {
        id: 1,
        title: 'Comprar apartamento',
        status: status,
        description: 'Comprar um apartamento de 2 quartos no centro da cidade',
        createdAt: new Date(),
        current: 50000,
        target: 400000
    },
    {
        id: 2,
        title: 'Aprender TypeScript',
        description: 'Aprender TypeScript para melhorar minhas habilidades de programação',
        createdAt: new Date(),
        status: status,
        current: 30,
        target: 100
    }
];

export function findAllGoals(): Goal[] {
    return goals;
}

export function updateGoal(goal: Goal, data: UpdateGoalDTO): Goal {
    if (data.title !== undefined) {
        goal.title = data.title;
    }

    if (data.current !== undefined) {
        goal.current = data.current;
    }

    if (data.target !== undefined) {
        goal.target = data.target;
    }

    if (data.status !== undefined) {
        goal.status = data.status;
    }

    if (data.description !== undefined) {
        goal.description = data.description;
    }

    return goal;
}

export function deleteGoal(index: number): void {
    goals.splice(index, 1);
}

export function createGoal(data: CreateGoalDTO): Goal {
    const newGoal = {
        id: goals.length + 1,
        title: data.title,
        status: status,
        current: data.current,
        target: data.target,
        description: data.description,
        createdAt: new Date()
    };

    goals.push(newGoal);

    return newGoal;
}

export function validateTitle(title: string | undefined): boolean {
    if(title === undefined) {
        return true;
    } else {
        return typeof title === 'string' && title.trim() !== '';
    }
}

export function validateCreateGoal(goal: CreateGoalDTO): { valid: boolean; message?: string } {
    if (!validateTitle(goal.title)) {
        return { valid: false, message: 'Título inválido' };
    }

    if (!goal.description || typeof goal.description !== 'string') {
        return { valid: false, message: 'Descrição inválida' };
    }

    if (typeof goal.current !== 'number' || goal.current < 0 || Number.isNaN(goal.current)) {
        return { valid: false, message: 'Valor atual inválido' };
    }

    if (typeof goal.target !== 'number' || goal.target <= 0 || Number.isNaN(goal.target)) {
        return { valid: false, message: 'Valor alvo inválido' };
    }
    return { valid: true };
}

export function validateUpdateGoal(goal: UpdateGoalDTO): { valid: boolean; message?: string } {
    if (validateTitle(goal.title) === false) {
        return { valid: false, message: 'Título inválido' };
    }

    if (goal.description !== undefined && (goal.description === "" || typeof goal.description !== 'string')) {
        return { valid: false, message: 'Descrição inválida' };
    }

    const validStatus = ['active', 'completed', 'archived', 'new'];
    if (goal.status !== undefined && !validStatus.includes(goal.status)) {
        return { valid: false, message: 'Status inválido' };
    }

    if (goal.current !== undefined && (typeof goal.current !== 'number' || goal.current < 0 || Number.isNaN(goal.current))) {
        return { valid: false, message: 'Valor atual inválido' };
    }

    if (goal.target !== undefined && (typeof goal.target !== 'number' || goal.target <= 0 || Number.isNaN(goal.target))) {
        return { valid: false, message: 'Valor alvo inválido' };
    }
    return { valid: true };
}

export function findGoalIndex(id: number): number {
    return goals.findIndex(goal => goal.id === id);
}

export function findGoalById(id: number): Goal | undefined {
    return goals.find(goal => goal.id === id);
}
