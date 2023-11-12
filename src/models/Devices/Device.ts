import { Knex } from 'knex';
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from "express";
//import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'; 
import axios from 'axios';
import { stringify } from 'querystring';
import { sqliteConnect } from "../../database/index";
import 'DeviceInterfaces';

export class DeviceModel {
  constructor(
    private knex: Knex,
    private devices: object
    ) {}

  async insertDeviceData(data: DeviceDataRecord): Promise<number | undefined> {
    try {
      const [deviceCod] = await this.knex('device_data').insert(data);
      console.log('Dados do dispositivo ' + deviceCod + ' foram inseridos.');
      return deviceCod;
    } catch (error) {
      throw new Error(`Erro ao registrar dados do dispositivo: ${error}`);
    }
  }

  async createDevice(data: DeviceCreationData): Promise<number | undefined> {
    try {
      const [deviceCod] = await this.knex('devices').insert(data);
      return deviceCod;
    } catch (error) {
      throw new Error(`Erro ao criar o dispositivo: ${error}`);
    }
  }

  async getDeviceByCod(deviceCod: number): Promise<DeviceCreationData | undefined> {
    const device = await this.knex('devices').where('cod', deviceCod).first();

    return device;
  }

  async getAllDevices(): Promise<DeviceCreationData[]> {
    const devices = await this.knex('devices').select('*');
    return devices;
  }

  async updateDevice(deviceCod: number, data: DeviceCreationData): Promise<boolean> {
    try {
      const updatedCount = await this.knex('devices').where('cod', deviceCod).update(data);
      return updatedCount > 0;
    } catch (error) {
      throw new Error(`Erro ao atualizar o dispositivo: ${error}`);
    }
  }

  async deleteDevice(deviceCod: number): Promise<boolean> {
    try {
      const deletedCount = await this.knex('devices').where('cod', deviceCod).del();
      return deletedCount > 0;
    } catch (error) {
      throw new Error(`Erro ao excluir o dispositivo: ${error}`);
    }
  }
}
