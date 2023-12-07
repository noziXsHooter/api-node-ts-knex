import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import { sqliteConnect } from "../database/index";
import { DeviceModel } from "../models/Devices/Device";

export class DeviceController {
  getDevices = async (req: Request, res: Response) => {
    const deviceModel = new DeviceModel();
    const devices = await deviceModel.getAllDevices();
    //const devices = await sqliteConnect('devices').select('*');
    console.log(devices);
    res.status(StatusCodes.OK).send(devices);
  }

  getDevice = (req: Request<{ id: string | number }>, res: Response, next: NextFunction) => {
    //const deviceService = new DeviceService();
    // const device = deviceService.getdevice();
    //   res.status(StatusCodes.OK).send(device);
  }

  createDevice = (req: Request, res: Response, next: NextFunction) => {
    const deviceModel = new DeviceModel();
    const device = req.body
   // console.log(device);
    deviceModel.createDevice(device);
    res.status(StatusCodes.CREATED).send(device)
  }

  editDevice = (req: Request<{ id: string | number }>, res: Response, next: NextFunction) => {
    //  const deviceService = new deviceService();
    const id = req.params.id
    const modifiedDevice = req.body
    modifiedDevice.id = id
    // deviceService.editDevice(modifiedDevice);
    res.status(StatusCodes.OK).send(modifiedDevice)
  }

  deleteDevice = (req: Request<{ id: string | number }>, res: Response, next: NextFunction) => {
    const deviceModel = new DeviceModel();
    const id = req.params.id
    const result = deviceModel.deleteDevice(id);

    if(!result) res.status(StatusCodes.OK).send('Nenhum dispostivo foi deletado');

    res.status(StatusCodes.OK).send('Dispositivo deletado com sucesso');
  }

}