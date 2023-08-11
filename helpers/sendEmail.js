const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (info) => {
  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: "587",
  auth: {
    user: 'jason.abbott@ethereal.email',
    pass: 'Mv6M59etmFGPPgwGQn'
  }
});
  // const info ={
  //   from: "jason.abbott@ethereal.email",
  //   to: "jason.abbott@ethereal.email",
  //   subject: "Hello ✔", 
  //   text: "Hello world?",
  //   html: "<b>Hello world?</b>",
  // };
    
    const result = await transporter.sendMail(info);
    console.log("Email sended");
    return result;
  }
  catch(err) {  
        console.log("Mail sending error", err);
    }
};

module.exports = sendEmail;