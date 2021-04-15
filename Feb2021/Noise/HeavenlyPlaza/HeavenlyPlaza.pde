//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //seeds for noise algorithm, can be randomized for unique image every render
  static final boolean lightModeBool = true;
  NoiseSeed nSeedX1 = new NoiseSeed( 1196.9 );// (float) 969);//Math.random()*500 + 977.777);//(float) Math.random()*1000 + 417.3939);
  NoiseSeed nSeedX2 = new NoiseSeed( 1172  );//(float) 1117.94836);// (float) Math.random()*777 +533.777);//Math.random()*500 + 977.777);//;
  NoiseSeed nSeedY1 = new NoiseSeed( 2050.9028 );//(float) 2332.719);//(float) Math.random()*500 + 977.777);//
  NoiseSeed nSeedY2 = new NoiseSeed( 1022.2783 );//(float) 1257.2219);//(float) Math.random()*777 + 777.777); //Math.random()*500 + 977.777);//(float) Math.random()*1000 + 3141.5826);
  
 //width and height of canvas
  int WIDTH = 3840;//3840; //1920
  int HEIGHT = 2160;//2160; //1080
  //tracker for how many frames have elapsed
  float frames = 77;
  int time = 0;
  int logC = 0;
  float timeMult = .2;
  boolean animationForward = true;
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];
  
  double renderScale = .77;
  
  double xStatic = 44*renderScale;
  double yStatic = 333*renderScale;

  //boolean testPrint = true; //this gets used print testing logs only a certain number of times while looping
//setup function that runs before render
void setup() {
  //set canvas size
  size(3840,2160);//0//set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  println(nSeedX2.value + " : " + nSeedY2.value);
  println(nSeedX1.value + " - " + nSeedY1.value);
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

    int[] pxColorArr = allPixs[i].calcColor();
    
    //modify the individual pixel
    pixels[pxNum] = color(pxColorArr[0], pxColorArr[1], pxColorArr[2]);
    
  } 
  
  //update the pixel info
    if (time < 7000) {
      updatePixels();
      //saveFrame("./Renders/faces-7/img_#####.png");
    }
}

void advanceTime() {
  //println(time, nSeedX1.value);
  time++;
  if (time < 3500) {
    frames+=timeMult;
    
      nSeedX1.move(.007 * timeMult);
      nSeedY1.move(-.01 * timeMult);
      nSeedX2.move(-.017 * timeMult);
      nSeedY2.move(-.005 * timeMult);
  } else {
    animationForward = false;
      nSeedX1.move(-.007 * timeMult);
      nSeedY1.move(.01 * timeMult);
      nSeedX2.move(.017 * timeMult);
      nSeedY2.move(.005 * timeMult);
    frames-=timeMult;
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
