const router = require("express").Router();
const { User } = require("../../models");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    console.log(newUser);

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(400).json({ message: "No account found with this email" });
      return;
    }

    const passwordValid = user.checkPassword(req.body.password);

    if (!passwordValid) {
      res.status(400).json({ message: "No account found with this password" });
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.loggedIn = true;

      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    console.log(req.body);
    const profileUpdate = await User.update(req.body, {
      where: { id: req.session.userId },
    });

    res.json(profileUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/email/:user", async (req, res) => {
  //Transporter set what email its coming from
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "never-alone-cares@outlook.com",
      pass: "Neveralone123", //replace with a dotenv
    },
  });

  const emailUser = req.params.user;

  //options for mail
  const mail = {
    from: "never-alone-cares@outlook.com",
    to: emailUser,
    subject: "Thank you for registering",
    text: "Thank You for Registering! We are glad to have you as part of the Never Alone family!",
    html: `<h2>Thank You for Registering!</h2>
    <p>From all of the Never Alone team we would like to give you a big welcome to our platform. Here at Never Alone we are all about putting you
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
});

module.exports = router;
