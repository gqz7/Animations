//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  
  static final boolean lightModeBool = true;
  //seeds for noise algorithm, can be randomized for unique image every render
  NoiseSeed nSeedX1 = new NoiseSeed(2313.3939); //new NoiseSeed((float) Math.random()*1000 + 417.3939);
  NoiseSeed nSeedX2 = new NoiseSeed(2773.777);//new NoiseSeed((float) Math.random()*1000 + 777.777);
  NoiseSeed nSeedY1 = new NoiseSeed(2238.719);  //new NoiseSeed((float) Math.random()*1000 + 3939.719);
  NoiseSeed nSeedY2 = new NoiseSeed(2433.415826); //new NoiseSeed((float) Math.random()*1000 + 3141.5826);
 //width and height of canvas
  int WIDTH = 3840;//3840; //1920
  int HEIGHT = 2160;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];
  
  double renderScale = .77;
  double timeScale = 1.0;
  
  double xStatic = 88 * renderScale;
  double yStatic = 444 * renderScale;

  //boolean testPrint = true; //this gets used print testing logs only a certain number of times while looping
//setup function that runs before render
void setup() {
  //set canvas size
  size(3840,2160);//0//set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141592 );
  //run function to fill allPixs array
  initalizePixels();
    noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  
  background(0); // reset screen
  loadPixels(); // load pixels needs to be ran to modify pixels array and changePixels()
  
  frames++; //iterate frame tracker
  
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
  updatePixels();

  //saveFrame("../../../../../../Renders/111999222333444555_LIGHT_MODE/img_#####.png");

}

void advanceTime() {
  nSeedX1.value -= .003 * timeScale;
  nSeedX2.value += .012 * timeScale;
  nSeedY1.value += .005 * timeScale;
  nSeedY2.value += .007 * timeScale;

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
