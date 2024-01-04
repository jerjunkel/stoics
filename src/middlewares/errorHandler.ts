import { Response, Request, NextFunction } from "express";
import { APIError } from "../utils/appErrors.js";

const errorHandler = async (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
