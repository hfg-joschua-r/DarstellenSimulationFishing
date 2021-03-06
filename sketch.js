var colR = {
    r: 255,
    g: 0,
    b: 0,
};
var colB = {
    r: 0,
    g: 0,
    b: 255,
};
var colMix = {
    r: 100,
    g: 100,
    b: 100,
};

//Load matter js operators
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

//initiate bodyArray
let BodyArray = [];
let button;
let size = "20px";
let unit = " metric tons (aquaculture)";
//define our colors
let colAquaPP = "#3B82C4";
let colback = "#343146";
let colAquaAb = "#00B4C9";
let colConPP = "#FFBA65";
let colCapAb = "#E88570";
let colCapPP = "#386E93";
let lightGrey = "#6F4968";

//define offsets for our content
let yOffset = 100;
let xOffset = 150;

function setup() {
    //initiate matter.js engine
    engine = Engine.create();
    createCanvas(1700, 940);

    //Functions for old variant with overlapping circles
    //showCapturePP();
    //showConsumptionPP();
    //showCaptureAbsolute();

    //set our matter.js Gravity to 0
    engine.world.gravity.y = 0;
    // run the engine
    Matter.Runner.run(engine);

    //Matter.js functions 
    //matterCapturePP();
    //matterConsumptionPP();
    //matterAquaPP();
    //matterCaptureAbsolute();
    matterAquaAbsolute();

    //Create Buttons for our UI 
    createButtonAqauPP();
    createButtonAquaAbsolute();
    createButtonConsumptionPP();
    createButtonCapturePP();
    createButtonCaptureAbsulte();
}

function draw() {
    //set the background color 
    background(colback);
    noStroke();

    //For each body in our BodyArray ==> draw it
    for (let i = 0; i < BodyArray.length; i++) {
        //set the according fill Color
        fill(BodyArray[i].col);
        drawBody(BodyArray[i]);

        //Check for mouse Hovers over each Body
        if (
            dist(mouseX, mouseY, BodyArray[i].position.x, BodyArray[i].position.y) <=
            BodyArray[i].circleRadius
        ) {
            //show country name + value in text
            fill(255);
            textAlign(CENTER);
            textFont("Helvetica");
            textSize(24);
            //Format the value to be seperated by points. For readability
            let value = new Intl.NumberFormat().format(
                Math.round(BodyArray[i].value)
            );
            text(BodyArray[i].entity + ":  " + value + unit, 800, 850 - yOffset);
        }
    }
    //underline bar under chosen topic
    switch (unit) {
        case " kg anual aquaculture production per citizen": // +100 - 60 - 40 -40 -60
            rect(1080, 1000 - yOffset, 70, 10);
            break;
        case " kg anual catch per citizen": //capture pp
            rect(1365, 1000 - yOffset, 70, 10);
            break;
        case " metric tons (aquaculture)":
            rect(185, 1000 - yOffset, 70, 10);
            break;
        case " metric tons (catch)":
            rect(480, 1000 - yOffset, 70, 10);
            break;
        case " kg anual consumption per citizen":
            rect(775, 1000 - yOffset, 70, 10);
            break;
    }
}
//Initiate our button instances
let aquaPPbuttonInst;
let aquaAbsoButton;
let consumptionButton;
let captureAbsoButton;
let captPPButton;

function createButtonAqauPP() {
    aquaPPbuttonInst = createButton("Aquaculture production per citizen");
    aquaPPbuttonInst.position(970, 920 - yOffset);
    aquaPPbuttonInst.mousePressed(aquaPPButton);
    aquaPPbuttonInst.style("fontSize", size);
    aquaPPbuttonInst.style("color", colAquaPP);
    aquaPPbuttonInst.style("background-color", "inherit");
    aquaPPbuttonInst.style("margin", "20px");
    aquaPPbuttonInst.style("width", "250px");
    aquaPPbuttonInst.style("border-style", "none");
    aquaPPbuttonInst.style("display", "inline-block");
}

