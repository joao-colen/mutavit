import { IncomingMessage, ServerResponse } from "http";
import { findAllTasks } from "./task.service";


export function getAllTasksController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const tasks = findAllTasks();
    response.end(JSON.stringify(tasks));
}