import { IncomingMessage, ServerResponse } from "http";
import { findAllUsers } from "./user.service";

export function getAllUsersController(request: IncomingMessage, response: ServerResponse): void {
    response.setHeader('Content-Type', 'application/json');
    const users = findAllUsers();
    response.end(JSON.stringify(users));
}