function createButtonAquaAbsolute() {
    aquaAbsoButton = createButton("Aquaculture production");
    aquaAbsoButton.position(75, 920 - yOffset);
    aquaAbsoButton.mousePressed(aquaAbsoluteButton);
    aquaAbsoButton.style("fontSize", size);
    aquaAbsoButton.style("color", colAquaAb);
    aquaAbsoButton.style("background-color", "inherit");
    aquaAbsoButton.style("margin", "20px");
    aquaAbsoButton.style("width", "250px");
    aquaAbsoButton.style("border-style", "none");
    aquaAbsoButton.style("display", "inline-block");
}

function createButtonConsumptionPP() {
    consumptionButton = createButton("Consumption per citizen");
    consumptionButton.position(665, 920 - yOffset);
    consumptionButton.mousePressed(consumptionPPButton);
    consumptionButton.style("fontSize", size);
    consumptionButton.style("color", colConPP);
    consumptionButton.style("background-color", "inherit");
    consumptionButton.style("margin", "20px");
    consumptionButton.style("width", "250px");
    consumptionButton.style("border-style", "none");
    consumptionButton.style("display", "inline-block");
}

function createButtonCaptureAbsulte() {
    captureAbsoButton = createButton("Wildcatch Production");
    captureAbsoButton.position(370, 920 - yOffset);
    captureAbsoButton.mousePressed(captureAbsoluteButton);
    captureAbsoButton.style("fontSize", size);
    captureAbsoButton.style("color", colCapAb);
    captureAbsoButton.style("background-color", "inherit");
    captureAbsoButton.style("margin", "20px");
    captureAbsoButton.style("width", "250px");
    captureAbsoButton.style("border-style", "none");
    captureAbsoButton.style("display", "inline-block");
}

function createButtonCapturePP() {
    captPPButton = createButton("Wildcatch per citizen");
    captPPButton.position(1255, 920 - yOffset);
    captPPButton.mousePressed(capturePPButton);
    captPPButton.style("fontSize", size);
    captPPButton.style("color", colCapPP);
    captPPButton.style("width", "250px");
    captPPButton.style("background-color", "inherit");
    captPPButton.style("margin", "20px");
    captPPButton.style("border-style", "none");
    captPPButton.style("display", "inline-block");
}
//Function for button clicks and switches
function capturePPButton() {
    BodyArray = [];
    unit = " kg anual catch per citizen";
    World.clear(engine.world);
    Engine.clear(engine);
    matterCapturePP();
}

function aquaPPButton() {
    BodyArray = [];
    unit = " kg anual aquaculture production per citizen";
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaPP();
}

function aquaAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons (aquaculture)";
    World.clear(engine.world);
    Engine.clear(engine);
    matterAquaAbsolute();
}

function captureAbsoluteButton() {
    BodyArray = [];
    unit = " metric tons (catch)";
    World.clear(engine.world);
    Engine.clear(engine);
    matterCaptureAbsolute();
}

function consumptionPPButton() {
    BodyArray = [];
    unit = " kg anual consumption per citizen";
    World.clear(engine.world);
    Engine.clear(engine);
    matterConsumptionPP();
}

