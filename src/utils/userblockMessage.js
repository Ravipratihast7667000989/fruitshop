import nodemailer from "nodemailer";


const sendBlockEmail = async(options)=>{


const transporter = nodemailer.createTransport({

service:"gmail",

  auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },

});



await transporter.sendMail({

from:process.env.EMAIL_USER,

to:options.email,

subject:options.subject,

html:options.message

});


};


export default sendBlockEmail;