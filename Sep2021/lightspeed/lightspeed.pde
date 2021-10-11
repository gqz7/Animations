//GLOBAL VARS
//Noise algorithm that produces values used in this animation, not made by me
OpenSimplex2S noise;

//TEST VARS
final boolean isTesting = false;
boolean keepPrinting = true;
int printCount = 0;
int printLim = 100;
boolean switched = true;


final float fps = 60;
final float renderSpeed = .75;

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

Geometry geoRender;
SpaceRender spaceRender;
ThreeDimCam cam3D;
SpaceFlower spaceFlower;
ThreeDimLife lifeRender;
//NebulaController nebulaCtrl;
Nebula nebula;
SpaceDebris spaceDebris;

void settings () {

  size(WIDTH, HEIGHT, P3D); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  fullScreen();
}

void setup() {
  //set canvas size
  //set colormode
  colorMode(HSB, 10000, 100, 100);
  //create objects
  cam3D = new ThreeDimCam();
  geoRender = new Geometry();
  spaceRender = new SpaceRender();
  spaceFlower = new SpaceFlower();
  lifeRender = new ThreeDimLife();
  //nebulaCtrl = new NebulaController();

  nebula = new Nebula();

  spaceDebris = new SpaceDebris();

  noise = new OpenSimplex2S( 314159265 ); 

  spaceRender.starGenesis();
  lifeRender.lifeGenesis(2);
  //nebulaCtrl.birthNebula();
  spaceDebris.spawnGalaxies();
  spaceDebris.spawnDust();
  noStroke();
  noCursor();
  frameRate(fps);

  //println(startingZ);
  //create planet shape which will be rendered every frame
  //planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 


  perspective(PI/2.25, width/height, 1, 4000);
  //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  
  //println(radius);

  if (!isPaused) {
    frames+=renderSpeed;
    time++;

    cam3D.configureCamera(cameraSelection);

    //println(frames);

    clear(); // reset screen
    //background(0);

    blendMode(ADD);
    spaceRender.displayStars();


    geoRender.renderMain();



    //nebulaCtrl.renderNebula();

    //lifeRender.lifeGenesis(2);
    //lifeRender.renderLife();

    if (isTesting) {
      //render camera paths
      cam3D.renderCamGumball();
      //println(frames, radius);
    } 


    //if (switched && frames > 10000) {

    //  isPaused = true;

    //}


    saveFrame("../../../sakura/img_######.png");
  }



  //pop();
  //planet.render();
}


void keyPressed() {
  switch (key) {
  case ' ': 
    isPaused = !isPaused;
    break;
  }
}
