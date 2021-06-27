var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//formulario de contacto
router.post('/', async (req, res, next)=> {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var dir = req.body.dir;
  var asunto = req.body.asunto;
  var comentario = req.body.comentario;

  // console.log(req.body);

  var obj = {
    from:'CentroVet Website',
    to:'maiaineselias@gmail.com',
    subject:'Formulario de Contacto de CentroVet',
    html:'Se ha contactado ' + nombre + ', mail ' + email + ' cuya dirección y teléfono figura a continuación (si es que lo ingresó) ' + tel + dir + ' , por el siguiente asunto: ' + asunto + ', dejando el siguiente comentario: ' + comentario 
  };


  var transport = nodemailer.createTransport ({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS //llama a .env y esos datos
    }
  });

  var info = await transport.sendMail(obj);

  transport.sendMail(obj, function (error) {
    console.log("sendMail returned!");
    if (error) {
      console.log("ERROR!!!!!!", error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('index',{
    message:true,
  });

  // res.send('tu mensaje')

 


});



module.exports = router;
