import { Response } from "express";
import Users from "../models/user";
import bcrypt from "bcrypt";

const register = async (req: { body: { name: string; email: string; password: string; }; }, res: Response<any, Record<string, any>>) => {
    try {
      const { name, email, password } = req.body;
  
      // const errMsg = valid(name, email, password, cf_password);
      // if (errMsg) return res.status(400).json({ err: errMsg });
  
      const user = await Users.findOne({ where: {email: email} });
      if (user) return res.status(400).json({ err: "This email already exists." });
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
  
      await newUser.save();
      res.json({ msg: "Register Success!" });
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  };

  export default register
  