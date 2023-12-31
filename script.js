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
    const valorJuros = ((debito * 1 / 100) / 30) * atraso;
    const valorTotal = debito + valorMulta + valorJuros;

    document.getElementById("multa").textContent = "%" + valorMulta.toFixed(2);
    document.getElementById("juros").textContent = "%" + valorJuros.toFixed(4);
    document.getElementById("resultado").textContent = "R$" + valorTotal.toFixed(2);
}

function borrarCeldas() {
    document.getElementById("debito").value = "";
    document.getElementById("atraso").value = "";
    document.getElementById("multa").textContent = "%0.00";
    document.getElementById("juros").textContent = "%0.0000";
    document.getElementById("resultado").textContent = "R$0.00";
}

const cantidadNumeros = 100; // Cambia la cantidad de números que deseas mostrar
const cantidadDeDigitos = 6

function generateRandomNumber(digitCount) {
    let randomNumber = '';
    for (let i = 0; i < digitCount; i++) {
        randomNumber += Math.floor(Math.random() * 10); // Agrega un dígito aleatorio
    }
    return randomNumber;
}

//função para gerar o pdf
function genPDF() {
    var doc = new jsPDF();
    var nombre = prompt("Digite seu nome completo:");
    var cpfuser = prompt("Digite seu CPF:");
    var debito = document.getElementById("debito").value; // Obtiene el valor del campo "Débito"
    var atraso = document.getElementById("atraso").value;
    var multa = document.getElementById("multa").textContent; // Cambia a textContent
    var juros = document.getElementById("juros").textContent; // Cambia a textContent
    var resultado = document.getElementById("resultado").textContent; // Cambia a textContent

    doc.setFont("American Typewriter");
    doc.setFontSize(16);
    doc.setFontStyle("bold");
    doc.setLineWidth(1);
    doc.setDrawColor(0);
    doc.line(10, 10, 200, 10);

    doc.setFillColor(173, 216, 230);
    doc.rect(10, 10, 190, 15, 'F');
    doc.setFillColor(173, 216, 230);

    doc.text(20, 20, 'Comprovante de Débito');
    doc.setFontStyle("normal");
    doc.setFontSize(12);
    doc.text(20, 35, 'Usuário: ');
    doc.setFontStyle("light");
    doc.text(40, 35, nombre);
    doc.setFontStyle("light");
    doc.text(20, 45, 'CPF: ' + cpfuser);

    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    var horaActual = hora + ":" + minutos + ":" + segundos;
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; //meses se cuentan desde 0
    var ano = fecha.getFullYear();
    var fechaActual = dia + "/" + mes + "/" + ano;

    // Agrega la hora actual al PDF
    doc.setFontSize(12);
    doc.text(20, 155, 'Hora: ' + horaActual);
    doc.text(55, 155, 'Fecha: ' + fechaActual);

    doc.text(20, 55, '--------------------------------------------------');
    doc.text(20, 65, 'Debito: R$' + debito);
    doc.text(20, 75, 'Dias de atraso: ' + atraso + ' dias');
    doc.text(20, 85, '--------------------------------------------------');
    console.log("Percentual de multa: " + multa);
    doc.text(20, 95, 'Percentual de multa: ' + multa);
    console.log("Percentual de juros: " + juros)
    doc.text(20, 105, 'Percentual de juros: ' + juros);

    doc.setDrawColor(100); // Color del borde: gris oscuro
    doc.setLineWidth(0.5); // Grosor del borde
    doc.rect(10, 10, 190, 150); // Rectángulo decorativo

    doc.text(20, 115, '------------------------------------------------------------');

    console.log("Valor total do débito: " + resultado)
    doc.setFontSize(15);
    doc.setFontStyle("normal");
    doc.text(20, 125, 'Valor total do débito: ');
    doc.setFontSize(19);
    doc.setFontStyle("bold");
    doc.text(70, 125, resultado);
    doc.setFontSize(12);
    doc.setFontStyle("normal");
    doc.text(20, 135, '------------------------------------------------------------');

    let posX = 20;
    let posY = 20;

    // gera um codigo aleatorio para o boleto

    const codigo = Math.floor(Math.random() * 100);
    const numeroAleatorio = generateRandomNumber(cantidadDeDigitos);

    posY += 100; // Aumenta la posición vertical para el siguiente número

    doc.setFontSize(9);
    doc.setFontStyle("bold");
    doc.text(20, 145, 'Codigo débito : ' + codigo + numeroAleatorio);

    //sweetAlert2
    let timerInterval
    Swal.fire({
        title: 'Fazendo download do comprovante!',
        html: 'Carregando... <b></b>',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    });

    doc.save('comprovanteDebito.pdf'); //nome que faz o download do PDF

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

