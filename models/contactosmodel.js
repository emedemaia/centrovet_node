var pool = require('./bd');

async function insertContactos(obj) {

    try {
        var query = 'insert into contactos set ?'
        var rows = await pool.query(query,[obj]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}


module.exports = { insertContactos }