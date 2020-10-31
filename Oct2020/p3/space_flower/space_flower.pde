
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
  seed+=.0007;
  frames++;
  background(0); // reset screen
  
  float noiseVal = (float) noise.noise2((double) seed, (double) seed) * 10;
  stroke(177, 100, 100);

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  //line(centerX, centerY, centerX + cos(noiseVal*4)*1000, centerY + sin(noiseVal*4)*500) ;
  translate(centerX, centerY);
  float limit = 333;//Math.abs(noiseVal*17)+88;
  int petalsLim = 6;
  for (int j = 0; j < petalsLim; ++j) {
    //for (float i = 1; i < limit ; i= i+1) {
     for (float i = limit; i > 0 ; i= i-1) {
    
        double noiseX = (double) (noiseVal + i/222);
        double noiseY = (double) (noiseVal + i/222);
        float noiseLineVal = (float) noise.noise2(noiseX, noiseY);

        float[] colorInput = {(float) frames, noiseLineVal, i, limit};
        
        int[] colorData = calcColor( colorInput );
        
        stroke(colorData[0], colorData[1], colorData[2]);  
        strokeWeight(3);
        
        float x = i;
        float y = i;
        drawRombus(x, y, i, noiseLineVal);
    }
    float rotateFlwr = (PI/petalsLim*2);
    rotate(rotateFlwr);
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

  public int[] calcColor( float[] factors ) {
    //pixel saturation
    int saturation = 100;
    int timePassed = (int) factors[0];
    int index = (int) factors[2];
    int maxIdex = (int) factors[3];
    float noiseFactor = factors[1]; 
    //lightness calculation
    int lightness = int ( map(index, 0, maxIdex, 100, 0) );
    
    //pixel hue calculation
    int hue = (int) Math.abs(177+index*.5 - timePassed) % 360;
    
    int convertedSaturation;
    int convertedBrightness;
    
    try {
      if (lightness < 50) {
        convertedSaturation = 2 * (saturation * lightness) / (lightness + saturation);
      } else {
        convertedSaturation = 2 * (saturation * (100-lightness)) / (lightness + saturation);
      }
    } catch ( ArithmeticException e ) {
        convertedSaturation = 0;
    }
    
    convertedBrightness = convertedSaturation + lightness;
    
    return new int[] { hue, convertedSaturation, convertedBrightness };
  } 
