import { User } from "./types";

export const users: User[] = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' }
];

export function findAllUsers(): User[] {
    return users;
}