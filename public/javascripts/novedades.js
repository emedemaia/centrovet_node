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

function crossSearch(){
    document.getElementById("cross-search").style.visibility = "visible";
    document.getElementById("cross-search-on").style.visibility = "hidden";
}

function crossSearchXs(){
    document.getElementById("cross-search-xs").style.visibility = "visible";
    document.getElementById("cross-search-xs-on").style.visibility = "hidden";
}











