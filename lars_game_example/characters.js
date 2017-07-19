function createLars(x,y){
  lars = createSprite(x, y);
  var img  = loadImage("assets/lars.png");
  lars.addImage(img);
  lars.mass = 10;
  lars.setCollider("circle", 0, 0, 60);
}

function createBoats(type, x, y,s) {
  var a = createSprite(x, y);
  a.type = type;
  // console.log(type);
  var img  = loadImage("assets/"+type+".png");
  a.addImage(img);
  a.setSpeed(s, 0);
  a.rotationSpeed = 0;
  //a.debug = true;
  a.scale = .2;

  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 100);
  boats.add(a);
  return a;
}

function boatHit(boats, lars) {

for(var i=0; i<10; i++) {
  var p = createSprite(boats.position.x, boats.position.y);
  p.addImage(loadImage('assets/container.png'));
  p.setSpeed(random(0.1,0.2), random(360));
  p.scale=0.2;
  p.mass=0.1;
  p.life=100;
  containers.add(p);

  }

boats.remove();

}
