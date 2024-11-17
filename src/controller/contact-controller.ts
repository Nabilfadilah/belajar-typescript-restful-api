import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateContactRequest, UpdateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { logger } from "../application/logging";

export class ContactController {

    // create
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : CreateContactRequest = req.body as CreateContactRequest;
            const response = await ContactService.create(req.user!, request);
            logger.debug("response : " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    
    // get 
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId);

            const response = await ContactService.get(req.user!, contactId);
            logger.debug("response : " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    // update 
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : UpdateContactRequest = req.body as UpdateContactRequest;
            
            // contact id
            request.id  = Number(req.params.contactId);

            const response = await ContactService.create(req.user!, request);
            logger.debug("response : " + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}