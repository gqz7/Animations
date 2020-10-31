
//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //width and height of canvas
  int WIDTH = 2700;//3840; //1920
  int HEIGHT = 1500;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;
  
  float seed = 3.14;

void setup() {
  //set canvas size
  size(2700,1500); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141 );
  background(0); // reset screen
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  seed+=.00001;
  frames++;
  background(0); // reset screen
  
  float noiseVal = (float) noise.noise2((double) seed, (double) seed);
  stroke(177, 100, 100);

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  //line(centerX, centerY, centerX + cos(noiseVal*4)*1000, centerY + sin(noiseVal*4)*500) ;
translate(centerX, centerY);
  float limit = Math.abs(noiseVal*700);
  for (float i = 0; i < limit; i= i+.3) {
    float x = i;
    float y = i;
    float colorVal = Math.abs(177+i*.5 - frames) % 360;
    
    rotate(noiseVal);
    stroke(colorVal, 100, 100);  
    line(x, y, x+10, y+10);
  }
}
