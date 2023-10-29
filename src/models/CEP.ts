import { Request, Response, NextFunction } from "express";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'; 
import { StatusCodes } from 'http-status-codes';
//import axios from 'axios';
import { DocumentUtils } from  "../utils/DocumentUtils";

/* 
*PRECISA SER REFATORADO 
*/
export interface ICEP {
    cep: string
}

export interface ICEPData{
            cep: string;
            logradouro:string;
            complemento:string;
            bairro:string;
            localidade:string;
            uf:string;
            ibge:string;
            gia:string;
            ddd:string;
            siafi:string;
}

export class CEP implements ICEPData{

    constructor(
       public cep: string,
       public logradouro:string,
       public complemento:string,
       public bairro:string,
       public localidade:string,
       public uf:string,
       public ibge:string,
       public gia:string,
       public ddd:string,
       public siafi:string,
    ){}

  /*   toCPFInterface(): ICEPData {
        return {
            data:[
                {
                    cep: this.cep,
                    logradouro:this.logradouro,
                    complemento:this.complemento,
                    bairro:this.bairro,
                    localidade:this.localidade,
                    uf:this.uf,
                    ibge:this.ibge,
                    gia:this.gia,
                    ddd:this.ddd,
                    siafi:this.siafi,                
                }
            ]
        }
    } */
}
