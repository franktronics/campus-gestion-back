const nodemailer = require('nodemailer');
require('dotenv').config({path: '.env'})

exports.sendMail = (email, code) => {
    var transporter = nodemailer.createTransport({
        /*host: 'smtp.mailtrap.io',
        port: 2525,  //25,
        // secure: false,
        //service: 'gmail',
        auth: {
          user: '1cfb0234f9244c',
          pass: '523eddbbb3cea9'
        },
        tls: {
          rejectUnauthorized: false
        },*/
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })
    var mailOptions = {
        from: 'campusgestion237@gmail.com', 
        to: email + '', 
        subject: "Code de validation CampusGestion", 
        text: code + ''
    }

    return new Promise((resolve, reject) => {
        /*transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject('Probleme lors de l\'envoi du mail')
            } else {
                console.log('Email sent: ' + info.response);
                resolve('Email sent: ' + info.response)
            }
        })*/
        resolve('mail sended')
    })
}


 
