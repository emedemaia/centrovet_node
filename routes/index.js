var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const MailMessage = require('nodemailer/lib/mailer/mail-message');
var contactosModel = require('../models/contactosmodel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


//formulario de contacto
router.post('/', async (req, res, next) => {
  try {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var tel = req.body.tel;
    var dir = req.body.dir;
    var asunto = req.body.asunto;
    var comentario = req.body.comentario;

    // console.log(req.body);

    var obj = {
      from: 'Pruebas Centrovet <pruebas@maia.ar>',
      to: 'pruebas@maia.ar',
      subject: 'Formulario de Contacto de CentroVet',
      html: 'Se ha contactado ' + nombre + ', mail ' + email + ' cuya dirección y teléfono figura a continuación (si es que lo ingresó) ' + tel + dir + ' , por el siguiente asunto: ' + asunto + ', dejando el siguiente comentario: ' + comentario
    };


    var transport = nodemailer.createTransport({
      pool: true,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS //llama a .env y esos datos
      }
    });

    // verify connection configuration
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    var info = await transport.sendMail(obj);

    console.log("sendMail returned!");
    console.log('Email sent: ' + info.response);

    res.render('index', {
      message: true,
    });


    var obj = {
      nombre: req.body.nombre,
      email: req.body.email,
      tel: req.body.tel,
      dir: req.body.dir,
      asunto: req.body.asunto,
      comentario: req.body.comentario
    }
    console.log(obj);
    await contactosModel.insertContactos(obj);
    console.log('cargados contactos a BD');



  } catch (error) {
    console.log("ERROR!!!!!!", error);
    res.render('index', {
      messageError: true,
    });
  }


  // transport.close();



  // res.send('tu mensaje')




});



module.exports = router;
