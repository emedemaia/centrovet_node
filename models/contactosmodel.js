var pool = require('./bd');

async function insertContactos(obj) {

    try {
        var query = 'insert into contactos set ?'
        var rows = await pool.query(query, [obj]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}


async function getContactosDesc() {
        var query = 'select * from contactos order by id desc'
        var rows = await pool.query(query)
        return rows;
}

async function deleteContactosById(obj){

var query = 'delete from contactos where id = ?'
var rows = await pool.query(query,[obj])
return rows;

}

module.exports = { insertContactos, getContactosDesc, deleteContactosById }