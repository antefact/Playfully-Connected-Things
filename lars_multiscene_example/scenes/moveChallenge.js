function Move() {
    var me = this;
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

    this.setup = function() {
      // Here we add the microbit
      microBit=new uBit();
      xpos=width/2;
      ypos=height/2



        boats = new Group();
        containers = new Group();

        for (var i = 0; i < 20; i++) {
            var ang = random(360);
            var px = width / 2 + 1000 * cos(radians(ang));
            var py = int(random(0, height));
            var sp = random(0.1, 0.3);
            createBoats("boat", px, py, sp);
        }

        createLars(width / 2, height / 2);
    }
    this.draw = function() {
        get_Microbit_values();
        drawIntroScreen();
    }
    this.keyPressed = function()
    {
        if (key == '1')
        {
            // Invoke the Game scene passing as argument the string '1' or '2'
            me.sceneManager.showScene( Over );
        }
    }

    function drawIntroScreen() {
        background(0, 140, 255);
        textFont(fontBold);
        textAlign(CENTER);
        fill(255, 255, 255);
        textSize(20);
        textFont(fontBold);
        text("Keep Lars from destroying ships", width / 2, 40);

        updateBoats();
        updateLars();
        defineCollisions();
        drawSprites();

    }
    function get_Microbit_values() {
        //console.log ("acceleration",microBit.getAccelerometer());
        moveX = microBit.getAccelerometer().x;
        moveY = microBit.getAccelerometer().y;
        console.log("x: " + moveX);
        console.log("y: " + moveY);
        //console.log ("temperature",microBit.getTemperature());
        //console.log ("bearing",microBit.getBearing());
        //console.log ("buttonA",microBit.getButtonA());
        //console.log ("buttonB",microBit.getButtonB());
    }

    function createLars(x, y) {
        lars = createSprite(x, y);
        var img = loadImage("assets/lars.png");
        lars.addImage(img);
        lars.mass = 10;
        lars.setCollider("circle", 0, 0, 60);
    }

    function createBoats(type, x, y, s) {
        var a = createSprite(x, y);
        a.type = type;
        // console.log(type);
        var img = loadImage("assets/" + type + ".png");
        a.addImage(img);
        a.setSpeed(s, 0);
        a.rotationSpeed = 0;
        //a.debug = true;
        a.scale = .2;

        a.mass = 2 + a.scale;
        a.setCollider("circle", 0, 0, 100);
        boats.add(a);
        return a;
    }

    function boatHit(boats, lars) {

        for (var i = 0; i < 10; i++) {
            var p = createSprite(boats.position.x, boats.position.y);
            p.addImage(loadImage('assets/container.png'));
            p.setSpeed(random(0.1, 0.2), random(360));
            p.scale = 0.2;
            p.mass = 0.1;
            p.life = 100;
            containers.add(p);

        }

        boats.remove();

    }

    function defineCollisions() {
        boats.bounce(boats);
        boats.bounce(containers);
        containers.bounce(lars);
        boats.collide(lars, boatHit);
    }

    function updateBoats() {
        for (var i = 0; i < allSprites.length; i++) {
            var s = allSprites[i];
            if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
            if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
            if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
            if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
        }
    }

    function updateLars() {
        // calculate the new xpos value
        var dx = targetX - xpos;
        if (abs(dx) > 1) {
            xpos += dx * easing;
        }
        // calculate the new ypos value
        var dy = targetY - ypos;
        if (abs(dy) > 1) {
            ypos += dy * easing;
        }
        lars.position.x = xpos;
        lars.position.y = ypos;
        targetX = xpos - moveX / 50;
        targetY = ypos - moveY / 50;
    }



}
