var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesmodel')


//página principal de novedades
router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });

});


//página agregar novedades
router.get('/agregar', function (req, res, next) {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});


//insertar novedad, procesa lo del formulario
router.post('/agregar', async (req, res, next) => {
    try {
        var titulo = req.body.titulo;
        var autor = req.body.autor;
        var cuerpo = req.body.cuerpo;

        if (titulo != "" && autor != "" && cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades');

        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad'
        })
    }
});

// para eliminar una novedad
router.get('/eliminar/:id', async(req, res, next)=>{
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});




module.exports = router;

