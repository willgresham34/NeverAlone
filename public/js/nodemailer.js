const nodemailer = require("nodemailer");

require("dotenv").config();

//Transporter set what email its coming from
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "never-alone-cares@outlook.com",
    pass: process.env.NM_PASSWORD, //replace with a dotenv
  },
});

const registerEmail = (emailUser) => {
  //options for mail
  const mail = {
    from: "never-alone-cares@outlook.com",
    to: emailUser,
    subject: "Thank you for registering",
    text: "Thank You for Registering! We are glad to have you as part of the Never Alone family!",
    html: `<h2>Thank You for Registering!</h2>
    <p>From all of the Never alone team we would like to give you a big welcome to our platform. Here at Never Alone we are all about putting you
    and your mental health first. It is our mission to help those who struggle from all kinds of mental health issues and give you support throughout
    your journey.</p> 
    <h4>Love, </h4>
     <h3> Never Alone ♥ </h3>`,
  };

  transporter.sendMail(mail, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent: " + info.response);
    }
  });
};

module.exports = registerEmail;
