//GLOBAL VARS

  //width and height of canvas 
  //to change the resolution update both the WIDTH AND HEIGHT also change the values on  line 48
  final int WIDTH = 2222;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280
  final int HEIGHT = 2222;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  final float centerX = WIDTH/2;
  final float centerY = HEIGHT/2;
  final float maxDistance = centerX+centerY;//centerX+centerY;
  

  //CAMERA VARS
  final float startingZ = (height /2) / tan(PI / 6);
  final int camMLim = 3;
  boolean autoRotateCam = false;
  float radius = 2000;
  final int radiusLim = (int)radius/20;
  
  //TEST VARS
  final boolean isTestingStars = false;
  boolean keepPrinting = false;
  int printCount = 0;
  int printLim = 100;
  
   //TEST PRINT CODE - insert this anywhere that needs to be tested but only a certain number of times (helpful in reoccuring loops)
   // if (printCount < printLim) {
   //  printCount++;
   //  println(); //insert test print statment
   //}
 
  //tracker for how many frames have elapsed
  int frames;
  int count;

  Planet planet;
  
  Geometry geoRender;
  SpaceRender spaceRender;
  
void mouseWheel(MouseEvent event) {
  if (radius > radiusLim) {
    radius += event.getCount() * radiusLim;
  } else if ( radius == radiusLim && event.getCount() == 1) {
    radius = radiusLim * 2;
  }
}

void setup() {
  //set canvas size
  size(2222,   2222, P3D); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  colorMode(HSB, 360, 100, 100);
  geoRender = new Geometry();
  spaceRender = new SpaceRender();
  spaceRender.starGenesis();
  //create instance of the simplex noise class
  background(0); // reset screen
  noStroke();
  noCursor();
  frameRate(60);
  
  //println(startingZ);
  //create planet shape which will be rendered every frame
  planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 
  
  
  perspective(PI/2, width/height, 5, 100000);
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
   
  configureCamera(autoRotateCam);
  
  frames++;
 
  //if (totalStars < maxStarCount && frames % 10 == 0 ) {
  //    stars[totalStars++] = new Star( random(-10000, 10000), random(-10000, 10000), random(-10000, 10000));
  //}
  
  clear(); // reset screen
  
  spaceRender.displayStars();
  
  if (isTestingStars) {
    //render camera paths
    geoRender.renderCamGumball(); 
    
  } else {
    geoRender.renderMain();
  
  }
  
  //pop();
  //planet.render();

}





void configureCamera(boolean autoRotate) { //<>// //<>//
  
     float curX, curY, curZ;

  if (autoRotate) {
     //AUTO ROTATE CAM
 
     float [] rotationP = {777, 872, 4142};
     float [] camPos = new float [3];
     
     for (int i = 0; i < rotationP.length; i++) {
       
       float rotationPX = rotationP[i];
       
       float framesMod = frames%rotationPX;
       float camP = framesMod < rotationPX/2 + 1 
          ? framesMod < rotationPX/4 + 1 
            ? map( framesMod/rotationPX, 0, .25, 0, -1)
            : map( framesMod/rotationPX, .25, .5, -1, 0)
          : framesMod < rotationPX/4*3 + 1
            ? map( framesMod/rotationPX, .5, .75, 0, 1)
            : map( framesMod/rotationPX, .75, 1, 1, 0);
            
       camPos[i] = camP * radius; 
     
     }
     
     curX = camPos[0]+24;
     curY = camPos[1]+12;
     curZ = 1000;//camPos[2]/10+10;
     
} else {
     //MOUSE CONTROLED CAM
     curX = cos(map(mouseX, 0, width, 0, PI*2))*radius;
     curY = sin(map(mouseY, 0, height, 0, PI*2))*radius;
     curZ = cos(map(mouseX, 0, width, 0, PI))*radius;
      
  }
 

  camera(
     curX,   //(float)mouseX/4 + width/8, //X
     curY,   //(float)mouseY/4 + height/8, //Y
     curZ,   //500-frames,  //Z
     0,      //centerX
     0,      //centerY
     0,      //centerZ
     0, 
     1, 
     0
  );
 
 
 

}
