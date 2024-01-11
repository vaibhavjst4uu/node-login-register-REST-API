const nodemailer = require("nodemailer");
require("dotenv").config();
// let path = require('path');
let ejs = require("ejs");
console.log(process.env.user);
console.log(process.env.password);

const transporter = nodemailer.createTransport({
  service: "gmail",
  //   host:"smtp.gmail.com",// use this in case of other service provider gmail take care of every thing
  // PORT:587,
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
});

const sendRegistrationEmail = (userEmail) => {
  // const html = ejs.render('../Views/registrationEmailTemplate', { userName, userEmail });

  const mailOptions = {
    from: {
      name: "Vaibhav Raj",
      address: process.env.user,
    },
    to: userEmail,
    subject: "Welcome to our Website",
    // text: 'Thank you for registering on Your Website. We look forward to having you as a member!',
    html: "<h1>Thank you for registering on our Website. We look forward to having you as a member!</h1>",
    //    html: html,
    // attchments:[
    //     {
    //         filename:'profilepic.jpg', // the file you want to send as attachments
    //         path:`${__dirname}/../public/images/profilepic.jpg` ,// use the path module to access to the path of the file
    //         contentType:"application/pdf"
    //         contentType: "image/jpg"
    //     }
    // ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendRegistrationEmail,
};
