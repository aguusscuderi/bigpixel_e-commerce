const nodemailer = require("nodemailer");

interface Usuario {
    id: number
    name: string;
    email: string;
    password: string;
    role: string;
    verified: boolean;
    root: string;
  }

const mail = {
    user: 'bigpixel.software@gmail.com'/*process.env.NODEMAILER_EMAIL*/ ,
    pass: 'kbzl zhdi ntsc bmxn'/*process.env.NODEMAILER_PASSWORD*/ 
}

console.log(mail, 'Este es el MAIL DE ENVIo.')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    rejectUnauthorized: false
  },
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

export const sendEmail = async (email: string, subject: string, htmlPromise: Promise<string>) => {
    try {
        const html = await htmlPromise
        await transporter.sendMail({
            from: `BIGPIXEL <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hello world?", // plain text body
            html // html body
          });  
    } catch (error) {
        console.log(error, 'ERROR AL ENVIAR EMAIL.')
    }   
}

export const getTemplate = async (name: Usuario, token: string) => {
    return `
        <head>

        </head>
        <div>
            <h2> Bienvenido! ${name.name} </h2>
            <p> Para confirmar tu cuenta, hace click en el siguiente link! </p>
            <a href="http://localhost:4040/api/user/confirm/${token}"> Confirmar cuenta. </a>
        </div>
    `
}