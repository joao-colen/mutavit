import { type IncomingMessage, type ServerResponse } from "node:http";
import { validateCreateGoal, createGoal, findGoalById, updateGoal, validateUpdateGoal, findGoalIndex, deleteGoal, findAllGoals } from "./goal.service";
import { UpdateGoalDTO, type CreateGoalDTO } from "./types";

export function createGoalController(request: IncomingMessage, response: ServerResponse): void {
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

            const newGoal = createGoal(goal);
            response.statusCode = 201;

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
}

export function getAllGoalsController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const goals = findAllGoals();
    response.end(JSON.stringify(goals));
}

export function getGoalByIdController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const requestParameters = request.url?.split('/');
    const idGoal = Number(requestParameters?.[2]);
    if (Number.isNaN(idGoal)) {
        response.statusCode = 400;
        response.end(JSON.stringify({ error: 'ID do objetivo inválido' }));
        return;
    }

    const goal = findGoalById(idGoal);

    if (!goal) {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Objetivo não encontrado' }));
        return;
    }

    response.end(JSON.stringify(goal));
}

export function updateGoalController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const requestParameters = request.url?.split('/');
    const idGoal = Number(requestParameters?.[2]);
    if (!Number.isNaN(idGoal)) {
        const goal = findGoalById(idGoal);
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

                const camposPermitidos = ['title', 'current', 'target', 'status', 'description'];

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
                }

                const updatedGoal = updateGoal(goal, data);

                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: 'Objetivo atualizado com sucesso!',
                    goal: updatedGoal
                }));

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

}

export function deleteGoalController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const requestParameters = request.url?.split('/');
    const idGoal = Number(requestParameters?.[2]);
    if (Number.isNaN(idGoal)) {
        response.statusCode = 400;
        response.end(JSON.stringify({ error: 'ID do objetivo inválido' }));
        return;
    }

    const goalIndex = findGoalIndex(idGoal);

    if (goalIndex === -1) {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Objetivo não encontrado' }));
        return;
    }

    deleteGoal(goalIndex);

    response.end(JSON.stringify({ message: 'Objetivo excluído com sucesso!' }));
}