import { Response, Request } from "express";
import User from "../models/User.js";

const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  res.json({ token: user?.getJWT() });
};

const signupUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const newUser = await User.create({ email });
  res.send(newUser);
};

export { loginUser, signupUser };
