var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesmodel')


//página principal de novedades
router.get('/', async function (req,res,next) {
 var novedades = await novedadesModel.getNovedades();

   res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario:req.session.nombre, 
        novedades
    });
    
});


//página agregar novedades
router.get('/agregar', function(req,res,nexs){
res.render('admin/agregar',{
    layout:'admin/layout'
});
});





module.exports = router;

