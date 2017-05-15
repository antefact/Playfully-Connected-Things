var position={};

position.X=100;
position.Y=200;

  function setup(){

  }

  function draw(){
    fill(10,20,200);
    ellipse(position.X, position.Y,50,50);

    if(keyDown("b") || mouseDown(RIGHT)){
      position.X++;
    }
  }
