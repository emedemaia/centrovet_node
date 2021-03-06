var express = require('express');
var router = express.Router();
var contactosModel = require('../../models/contactosmodel')

router.get('/', async (req, res, next)=>{

    var contactos = await contactosModel.getContactosDesc();
console.log(contactos)

    res.render('admin/contactos',{
        layout:'admin/layout',
        navbar:true,
        contactos
    })

})

//eliminar
router.get('/eliminar/:id', async (req, res, next)=>{
var id = req.params.id;
  await contactosModel.deleteContactosById(id);


    res.redirect('/admin/contactos')

})



// para eliminar una novedad
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});

module.exports = router;