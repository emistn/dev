function calcularDebito() {
    //Agregamos el valor ingresado por el usuario y lo guardamos en una constante
    const debito = parseFloat(document.getElementById("debito").value);
    const atraso = parseInt(document.getElementById("atraso").value);
    const multa = parseFloat(document.getElementById("multa").value);
    const juros = parseFloat(document.getElementById("juros").value);

    //En este apartado creamos la equación para calcular la multa y los juros
    /*tomando en consideracion la norma brasilera  donde se aplica el 2% de multa sobre el valor
     y el 1% de juros a cada 30 dias que pasan desde la fecha de vencimiento*/
    const valorMulta = (debito * 2) / 100;
    const valorJuros = ((debito* 1 / 100) / 30) * atraso;
    const valorTotal = debito + valorMulta + valorJuros;

    document.getElementById("multa").textContent = "%" + valorMulta.toFixed(2);
    document.getElementById("juros").textContent = "%" +  valorJuros.toFixed(4);
    document.getElementById("resultado").textContent = "R$" + valorTotal.toFixed(2);
}

function borrarCeldas() {
    document.getElementById("debito").value = "";
    document.getElementById("atraso").value = "";
    document.getElementById("multa").textContent = "%0.00";
    document.getElementById("juros").textContent = "%0.0000";
    document.getElementById("resultado").textContent = "R$0.00";
}

function mostrarHora() {
            var fecha = new Date();
            var hora = fecha.getHours();
            var minutos = fecha.getMinutes();
            var segundos = fecha.getSeconds();
            var horaActual = hora + ":" + minutos + ":" + segundos;
            
            // Actualiza el contenido del elemento con el id "horaActual"
            document.getElementById("horaActual").textContent = horaActual;
        }

        // Llama a la función para mostrar la hora actual al cargar la página
        $(document).ready(function () {
            mostrarHora();
        });

