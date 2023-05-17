import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import { UserService } from "../services/UserService";

export class UserController {
    getUsers = (req: Request, res: Response) => {
        const userService = new UserService();
        const users = userService.getUsers();
        res.status(StatusCodes.OK).send(users);
    }

    getUser = (req:Request<{ id:string|number }>, res:Response, next:NextFunction) => {
        const userService = new UserService();
        const id = req.params.id
        const user = userService.getUser(id);
        res.status(StatusCodes.OK).send(user)
    }

    createUser = (req:Request, res:Response, next:NextFunction) => {
        const userService = new UserService();
        const user = req.body
        userService.createUser(user.name, user.email, user.password);
        res.status(StatusCodes.CREATED).send(user) 
    }

    editUser = (req:Request<{ id:string|number }>, res:Response, next:NextFunction) => {
        const userService = new UserService();
        const id = req.params.id
        const modifiedUser = req.body
        modifiedUser.id = id
        userService.editUser(modifiedUser);
        res.status(StatusCodes.OK).send(modifiedUser) 
    }

}