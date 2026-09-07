import { createServer } from 'node:http';
import { Goal, UpdateGoalDTO, type CreateGoalDTO } from './types';

const goals = [
    {
        id: 1,
        title: 'Comprar apartamento',
        status: 'active',
        current: 50000,
        target: 400000
    },
    {
        id: 2,
        title: 'Aprender TypeScript',
        status: 'active',
        current: 30,
        target: 100
    }
];

const server = createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/') {
        response.end('Mutavit API funcionando!');
    } else if (request.method === 'GET' && request.url === '/users') {
        const users = [
            { id: 1, name: 'João' },
            { id: 2, name: 'Maria' }
        ];
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(users));
    } else if (request.method === 'GET' && request.url === '/tasks') {
        const tasks = [
            {
                "id": 1,
                "title": "Estudar TypeScript",
                "status": "completed"
            },
            {
                "id": 2,
                "title": "Criar API do Mutavit",
                "status": "in-progress"
            }
        ]

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(tasks));
    } else if (request.method === 'GET' && request.url === '/goals') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(goals));
    } else if (request.method === 'GET' && request.url?.startsWith('/goals/')) {
        response.setHeader('Content-Type', 'application/json');
        const requestParameters = request.url.split('/');
        const idGoal = Number(requestParameters[2]);
        if (!Number.isNaN(idGoal)) {
            const goal = goals.find(g => g.id === idGoal);
            if (!goal) {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: 'Objetivo não encontrado' }));
                return;
            }
            response.end(JSON.stringify(goal));
            return;
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: 'ID do objetivo inválido' }));
            return;
        }
    } else if (request.method === 'POST' && request.url === '/goals') {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', () => {
            try {
                const goal: CreateGoalDTO = JSON.parse(body);

                const validation = validateCreateGoal(goal);
                if (!validation.valid) {
                    response.statusCode = 400;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify({ error: `BAD REQUEST: ${validation.message}` }));
                    return;
                }

                response.setHeader('Content-Type', 'application/json');

                const newGoal = {
                    id: goals.length + 1,
                    title: goal.title,
                    status: 'active',
                    current: goal.current,
                    target: goal.target
                };

                goals.push(newGoal);

                response.end(JSON.stringify({
                    message: 'Objetivo criado com sucesso!',
                    goal: newGoal
                }));
            } catch (error) {
                console.error('Erro ao processar o corpo da requisição:', error);
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 400;
                response.end(JSON.stringify({ error: 'BAD REQUEST: Corpo da requisição inválido' }));
            }

        });
    } else if (request.method === 'PATCH' && request.url?.startsWith('/goals/')) {
        response.setHeader('Content-Type', 'application/json');
        const requestParameters = request.url.split('/');
        const idGoal = Number(requestParameters[2]);
        if (!Number.isNaN(idGoal)) {
            const goal = goals.find(g => g.id === idGoal);
            if (!goal) {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: 'Objetivo não encontrado' }));
                return;
            }

            let body = '';

            request.on('data', (chunk) => {
                body += chunk;
            });

            request.on('end', () => {
                try {
                    const data: UpdateGoalDTO = JSON.parse(body);

                    const camposPermitidos = ['title', 'current', 'target', 'status'];

                    for (const key in data) {
                        if (!camposPermitidos.includes(key)) {
                            response.statusCode = 400;
                            response.end(JSON.stringify({ error: `BAD REQUEST: Campo '${key}' não permitido` }));
                            return;
                        }
                    }

                    const validation = validateUpdateGoal(data);
                    if (!validation.valid) {
                        response.statusCode = 400;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify({ error: `BAD REQUEST: ${validation.message}` }));
                        return;
                    } else {
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

                        response.setHeader('Content-Type', 'application/json');
                        response.statusCode = 200;
                        response.end(JSON.stringify({
                            message: 'Objetivo atualizado com sucesso!',
                            goal: goal
                        }));
                    }

                    console.log('Corpo da requisição recebido:', data);
                } catch (error) {
                    console.error('Erro ao processar o corpo da requisição:', error);
                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'BAD REQUEST: Corpo da requisição inválido' }));
                }

            });
            return;
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: 'ID do objetivo inválido' }));
            return;
        }
    } else if (request.method === 'DELETE' && request.url?.startsWith('/goals/')) {
        response.setHeader('Content-Type', 'application/json');
        const requestParameters = request.url.split('/');
        const idGoal = Number(requestParameters[2]);
        if (!Number.isNaN(idGoal)) {
            const goalIndex = goals.findIndex(g => g.id === idGoal);
            if (goalIndex === -1) {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: 'Objetivo não encontrado' }));
                return;
            }

            goals.splice(goalIndex, 1);
            response.end(JSON.stringify({ message: 'Objetivo excluído com sucesso!' }));

            return;
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: 'ID do objetivo inválido' }));
            return;
        }
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }

});

function validateCreateGoal(goal: CreateGoalDTO): { valid: boolean; message?: string } {
    if (!goal.title || typeof goal.title !== 'string') {
        return { valid: false, message: 'Título inválido' };
    }

    if (typeof goal.current !== 'number' || goal.current < 0 || Number.isNaN(goal.current)) {
        return { valid: false, message: 'Valor atual inválido' };
    }

    if (typeof goal.target !== 'number' || goal.target <= 0 || Number.isNaN(goal.target)) {
        return { valid: false, message: 'Valor alvo inválido' };
    }
    return { valid: true };
}

function validateUpdateGoal(goal: UpdateGoalDTO): { valid: boolean; message?: string } {
    if (goal.title !== undefined && (goal.title === "" || typeof goal.title !== 'string')) {
        return { valid: false, message: 'Título inválido' };
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

server.listen(3000);