import Users from "../models/user";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken
} from "../utils/auth/generateToken";

function isValidPswd(user: { password: string; }, pswd: string){
  return bcrypt.compare(pswd, user.password)
}

const login = async (req: { body: { email: string; password: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: unknown; }): any; new(): any; }; }; json: (arg0: { msg: string; refresh_token: any; access_token: any; user: { name: any; email: any; role: any; root: any; }; }) => void; }) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: {email: email} });
    if (!user) return res.status(400).json({ err: "This user does not exist." });

    //let isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await isValidPswd(user, password)
    console.log(isMatch)
    if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

    const access_token = createAccessToken({ id: user.id });
    const refresh_token = createRefreshToken({ id: user.id });

    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};
