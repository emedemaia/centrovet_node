var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesmodel')
var multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: './public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });


//página principal de novedades y BUSCADOR. por defecto novedades descendente
router.get('/', async function (req, res, next) {

    if (req.query.q === undefined) {
        mx = await novedadesModel.getNovedadesMX();
        novedades = await novedadesModel.getNovedadesFechaHora();
    } else {
        mx = await novedadesModel.getNovedadesMX();
        novedades = await novedadesModel.buscarNovedades(req.query.q);
    }

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        mx,
        novedades,
        navbar: true,
        search: true,
        orderDesc: true,
        cross_search: req.query.q !== undefined,
        is_search: req.query.q !== undefined,
        q: req.query.q

    });

});

//novedades ascendente
router.get('/asc', async function (req, res, next) {
    var mx = await novedadesModel.getNovedadesMX();
    var novedades = await novedadesModel.getNovedadesFechaHoraIdAsc();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        searchorder: true,
        navbar: true,
        mx,
        novedades,
        orderAsc: true,
    });

});


//novedades ordenadas por fechahora ascendente y desdendente
router.get('/fhasc', async function (req, res, next) {
    var mx = await novedadesModel.getNovedadesMX();
    var novedades = await novedadesModel.getNovedadesFechaHoraAsc();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        searchorder: true,
        navbar: true,
        mx,
        novedades,
        orderAsc: true,
    });

});

router.get('/fhdesc', async function (req, res, next) {
    var mx = await novedadesModel.getNovedadesMX();
    var novedades = await novedadesModel.getNovedadesFechaHoraDesc();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        searchorder: true,
        navbar: true,
        mx,
        novedades,
        orderDesc: true,
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
        var imagenes = req.body.imagenes;


        // console.log(imagenes)

        if (titulo != "" && autor != "" && cuerpo != "" && etiquetas != "" && imagenes != "") {


            var obj = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                cuerpo: req.body.cuerpo,
                etiquetas: req.body.etiquetas,
                imagenes: '<img src="images/uploads/' + req.file.filename + '"/>',
                filename: req.file.filename
            }

            console.log(req.file.path, req.file.filename)

            await novedadesModel.insertNovedad(obj);
            console.log(obj, 'cargado a BD');

            res.redirect('/admin/novedades');
            console.log('redirect to admin')


        }

        else {

            if (titulo != "" && autor != "" && cuerpo != "" && etiquetas != "" && imagenes == "") {


                var obj = {
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    cuerpo: req.body.cuerpo,
                    etiquetas: req.body.etiquetas,
                    imagenes: '',
                    filename: ''

                }
                await novedadesModel.insertNovedad(obj);
                console.log(obj, 'cargado a BD');

                res.redirect('/admin/novedades');
                console.log('redirect to admin')
            } else {
                res.render('admin/agregar', {
                    layout: 'admin/layout',
                    error: true,

                });
            }
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

    if (novedad.imagenes != "") {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            novedad,
            previewModif: true
        })
    } else {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            novedad,
            previewModif: false,
            mensajeImg: "Posteo sin imagen"
        })

    }
});



// para realizar el update mediante post a la BD
router.post('/modificar', upload.single('images'), async (req, res, next) => {
    try {
        var titulo = req.body.titulo;
        var autor = req.body.autor;
        var cuerpo = req.body.cuerpo;
        var etiquetas = req.body.etiquetas;
        var imagenes = req.body.imagenes;


        // console.log(imagenes)

        if (titulo != "" && autor != "" && cuerpo != "" && etiquetas != "" && imagenes != "") {
            var obj = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                cuerpo: req.body.cuerpo,
                etiquetas: req.body.etiquetas,
                imagenes: '<img src="images/uploads/' + req.file.filename + '"/>',
                filename: req.file.filename
            }


            await novedadesModel.modificarNovedadById(obj, req.body.id);
            res.redirect('/admin/novedades');

            console.log(obj, 'con img');
        } else {

            if (titulo != "" && autor != "" && cuerpo != "" && etiquetas != "" && imagenes == "") {


                var obj = {
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    cuerpo: req.body.cuerpo,
                    etiquetas: req.body.etiquetas,
                }

                await novedadesModel.modificarNovedadById(obj, req.body.id);

                res.redirect('/admin/novedades');

                console.log(obj, 'img vacío');
            }
        }
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'La novedad no pudo ser actualizada. Intente nuevamente.'
        })
    }
});



// para previsualizar la novedad con imagen
router.get('/preview/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    var mx = await novedadesModel.getNovedadesMX();

    console.log(novedad)

    if (novedad.imagenes != "") {
        res.render('admin/preview', {
            layout: 'admin/layout',
            mx,
            novedad,
            imagenes: true

        })
    } else {
        res.render('admin/preview', {
            layout: 'admin/layout',
            mx,
            novedad,
            imagenes: false

        })
    }
});



//para listar las fotos de la carpeta upload
router.get('/imagenesuploads', async (req, res, next) => {

    var filenames = await fs.readdirSync('public/images/uploads')


    console.log("\nCurrent directory filenames:");
    console.log(filenames)

    filenames.forEach(file => {
        console.log(file);

    });
    res.render('admin/imagenesuploads', {
        layout: 'admin/layout',
        filenames

    })

})


// router.get('/eliminar/:this', (req, res, next) => {


//    fs.unlink("./public/images/uploads/"+req.file.filename, (err) => {
//         if (err) {
//             console.log("failed to delete local image:"+err);
//         } else {
//             console.log('successfully deleted local image');                                
//         }
//     });
    // try {
    //     var deleteimage = req.params.this

    //     await fs.unlink(deleteimage[this]);
    //     console.log('File removed')

    //     res.redirect('/admin/imagenesuploads', {
    //         layout: 'admin/layout',
    //         filenames
    //     });

    // } catch (err) {
    //     console.error('Something wrong happened removing the file', err)
    // }
// })


// para eliminar una novedad
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});




module.exports = router;

