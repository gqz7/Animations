//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  
  static final boolean lightModeBool = false;
  //this gets used print testing logs only a certain number of times while looping
  //boolean testPrint = true; 

  //seeds for noise algorithm, can be randomized for unique image every render
  NoiseSeed nSeedX1 = new NoiseSeed(2337.3662);//new NoiseSeed(2327.3939 + (float)Math.random()*10); 
  NoiseSeed nSeedX2 = new NoiseSeed(2443.2615);//new NoiseSeed(2437.477 + (float)Math.random()*10);
  NoiseSeed nSeedY1 = new NoiseSeed(2338.569);//new NoiseSeed(2333.3719 + (float)Math.random()*10);  
  NoiseSeed nSeedY2 = new NoiseSeed(2442.9822);//new NoiseSeed(2435.2415826 + (float)Math.random()*10); 
  
  int frames = 0;
  double timeScale = .25;
  double renderScale = .9;  
  //intended height and width for rendering
  int w2 = 3840;
  int y2 = 2160;
  //starting seeds for noise
  double xStatic = 97 * renderScale;
  double yStatic = 444 * renderScale;
  
 //width and height of canvas
  int WIDTH = 3840;//3840; //1920 //1280 //800
  int HEIGHT = 2160;//2160; //1080 //720  //450

  float scaleX = (pow(WIDTH/(float)w2, (float)-1));
  float scaleY = (pow(HEIGHT/(float)y2, (float)-1));
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];

  
void setup() {
  //set canvas size
  size(3840,2160);//0//set color mode to hue/saturation/brightness which i perfer for my animations
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

  saveFrame("../../../../../Art/Renders/41521/img_#####.png");

}

void advanceTime() {
  frames+=timeScale;//iterate frame tracker
  nSeedX1.value -= .012 * timeScale;
  nSeedX2.value += .033 * timeScale;
  nSeedY1.value += .007 * timeScale;
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
