//GLOBAL VARS

  //width and height of canvas
  int WIDTH = 1920;//3840; //1920
  int HEIGHT = 1080;//2160; //1080
  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  //tracker for how many frames have elapsed
  int frames = 0;
  
  Star[] stars;
  
  int totalStars = 0;
  final int maxStarCount = 777;
  final int startingTotal = (int) ( (float) maxStarCount * (float) .20);

void setup() {
  //set canvas size
  size(1920,1080); //h: 2160
  
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
  clear(); // reset screen
  //background(0); // reset background
  translate(centerX, centerY);
  
  displayStars();

}

void displayStars() {

     fill(255);
     noStroke();
     
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
