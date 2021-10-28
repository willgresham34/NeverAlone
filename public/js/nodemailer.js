const nodemailer = require("nodemailer");

// require('dotenv').config();

//Transporter set what email its coming from
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "never-alone-cares@outlook.com",
    pass: "Neveralone123", //replace with a dotenv
  },
});

var mailList = ["willgresham34@gmail.com", "jeodom17@gmail.com"];

//options is where the email is going to and its subject line
const options = {
  from: "never-alone-cares@outlook.com",
  to: mailList, //insert the users email with a variables
  subject: "Thank you for registering",
  text: "Thank You for Registering!",
  html: `<h2>Thank You for Registering!</h2>
  <p>From all of the Never alone team we would like to give you a big welcome to our platform. Here at Never Alone we are all about putting you
  and your mental health first. It is our mission to help those who struggle from all kinds of mental health issues and give you support throughout
  your journey.</p> 
  <h4>Love, </h4>
   <h3> Never Alone ♥ </h3>`,
};

transporter.sendMail(options, function (err, info) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Sent: " + info.response);
});

module.exports = registerEmail;
