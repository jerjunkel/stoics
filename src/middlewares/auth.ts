import { Response, Request, NextFunction } from "express";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined)
    return next(new Error("Not authorized to view route"));
  if (!authHeader!.startsWith("Bearer")) return next(new Error("Bad request"));

  const token = authHeader?.replace("Bearer", "").trim();

  next();
};

export { protect };
