

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

var inputs = document.getElementsByClassName('inputs');

    for (var i = 0 ; i < inputs.length; i++){

        inputs[i].addEventListener('change', function(){

        var buttonsubmit = document.getElementById('buttonsubmit');

        var att = document.createAttribute('onclick');
        att.value = 'cargar()';

        buttonsubmit.setAttributeNode(att);
    });
}
    
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











