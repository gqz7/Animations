//GLOBAL VARS

  //width and height of canvas
  final int WIDTH = 2000;//3840; //1920 //1280 
  final int HEIGHT = 2000;//1024; //1080 //1024
  final float centerX = WIDTH/2;
  final float centerY = HEIGHT/2;
  final float maxDistance = centerX+centerY;
  
  final float speed = 1;
  
  final int maxStarCount = 777;
  final int startingTotal = (int) ( (float) maxStarCount * (float) .33);

  //CAMERA VARS
  final float startingZ = (height /2) / tan(PI / 6);
  final int camMLim = 3;
  float radius = 100;
  final int radiusLim = (int)radius/2;
  
 
  //tracker for how many frames have elapsed
  int frames;
  int count;
  int totalStars = 0;
  Star[] stars;

  Planet planet;
  
  Geometry geoRender;
  
void mouseWheel(MouseEvent event) {
  if (radius > radiusLim) {
    radius += event.getCount() * radiusLim;
  } else if ( radius == radiusLim && event.getCount() == 1) {
    radius = radiusLim * 2;
  }
}

void setup() {
  //set canvas size
  size(2000,2000, P3D); //h: 2160
  colorMode(HSB, 360, 100, 100);
  geoRender = new Geometry();
  stars = starGenesis();
  totalStars += startingTotal;
  //create instance of the simplex noise class
  background(0); // reset screen
  noStroke();
  noCursor();
  frameRate(60);
  
  //println(startingZ);
  //create planet shape which will be rendered every frame
  planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 
  
  
  perspective(PI/2, width/height, 5, 10000);
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
   
  configureCamera(false);
  
  frames++;
 
  if (totalStars < maxStarCount && frames % 10 == 0 ) {
      stars[totalStars++] = new Star( random(-1000, 1000), random(-1000, 1000), random(-1000, 1000));
  }
  
  clear(); // reset screen
  
  //displayStars();
  geoRender.renderMain();
  
  
  //render camera paths
  //renderCamPaths(); 
  
  //pop();
  //planet.render();

}

void displayStars() {
     
  for (int i = 0; i < totalStars; i++) {
    Star s = stars[i];
    s.display();
  }
}


Star[] starGenesis() { //width, height
     
       Star[] startingStars = new Star[maxStarCount];
     
       for ( int i = 0; i < startingTotal; i++ ) {
         
         float oX = (float) (random(width) - width/2);
         float oY = (float) ( random(height) - height/2);
         float oZ = random(-1000, 1000);
         
         startingStars[i] = new Star( oX, oY, oZ );
         
       }
   
       return startingStars;
};

void renderCamPaths() {
  
  int testRadius = 200;

  fill(100, 0, 100);
  noStroke();
  //noFill();
  //strokeWeight(10);
  
  int count = 0;
  
   float curX = cos(map(mouseX, 0, width, 0, PI*2))*testRadius;
   float curY = sin(map(mouseY, 0, height, 0, PI*2))*testRadius;
  
  
  for (float i = 0; i <= PI*2; i+=PI/100) {
    count++;
      //println(count, ((cos(i)*200)) );
    
    float cosI = cos(i)*testRadius;
    float sinI = sin(i)*testRadius;
    //float tanI = tan(i)*200;
    
    float sz = 3;
    
    if (cosI > curX+10 && cosI < curX-10) {
      
      fill(0, 100, 50);
       
    
    } else {
    
      fill(100, 0, 100);
        sz = 10;
    }   
    push();
     translate(cosI, 0, sinI);
     circle(0, 0, sz);
    pop();
    
    sz = 3;
    if (sinI > curY+10 && sinI < curY-10) {
      
      fill(0, 100, 50);
       sz = 10;
    
    } else {
    
      fill(100, 0, 100);
    
    }   
    
    
    push();
     translate(0, sinI, cosI);
     circle(0, 0, 10);
    pop();
    
  }

  float curZ = (curX+curY)/2;
  
  // println(curZ);
  
  fill(map(curZ, 0, testRadius, 0, 360), 100, 100);
  
  push();
   translate(curX, curY, curZ);
   circle(0, 0, map(curZ, -200, 200, 5, 50));
  pop();
  
  
}

void configureCamera(boolean autoRotate) { //<>//
  
     float curX, curY, curZ;

  if (autoRotate) {
     //AUTO ROTATE CAM
 
     float [] rotationP = {1000, 600, 400};
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
     
     curX = camPos[0];
     curY = camPos[1];
     curZ = camPos[2];

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
