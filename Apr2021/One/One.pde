//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  
  static final boolean lightModeBool = false;
  //seeds for noise algorithm, can be randomized for unique image every render
  NoiseSeed nSeedX1 = new NoiseSeed(2317.3939); //new NoiseSeed((float) Math.random()*1000 + 417.3939);
  NoiseSeed nSeedX2 = new NoiseSeed(2477.477);//new NoiseSeed((float) Math.random()*1000 + 777.777);
  NoiseSeed nSeedY1 = new NoiseSeed(2339.3719);  //new NoiseSeed((float) Math.random()*1000 + 3939.719);
  NoiseSeed nSeedY2 = new NoiseSeed(2437.2415826); //new NoiseSeed((float) Math.random()*1000 + 3141.5826);
  
  int frames = 0;
  double timeScale = 1.0;
  double renderScale = 1;  
 //width and height of canvas
  int WIDTH = 800;//3840; //1920 //1280 //800
  int HEIGHT = 450;//2160; //1080 //720  //450
  int w2 = 3840;
  int y2 = 2160;
  float scaleX = (pow(WIDTH/(float)w2, (float)-1));
  float scaleY = (pow(HEIGHT/(float)y2, (float)-1));
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];

  double xStatic = 69 * renderScale;
  double yStatic = 420 * renderScale;
  //this gets used print testing logs only a certain number of times while looping
  //boolean testPrint = true; 
//setup function that runs before render
void setup() {
  //set canvas size
  print(pow(width/(float)w2, (float)-1));
  size(800,450);//0//set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 314159265 );
  
  //run function to fill allPixs array
  initalizePixels();
  //noLoop(); //uncomment to only render one frame
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

  //saveFrame("../../../../../../Art/Renders/41221/img_#####.png");

}

void advanceTime() {
  nSeedX1.value -= .01 * timeScale;
  nSeedX2.value += .02 * timeScale;
  nSeedY1.value += .01 * timeScale;
  nSeedY2.value += .003 * timeScale;

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
