//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //seeds for noise algorithm, can be randomized for unique image every render
  static final boolean lightModeBool = true;
  NoiseSeed nSeedX1 = new NoiseSeed( 799.719 - .5);//(float) Math.random()*1000 + 417.3939);
  NoiseSeed nSeedX2 = new NoiseSeed( 742.719 - .033);//(float) Math.random()*1000 + 777.777);
  NoiseSeed nSeedY1 = new NoiseSeed( 2549.719 - .5);//(float) Math.random()*1000 + 3939.719);
  NoiseSeed nSeedY2 = new NoiseSeed( 1732.719 - .033); //(float) Math.random()*1000 + 3141.5826);
 //width and height of canvas
  int WIDTH = 1920;//3840; //1920
  int HEIGHT = 1080;//2160; //1080
  //tracker for how many frames have elapsed
  float frames = 0;
  int time = 0;
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];
  
  double renderScale = 1;
  
  double xStatic = 44*renderScale;
  double yStatic = 333*renderScale;

  //boolean testPrint = true; //this gets used print testing logs only a certain number of times while looping
//setup function that runs before render
void setup() {
  //set canvas size
  size(1920,1080);//0//set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141592 );
  //run function to fill allPixs array
  initalizePixels();
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  
  background(0); // reset screen
  loadPixels(); // load pixels needs to be ran to modify pixels array and changePixels()
  
   //iterate frame tracker
  //iterate seed values so animation image moves
  advanceTime();
  
  //itterate through all pixels/Points
  for ( int i = 0; i < allPixs.length; i++) {  

    //get pixel number of current pixel    
    int pxNum = allPixs[i].pixelNum;

    int[] pxColorArr = allPixs[i].calcColor( frames );
    
    //modify the individual pixel
    pixels[pxNum] = color(pxColorArr[0], pxColorArr[1], pxColorArr[2]);
    
  } 
  
  //update the pixel info
    if (time < 200) {
      updatePixels();
      //saveFrame("./Renders/noise007/img_#####.png");
    }
}

void advanceTime() {
  time++;
  float timeMult = .3;
  if (time < 100) {
    frames+=.3;
    nSeedX1.value -= .003 * timeMult;
    nSeedX2.value += .012 * timeMult;
    nSeedY1.value += .005 * timeMult;
    nSeedY2.value += .002 * timeMult;
  } else {
    frames-=.7;
    nSeedX1.value += .003 * timeMult;
    nSeedX2.value -= .012 * timeMult;
    nSeedY1.value -= .005 * timeMult;
    nSeedY2.value -= .002 * timeMult;
  
  }
}

void initalizePixels() {
  int count = 0;
  for ( int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++ ) {
      allPixs[count] = new Point(x,y);
      count++;
    }
  }
}
