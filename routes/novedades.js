var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesmodel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var mx = await novedadesModel.getNovedadesMX();
  var novedades = await novedadesModel.getNovedadesFechaHora();

  res.render('novedades', {
    mx,
    novedades
  });

});
module.exports = router;