// import User from "../models/User.js";

// // Block User
// export const blockUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndUpdate(
//       id,
//       { isBlocked: true },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User blocked successfully",
//       data: user,
//     });

//     // Send Email

//     await sendEmail({

//       email: user.email,

//       subject: "Your Account Has Been Blocked",

//       message: `

// <h2>Hello ${user.name}</h2>

// <p>
// Your account has been temporarily blocked by admin.
// </p>

// <p>
// Please contact support for more information.
// </p>

// `

//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Unblock User
// export const unblockUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByIdAndUpdate(
//       id,
//       { isBlocked: false },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User unblocked successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import User from "../models/User.js";
import sendBlockEmail from "../utils/userblockMessage.js";

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -otp -otpExpiry -otpSentAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// Block User
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
        blockedAt: new Date(),
      },
      {
        new: true,
      }
    ).select("-password");


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Send Block Email Automatically
    await sendBlockEmail({

      email: user.email,

      subject: "⚠️ Your Fresh Fruits Account Has Been Temporarily Blocked",

      message: `

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
</head>


<body style="
margin:0;
padding:0;
background:#fef2f2;
font-family:Arial,Helvetica,sans-serif;
">


<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center">


<table width="600"
cellpadding="0"
cellspacing="0"

style="
background:#ffffff;
border-radius:20px;
overflow:hidden;
margin:30px auto;
box-shadow:0 8px 25px rgba(0,0,0,0.12);
">


<!-- HEADER -->

<tr>

<td align="center"

style="
background:linear-gradient(135deg,#dc2626,#f97316);
padding:35px 20px;
">


<img

src="YOUR_CLOUDINARY_FRUIT_APP_LOGO_URL"

width="100"

height="100"

style="
border-radius:50%;
background:white;
padding:10px;
border:4px solid #fee2e2;
"
/>



<h1 style="
color:white;
font-size:26px;
margin:20px 0 8px;
">

🍎 Fresh Fruits Store

</h1>



<p style="
color:#ffedd5;
font-size:15px;
margin:0;
">

Healthy Food • Fresh Delivery • Trusted Service

</p>


</td>

</tr>





<!-- CONTENT -->

<tr>

<td style="
padding:35px;
color:#374151;
">


<h2 style="
color:#dc2626;
font-size:23px;
">

Hello ${user.fullName} 👋

</h2>



<p style="
font-size:16px;
line-height:1.8;
">

We want to inform you that your 
<strong style="color:#dc2626;">
Fresh Fruits Store account
</strong>
has been temporarily blocked by our admin team.

</p>




<table width="100%"

style="
background:#fef2f2;
border-left:5px solid #dc2626;
border-radius:10px;
padding:20px;
margin:25px 0;
">


<tr>

<td>


<p style="
margin:0;
font-size:15px;
color:#991b1b;
line-height:1.8;
">


🚫 Account Status :
<strong>Blocked</strong>


<br><br>


🔒 Login Access :
<strong>Temporarily Disabled</strong>


<br><br>


🍓 Reason :
Please contact support for more information.


</p>


</td>

</tr>


</table>





<div align="center">


<a href="https://yourfruitapp.com/support"

style="
background:#dc2626;
color:white;
padding:14px 38px;
border-radius:30px;
text-decoration:none;
font-size:16px;
font-weight:bold;
display:inline-block;
">

📞 Contact Support

</a>


</div>






<p style="
margin-top:30px;
font-size:14px;
color:#6b7280;
line-height:1.7;
">


Your account access will be restored after admin verification.

If you believe this was a mistake, please contact our support team.


</p>



</td>

</tr>






<!-- FOOTER -->


<tr>

<td align="center"

style="
background:#14532d;
padding:25px;
color:white;
font-size:13px;
">


<h3 style="
margin:0 0 10px;
color:#bbf7d0;
">

🍏 Fresh Fruits Store

</h3>



<p style="
margin:5px;
color:#dcfce7;
">

Fresh Fruits | Fast Delivery | Healthy Lifestyle

</p>



<p style="
margin-top:12px;
color:#dcfce7;
">

© 2026 Fresh Fruits Store. All Rights Reserved.

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


    res.status(200).json({
      success: true,
      message: "User blocked and email sent successfully",
      data: user,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// Unblock User
export const unblockUser = async (req, res) => {
  try {

    const { id } = req.params;


    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
        blockedAt: null,
      },
      {
        new: true,
      }
    ).select("-password");



    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }



    // Send Unblock Email Automatically

    await await sendBlockEmail({

      email: user.email,

      subject: "🍎 Welcome Back! Your Fruit App Account is Active",

      message: `

<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
</head>


<body style="
margin:0;
padding:0;
background:#f0fdf4;
font-family:Arial,Helvetica,sans-serif;
">


<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center">


<table width="600"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:20px;
overflow:hidden;
margin:30px auto;
box-shadow:0 8px 25px rgba(0,0,0,0.10);
">


<!-- HEADER -->

<tr>

<td align="center"

style="
background:linear-gradient(135deg,#15803d,#4ade80);
padding:35px 20px;
">


<img

src="YOUR_CLOUDINARY_FRUIT_APP_LOGO_URL"

width="100"

height="100"

style="
border-radius:50%;
background:white;
padding:10px;
border:4px solid #dcfce7;
"
/>



<h1 style="
color:white;
font-size:28px;
margin:18px 0 5px;
">

🍏 Fresh Fruits Store

</h1>



<p style="
color:#dcfce7;
font-size:16px;
margin:0;
">

Fresh • Healthy • Delivered To Your Door

</p>


</td>

</tr>





<!-- CONTENT -->

<tr>

<td style="
padding:35px;
color:#374151;
">


<h2 style="
color:#15803d;
font-size:24px;
">

Hello ${user.fullName} 👋

</h2>



<p style="
font-size:16px;
line-height:1.8;
">

Great news! 🎉

Your account has been 
<strong style="color:#16a34a;">
successfully unblocked
</strong>
and is now active.

</p>




<table width="100%"

style="
background:#f0fdf4;
border-radius:12px;
padding:20px;
margin:25px 0;
">


<tr>

<td>


<p style="
font-size:15px;
color:#166534;
line-height:1.8;
margin:0;
">

🍎 Account Status :
<strong>Active</strong>

<br>

🥭 Shopping :
<strong>Available</strong>

<br>

🍊 Fresh Fruits :
<strong>Ready To Order</strong>

</p>


</td>

</tr>


</table>





<div align="center">


<a href="https://yourfruitapp.com/login"

style="
background:#16a34a;
color:white;
padding:15px 40px;
border-radius:30px;
text-decoration:none;
font-weight:bold;
font-size:16px;
display:inline-block;
">

🛒 Start Shopping

</a>


</div>






<p style="
margin-top:30px;
font-size:14px;
color:#6b7280;
line-height:1.6;
">

Enjoy fresh fruits, vegetables and healthy products delivered directly to your home.

</p>



<p style="
font-size:14px;
color:#6b7280;
">

If you did not request this action, please contact our support team.

</p>



</td>

</tr>





<!-- FOOTER -->

<tr>

<td align="center"

style="
background:#14532d;
padding:25px;
color:white;
font-size:13px;
">


<h3 style="
margin:0 0 10px;
color:#bbf7d0;
">

🍓 Fresh Fruits Store

</h3>



<p style="
margin:5px;
">

Healthy Food | Fast Delivery | Quality Products

</p>



<p style="
margin:10px 0 0;
color:#dcfce7;
">

© 2026 Fresh Fruits Store. All Rights Reserved.

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



    res.status(200).json({

      success: true,

      message: "User unblocked and email sent successfully",

      data: user

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message

    });


  }
};