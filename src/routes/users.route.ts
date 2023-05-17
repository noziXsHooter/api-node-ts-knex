import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import { UserController } from "../controllers/UserController";

const usersRoute = Router()

const userController = new UserController();

usersRoute.get('/users', userController.getUsers);

usersRoute.get('/users/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({ id }) 
})

usersRoute.post('/users', userController.createUser);

usersRoute.put('/users/:id', userController.editUser);


usersRoute.delete('/users/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK)
})

export default usersRoute