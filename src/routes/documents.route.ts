import { Request, Response, NextFunction, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import { DocumentController } from "../controllers/DocumentController";
import { DocumentUtils } from  "../utils/DocumentUtils";

const documentsRoute = Router()

const documentController = new DocumentController();

// CPF
documentsRoute.get('/validate-cpf/:id', documentController.isValidCPF)
documentsRoute.get('/generate-cpf', documentController.generateCPF);

//CNPJ
documentsRoute.get('/validate-cnpj/:id', documentController.isValidCNPJ)
documentsRoute.get('/generate-cnpj', documentController.generateCNPJ);

//MOVER ESSA FUNÇÃO PARA UM LUGAR MAIS ADEQUADO
documentsRoute.get('/address-by-cep/:id', documentController.getAdressByCep)


//documentsRoute.post('/documents', documentController.createDocument);

//documentsRoute.put('/documents/:id', documentController.editDocument);

/* documentsRoute.delete('/documents/:id', (req:Request<{ id:string }>, res:Response, next:NextFunction) => {
    const id = req.params.id
    res.status(StatusCodes.OK)
}) */

export default documentsRoute