var position={};

position.X=100;
position.Y=100;

  function setup(){

  }

  function draw(){
    fill(255,200,67);
    ellipse(position.X, position.Y,50,50);

    if(keyDown("c") || mouseDown(RIGHT)){
      position.X++;
    }
  }
