
//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //width and height of canvas
  int WIDTH = 3000;//3840; //1920
  int HEIGHT = 2000;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;
  
  float scale = 1;
  float seed = 3.17;
  float scaleRate = .003;

  int scalingLimit = 444;
  
void setup() {
  //set canvas size
  size(3000,2000); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141 );
  background(0); // reset screen
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  seed+=.007;
  frames++;
  calcScale();
  //println(scale, frames);
  background(0); // reset screen
  
  stroke(177, 100, 100);

  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  translate(centerX, centerY);
  rotate(PI/4 + (float) frames/500);
  
  float limit = 333;//Math.abs(noiseVal*17)+88;
  int petalsLim = 6;
  float resolution = 500;// the smaller the more filled in the shape will look and the slower the program will run

     for (float i = limit; i > 0 ; i= i-resolution/i) {
    
        double noiseX = (double) (seed + i/222);
        double noiseY = (double) (seed + i/222);
        float noiseLineVal = (float) noise.noise2(noiseX, noiseY);

        float[] colorInput = {
            (float) frames, 
            i, 
            limit
            //,noiseLineVal
        };
        
        int[] colorData = calcColor( colorInput );
        
        stroke(colorData[0], colorData[1], colorData[2]);  
        strokeWeight(map(i, 1, limit, .1, 2));
        
        float x = i*scale;//(i-limit/(1+scale))*scale;
        float y = i/2*scale;//(i-limit/(1+scale))*scale/2;
        float rotation = map(noiseLineVal, -1, 1, 0, PI); 
        
        for (int j = 0; j < petalsLim; ++j) {
          drawRombus(x, y, i, rotation);
    
          float rotateFlwr = (PI/petalsLim*2);
          rotate(rotateFlwr);
        }
    }
  
}

public void drawRombus(float x, float y, float num, float rotation) {
    pushMatrix();
  
      translate(x, y);
      rotate(rotation+PI/4);

      float size = num*scale; 

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
    int index = (int) factors[1];
    int maxIdex = (int) factors[2];
    //float noiseFactor = factors[3]; 
    //lightness calculation
    int lightness = int ( map(index, 0, maxIdex, 100, 0) );
    
    //pixel hue calculation
    int hue = (int) Math.abs(index*.9 - timePassed/.5 -300) % 360;
    
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
