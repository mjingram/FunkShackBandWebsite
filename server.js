const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const favicon = require('serve-favicon');
const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get("/", (req, res)=>{

  res.render("index");

})

app.get("/listen", (req, res)=>{

  res.render("listen");

})


app.get("/contact", (req, res)=>{

  res.render("contact");

})

app.post('/contact', (req,res)=>{
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funkshackband@gmail.com",
      pass: "phishsticks"
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: "funkshackband@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.send('error');
    }else{
      console.log("Email sent: " + info.response);
      res.send('success');
    }
  })
});

app.listen(PORT, ()=>{
  console.log(`Server is runnning on port ${PORT}`);
})
