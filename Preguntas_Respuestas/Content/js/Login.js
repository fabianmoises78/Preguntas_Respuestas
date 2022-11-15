$(document).ready(function () {
    $("#LogIn").on('click', function () {
        var datos = {
            USUARIO1: $('#usuario').val(),
            CONTRASEÑA: $('#contraseña').val()
        };

        $.ajax({
            url: "https://localhost:44330/Home/Login",
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
                        window.location.href = "https://localhost:44330/Home/Inicio";
                        Swal.Close()
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.Message
                    })
                }
            }
        });
    });
});