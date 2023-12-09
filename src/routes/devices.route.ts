import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import { DeviceController } from "../controllers/DeviceCrontroller";

const devicesRoute = Router()

const deviceController = new DeviceController();

devicesRoute.get('/devices', deviceController.getDevices);

devicesRoute.get('/devices/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({ id }) 
})

devicesRoute.post('/devices', deviceController.createDevice);

devicesRoute.put('/devices/update-state', deviceController.updateState);

devicesRoute.put('/devices/:id', deviceController.editDevice);

devicesRoute.delete('/devices/:id', deviceController.deleteDevice);

export default devicesRoute