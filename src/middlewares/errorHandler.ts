import { Response, Request, NextFunction } from "express";

const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = error;

  res.json({
    success: false,
    message,
  });
};

export default errorHandler;
