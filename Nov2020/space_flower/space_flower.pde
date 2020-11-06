
//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //width and height of canvas
  int WIDTH = 3840;//3840; //1920
  int HEIGHT = 2160;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;
  
  float scale = .87;
  float seed = 3.17;
  float scaleRate = .003;

  int scalingLimit = 333;
  
void setup() {
  //set canvas size
  size(3840,2160); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141 );
  noFill();
  background(0); // reset screen
  strokeWeight(.4);
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  seed+=.03;
  frames++;
  calcScale();
  //println(scale, frames);
  background(0); // reset screen

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  translate(centerX, centerY);
  rotate(PI/2); // + (float) frames/500
  
  float limit = 333;//Math.abs(noiseVal*17)+88;
  int petalsLim = 6;
  float resolution = 1111;// the smaller the more filled in the shape will look and the slower the program will run
  float noiseLineVal;
  double noiseX, noiseY;
  int[] colorData;
  float x, y, rotation, finalRotation, rotateFlwr;
  
  float[] colorInput = new float[3];
  
     for (float i = limit; i > 0 ; i-= 1.7-i/resolution) { //.9-i/400
    
        noiseX = (double) (seed + i/222);
        noiseY = (double) (seed + i/222);
        noiseLineVal = (float) noise.noise2(noiseX, noiseY);

        colorInput[0] = (float) frames;
        colorInput[1] = i;
        colorInput[2] = limit;
        
        colorData = calcColor( colorInput );
        
        stroke(colorData[0], colorData[1], colorData[2]);  
        
        x = i*2*scale;
        y = 0;
        rotation = map(noiseLineVal, -1, 1, 0, PI*1.5); 
        finalRotation = map( i, 1, limit, rotation, rotation/10 );
        
        for (int j = 0; j < petalsLim; ++j) {
          
          drawRombus(
            x, 
            y, 
            i*scale, 
            finalRotation
          );
    
          rotateFlwr = (PI/petalsLim*2);
          rotate(rotateFlwr);
        }
        rotate(i/77777*noiseLineVal);
    }
  
}

public void drawRombus(float x, float y, float size, float rotation) {
    pushMatrix();
  
      translate(x, y);
      rotate(rotation);

      quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
      rotate(PI/2);
      quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
      rotate(-rotation*2-PI/2);
      quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
      rotate(PI/2);
      quad(size/2, 0, 0, -size, -size/2, 0, 0, size);

    popMatrix();
}

  public int[] calcColor( float[] factors ) {
    //pixel saturation
    int saturation = 100;
    int timePassed = (int) factors[0];
    int index = (int) factors[1];
    int maxIdex = (int) factors[2];
    //float noiseFactor = factors[3]; 
    //lightness calculation
    int lightness = int ( map(index, 0, maxIdex, 100, 0) );
    
    //pixel hue calculation
    int hue = (int) Math.abs(index*.5 - timePassed*2 -300) % 360;
    
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
  
  public void calcScale() {
    if (frames % scalingLimit < scalingLimit/2)
      scale+=scaleRate;
    else scale-=scaleRate;
  }
