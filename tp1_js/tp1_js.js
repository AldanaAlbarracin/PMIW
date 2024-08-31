let fondo;
let columnas = 4;
let filas = 6;
let tamaño = 80;
let separacion = 50;
let colorblanco;
let colorgris;
let retardo = 1000;
let superposicion = false;
let desplazamientoX = 0;
let actualizar = true;

function preload() {
  fondo = loadImage("opArt.png");
}

function setup() {
  createCanvas(800, 400);
  background(0);
  colorblanco = color(255);
  colorgris = color(200);
}

function draw() {
  if (actualizar) {
    background(0);
    image(fondo, 0, 0, 400, 400);
    for (let c = 0; c < columnas; c++) {
      for (let j = 0; j < filas; j++) {
        let x = 450 + c * (tamaño + separacion) + desplazamientoX;
        let y = j * (tamaño + separacion / 2);
        romboblanco(x, y, tamaño, colorblanco);
        if (j > 0 && superposicion) {
          rombogris(x, y, tamaño);
        }
      }
    }
    actualizar = false;
  }
}

function romboblanco(x, y, tamaño, c) {
  push();
  translate(x + tamaño / 2, y + tamaño / 2);
  rotate(radians(45));
  rectMode(CENTER);
  fill(c);
  rect(0, 0, tamaño, tamaño);
  pop();
}

function rombogris(x, y, tamaño) {
  let tamañogris = calcularTamañoGris(x, tamaño);
  let desY = y - tamaño / 2;
  push();
  translate(x + tamaño / 2, desY + tamaño / 2);
  rotate(radians(45));
  rectMode(CENTER);
  fill(colorgris);
  rect(0, 0, tamañogris, tamañogris);
  pop();
}

function calcularTamañoGris(x, tamaño) {
  return map(x, 450, 450 + (columnas - 1) * (tamaño + separacion), tamaño * 0.7, tamaño * 0.9);
}

function actualizarcolores() {
  let temp = colorblanco;
  colorblanco = colorgris;
  colorgris = temp;
}

function mouseMoved() {
  if (millis() % (2 * retardo) < retardo) {
    actualizarcolores();
    actualizar = true;
  }
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    superposicion = !superposicion;
    actualizar = true;
  }
  if (key === 'a' || key === 'A') {
    desplazamientoX += 10;
    actualizar = true;
  }
}
