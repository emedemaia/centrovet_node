


var fecha = new Date();
var hora = fecha.getHours();

// console.log(hora);

function horario(hora) {
    if (hora >= 6 && hora < 12) {
     
        document.write('<span class="icon-sun"></span>¡Buen día, ');
     
    }

    else {

        if (hora >= 12 && hora <= 19) {

         
            document.write('<span class="icon-sunset"></span>¡Buenas tardes, ');
       ;
        }

        else {

            document.write('<span class="icon-moon-stars"></span>¡Buenas noches, ');

        }
    }
};
