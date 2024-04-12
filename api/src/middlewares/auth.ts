import { Response, Request, NextFunction } from "express";
import { APIError, STATUSCODE } from "../utils/appErrors.js";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined)
    return next(
      new APIError("Not authorized to view route", STATUSCODE.UN_AUTHORISED)
    );
  if (!authHeader!.startsWith("Bearer"))
    return next(new APIError("Bad request", STATUSCODE.BAD_REQUEST));

  const token = authHeader?.replace("Bearer", "").trim();

  if (!token) return next(new APIError("Bad request", STATUSCODE.BAD_REQUEST));

  next();
};

export { protect };
