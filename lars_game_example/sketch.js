var microBit;
var canvas;
var button;
var MARGIN = 40;

//SPRITES VARIABLES
var boats;
var boatsImage;
var containers;
var lars;

//Character moves variables
// x position variable
var xpos;
// y position variable
var ypos;
var moveX, moveY;
// target x and y positions
var targetX;
var targetY;
// easing variable
var easing = 0.05;

//API VARIABLES
var temp;

function preload() {
  fontBold=loadFont("assets/RobotoMono-Bold.ttf");
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=SHA';
  loadJSON(url, gotWeather);
}

function setup() {
//Let's create a full screen canvas
createCanvas(windowWidth, windowHeight);
xpos=width/2;
ypos=height/2

// Here we add the microbit
microBit=new uBit();

// Here we create the pairing interface
button = createButton('connect microBit');
button.position(width-200,height-40);
button.mousePressed(searchDevice); // attach button listener

boats = new Group();
containers=new Group();

for(var i = 0; i<20; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = int(random(0,height));
  var sp= random(0.1,0.3);
  createBoats("boat", px, py, sp);
  }

  createLars(width/2, height/2);

}

function draw() {
  // Comment this out to avoid having your console flooded with numbers
  check_Microbit_values();

  background(0,140,255);
  boatsTitle();

  updateBoats();
  updateLars();
  defineCollisions();
  drawSprites();
}


function defineCollisions(){
  boats.bounce(boats);
  boats.bounce(containers);
  containers.bounce(lars);
  boats.collide(lars, boatHit);
}

function updateBoats(){
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
}

function updateLars(){
  // calculate the new xpos value
    var dx = targetX - xpos;
    if(abs(dx) > 1) {
      xpos += dx * easing;
    }
    // calculate the new ypos value
    var dy = targetY - ypos;
    if(abs(dy) > 1) {
      ypos += dy * easing;
    }
  lars.position.x=xpos;
  lars.position.y=ypos;
  targetX = xpos - moveX/50;
  targetY = ypos - moveY/50;
}

function boatsTitle(){
  textFont(fontBold);
  fill(255,255, 255);
  textAlign(CENTER);
  textSize(20);
  text("Keep Lars from melting and destroying boats.", width/2, 40);
  textSize(15);
  text("it's "+ temp+ " degrees!", width/2, 60);
  //console.log(temp);
}

function meltingTitle(){
  textFont(fontBold);
  textAlign(CENTER);
  fill(255,255, 255);
  textSize(20);
  text("Keep Lars from melting!", width/2, 40);
  text("it's "+ temp+ " degrees around here!", width/2, 60);
  fill(255,255, 255);
  textSize(30);
  text("Water level +0.001m", width/2, height-40);
}





function check_Microbit_values() {
  //console.log ("acceleration",microBit.getAccelerometer());
  moveX=microBit.getAccelerometer().x;
  moveY=microBit.getAccelerometer().y;
  console.log ("x: "+ moveX);
  console.log ("y: "+ moveY);
  //console.log ("temperature",microBit.getTemperature());
  //console.log ("bearing",microBit.getBearing());
  //console.log ("buttonA",microBit.getButtonA());
  //console.log ("buttonB",microBit.getButtonB());
}

function searchDevice(){
  microBit.searchDevice();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function gotWeather(weather) {
  temp = weather.current.temp_c;
}
