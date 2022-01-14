import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
// camada de infraestrutura, camada externa em que o usuário se comunica

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                password
            })

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}