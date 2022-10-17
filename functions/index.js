const functions = require('firebase-functions')
const nodemailer = require('nodemailer');
const cors = require('cors')({
  origin:'*', 
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
})

const gmailEmail = process.env.REACT_APP_GMAIL;
const gmailPassword = process.env.REACT_APP_PASSWORD

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.submit = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    cors(req, res, () => {
      res.header('Access-Control-Allow-Origin', '*');
      
      const mailOptions = {
        from: req.body.email,
        replyTo: req.body.email,
        to: gmailEmail,
        subject: `${req.body.name} just messaged me from my website`,
        text: req.body.message,
        html: `<p>${req.body.message}</p>`,
      }

      mailTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent');
    });
    })
  }
})