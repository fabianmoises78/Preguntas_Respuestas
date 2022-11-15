$(document).ready(function () {
    $("#activar").on('click', function () {

        var idpregunta = sessionStorage.getItem("Id_Pregunta");
        var idestado = sessionStorage.getItem("Id_Estado");

        datos = {
            ID_PREGUN: idpregunta,
            ID_ESTADO: idestado
        };

        $.ajax({
            url: "https://localhost:44330/Home/ActDesacPregunta",
            contentType: "Application/json",
            method: "POST",
            data: JSON.stringify(datos),
            dataType: "json",
            success: function (response) {
                if (response.Status == 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: response.Message,
                        timer: 2000
                    }).then(function () {
                        Swal.close()
                        $("#modal").modal('handleUpdate')
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.Message
                    })
                }
            }, error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.responseText
                })
            }
        });
    });

    $("#desactivar").on('click', function () {

        var idpregunta = sessionStorage.getItem("Id_Pregunta");
        var idestado = sessionStorage.getItem("Id_Estado");

        datos = {
            ID_PREGUN: idpregunta,
            ID_ESTADO: idestado
        };

        $.ajax({
            url: "https://localhost:44330/Home/ActDesacPregunta",
            contentType: "Application/json",
            method: "POST",
            data: JSON.stringify(datos),
            dataType: "json",
            success: function (response) {
                if (response.Status == 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Exito",
                        text: response.Message,
                        timer: 2000
                    }).then(function () {
                        Swal.close()
                        $("#modal").modal('handleUpdate')
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.Message
                    })
                }
            }, error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.responseText
                })
            }
        });
    });
});

function ListarmisPreguntas() {
    $.ajax({
        url: "https://localhost:44330/Home/MisPreguntas",
        contentType: "Application/json",
        method: "POST",
        dataType: "json",
        success: function (Preguntas) {
            var html = "";

            $.each(Preguntas, function (index, row) {
                html += '<tr>';
                html += '<th scope="row">  ' + row.ID_PREGUN + ' </th>';
                html += '<td> ' + row.PREGUNTA + ' </td>';
                html += '<td> ' + row.NOMBRE_ESTADO + ' </td>';
                html += '<td><button class="btn btn-success" onclick="CargarPregunta(' + row.ID_PREGUN + ')" data-toggle="modal" data-target=".bd-example-modal-sm">Editar</button></td>';
                html += '<tr>';
            });
            $('#ListaPreguntas').append(html);
        }
    });
}

function CargarPregunta(id) {

    var datos = {
        ID_PREGUN: id
    };

    $.ajax({
        url: "https://localhost:44330/Home/LisPreguntabyID",
        contentType: "Application/json",
        method: "POST",
        data: JSON.stringify(datos),
        dataType: "json",
        success: function (response) {
            var html = "";
            $.each(response, function (index, row) {
                sessionStorage.setItem("Id_Pregunta", row.ID_PREGUN);
                sessionStorage.setItem("Id_Estado", row.ID_ESTADO)
                html += '<h4>' + row.PREGUNTA + '</h4>';
                if (row.ID_ESTADO == 1) {
                    $("#desactivar").hide();
                    $("#activar").show();
                } else if (row.ID_ESTADO == 2) {
                    $("#activar").hide();
                    $("#desactivar").show();
                }
                
            });
            $("#pregunta").append(html)
        }
    });
}