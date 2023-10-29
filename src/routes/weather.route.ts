import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import { WeatherController } from "../controllers/WeatherController";

const weatherRoute = Router()

const weatherController = new WeatherController();

weatherRoute.get('/climatempo', weatherController.getRecords);
weatherRoute.get('/climatempo/leopoldina/now', weatherController.getLeopoldinaCurrentWeatherData);
weatherRoute.get('/climatempo/leopoldina', weatherController.getLeopoldinaWeatherData);

weatherRoute.get('/climatempo/leopoldina/media-semanal', weatherController.getRegisteredLocales);

weatherRoute.get('/climatempo/locais', weatherController.getRegisteredLocales);

weatherRoute.put('/climatempo', weatherController.insertLocale);


/* weatherRoute.get('/ClimaTempo/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({ id }) 
})

weatherRoute.post('/ClimaTempo', weatherController.createUser);

weatherRoute.put('/ClimaTempo/:id', weatherController.editUser);

weatherRoute.delete('/ClimaTempo/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK)
}) */

export default weatherRoute