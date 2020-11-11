//GLOBAL VARS

  //width and height of canvas
  final int WIDTH = 3840;//3840; //1920
  final int HEIGHT = 2160;//2160; //1080
  final float centerX = WIDTH/2;
  final float centerY = HEIGHT/2;
  final float maxDistance = centerX+centerY;
  
  final int maxStarCount = 777;
  final int startingTotal = (int) ( (float) maxStarCount * (float) .20);
  //tracker for how many frames have elapsed
  int frames = 0;
  
  int totalStars = 0;
  Star[] stars;
  

void setup() {
  //set canvas size
  size(3840,2160); //h: 2160
  
  stars = starGenesis();
  totalStars += startingTotal;
  //create instance of the simplex noise class
  background(0); // reset screen
  noStroke();
  
  //noLoop(); //uncomment to only render one frame
}
 
//loop function that runs on a loop 
void draw() {
  frames++;
  
  if (totalStars < maxStarCount && frames % 10 == 0 ) {
      stars[totalStars++] = new Star( random(-1000, 1000), random(-100, 100));
  }
  
  clear(); // reset screen
  //background(0); // reset background
  translate(centerX, centerY);
  
  
  displayStars();

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
         
         float oX = (float) (width * Math.random() - width/2);
         float oY = (float) (height * Math.random() - height/2);
         
         startingStars[i] = new Star( oX, oY );
         
       }
   
       return startingStars;
   };
