export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
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