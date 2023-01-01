// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

let hex = [];

// Lets put all our map options in a single object
let options = {
    lat: 50.62216501831861,
    lng: 36.58377578667994,
    zoom: 15,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup(){
    canvas = createCanvas(800, 640); 

    myMap = mappa.tileMap(options); 
 
    myMap.overlay(canvas);
}

function parseHex(){
    hex = JSON.parse(document.getElementById("hex").value);
}

function draw(){
    clear();

    for (let i = 0; i < hex.length; i++) {
        for (let j = 0; j < hex[i].points.length; j++) {
            let point1 = myMap.latLngToPixel(hex[i].points[j][0], hex[i].points[j][1]);
            let point2;
            if (j == hex[i].points.length-1) {
                point2 = myMap.latLngToPixel(hex[i].points[0][0], hex[i].points[0][1]);
            } else {
                point2 = myMap.latLngToPixel(hex[i].points[j+1][0], hex[i].points[j+1][1]);
            }
        
            drawLine(point1, point2);
        }

        if (document.getElementById("showMultipliers").checked) {
            point = myMap.latLngToPixel(hex[i].points[0][0], hex[i].points[0][1]);
            point.x += 7;
            point.y += -6;
            drawRect(point);
            point.x += 1;
            point.y += -7;
            drawText(hex[i].multiplier, point);
        }
    }
}

function drawLine(point1, point2) {
    stroke(255, 0, 0);
    strokeWeight(3);
    line(point1.x, point1.y, point2.x, point2.y);
}

function drawText(textContent, point) {
    textStyle(BOLD);
    strokeWeight(0);
    textSize(8);
    fill(0, 0, 255);
    text(textContent, point.x, point.y);
}

function drawRect(point) {
    strokeWeight(0);
    fill(255, 255, 255);
    rect(point.x, point.y, 80, -20);
}