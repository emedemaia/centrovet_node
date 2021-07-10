var fecha = new Date();
var hora = fecha.getHours();

// console.log(hora);

function horario(hora) {
    if (hora >= 6 && hora < 12) {

        document.write('¡Buen día, ');
    }

    else {

        if (hora >= 12 && hora <= 19) {

            document.write('¡Buenas tardes, ');
        }

        else {

            document.write('¡Buenas noches, ');

        }
    }
};


function previewImage() {
    var reader = new FileReader();
    var fileToRead = document.getElementById('uploadImage').files[0];


    reader.onload = function (e) {
        document.getElementById('uploadPreview').src = e.target.result;
    };

    reader.readAsDataURL(fileToRead);
    console.log(fileToRead)


    var inputImage = document.getElementById('imgPreview');
    var att = document.createAttribute('value');
    att.value = "imagen";
    inputImage.setAttributeNode(att);

};

// LOADER
function cargar() {
    document.getElementById("loader").style.display = "block";
}











