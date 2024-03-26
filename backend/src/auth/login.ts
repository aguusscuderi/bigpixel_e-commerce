import { Response } from 'express';
import Users from "../models/user";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken
} from "../service/auth/generateToken.service";

function isValidPswd(user: { password: string; }, pswd: string){
  return bcrypt.compare(pswd, user.password)
}

const login = async (req: { body: { email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: {email: email} });
    if (!user) return res.status(400).json({ err: "This user does not exist." });

    const isMatch = await isValidPswd(user.dataValues, password)
    if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

    const access_token = createAccessToken({ id: user.dataValues.id.toString() });
    const refresh_token = createRefreshToken({ id: user.dataValues.id.toString() });

    console.log('MI TOKEN: ', access_token)
  
    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        name: user.dataValues.name,
        email: user.dataValues.email,
        role: user.dataValues.role,
        root: user.dataValues.root,
      },
    });
  } catch (err) {
    return res.status(500).json({error: err});
  }
};

export default login