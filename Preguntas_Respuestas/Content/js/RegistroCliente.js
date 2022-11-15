$(document).ready(function () {
    $('#registrarse').on('click', function () {
        var datos = {
            NOMBRE: $('#nombre').val(),
            USUARIO1: $('#usuario').val(),
            CONTRASEÑA: $('#contraseña').val()
        };

        $.ajax({
            url: "https://localhost:44330/Home/RegistrarUsuario",
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
                        timer: 3000
                    }).then(function () {
                        window.location.href = "https://localhost:44330/Home/Index";
                        Swal.Close();
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