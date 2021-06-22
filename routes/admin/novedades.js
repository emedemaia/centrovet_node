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

//novedades ascendente
router.get('/asc', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedadesAsc();

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



// para subir la novedad por id a la página de modificar
router.get('/modificar/:id', async(req, res, next)=>{
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar',{
        layout: 'admin/layout',
        novedad
    })
    
});

// para realizar el update mediante post a la BD
router.post('/modificar', async(req, res, next)=>{
    try{
var obj ={
    titulo: req.body.titulo,
    autor: req.body.autor,
    cuerpo: req.body.cuerpo,
}
await novedadesModel.modificarNovedadById(obj, req.body.id);
res.redirect('/admin/novedades');

console.log(obj);

    }catch(error){
        console.log(error);
        res.render('admin/modificar',{
            layout:'admin/layout',
            error: true,
            message: 'La novedad no pudo ser actualizada. Intente nuevamente.'
        })
    }
});


//para imprimir las novedades en el front

module.exports = router;

