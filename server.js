var nodemailer = require("nodemailer");
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 

var cors = require('cors');
app.use(cors());

var PORT = "3000";

app.post('/send-email', (req, res)=> {
    
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
        user: 'youremail@gmail.com', 
        pass: 'yoursecretpass', 
        },
        tls:{ rejectUnauthorized: false }
    })

    var mailOptions = {
        from: `${req.body.email}` , // sender address
        to: `youremail@gmail.com"`, // list of receivers
        subject:  req.body.subject , // Subject line
        // text: req.body.message, // plain text body
        html: `${req.body.message}<br><br>Remitente del mensaje: '${req.body.email} `, // html body
    }
   
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error.message);
            res.status(401).send(error.message);
        } else {
            console.log('Email enviado');
            res.status(200).json(req.body);
        }
    });

})

app.listen(PORT, function(){
    console.log('Server is running on localhost:' + PORT);
})

      
