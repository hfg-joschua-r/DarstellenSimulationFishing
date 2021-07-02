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
let size = '20px';
let unit = "Aquaculture production";
let colAquaPP = '#3B82C4';
let colback = '#343146';
let colAquaAb = '#00B4C9';
let colConPP = '#FFBA65';
let colCapAb = '#E88570';
let colCapPP = '#386E93';
let lightGrey = '#6F4968';

function setup() {
    engine = Engine.create();
    createCanvas(1600, 1100);

    //showCapturePP();
    //showConsumptionPP();
    //showCaptureAbsolute();

    // run the engine
    engine.world.gravity.y = 0;


    Matter.Runner.run(engine);
    //matterCapturePP();
    //matterConsumptionPP();
    //matterAquaPP();
    //matterCaptureAbsolute();
    matterAquaAbsolute();

    createButtonAqauPP();
    createButtonAquaAbsolute();
    createButtonConsumptionPP();
    createButtonCapturePP();
    createButtonCaptureAbsulte();


}


function draw() {
    //background(220);

    background(colback);
    noStroke();
    fill(colR.r, colR.g, colR.b, 180);
    fill(0, 102, 153);

    for (let i = 0; i < BodyArray.length; i++) {
        fill(BodyArray[i].col);

        drawBody(BodyArray[i]);

        if (dist(mouseX, mouseY, BodyArray[i].position.x, BodyArray[i].position.y) <= BodyArray[i].circleRadius) {
            console.log(BodyArray[i].entity);
            fill(255);
            //text(BodyArray[i].entity, mouseX, mouseY);
            textAlign(CENTER);
            textFont('Helvetica');

            textSize(24);
            text((BodyArray[i].entity + ":  " + BodyArray[i].value + unit), 800, 850);
        }
    }
    //underline balken
    switch (unit) {
        case " kg anual aquaculture production per citizen": // +100 - 60 - 40 -40 -60
            rect(1080, 1000, 70, 10);
            break;
        case " kg anual catch per citizen": //capture pp
            rect(1365, 1000, 70, 10);
            break;
        case " metric tons (aquaculture)":
            rect(185, 1000, 70, 10);
            break;
        case " metric tons (catch)":
            rect(480, 1000, 70, 10);
            break;
        case " kg anual consumption per citizen":
            rect(775, 1000, 70, 10);
            break;
    }
}
let aquaPPbuttonInst;
let aquaAbsoButton;
let consumptionButton;
let captureAbsoButton;
let captPPButton;

function createButtonAqauPP() {

    aquaPPbuttonInst = createButton('Aquaculture production per person');
    aquaPPbuttonInst.position(970, 920);
    aquaPPbuttonInst.mousePressed(aquaPPButton);
    aquaPPbuttonInst.style('fontSize', size);
    aquaPPbuttonInst.style('color', colAquaPP);
    aquaPPbuttonInst.style('background-color', 'inherit')
    aquaPPbuttonInst.style('margin', '20px')
    aquaPPbuttonInst.style('width', '250px')
    aquaPPbuttonInst.style('border-style', 'none')
    aquaPPbuttonInst.style('display', 'inline-block')
}

function createButtonAquaAbsolute() {
    aquaAbsoButton = createButton('Aquaculture production');
    aquaAbsoButton.position(75, 920);
    aquaAbsoButton.mousePressed(aquaAbsoluteButton);
    aquaAbsoButton.style('fontSize', size);
    aquaAbsoButton.style('color', colAquaAb);
    aquaAbsoButton.style('background-color', 'inherit')
    aquaAbsoButton.style('margin', '20px')
    aquaAbsoButton.style('width', '250px')
    aquaAbsoButton.style('border-style', 'none')
    aquaAbsoButton.style('display', 'inline-block')
}

function createButtonConsumptionPP() {
    consumptionButton = createButton('Consumption per citizen');
    consumptionButton.position(665, 920);
    consumptionButton.mousePressed(consumptionPPButton);
    consumptionButton.style('fontSize', size);
    consumptionButton.style('color', colConPP);
    consumptionButton.style('background-color', 'inherit')
    consumptionButton.style('margin', '20px')
    consumptionButton.style('width', '250px')
    consumptionButton.style('border-style', 'none')
    consumptionButton.style('display', 'inline-block')
}

function createButtonCaptureAbsulte() {
    captureAbsoButton = createButton('Capture Production');
    captureAbsoButton.position(370, 920);
    captureAbsoButton.mousePressed(captureAbsoluteButton);
    captureAbsoButton.style('fontSize', size);
    captureAbsoButton.style('color', colCapAb);
    captureAbsoButton.style('background-color', 'inherit')
    captureAbsoButton.style('margin', '20px')
    captureAbsoButton.style('width', '250px')
    captureAbsoButton.style('border-style', 'none')
    captureAbsoButton.style('display', 'inline-block')
}

function createButtonCapturePP() {
    captPPButton = createButton('Capture production per person');
    captPPButton.position(1255, 920);
    captPPButton.mousePressed(capturePPButton);
    captPPButton.style('fontSize', size);
    captPPButton.style('color', colCapPP);
    captPPButton.style('width', '250px')
    captPPButton.style('background-color', 'inherit')
    captPPButton.style('margin', '20px')
    captPPButton.style('border-style', 'none')
    captPPButton.style('display', 'inline-block')
}

function capturePPButton() {
    BodyArray = [];
    unit = " kg anual catch per citizen"
    World.clear(engine.world);
    Engine.clear(engine);
    matterCapturePP();;
}

function aquaPPButton() {
    BodyArray = [];
    unit = " kg anual aquaculture production per citizen"
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaPP();;
}

function aquaAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons (aquaculture)"
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaAbsolute();;
}

function captureAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons (catch)"
    World.clear(engine.world);
    Engine.clear(engine);
    matterCaptureAbsolute();;
}

function consumptionPPButton() {
    BodyArray = [];
    unit = " kg anual consumption per citizen"
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
        let calculator = fishData[i].durchMesserKreisCapt
        ballInstance.value = ((calculator * calculator) / 100)
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
        ballInstance.col = colAquaPP;
        let calculator = fishData[i].durchMesserKreisAqua
        ballInstance.value = ((calculator * calculator) / 100)
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
        ballInstance.col = colAquaAb;
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