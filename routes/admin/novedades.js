var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesmodel')
var multer = require('multer');
// const fs = require('fs');

var storage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });


//página principal de novedades y BUSCADOR
router.get('/', async function (req, res, next) {

    if (req.query.q === undefined) {
        novedades = await novedadesModel.getNovedades();
    } else {
        novedades = await novedadesModel.buscarNovedades(req.query.q);
    }

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        is_search: req.query.q !== undefined,
        q: req.query.q

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
        layout: 'admin/layout',
    });
});


//insertar novedad, procesa lo del formulario
router.post('/agregar', upload.single('images'), async (req, res, next) => {
    try {
        var titulo = req.body.titulo;
        var autor = req.body.autor;
        var cuerpo = req.body.cuerpo;
        var etiquetas = req.body.etiquetas;


        console.log(req.file.path, req.file.filename)

        if (titulo != "" && autor != "" && cuerpo != "" && etiquetas != "") {


            var obj = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                cuerpo: req.body.cuerpo,
                etiquetas: req.body.etiquetas,
                imagenes: req.file.path,
                filename: req.file.filename
            }
            await novedadesModel.insertNovedad(obj);
            console.log(obj, 'cargado a BD');

            res.redirect('/admin/novedades');
            console.log('redirect to admin')


        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos (excepto imágenes) son requeridos'
            });
        }

    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true

        })

    }

});



// para eliminar una novedad
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});



// para subir la novedad por id a la página de modificar
router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad,
        previewModif: true
    })

});



// para realizar el update mediante post a la BD
router.post('/modificar', upload.single('images'), async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            autor: req.body.autor,
            cuerpo: req.body.cuerpo,
            etiquetas: req.body.etiquetas,
            imagenes: req.file.path,
            filename: req.file.filename
        }


        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');

        console.log(obj);

    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'La novedad no pudo ser actualizada. Intente nuevamente.'
        })
    }
});



// para previsualizar la novedad
router.get('/preview/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    var mx = await novedadesModel.getNovedadesMX();


    res.render('admin/preview', {
        layout: 'admin/layout',
        mx,
        novedad



    })

});

//para listar las fotos de la carpeta upload


//     var filenames = fs.readdirSync('../images/uploads')

// console.log("\nCurrent directory filenames:");
// filenames.forEach(file => {
//     console.log(file);
//   });

module.exports = router;

