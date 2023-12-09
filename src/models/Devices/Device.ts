import { Knex } from 'knex';
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
import axios from 'axios';
import { stringify } from 'querystring';
import { sqliteConnect } from "../../database/index";
//import 'DeviceInterfaces';

export class DeviceModel {
  constructor(
    private knex?: Knex,
    private devices?: IDevice[]
    ) {}


  //TABLE DEVICES_DATA
  async insertDeviceData(data: DeviceDataRecord): Promise<number | undefined> {
    try {
      const [deviceCod] = await sqliteConnect("devices_data").insert({data});

      console.log('Dados do dispositivo ' + deviceCod + ' foram inseridos.');
      return deviceCod;
    } catch (error) {
      throw new Error(`Erro ao registrar dados do dispositivo: ${error}`);
    }
  }

  //TABLE DEVICES
  async createDevice(data: IDevice): Promise<any> {
    try {
      console.log(data);
      const [deviceCod] = await sqliteConnect("devices").insert(data);
      return deviceCod;
    } catch (error) {
      throw new Error(`Erro ao criar o dispositivo: ${error}`);
    }
  }
  
  async updateState(data: IDevice): Promise<any> {
    try {
      console.log(data);
      const updatedCount = await sqliteConnect('devices').where('device_id', data.device_id).update({ state: data.state });
      return updatedCount > 0;
    } catch (error) {
      throw new Error(`Erro ao criar o dispositivo: ${error}`);
    }
  }

  async getDeviceByCod(deviceCod: number): Promise<IDevice | undefined> {
    const device = await sqliteConnect('devices').where('cod', deviceCod).first();
    return device;
  }
  
  async getAllDevices(): Promise<any> {
    try {
      const devices = await sqliteConnect('devices').select('*');
     // console.log(devices);
      return devices;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async updateDevice(deviceCod: number, data: IDevice): Promise<boolean> {
    try {
      const updatedCount = await sqliteConnect('devices').where('cod', deviceCod).update(data);
      return updatedCount > 0;
    } catch (error) {
      throw new Error(`Erro ao atualizar o dispositivo: ${error}`);
    }
  }

  async deleteDevice(deviceCod: string|number): Promise<boolean> {
    try {
      const deletedCount = await sqliteConnect('devices').where('cod', deviceCod).del();

      const deleted = deletedCount > 0;

      if(!deleted){
        console.log('Nenhum dispostivo foi deletado');
        return false;
      }
      
      console.log('Dispositivo deletado com sucesso');
      return true; 
      
    } catch (error) {
      throw new Error(`Erro ao excluir o dispositivo: ${error}`);
    }
  }

}
