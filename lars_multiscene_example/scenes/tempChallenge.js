function Temp()
{
  var me = this;

  this.setup = function(){


  }
  this.draw = function()
  {
      drawIntroScreen();
  }

  this.keyPressed = function()
  {
      if (key == '1')
      {
          // Invoke the Game scene passing as argument the string '1' or '2'
          me.sceneManager.showScene( Move );
      }
  }

    function drawIntroScreen()
    {
        background(0,140,255);
        textFont(fontBold);
        textAlign(CENTER);
        fill(255, 255, 255);
        textSize(20);
        textFont(fontBold);
        text("Keep Lars from melting!", width/2, 40);
        text("it's "+ me.sceneManager.localTemp+ " degrees around here!", width/2, 60);
    }

}
