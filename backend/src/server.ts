import { createServer } from 'node:http';
import { type CreateGoalDTO } from './types';

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
    } else if (request.method === 'GET' && request.url === '/goals') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(goals));
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
                    response.end(`BAD REQUEST: ${validation.message}`);
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
                console.log('Novo objetivo criado:', newGoal);
                console.log('Objetivos atuais:', goals);
                response.end(JSON.stringify({
                    message: 'Objetivo criado com sucesso!',
                    goal
                }));
            } catch (error) {
                console.error('Erro ao processar o corpo da requisição:', error);
                response.statusCode = 400;
                response.end('BAD REQUEST: Corpo da requisição inválido');
            }

        });
    }
    else {
        response.statusCode = 404;
        response.end('Rota não encontrada');
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

server.listen(3000);