//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;

  //width and height of canvas 
  //to change the resolution update both the WIDTH AND HEIGHT also change the values on  line 48
  final int WIDTH = 1504;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280
  final int HEIGHT = 846;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  final float centerX = WIDTH/2;
  final float centerY = HEIGHT/2;
  final float maxDistance = centerX+centerY;//centerX+centerY;
  

  //TEST VARS
  final boolean isTestingStars = false;
  boolean keepPrinting = true;
  int printCount = 0;
  int printLim = 100;
  
   //TEST PRINT CODE - insert this anywhere that needs to be tested but only a certain number of times (helpful in reoccuring loops)
   // if (printCount < printLim) {
   //  printCount++;
   //  println(); //insert test print statment
   //}
 
  //tracker for how many frames have elapsed
  float frames;
  int time; //kindof like frames but frames will always increase by one. Time by increase at a slower or quicker rate for 
  int count;

  Planet planet;
  
  Geometry geoRender;
  SpaceRender spaceRender;
  ThreeDimCam cam3D;
  SpaceFlower spaceFlower;

void setup() {
  //set canvas size
  size(1504, 846, P3D); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  //set colormode
  colorMode(HSB, 360, 100, 100);
  
  //create objects
  cam3D = new ThreeDimCam();
  geoRender = new Geometry();
  spaceRender = new SpaceRender();
  spaceFlower = new SpaceFlower();
  noise = new OpenSimplex2S( 314159265 );

  spaceRender.starGenesis();
  //create instance of the simplex noise class
  background(0); // reset screen
  noStroke();
  noCursor();
  frameRate(60);
  
  //println(startingZ);
  //create planet shape which will be rendered every frame
  //planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 
  
  
  perspective(PI/2, width/height, 5, 100000);
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
   
  cam3D.configureCamera(cameraSelection);
  
  frames+=.5;
  time++;
  //if (totalStars < maxStarCount && frames % 10 == 0 ) {
  //    stars[totalStars++] = new Star( random(-10000, 10000), random(-10000, 10000), random(-10000, 10000));
  //}
  
  clear(); // reset screen
    
  //spaceRender.displayStars();
  
  if (isTestingStars) {
    //render camera paths
    cam3D.renderCamGumball(); 
    
  } else {
    geoRender.renderMain();
  
  }

  //saveFrame("../../../../../Art/Renders/61021/img_#####.png");
  //pop();
  //planet.render();

}
