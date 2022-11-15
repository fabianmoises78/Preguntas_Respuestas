$(document).ready(function () {
    $("#registro").on('click', function () {
        var datos = {
            PREGUNTA: $('#dato').val()
        };

        $.ajax({
            url: "https://localhost:44330/Home/CrearPregunta",
            contentType: "Application/json",
            method: "POST",
            data: JSON.stringify(datos),
            dataType: "json",
            success: function (response) {
                if (response.Status == 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: response.Message
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
    });
});

function ListarPreguntas() {
    $.ajax({
        url: "https://localhost:44330/Home/ListarPreguntas",
        contentType: "Application/json",
        method: "POST",
        dataType: "json",
        success: function (listPreguntas) {
            var html = "";

            $.each(listPreguntas, function (index, row) {
                if (row.ID_ESTADO == 1) {
                    html += '<h5 class="card-header">Pregunta</h5>';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + row.PREGUNTA + '</h5>';
                    html += '<p class="card-text">Pregunta realizada por ' + row.USUARIO + '</p>';
                    html += '<button onclick="VerPregunta(' + row.ID_PREGUN + ')" type="button" class="btn btn-primary">Ver Respuestas</button>';
                    html += '</div>';
                }
            });
            $("#pregunta").append(html)
        }
    });
}

function VerPregunta(id) {
    sessionStorage.setItem("Id_Pregunta", id);
    window.location.href = "https://localhost:44330/Home/VerPregunta"
}