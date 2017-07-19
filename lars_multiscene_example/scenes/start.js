var fontBold;
var localTemp;
var microBit;

function preload()
{
  fontBold=loadFont("assets/RobotoMono-Bold.ttf");
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=SHA';
  loadJSON(url, gotWeather);
}

function setup()
{
    createCanvas(windowWidth, windowHeight);

    microBit=new uBit();
    // Here we create the pairing interface
    button = createButton('connect microBit');
    button.position(width-200,height-40);
    button.mousePressed(searchDevice); // attach button listener

    var mgr = new SceneManager();
    mgr.localTemp = localTemp; // create localTemp property
    mgr.wire();
    mgr.showScene( Intro );
    console.log(mgr.localTemp);
}

function gotWeather(weather) {
  localTemp = weather.current.temp_c;

}
function searchDevice(){
  microBit.searchDevice();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
