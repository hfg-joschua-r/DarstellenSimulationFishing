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
}

function draw() {
    //background(220);
    background(30);
    noStroke();
    fill(colR.r, colR.g, colR.b, 180);
    for (let i = 0; i < BodyArray.length; i++) {
        if (BodyArray[i].col === "r") {
            fill(colR.r, colR.g, colR.b, 180);
        } else if (BodyArray[i].col === "b") {
            fill(colB.r, colB.g, colB.b, 180);
        } else if (BodyArray[i].col === "g") {
            fill(colMix.r, colMix.g, colMix.b, 180);
        }

        drawBody(BodyArray[i]);

        if (dist(mouseX, mouseY, BodyArray[i].position.x, BodyArray[i].position.y) <= BodyArray[i].circleRadius) {
            console.log(BodyArray[i].entity);
            fill(255);
            text(BodyArray[i].entity, mouseX, mouseY);
        }

    }

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
        ballInstance.col = "r";
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
        ballInstance.col = "b";
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
        ballInstance.col = "r";
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
        ballInstance.col = "b";

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
            ballInstance.col = "g";
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