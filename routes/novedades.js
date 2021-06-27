var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesmodel');

/* GET home page. */
router.get('/', async function (req, res, next) {


  if (req.query.q === undefined){
    var mx = await novedadesModel.getNovedadesMX();
  var novedades = await novedadesModel.getNovedadesFechaHora();
  
  }else{
    var mx = await novedadesModel.getNovedadesMX();
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  res.render('novedades', {
    mx,
    novedades,
    is_search: req.query.q !== undefined,
          q:req.query.q
  });

});
module.exports = router;


//página principal de novedades y BUSCADOR
// router.get('/', async function (req, res, next) {
   

//   if (req.query.q === undefined){
//       novedades = await novedadesModel.getNovedades();
//   }else{
//       novedades = await novedadesModel.buscarNovedades(req.query.q);
//   }
  
//       res.render('admin/novedades', {
//           layout: 'admin/layout',
//           usuario: req.session.nombre,
//           novedades,
//           is_search: req.query.q !== undefined,
//           q:req.query.q
          
//       });
  
//   });