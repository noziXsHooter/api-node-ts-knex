//import { StatusCodes } from 'http-status-codes'
//import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
//import axios from 'axios';
//import { stringify } from 'querystring';
import Bard from 'bard-ai';

class BardService {

  //myBardT = new Bard("dAhKNHKOtDn8ojkGffJLc7SF_vXxnks4LPax6B1Bi13nLGl7C_8s91s7crQlUA8Wz-U-2A."); // Sua chave de API
  cityId = '8814'; // ID da cidade de Leopoldina no ClimaTempo
 // bard = require("bard-ai");  
  
  myBard = new Bard("dAhKNHKOtDn8ojkGffJLc7SF_vXxnks4LPax6B1Bi13nLGl7C_8s91s7crQlUA8Wz-U-2A."); // Sua chave de API

  headers = {
    'Authorization': process.env.CLIMATEMPO_API_KEY, // Se necessário
    'User-Agent': 'leopoldina', 
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
testConnection = async () => {
  try {
    
    const response = this.myBard.ask("O que é o Google Bard?");

    console.log(response); // "Rio de Janeiro"
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}

  promptCall = async (prompt) => {
    try {
        const response = await this.myBard.ask("O que é o Google Bard?");
      // await this.insertData(this.climateMock)
      console.log(response);
      return
    } catch (error) {
      console.error('Ocorreu um erro ao enviar Custom Prompt:', error);
    }
  }



/* 
  insertLocale = async (req: Request, res: Response) => {
    try {
      const body = req.body.localeId;
      const cityId = ClimaTempo.leopoldina;
      const data = stringify({
        'localeId[]': cityId
      });

      const url = this.baseUrl + this.urlLocales;
      const response = await axios.put(url, data, { headers: this.headers })

      if (response.data.status == "success") {
        const localeInfo = await this.getLeopoldinaCurrentWeatherData(cityId)
        console.log(localeInfo);
        await sqliteConnect("weather_data").insert({
          id: localeInfo.id,
          name: localeInfo.name,
          state: localeInfo.state,
          country: localeInfo.country
        })
      }

      console.log('Localidade inserida com sucesso.');
    } catch (error) {
      console.error('Ocorreu um erro ao inserir localidade:', error);
    }
  }

  insertData = async (climateMock: any) => {
    try {

      const dataItem = climateMock.data;
      await sqliteConnect("weather_data_details").insert({
        cod_weather_data: climateMock.id,
        date: dataItem.date ?? null,
        date_br: dataItem.date_br ?? null,
        humidity: dataItem.humidity ?? null,
        pressure: dataItem.pressure ?? null,
        rain_preciptation: dataItem.precipitation ?? null,
        wind_velocity: dataItem.wind_velocity ?? null,
        wind_direction: dataItem.wind_direction ?? null,
        wind_directiondegrees: dataItem.directiondegrees ?? null,
        sensation: dataItem.sensation ?? null,
        condition: dataItem.condition ?? null,
        icon: dataItem.icon ?? null,
        wind_gust: dataItem.gust ?? null,
        temperature: dataItem.temperature ?? null,
      })

      console.log('Dados do registro salvos com sucesso!');

      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  } */

}
module.exports = BardService;
//export default BardService;
