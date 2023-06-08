img = "";
status = "";
objects = [];
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}
function modelLoaded() {
    console.log("modelLoaded");
    document.getElementById("status").innerHTML = "Status : Detecting object";
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
       for(i = 0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
        noFill();
        stroke("green");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}