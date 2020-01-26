const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const modeBtn = document.querySelector("#js-mode");
const saveBtn = document.querySelector("#js-save");
const range = document.querySelector(".js-range");
const colors = document.querySelectorAll(".colors");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 550;

let paintMode = false;
let fillMode = false;
let drawing = false;

function startDrawing() {
    drawing = true;
};

function stopDrawing() {
    drawing = false;
};

function handleDrawing(event) {
    const posX = event.offsetX;
    const posY = event.offsetY;

    if(drawing) {
        ctx.lineTo(posX, posY);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    }
};

function colorHandler(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

function rangeHandler() {
    const line = range.value;
    ctx.lineWidth = line;
};

function saveHandler() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = image;
    link.download = "Drawing";
    link.click();
};

function modeHandler() {
    if(paintMode) {
        paintMode = false;
        fillMode = true;
        modeBtn.innerText = "Paint";
    } else {
        paintMode = true;
        fillMode = false;
        modeBtn.innerText = "Fill";
    }
};

function handleClick() {
    if(fillMode) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function init() {
    paintMode = true;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = INITIAL_COLOR;
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.lineWidth = range.value;

    // canvas event
    if(canvas) {
        canvas.addEventListener("mouseleave", stopDrawing);
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("click", handleClick);
        canvas.addEventListener("mousemove", handleDrawing);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("contextmenu", handleCM);
    }

    // button click event listener
    if(modeBtn) {
        modeBtn.addEventListener("click", modeHandler);    
    }

    if(saveBtn) {
        saveBtn.addEventListener("click", saveHandler);
    }
    // range input event listener
    if(range) {
        range.addEventListener("change", rangeHandler);
    }
    // color div click event listener
    const colorArray = Array.from(colors);

    colorArray.forEach(function(color) {
        color.addEventListener("click", colorHandler);
    });
};

init();