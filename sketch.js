var colR = {
    r: 255,
    g: 0,
    b: 0
}
var colB = {
    r: 0,
    g: 0,
    b: 255
}
var colMix = {
    r: 100,
    g: 100,
    b: 100
}

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

const drawMouse = Helpers.drawMouse;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;
const drawConstraint = Helpers.drawConstraint;

let engine;

let constraint1;

let canvas;

let BodyArray = [];
let button;
let size = '22px';
let unit = "aquacultureProduction";
let colAqauPP = '#592831';
let colback = '#0476D9';
let colAqauAb = '#BEC7C7';
let colConPP = '#FFEB4D';
let colCapAb = '#F2E1C2';
let colCapPP = '#BF6854';

function setup() {
    engine = Engine.create();
    createCanvas(1600, 1100);

    //showCapturePP();
    //showConsumptionPP();
    //showCaptureAbsolute();

    // run the engine
    engine.world.gravity.y = 0;


    Matter.Runner.run(engine);
    matterCapturePP();
    //matterConsumptionPP();
    //matterAquaPP();
    //matterCaptureAbsolute();
    //matterAquaAbsolute();

    createButtonAqauPP();
    createButtonAqauAbsolute();
    createButtonConsumptionPP();
    createButtonCapturePP();
    createButtonCaptureAbsulte();


}


function draw() {
    //background(220);

    background(colback);
    noStroke();
    fill(colR.r, colR.g, colR.b, 180);
    textSize(24);
    fill(0, 102, 153);


    for (let i = 0; i < BodyArray.length; i++) {
        if (BodyArray[i].col === colAqauPP) {
            fill(colAqauPP);
        } else if (BodyArray[i].col === colAqauAb) {
            fill(colAqauAb);
        } else if (BodyArray[i].col === colConPP) {
            fill(colConPP);
        } else if (BodyArray[i].col === colCapAb) {
            fill(colCapAb);
        } else if (BodyArray[i].col === colCapPP) {
            fill(colCapPP);
        }

        drawBody(BodyArray[i]);

        if (dist(mouseX, mouseY, BodyArray[i].position.x, BodyArray[i].position.y) <= BodyArray[i].circleRadius) {
            console.log(BodyArray[i].entity);
            fill(255);
            //text(BodyArray[i].entity, mouseX, mouseY);
            text((BodyArray[i].entity + ":  " + BodyArray[i].value + unit), 10, 30);


        }

    }



}

function createButtonAqauPP() {

    button = createButton('AqauPP');
    button.position(0, 100);
    button.mousePressed(aqauPPButton);
    button.style('fontSize', size);
    button.style('color', colAqauPP);
    button.style('background-color', 'inherit')
    button.style('margin', '20px')
    button.style('boder', 'none')
    button.style('display', 'inline-block')


}
function createButtonAqauAbsolute() {
    button = createButton('AqauAbsolute');
    button.position(0, 200);
    button.mousePressed(aqauAbsoluteButton);
    button.style('fontSize', size);
    button.style('color', colAqauAb);
    button.style('background-color', 'inherit')
    button.style('margin', '20px')
    button.style('boder', 'none')
    button.style('display', 'inline-block')
}

function createButtonConsumptionPP() {
    button = createButton('ConsumtionPP');
    button.position(0, 300);
    button.mousePressed(consumptionPPButton);
    button.style('fontSize', size);
    button.style('color', colConPP);
    button.style('background-color', 'inherit')
    button.style('margin', '20px')
    button.style('boder', 'none')
    button.style('display', 'inline-block')
}
function createButtonCaptureAbsulte() {
    button = createButton('CaputureAbsulte');
    button.position(0, 400);
    button.mousePressed(captureAbsoluteButton);
    button.style('fontSize', size);
    button.style('color', colCapAb);
    button.style('background-color', 'inherit')
    button.style('margin', '20px')
    button.style('boder', 'none')
    button.style('display', 'inline-block')
}
function createButtonCapturePP() {
    button = createButton('CaputrePP');
    button.position(0, 500);
    button.mousePressed(captureAbsoluteButton);
    button.style('fontSize', size);
    button.style('color', colCapPP);
    button.style('background-color', 'inherit')
    button.style('margin', '20px')
    button.style('boder', 'none')
    button.style('display', 'inline-block')
}

function capurePPButton() {
    BodyArray = [];
    unit = " kg"
    World.clear(engine.world);
    Engine.clear(engine);
    matterCapturePP();;
}
function aqauPPButton() {
    BodyArray = [];
    unit = " kg"
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaPP();;
}

function aqauAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons"
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaAbsolute();;
}
function captureAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons"
    World.clear(engine.world);
    Engine.clear(engine);
    matterCaptureAbsolute();;
}
function consumptionPPButton() {
    BodyArray = [];
    unit = " kg"
    World.clear(engine.world);
    Engine.clear(engine);
    matterConsumptionPP();;
}




