import { Task } from './types';

export const tasks: Task[] = [
    {
        "id": 1,
        "title": "Estudar TypeScript",
        "status": "completed",
        "createdAt": new Date(),
        "description": "Estudar TypeScript para melhorar minhas habilidades de programação"
    },
    {
        "id": 2,
        "title": "Criar API do Mutavit",
        "status": "in-progress",
        "createdAt": new Date(),
        "description": "Criar a API do Mutavit para gerenciar objetivos e tarefas"
    }
]

export function findAllTasks(): Task[] {
    return tasks;
}

export function calculateTaskProgress(task: Task): number {
  switch(task.status) {
    case 'pending':
      return 0;
    case 'in-progress':
      return 50;
    case 'completed':
      return 100;
  }
}