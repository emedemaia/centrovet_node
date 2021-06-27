var fecha = new Date();
var hora = fecha.getHours();

// console.log(hora);

function horario(hora){
    if (hora >=6 && hora < 12) {

    document.write('¡Buen día, ');
}

else {

    if (hora >=12 && hora <= 19) {

        document.write('¡Buenas tardes, ');
    }

    else {

        document.write('¡Buenas noches, ');

    }
}
};


