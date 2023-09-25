import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateBookCreation = [
    body("title").notEmpty().isString(),
    body("author").notEmpty().isString(),
    body("genre").notEmpty().isString(),
    body("numPages").notEmpty().isInt({ min:1 }),
    body("publishedDate").notEmpty().isISO8601().toDate(),
    body("description").optional().isString(),
    body("photo").notEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        next();
    }
];