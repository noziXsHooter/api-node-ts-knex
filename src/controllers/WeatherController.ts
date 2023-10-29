import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import { ClimaTempoService } from "../services/Weather/ClimaTempoService";

export class WeatherController {

    public climaTempoService = new ClimaTempoService();

    getRecords = async(req: Request, res: Response) => {
        const records = await this.climaTempoService.getLeopoldinaWeatherData();
        res.status(StatusCodes.OK).send(records);
    }

    getLeopoldinaCurrentWeatherData = async(req: Request, res: Response) => {
         const records = await this.climaTempoService.getLeopoldinaCurrentWeatherData(ClimaTempoService.leopoldina);
         res.status(StatusCodes.OK).send(records);
     }

    getLeopoldinaWeatherData = async(req: Request, res: Response) => {
         const records = await this.climaTempoService.getLeopoldinaWeatherData();
         res.status(StatusCodes.OK).send(records);
     }

    getRegisteredLocales = async(req: Request, res: Response) => {
        const records = await this.climaTempoService.getRegisteredLocales();
        res.status(StatusCodes.OK).send(records);
    }

    async getThisWeekLocaleAverage(req:Request<{ id:string|number }>, res:Response, next:NextFunction){
     //   const records = await this.climaTempoService.getThisWeekLocaleAverage(ClimaTempoService.leopoldina);
      //  res.status(StatusCodes.OK).send(records);
    }


    insertLocale = async(req: Request, res: Response) => {
        const records = await this.climaTempoService.insertLocale(req, res);
        res.status(StatusCodes.CREATED).send(records);
    }
/* 
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
    } */

}