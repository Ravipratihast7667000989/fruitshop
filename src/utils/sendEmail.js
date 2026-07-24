import nodemailer from "nodemailer";

const sendEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },

    tls: {
      rejectUnauthorized: false
    }

  });


  await transporter.sendMail({

    from: process.env.USER_EMAIL,

    to: email,

    subject: "Fruit App OTP Verification",

    html: `
      <h2>Your OTP is ${otp}</h2>
      <p>Valid for 5 minutes.</p>
    `

  });

};

export default sendEmail;