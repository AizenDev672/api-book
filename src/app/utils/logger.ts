import { Request, Response, NextFunction } from "express";
import winston from "winston";

// Configura el logger
const logger = winston.createLogger({
    level: "info", // Nivel de registro predeterminado
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports:[
        new winston.transports.Console(), // Registros a la consola
        new winston.transports.File({ filename: "api.log" })
    ]
});

// middleware de registro de solicitudes
export const requestLogger = (req: any, res: any, next: any) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
};

// middleware de registro de errores
export const errorlogger =  (err: any, req: any, res: any, next: any) => {
    logger.error(err.stack);
    next(err);
};

export const corsLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log("Solicitud CORS recibida:");
    console.log(`Origen: ${req.headers.origin}`);
    console.log(`Metodo: ${req.method}`);
    console.log(`Cabeceras: ${req.headers['Access-control-request-headers']}`);

    next();
};

export default logger;