$(document).ready(function () {
    $("#validarregistro").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            usuario: {
                required: true,
                minlength: 6
            },
            contraseña: {
                required: true,
                minlength: 8
            },
        }, messages: {
            nombre: {
                required: "Ingrese su nombre.",
                minlength: "El minimo aceptado son 3 caracteres."
            }, usuario: {
                required: "Ingrese su usuario",
                minlength: "El minimo aceptado son 6 caracteres."
            }, contraseña: {
                required: "Ingrese su contraseña.",
                minlength: "El minimo son 8 caracteres"
            },
        }
    });
});