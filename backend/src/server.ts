import { createServer, get } from 'node:http';
import { createGoalController, deleteGoalController, getAllGoalsController, getGoalByIdController, updateGoalController } from './goal.controller';
import { getAllTasksController } from './task.controller';
import { getAllUsersController } from './user.controller';

const server = createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/') {
        response.end('Mutavit API funcionando!');
    } else if (request.method === 'GET' && request.url === '/users') {
        getAllUsersController(request, response);
    } else if (request.method === 'GET' && request.url === '/tasks') {
        getAllTasksController(request, response);
    } else if (request.method === 'GET' && request.url === '/goals') {
        getAllGoalsController(request, response);
    } else if (request.method === 'GET' && request.url?.startsWith('/goals/')) {
        getGoalByIdController(request, response);
    } else if (request.method === 'POST' && request.url === '/goals') {
        createGoalController(request, response);
    } else if (request.method === 'PATCH' && request.url?.startsWith('/goals/')) {
        updateGoalController(request, response);
    } else if (request.method === 'DELETE' && request.url?.startsWith('/goals/')) {
        deleteGoalController(request, response);
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
});

server.listen(3000);