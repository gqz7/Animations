//imports
import controlP5. *;

//GLOBAL VARS
//Noise algorithm that produces values used in this animation, not made by me
OpenSimplex2S noise;

//TEST VARS
final boolean isTesting = false;
boolean keepPrinting = true;
int printCount = 0;
int printLim = 100;
boolean switched = true;

//CONTROLERS
ControlP5 controller;
ControlGroup gui;

final float fps = 60;
float renderSpeed = .85;

//tracker for how many frames have elapsed
boolean isPaused = false;
float frames;
int time; //kindof like frames but frames will always increase by one. Time by increase at a slower or quicker rate for 
int count;

//width and height of canvas 
//to change the resolution update both the WIDTH AND HEIGHT also change the values on  line 48
final int WIDTH = 3840;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680
final int HEIGHT = 2160;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //950
final float centerX = WIDTH/2;
final float centerY = HEIGHT/2;
final float maxDistance = centerX+centerY;//centerX+centerY;

Planet planet;

Infinity infinity;
Matrix matrix;
Geometry geoRender;
SpaceRender spaceRender;
ThreeDimCam cam3D;
SpaceFlower spaceFlower;
ThreeDimLife lifeRender;
//NebulaController nebulaCtrl;
Nebula nebula;
SpaceDebris spaceDebris;

void settings() {
  //set canvas size
  size(WIDTH, HEIGHT, P3D); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  // fullScreen();
}

void setup() {
  //set colormode
  colorMode(HSB, 10000, 100, 100, 1);
  //create objects
  controller = new ControlP5(this);
  cam3D = new ThreeDimCam();
  geoRender = new Geometry();
  spaceRender = new SpaceRender();
  spaceFlower = new SpaceFlower();
  lifeRender = new ThreeDimLife();
  nebula = new Nebula();
  spaceDebris = new SpaceDebris();
  noise = new OpenSimplex2S( 314159265 ); 
  infinity = new Infinity();
  matrix = new Matrix();
  //nebulaCtrl = new NebulaController();



  spaceRender.starGenesis();
  lifeRender.lifeGenesis(2);
  //nebulaCtrl.birthNebula();
  spaceDebris.spawnGalaxies();
  spaceDebris.spawnDust();
  noStroke(); 
  frameRate(fps);

  //planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 

  createGUI();
  if (isTesting) {
    gui.show();
  } else {
    noCursor();
    gui.hide();
  }
  // noLoop(); ///uncomment to only render one frame

  //set up controllers

}

//loop function that runs on a loop 
void draw() {
  
  //println(radius);

  perspective(1.5, width/height, 1, 4000);
  cam3D.configureCamera(cameraSelection);

  if (!isPaused) {
    //println(frames);
    frames+=renderSpeed;
    time++;
    // saveFrame("../../../sakura314/img_######.png");
  }

  renderScene();

}

void renderScene () {
  clear(); // reset screen
    //background(0);
    
    spaceRender.displayStars();

    geoRender.renderMain();

    // matrix.render();
    infinity.render();
    
    //nebulaCtrl.renderNebula();
    //lifeRender.lifeGenesis(2);
    //lifeRender.renderLife();

    if (isTesting) {
      // cam3D.renderCamGumball();

      //sphere 
      // noFill();
      // stroke(10000);
      // sphere(500);
      renderGUI();
    } 

    //planet.render();

}

void printTestOutput () {

  String var1 = "1: " + cameraSelection;
  String var2 = "2: " + radius;
  String var3 = "3: " + globalAngl;
  String var4 = "4: " + infinityVar;

  push();

    noStroke();
    fill(0);
    rect(0, 0, 200, 300, 0, 0, 20, 0); 

    fill(10000);
    text(var1, 40, 60);
    text(var2, 40, 90);
    text(var3, 40, 120);
    text(var4, 40, 150);
    
  pop();
}

void renderGUI () {
  textSize(20);
  blendMode(BLEND);
  camera();
  perspective();
  printTestOutput();
  
}

void createGUI () {
    Slider slider1 = controller.addSlider("cameraSelection")
     .setPosition(30,0)
     .setRange(0,5);

    Slider slider2 = controller.addSlider("infinityVar")
     .setPosition(30,20)
     .setRange(1,10);

    Slider slider3 = controller.addSlider("globalAngl")
     .setPosition(30,40)
     .setRange(.01,.5);

    Slider slider4 = controller.addSlider("renderSpeed")
     .setPosition(30,60)
     .setRange(.5,5);

    gui = controller.addGroup("gui", 0, 400, 300);
    
    gui.setBackgroundHeight(80);
    // gui.setBackgroundColor(color(0,100));
    gui.hideBar();

    slider1.moveTo(gui);
    slider2.moveTo(gui);
    slider3.moveTo(gui);
    slider4.moveTo(gui);

}

void keyPressed() {
  switch (key) {
    case ' ': 
      isPaused = !isPaused;
      break;

    case 'p': 
      println(camTiltX, camTiltY);
      break;
      
  }

  

}
