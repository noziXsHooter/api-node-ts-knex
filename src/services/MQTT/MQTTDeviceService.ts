import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
import axios from 'axios';
import { stringify } from 'querystring';
import { sqliteConnect } from "../../database/index";

interface IMQTTMessage {
  date_time_server: string,
  cod_level: number,
  message_level: string,
  token: string,
  device_id: string,
  message: string,
  payload: string
}

export class MQTTDeviceService {

  insertBrokerDeviceData = async (data: IMQTTMessage) => {
    try {
      const response = await sqliteConnect("devices_data").insert({
        date_time_server: data.date_time_server,
        cod_level: data.cod_level,
        message_level: data.message_level,
        token: data.token,
        device_id: data.device_id,
        message: data.message,
        payload: data.payload
      })

      console.log('Dados do dispositivo foram registrados.');
      return response;
    } catch (error) {
      console.error('Ocorreu um erro ao registrar dados do dispositivo:', error);
    }
  }
}