function matterCapturePP() {
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance;
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(x1, y1, (fishData[i].durchMesserKreisCapt) / 7);
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colCapPP;
        ballInstance.value = fishData[i]["catch p"]
        if (fishData[i].durchMesserKreisCapt < 500) {
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: 0, y: 0 },
                stiffness: 0.0001,
                damping: 0.1
            });
        } else {
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: -900, y: 0 - 100 },
                stiffness: 0.001,
                damping: 0.1
            });
        }
        World.add(engine.world, [ballInstance, constraint]);
        drawConstraint(constraint);
        BodyArray.push(ballInstance);
        //drawBody(ballInstance);
    }
}

function matterAquaPP() {
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance;
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(x1, y1, (fishData[i].durchMesserKreisAqua) / 7);
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colAqauPP;
        ballInstance.value = fishData[i].durchMesserKreisAqua
        if (fishData[i].durchMesserKreisCapt < 500) {
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: 0, y: 0 },
                stiffness: 0.0001,
                damping: 0.1
            });
        } else {
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: -900, y: 0 - 100 },
                stiffness: 0.001,
                damping: 0.1
            });
        }
        World.add(engine.world, [ballInstance, constraint]);
        drawConstraint(constraint);
        BodyArray.push(ballInstance);
        //drawBody(ballInstance);
    }
}

function matterCaptureAbsolute() {
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance;
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(x1, y1, Math.sqrt(fishData[i].captureProduction) / 50);
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colCapAb;
        ballInstance.value = fishData[i].captureProduction;
        constraint = Constraint.create({
            pointA: { x: x1, y: y1 },
            bodyB: ballInstance,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001,
            damping: 0.1
        });
        World.add(engine.world, [ballInstance, constraint]);
        drawConstraint(constraint);
        BodyArray.push(ballInstance);
        //drawBody(ballInstance);
    }
}

function matterAquaAbsolute() {
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance;
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(x1, y1, Math.sqrt(fishData[i].aquacultureProduction) / 50);
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colAqauAb;
        ballInstance.value = fishData[i].aquacultureProduction;


        constraint = Constraint.create({
            pointA: { x: x1, y: y1 },
            bodyB: ballInstance,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001,
            damping: 0.1
        });

        World.add(engine.world, [ballInstance, constraint]);
        drawConstraint(constraint);
        BodyArray.push(ballInstance);
        //drawBody(ballInstance);
    }
}

function matterConsumptionPP() {
    for (let i = 0; i < fishData.length; i++) {

        if (fishData[i].fishConsumptionPP !== "#N/A") {
            let ballInstance;
            let x1 = round(fishData[i].longitude);
            let y1 = round(fishData[i].latitude);
            x1 = map(x1, -180, 180, 100, 1400);
            y1 = map(y1, -90, 90, 900, 100);
            ballInstance = Bodies.circle(x1, y1, Math.sqrt(fishData[i].fishConsumptionPP) * 2);
            ballInstance.entity = fishData[i].Entity;
            ballInstance.col = colConPP;
            ballInstance.value = fishData[i].fishConsumptionPP;
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: 0, y: 0 },
                stiffness: 0.0001,
                damping: 0.1
            });
            World.add(engine.world, [ballInstance, constraint]);
            drawConstraint(constraint);
            BodyArray.push(ballInstance);
        } else {
            console.log(fishData[i].Entity)
        }

    }
}


function showCapturePP() {
    noStroke();
    for (let i = 0; i < fishData.length; i++) {
        let x = fishData[i].longitude;
        let y = fishData[i].latitude;

        x = map(x, -180, 180, 0, 800);
        y = map(y, -90, 90, 600, 0);
        fill(colR.r, colR.g, colR.b, 100);
        circle(x, y, (fishData[i].durchMesserKreisCapt) / 5);
        fill(colB.r, colB.g, colB.b, 100);
        circle(x, y, (fishData[i].durchMesserKreisAqua) / 5);
        textSize(10);
        text(fishData[i].Entity, x, y)
    }
    //save("capturePP.svg"); // give file name
    //print("saved svg");
}

function showConsumptionPP() {
    noStroke();
    for (let i = 0; i < fishData.length; i++) {
        let x = fishData[i].longitude;
        let y = fishData[i].latitude;

        x = map(x, -180, 180, 0, 800);
        y = map(y, -90, 90, 600, 0);
        fill(colMix.r, colMix.g, colMix.b, 100);
        circle(x, y, (fishData[i].fishConsumptionPP));
        textSize(10);
        text(fishData[i].Entity, x, y)
    }
    //save("consumptionPP.svg"); // give file name
    //print("saved svg");
}

function showCaptureAbsolute() {
    noStroke();
    for (let i = 0; i < fishData.length; i++) {
        let x = fishData[i].longitude;
        let y = fishData[i].latitude;

        x = map(x, -180, 180, 0, 800);
        y = map(y, -90, 90, 600, 0);
        fill(colR.r, colR.g, colR.b, 100);
        circle(x, y, (Math.sqrt(fishData[i].captureProduction) / 50));
        fill(colB.r, colB.g, colB.b, 100);
        circle(x, y, (Math.sqrt(fishData[i].aquacultureProduction) / 50));

        textSize(10);
        text(fishData[i].Entity, x, y)
    }
    //save("captureAbsolute.svg"); // give file name
    //print("saved svg");
}