//Function to generate Bodies for the capture per Citizen
function matterCapturePP() {
    //For each entry in the data set
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance; //Instantiate a variable for our Circle

        //Set and map the longitude & latitude values to the canvas
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(x1, y1, fishData[i].durchMesserKreisCapt / 7); //Generate circle with the right diameter
        ballInstance.entity = fishData[i].Entity; //Save the country name in the .entity prop
        ballInstance.col = colCapPP; //set the Color for the circle
        let calculator = fishData[i].durchMesserKreisCapt;
        ballInstance.value = (calculator * calculator) / 100; //calculate the diameter back to Kilogram value
        if (fishData[i].durchMesserKreisCapt < 500) {
            //create constraint which hangs up the circle at the calculated position
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: 0, y: 0 },
                stiffness: 0.0001,
                damping: 0.1,
            });
        } else {
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: -900, y: 0 - 100 },
                stiffness: 0.001,
                damping: 0.1,
            });
        }
        World.add(engine.world, [ballInstance, constraint]); //add the circle and constraint to the matter.js Word
        drawConstraint(constraint);
        BodyArray.push(ballInstance); //Push the body to the body array to it can be drawn on each execution of draw()
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
        ballInstance = Bodies.circle(x1, y1, fishData[i].durchMesserKreisAqua / 7);
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colAquaPP;
        let calculator = fishData[i].durchMesserKreisAqua;
        ballInstance.value = (calculator * calculator) / 100; //calculate the diameter back to Kilogram value

        //create constraint which hangs up the circle at the calculated position
        constraint = Constraint.create({
            pointA: { x: x1, y: y1 },
            bodyB: ballInstance,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001,
            damping: 0.1,
        });
        World.add(engine.world, [ballInstance, constraint]); //add the circle and constraint to the matter.js Word
        BodyArray.push(ballInstance); //Push the body to the body array to it can be drawn on each execution of draw()
    }
}

function matterCaptureAbsolute() {
    for (let i = 0; i < fishData.length; i++) {
        let ballInstance;
        let x1 = round(fishData[i].longitude);
        let y1 = round(fishData[i].latitude);
        x1 = map(x1, -180, 180, 100, 1400);
        y1 = map(y1, -90, 90, 900, 100);
        ballInstance = Bodies.circle(
            x1,
            y1,
            Math.sqrt(fishData[i].captureProduction) / 50
        );
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colCapAb;
        ballInstance.value = fishData[i].captureProduction;
        constraint = Constraint.create({
            pointA: { x: x1, y: y1 },
            bodyB: ballInstance,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001,
            damping: 0.1,
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
        ballInstance = Bodies.circle(
            x1,
            y1,
            Math.sqrt(fishData[i].aquacultureProduction) / 50
        );
        ballInstance.entity = fishData[i].Entity;
        ballInstance.col = colAquaAb;
        ballInstance.value = fishData[i].aquacultureProduction;

        constraint = Constraint.create({
            pointA: { x: x1, y: y1 },
            bodyB: ballInstance,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001,
            damping: 0.1,
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
            ballInstance = Bodies.circle(
                x1,
                y1,
                Math.sqrt(fishData[i].fishConsumptionPP) * 2
            );
            ballInstance.entity = fishData[i].Entity;
            ballInstance.col = colConPP;
            ballInstance.value = fishData[i].fishConsumptionPP;
            constraint = Constraint.create({
                pointA: { x: x1, y: y1 },
                bodyB: ballInstance,
                pointB: { x: 0, y: 0 },
                stiffness: 0.0001,
                damping: 0.1,
            });
            World.add(engine.world, [ballInstance, constraint]);
            drawConstraint(constraint);
            BodyArray.push(ballInstance);
        } else {
            console.log(fishData[i].Entity);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// OBSOLETE FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////

//Old functions without matter.js
function showCapturePP() {
    noStroke();
    for (let i = 0; i < fishData.length; i++) {
        let x = fishData[i].longitude;
        let y = fishData[i].latitude;

        x = map(x, -180, 180, 0, 800);
        y = map(y, -90, 90, 600, 0);
        fill(colR.r, colR.g, colR.b, 100);
        circle(x, y, fishData[i].durchMesserKreisCapt / 5);
        fill(colB.r, colB.g, colB.b, 100);
        circle(x, y, fishData[i].durchMesserKreisAqua / 5);
        textSize(10);
        text(fishData[i].Entity, x, y);
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
        circle(x, y, fishData[i].fishConsumptionPP);
        textSize(10);
        text(fishData[i].Entity, x, y);
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
        circle(x, y, Math.sqrt(fishData[i].captureProduction) / 50);
        fill(colB.r, colB.g, colB.b, 100);
        circle(x, y, Math.sqrt(fishData[i].aquacultureProduction) / 50);

        textSize(10);
        text(fishData[i].Entity, x, y);
    }
}