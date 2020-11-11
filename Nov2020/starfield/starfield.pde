//GLOBAL VARS

  //width and height of canvas
  final int WIDTH = 3840;//3840; //1920
  final int HEIGHT = 2160;//2160; //1080
  final float centerX = WIDTH/2;
  final float centerY = HEIGHT/2;
  final float maxDistance = centerX+centerY;
  
  final float speed = 1;
  
  final int maxStarCount = 777;
  final int startingTotal = (int) ( (float) maxStarCount * (float) .33);
  //tracker for how many frames have elapsed
  int frames;
  int count;
  int totalStars = 0;
  Star[] stars;

  Planet planet;

void setup() {
  //set canvas size
  size(3840,2160, P3D); //h: 2160
  colorMode(HSB, 360, 100, 100);
  stars = starGenesis();
  totalStars += startingTotal;
  //create instance of the simplex noise class
  background(0); // reset screen
  noStroke();
  noCursor();
  frameRate(60);
  
  //create planet shape which will be rendered every frame
  planet = new Planet("./earth-render.jpg", 200); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 
  
  
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
 camera(mouseX, mouseY, (height/2) / tan(PI/6), width/2, height/2, 0, 0, 1, 0);
  
  frames++;
 
  if (totalStars < maxStarCount && frames % 10 == 0 ) {
      stars[totalStars++] = new Star( random(-1000, 1000), random(-1000, 1000), random(-1000, 1000));
  }
  
  clear(); // reset screen
  //background(0); // reset background
  translate(centerX, centerY, -1000);
  
  displayStars();
  
  planet.render();


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
