import { createServer } from 'node:http';

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
    }
    else {
        response.statusCode = 404;
        response.end('Rota não encontrada');
    }
});

server.listen(3000);