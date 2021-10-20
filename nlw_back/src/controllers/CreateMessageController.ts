import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageServices";


class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { message } = request.body;
        const { user_id } = request;

        const service = new CreateMessageService();
        //console.log("TESTE 3")

        const result = await service.execute(message, user_id);
        //console.log("TESTE 4")

        return response.json(result);
    }
}

export { CreateMessageController };