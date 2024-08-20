const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config(); // To load environment variables from a .env file

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for other ports
  auth: {
    user: "john2018bates@gmail.com", // Use environment variables for sensitive data
    pass: "xbetsyqswzpawnch",
  },
});

const mailOptions = {
  from: `"Quiz App 👻" <john2018bates@gmail.com>`, // sender address
  to: " haidarymahdi321@gmail.com", // list of receivers
  subject: "Testing sending mail with nodemailer ✔", // Subject line
  text: "Testing the nodemialer", // plain text body
  html: "<b>Hello world?</b>", // html body
  attachments: [
    {
      filename: "doc.pdf",
      path: path.join(__dirname, "doc.pdf"),
      contentType: "application/pdf",
    },
    {
      filename: "image.jpg",
      path: path.join(__dirname, "image.jpg"),
      contentType: "image/jpg",
    },
  ],
};

const sendMail = async (transporter, mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendMail(transporter, mailOptions);


