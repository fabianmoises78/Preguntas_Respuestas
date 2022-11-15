$(document).ready(function () {

});

function CargarPregunta() {
    var Idpregunta = sessionStorage.getItem("Id_Pregunta");

    var datos = {
        ID_PREGUN: Idpregunta
    };

    //sessionStorage.setItem("Id_Pregunta", null);

    $.ajax({
        url: "https://localhost:44330/Home/LisPreguntabyID",
        contentType: "Application/json",
        method: "POST",
        data: JSON.stringify(datos),
        dataType: "json",
        success: function (response) {
            var html = "";
            $.each(response, function (index, row) {
                html += '<h2>' + row.PREGUNTA + '</h2>';
            });
            $("#pregunta").append(html)
            var Idpregunta = sessionStorage.getItem("Id_Pregunta");
        }
    });
}

function CargarRespuestas() {
    var Idpregunta = sessionStorage.getItem("Id_Pregunta");

    var datos = {
        ID_PREGUN: Idpregunta
    };

    //sessionStorage.setItem("Id_Pregunta", null);
    $.ajax({
        url: "https://localhost:44330/Home/LisPreRespuesta",
        contentType: "Application/json",
        method: "POST",
        data: JSON.stringify(datos),
        dataType: "json",
        success: function (response) {
            var html = "";
            $.each(response, function (index, row) {
                html += '<li class="list-group-item">' + row.RESPUESTA + ' respondido por ' + row.NOMBRE + '</li>';
            });
            $("#respuestas").append(html)
        }
    });
}

function responder() {
    var Idpregunta = sessionStorage.getItem("Id_Pregunta");

    var datos = {
        RESPUESTA: $("#respu").val(),
        ID_PREGUN: Idpregunta
    };

    $.ajax({
        url: "https://localhost:44330/Home/CrearRespuesta",
        contentType: "Application/json",
        method: "POST",
        data: JSON.stringify(datos),
        dataType: "JSON",
        success: function (response) {
            if (response.Status == 1) {
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: response.Message,
                    timer: 3000
                }).then(function () {
                    $("#respu").val("");
                    location.reload();
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.Message
                })
            }
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.responseText
            })
        }
    });
}