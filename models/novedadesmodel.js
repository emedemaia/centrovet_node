var pool = require('./bd');


// para seleccionar todas las novedades

async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}


// para agregar las novedades

async function insertNovedad(obj) {
    try {
        var query = 'insert into novedades set ?'
        var rows = await pool.query(query,[obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// para eliminar novedades
async function deleteNovedadById(obj){
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query,[obj]);
    return rows;
};

module.exports = { getNovedades, insertNovedad, deleteNovedadById }