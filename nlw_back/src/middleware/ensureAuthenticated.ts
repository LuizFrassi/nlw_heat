import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid",
        });
    }

    // Bearer 468432168416546516asda6edf46acae6
    // [0] Bearer
    // [1] 468432168416546516asda6edf46acae6
    const [, token] = authToken.split(" ")
    //console.log(token)


    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

        request.user_id = sub

        return next();

    } catch (err) {
        return response.status(401).json({ errorCode: "token.expired" })
    }
}