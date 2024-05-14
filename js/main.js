//captcha main
document.getElementById('textocaptcha').textContent = generarCaptcha();
document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    let I = document.getElementById('captcha').value;
    let G = document.getElementById('textocaptcha').textContent;
    if (I == G) {
        document.getElementById('validacion').textContent = "El formulario se ha enviado correctamente";
    } else {
        document.getElementById('validacion').textContent = "Captcha incorrecto, intentalo nuevamente.";
    }
    });

    function generarCaptcha() {
    let captcha = "";
    let c = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 6; i++) {
      captcha += c.charAt(Math.floor(Math.random() * c.length));
    }
    return captcha;
}