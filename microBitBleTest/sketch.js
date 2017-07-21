var microBit;
var canvas;
var button;

var iconLeft = [
  ['0', '0', '1', '0', '0'],
  ['0', '1', '0', '0', '0'],
  ['1', '1', '1', '1', '1'],
  ['0', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0']
]
var iconRight = [
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '0'],
  ['1', '1', '1', '1', '1'],
  ['0', '0', '0', '1', '0'],
  ['0', '0', '1', '0', '0']
]

function preload() {

}

function setup() {
  canvas = createCanvas(600, 400);

  microBit=new uBit();

  button = createButton('connect microBit');
  button.mousePressed(searchDevice); // attach button listener


}

function draw() {
  background(23);
  if (microBit.connected){
    // console.log ("acceleration",microBit.getAccelerometer());
    // console.log ("temperature",microBit.getTemperature());
    // console.log ("bearing",microBit.getBearing());
    // console.log ("buttonA",microBit.getButtonA());
    // console.log ("buttonB",microBit.getButtonB());


    if (microBit.getButtonA()){
      microBit.writeLedsIcon(iconLeft);
    }

    if (microBit.getButtonB()){
      microBit.writeLedsIcon(iconRight);
    }
  }

}


function searchDevice(){
  microBit.searchDevice();
}





// var discoveryButton = document.getElementById('discover')
//
// discoveryButton.addEventListener('pointerup', function(event) {
//   searchDevice();
// });
