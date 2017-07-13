function setup() {

}

function draw() {

}


function microbit_updated(event) {
  // Here we have to figure out what the microbit is sending to us
  if (event.target.uuid=='19b10011-e8f2-537e-4f6c-d104768a1214'){
    console.log("shake detected");
    // Each Event has a related function
    shake();
  }else if(event.target.uuid=='19b10012-e8f2-537e-4f6c-d104768a1214'){
    console.log("button pressed");
    console.log(event.target.value);
    buttonA(event.target.value);
  } else if(event.target.uuid=='19b10013-e8f2-537e-4f6c-d104768a1214'){
    console.log("button pressed");
    console.log(event.target.value);
    buttonB(event.target.value);
  }
  // here we need to add all the events depending on what we pass from microbit side...
}

function shake() {

}

function orientation() {

}

function accellerometer() {

}

function button_a(var state) {

}

function button_b(var state) {

}

function matrix() {

}
