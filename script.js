let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let desenhando = false;
let isEraser = false;
let currentColor = 'black'; // Inicialize a cor padrão

canvas.addEventListener("mousedown", function (event) {
    desenhando = true;
    contexto.beginPath();
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
});

canvas.addEventListener("mousemove", function (event) {
    if (desenhando) {
        if (isEraser) {
            contexto.globalCompositeOperation = 'destination-out'; // Configurar para apagar
            contexto.lineWidth = 40;
        } else {
            contexto.globalCompositeOperation = 'source-over'; // Configurar para desenhar
            contexto.strokeStyle = currentColor;
            contexto.lineWidth = 8;
        }
        
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        contexto.stroke();
    }
});

canvas.addEventListener("mouseup", function (event) {
    desenhando = false;
    contexto.closePath();
    contexto.globalCompositeOperation = 'source-over'; // Restaurar a operação padrão
});

const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input" ,function() {
    currentColor = colorPicker.value;
});

// Adicione manipuladores de eventos para os botões de lápis e borracha
const drawButton = document.getElementById("drawButton");
const eraseButton = document.getElementById("eraseButton");

drawButton.addEventListener("click", function () {
    isEraser = false; // Selecione o lápis
    canvas.style.cursor = 'crosshair';
    drawButton.style.backgroundColor = 'lightgray';
    eraseButton.style.backgroundColor = '';
});

eraseButton.addEventListener("click", function () {
    isEraser = true; // Selecione a borracha
    canvas.style.cursor = 'default';
    eraseButton.style.backgroundColor = 'lightgray';
    drawButton.style.backgroundColor = '';
});
