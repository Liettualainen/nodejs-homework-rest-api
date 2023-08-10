const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: "587",
  auth: {
    user: 'jason.abbott@ethereal.email',
    pass: 'Mv6M59etmFGPPgwGQn'
  }
});


const sendEmail = async () => {
  const info = await transporter.sendMail({
    from: "jason.abbott@ethereal.email",
    to: "jason.abbott@ethereal.email",
    subject: "Hello ✔", 
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

transporter.sendMail(sendEmail, (err, info) => {
    if (err) {
        console.log("Mail sending error", err);
    }
    else {
        console.log("mail sendingsuccesfuly", info);
    }
});

module.exports = sendEmail;