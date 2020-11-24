
//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //width and height of canvas
  int WIDTH = 3840;//3840; //1920
  int HEIGHT = 2160;//2160; //1080
  float centerX = WIDTH/2;
  float centerY = HEIGHT/2;
  //tracker for how many frames have elapsed
  
  int frames = 0;
  int time = 0;
  
  float scale = .1;
  float seed = 3.167;
  float scaleRate = .004;

  int scalingLimit = 234;
  
void setup() {
  //set canvas size
  size(3840,2160); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141 );
  noFill();
  background(0); // reset screen
  strokeWeight(.3);
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  seed+=.0077*1.23;
  frames+= 1*1.73;
  time++;
  calcScale();
  //println(scale, frames);
  clear(); // reset screen

  translate(centerX, centerY);
  rotate(PI/2);
   
  drawFlower();
  

  saveFrame("../../../../../Renders/spaceflower-render22211100/img_#####.png");
}

public void drawFlower() {
   
  float limit = 333*scale, resolution = 1.4;
  int petalsLim = 6;
  float noiseLineVal;
  double noiseX, noiseY;
  int[] colorData;
  float translation, rotation, translateRotation, centerRotation;
  
  float rotateFlwr = (float) (
      .005 * noise.noise2((double)seed/3+7777,(double)seed/3+7777)
  );
  
  float[] colorInput = new float[3];
  
     for (float i = limit; i > 0 ; i-= resolution-(i/limit)) {
    
        noiseX = (double) (seed + i/limit*1.5);
        noiseY = (double) (seed + i/limit*1.5);
        noiseLineVal = (float) noise.noise2(noiseX, noiseY);

        colorInput[0] = (float) frames;
        colorInput[1] = i;
        colorInput[2] = limit;
        
        colorData = calcColor( colorInput );
        
        stroke(colorData[0], colorData[1], colorData[2]);  
        
        translation = i*2*scale;
        
        rotation = map(noiseLineVal, -1, 1, 0, PI*1.5); 
        translateRotation = map( i, 1, limit, rotation, rotation/10 );
        
        for (int j = 0; j < petalsLim; ++j) {
        
          centerRotation = PI/petalsLim*2*j;      
          
          drawRombus(
            translation,
            i*scale, 
            translateRotation,
            centerRotation
          );
    
        }
        rotate(rotateFlwr);
    } 
}

public void drawRombus(float translation, float size, float rotation, float rotationAboutCenter) {
    pushMatrix();
  
      rotate(rotationAboutCenter);
      translate(translation, 0);
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
    int hue = (int) Math.abs(index*.5 - timePassed*.75 -300) % 360;
    
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
    //if (frames % scalingLimit < scalingLimit/2)
    //  scale+=scaleRate;
    //else scale-=scaleRate;
    if (time < scalingLimit) {
      scale += scaleRate;
    }
  }
