function Intro()
{
    var me = this;

    this.setup = function(){


    }
    this.draw = function()
    {
        background(0,140,255);
        drawIntroScreen();
    }

    this.keyPressed = function()
    {
        if (key == '1')
        {
            // Invoke the Game scene passing as argument the string '1' or '2'
            me.sceneManager.showScene( Temp );
        }
    }


    function drawIntroScreen()
    {

        textFont(fontBold);
        textAlign(CENTER);
        fill(255, 255, 255);
        textSize(20);
        text("Welcome to Lars!", width / 2, 200);
        text("a little game to learn about ice, temperature and climate change", width / 2, 220);
    }


}
