import { Request, Response, NextFunction } from "express";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'; 
import { StatusCodes } from 'http-status-codes';
//import axios from 'axios';
import { DocumentUtils } from  "../utils/DocumentUtils";
import { ICEP, ICEPData } from "../models/CEP";
 
export class DocumentController {

    public DocumentUtils:DocumentUtils;

    constructor(){
        this.DocumentUtils = new DocumentUtils;
    }


    //  ----     CPF     -----
    isValidCPF = (req:Request<{ id:string }>, res: Response) => {

        const cpf = req.params.id.replace(/\D/g, ''); //limpa a string para digitos
        const isValidCPF = this.DocumentUtils.validateCpf(cpf);

        if (!cpf || !isValidCPF) {
          return res.status(StatusCodes.BAD_REQUEST).send({ 
                status: false,
                message: 'CPF inválido!' 
            });
        }
      
        return res.status(StatusCodes.OK).send({ 
                status: true,
                message: 'CPF válido!' 
            });
    }

    generateCPF = async (req:Request, res: Response) => {

        try {
            const generatedCPF = await this.DocumentUtils.generateCPF();
        
            res.status(StatusCodes.OK).send({
              status: true,
              message: generatedCPF,
            });
          } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).send({
              status: false,
              message: 'Erro ao gerar CPF!',
              error: error.message,
            });
          }
    };


    //  ----     CNPJ     -----
    isValidCNPJ = (req:Request<{ id:string }>, res: Response) => {

        const cnpj = req.params.id.replace(/\D/g, ''); //limpa a string para digitos
        const isValidCPF = this.DocumentUtils.validateCNPJ(cnpj);

        if (!cnpj || !isValidCPF) {
          return res.status(StatusCodes.BAD_REQUEST).send({ 
                status: false,
                message: 'CNPJ inválido!' 
            });
        }
      
        return res.status(StatusCodes.OK).send({ 
                status: true,
                message: 'CNPJ válido!' 
            });
    }

    generateCNPJ = async (req:Request, res: Response) => {

        try {
            const generatedCPF = await this.DocumentUtils.generateCNPJ();
        
            res.status(StatusCodes.OK).send({
              status: true,
              message: generatedCPF,
            });
          } catch (error:any) {
            res.status(StatusCodes.BAD_REQUEST).send({
              status: false,
              message: 'Erro ao gerar CPF!',
              error: error.message,
            });
          }
    };


    //  ----     ENDEREÇOS     -----
    getAdressByCep = async (req:Request<{ id:string }>, res:Response): Promise<any> => {
  
        try {
            const cep = req.params.id.replace(/\D/g, ''); //limpa a string para digitos
            const cepValid = /^[0-9]{8}$/;
            console.log(cep);
            if(!cepValid.test(cep)){
                return res.status(StatusCodes.BAD_REQUEST).send({
                    status: false,
                    message: 'CEP com formato inválido!' 
                });
            }
            
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`,
                {
                    headers: {
                        'Accept-Encoding': 'application/json',
                    }
                }
            );

            const status = response.status;
            const erro = response.data.erro;
                
            if (status !== 200 || erro === true) {
                throw res.status(StatusCodes.BAD_REQUEST).send({
                    status:'false',
                    message: 'Erro na requisição!'
                });
            } 

            const data:ICEPData = response.data;
            return res.status(StatusCodes.OK).send({ data });
        } catch (error) {
            throw res.status(StatusCodes.BAD_REQUEST).send({
                status:'false',
                message: 'Erro na requisição!',
                error: error
            });
        } 
    };

}