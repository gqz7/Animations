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
  final int radiusLim = 100;
  float radius = 500;
  
 
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
  
  println(startingZ);
  //create planet shape which will be rendered every frame
  planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 
  
  
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
  
 //camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
 //push();
 //println(cos((float)mouseX/width)*width);
 
 
 float curZ = startingZ+radius;//map(mouseX, 0, width, -radius*2, radius*2);
 float curX = map(mouseX, 0, width, -radius*2, radius*2);
 float curY = map(mouseY, 0, height, -radius*2, radius*2);

  camera(
     curX,   //(float)mouseX/4 + width/8, //X
     curY,      //(float)mouseY/4 + height/8, //Y
     curZ,      //500-frames,  //Z
     0,      //centerX
     0,      //centerY
     0,      //centerZ
     0, 
     1, 
     0
  );
 
  perspective(PI/2, width/height, 5, 10000);

 
  //println(mouseX, mouseY, (float)mouseX/width, (float)mouseY/height);
  
  frames++;
 
  if (totalStars < maxStarCount && frames % 10 == 0 ) {
      stars[totalStars++] = new Star( random(-1000, 1000), random(-1000, 1000), random(-1000, 1000));
  }
  
  clear(); // reset screen
  //background(0); // reset background
  //translate(centerX, centerY, -1000);
  //translate(0, 0, -1000);
  
  displayStars();
  geoRender.renderMain();
  
  //pop();
  //planet.render();


//  int hue = abs(-360-frames) % 360;
//  fill(hue, 100, 100);
//  sphere(100);
  

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
