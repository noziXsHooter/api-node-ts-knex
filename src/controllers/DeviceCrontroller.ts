import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
//import { UserService } from "../services/DeviceService";

export class DeviceController {
    getDevices = (req: Request, res: Response) => {
        //const deviceService = new DeviceService();
       // const devices = deviceService.getdevices();
     //   res.status(StatusCodes.OK).send(devices);
    }

    getDevice = (req:Request<{ id:string|number }>, res:Response, next:NextFunction) => {
        //const deviceService = new DeviceService();
       // const device = deviceService.getdevice();
     //   res.status(StatusCodes.OK).send(device);
    }

    createDevice = (req:Request, res:Response, next:NextFunction) => {
      //  const deviceService = new DeviceService();
        const device = req.body
       // deviceService.createDevice(device.name, device.email, device.password);
        res.status(StatusCodes.CREATED).send(device) 
    }

    editDevice = (req:Request<{ id:string|number }>, res:Response, next:NextFunction) => {
      //  const deviceService = new deviceService();
        const id = req.params.id
        const modifiedDevice = req.body
        modifiedDevice.id = id
       // deviceService.editDevice(modifiedDevice);
        res.status(StatusCodes.OK).send(modifiedDevice) 
    }

}