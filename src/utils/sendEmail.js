import nodemailer from "nodemailer";

const sendEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // 587 ke liye false

    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },

  });


  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Fruit App - OTP Verification",

    html: `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>


<body style="
margin:0;
padding:0;
background:#f4f7f5;
font-family:Arial,Helvetica,sans-serif;
">


<table width="100%" cellspacing="0" cellpadding="0">

<tr>
<td align="center">


<table width="600"
style="
background:white;
margin-top:30px;
border-radius:20px;
overflow:hidden;
box-shadow:0 5px 20px rgba(0,0,0,0.1);
">


<!-- Header -->

<tr>

<td align="center"
style="
background:linear-gradient(135deg,#43a047,#8bc34a);
padding:35px;
">


<img 
src="https://cdn-icons-png.flaticon.com/512/415/415682.png"
width="90"
style="
border-radius:50%;
background:white;
padding:10px;
">


<h1 style="
color:white;
margin:15px 0 0;
font-size:30px;
">
Fruit App
</h1>


<p style="
color:white;
font-size:16px;
">
Fresh Fruits Delivered 🍎🍊🍌
</p>


</td>

</tr>



<!-- Body -->


<tr>

<td style="
padding:40px;
text-align:center;
">


<h2 style="
color:#333;
">
OTP Verification
</h2>


<p style="
font-size:16px;
color:#666;
">
Thank you for registering with Fruit App.
Use the OTP below to verify your email address.
</p>



<div style="
margin:30px auto;
background:#f1f8e9;
border-radius:15px;
padding:20px;
width:220px;
border:2px dashed #4caf50;
">


<h1 style="
letter-spacing:8px;
color:#2e7d32;
font-size:38px;
margin:0;
">
${otp}
</h1>


</div>



<p style="
color:#777;
font-size:14px;
">
⏳ This OTP is valid for <b>5 minutes</b>.
</p>


</td>

</tr>



<!-- Footer -->


<tr>

<td style="
background:#fafafa;
padding:25px;
text-align:center;
">


<p style="
margin:0;
color:#777;
font-size:14px;
">
If you didn't request this OTP, please ignore this email.
</p>


<p style="
margin-top:15px;
color:#43a047;
font-weight:bold;
">
© 2026 Fruit App
</p>


</td>

</tr>



</table>


</td>
</tr>

</table>


</body>

</html>
`

  });

};


export default sendEmail;