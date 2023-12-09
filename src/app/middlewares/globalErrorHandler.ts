/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong!";



    return res.status(statusCode).json({
        success: false,
        message,
        error
    })
}

export default globalErrorHandler;