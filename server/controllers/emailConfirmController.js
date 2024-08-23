require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");

// OTP Generator Function
exports.otpGenerator = (length = 6) => {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

// Nodemailer transporter setup
exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for other ports
  auth: {
    user: "john2018bates@gmail.com",
    pass: "mjzd maal sdmp napr",
  },
});

exports.sendMail = async (mailOptions) => {
  try {
    let info = await exports.transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully", info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

exports.sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"Quiz App 👻" <john2018bates@gmail.com>`, // sender address
    to: email, // list of receivers, you should get the email from the request body
    subject: "Your OTP Code", // Subject line
    text: `Your OTP code is: ${otp}`, // plain text body
    html: `<b>Your OTP code is: ${otp}</b>`, // html body
    // Uncomment attachments if needed
    // attachments: [
    //   {
    //     filename: "doc.pdf",
    //     path: path.join(__dirname, "doc.pdf"),
    //     contentType: "application/pdf",
    //   },
    //   {
    //     filename: "image.jpg",
    //     path: path.join(__dirname, "image.jpg"),
    //     contentType: "image/jpg",
    //   },
    // ],
  };

  try {
    const info = await exports.sendMail(mailOptions);
    // res.send(`OTP has been sent: ${info.response}`);
    console.log(otp)
console.log(`OTP has been sent: ${info.response}`)
  } catch (error) {
    // res.status(500).send('Error sending email');
    console.log('Error sending email')
  }
};
