
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
  seed+=.002;
  frames++;
  background(0); // reset screen
  
  float noiseVal = (float) noise.noise2((double) seed, (double) seed) * 10;
  stroke(177, 100, 100);

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  //line(centerX, centerY, centerX + cos(noiseVal*4)*1000, centerY + sin(noiseVal*4)*500) ;
  translate(centerX, centerY);
  float limit = 333;//Math.abs(noiseVal*17)+88;
  
  for (float i = 1; i < limit ; i= i+1) {
    
      double noiseX = (double) (noiseVal + i/1000);
      double noiseY = (double) (noiseVal + i/1000);
      float noiseLineVal = (float) noise.noise2(noiseX, noiseY);

      float colorVal = Math.abs(177+i*.5 - frames) % 360;
      stroke(colorVal, 100, 100);  
      strokeWeight(3);
      
      float x = i;
      float y = i;
      drawRombus(x, y, i, noiseLineVal);
  }
}

public void drawRombus(float x, float y, float num, float noise) {
    pushMatrix();
  
      translate(x, y);
      rotate(noise);

      float size = num; 

      line(size/2, 0, 0, -size);
      line(0, -size, -size/2, 0);
      line(-size/2, 0, 0, size);
      line(0, size, size/2, 0);
      
    popMatrix();
}
