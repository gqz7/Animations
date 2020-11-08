import java.utils.*
//GLOBAL VARS

  //width and height of canvas
  int WIDTH = 1920;//3840; //1920
  int HEIGHT = 1080;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;

void setup() {
  //set canvas size
  size(1920,1080); //h: 2160
  
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

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  translate(centerX, centerY);

  //rect(-frames,-frames,frames*2,frames*2);
  
}
