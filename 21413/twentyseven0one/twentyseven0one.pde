//IMPORTS
boolean isPaused = false;
float globalXScale = 999;
double globalYScale = 22;
float globalDimensions = 6;
float renderSpeed = .5;
float globalDeityNum = 6;

float globalRndrScl = 333;

float globalAngle = 0;
float globalHDAngle = 0;
float globalDeityAngle = 0;
float globalLineWidth = .1;
float incrementer = 1;

int colorMode = 1;
int globalLineHue = 177;
int globalBgHue = 339;

int renderOption = 4;
boolean zoomedIn = false;
boolean isShowingVars = false;

boolean invertLightness = false;
boolean leafSymmetry = true;
boolean toggle1 = true;
boolean toggle2 = true;

boolean dragLocked = true;

float xOffset = 0;
float yOffset = 0;
float transX = 0;
float transY = 0;

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
OpenSimplex2S noise;
NoiseController noiseController;
//seeds for noise algorithm, can be randomized for unique image every render
NoiseSeed nSeedX1 = new NoiseSeed((float) Math.random()*1000 + 417.3939);
NoiseSeed nSeedX2 = new NoiseSeed((float) Math.random()*1000 + 777.777);
NoiseSeed nSeedY1 = new NoiseSeed((float) Math.random()*1000 + 3939.719);
NoiseSeed nSeedY2 = new NoiseSeed((float) Math.random()*1000 + 3141.5826);
//width and height of canvas
int WIDTH = 1680;//800;//1024;//1504//3840; //1920//1360 //1680
int HEIGHT = 1050;//600;//640;//846//2160; //1080//768 //1050
//tracker for how many frames have elapsed
int frames = 0;
//array of Points to keep track of quadrent information and x/y position aswell as pixel index
Point[] allPixs = new Point[WIDTH*HEIGHT];


double xStatic;
double yStatic;

//boolean testPrint = true; //this gets used print testing logs only a certain number of times while looping
//setup function that runs before render

void settings() {
  //set canvas size
  fullScreen();
  size(WIDTH, HEIGHT); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}

void setup() {
  //set canvas size
  colorMode(HSB, 360, 100, 100);
  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141592 );
  noiseController = new NoiseController();
  //run function to fill allPixs array
  noiseController.initalizePixels();
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {


  if (!isPaused) {
    
    
    // xStatic -= .1;
    // yStatic -= .1;
    // println(globalXScale,globalYScale,globalRndrScl);//xStatic,yStatic,
    background(0); // reset screen
    
    frames++; //iterate frame tracker
    noiseController.displayNoise();

    // saveFrame("../../../render11522/img_#####.png");
    if (isShowingVars) displayVars();

  }
}


void displayVars() {

  fill(0);
  rect(0, 0, 444, 1444);



  textSize(30);
  fill(360);
  text("frames: " + frames, 50, 30);
  text("lines(q/w): " + globalXScale, 50, 70);
  text("sides(a/s): " + globalYScale, 50, 110 );
  text("dim(d/f): " + globalDimensions, 50, 150 );
  text("higDm(c/v): " + renderSpeed, 50, 190 );
  text("deityNum(g/h): " + globalDeityNum, 50, 230 );
  text("scl(z/x): " + globalRndrScl, 50, 300 );
  text("lw(e/r): " + globalLineWidth, 50, 350 );
  text("inc(t/y): " + incrementer, 50, 400 );
  text("rndOpt(#): " + renderOption, 50, 450 );
  text("2X scl(n)", 50, 500 );
  text("/2 scl(b)", 50, 550 );
  text("screenshot(=)", 50, 600 );
  text("toggleDis(m): "+(isShowingVars?"on":"off") , 50, 650 );
  text("toggleZoom(,): "+(zoomedIn?"on":"off"), 50, 700 );
  text("invertLightness(.): "+(invertLightness?"on":"off"), 50, 750 );
  text("colorMode(/): "+colorMode, 50, 800 );
  text("transX: "+transX, 50, 850 );
  text("transY: "+transY, 50, 900 );
  text("resetVars(\\)", 50, 950 );
  text("G-angle( [/] ):" + globalAngle, 50, 1000 );
  text("D-angle( o/p ):" + globalDeityAngle, 50, 1050 );
  text("HD-angle( u/i ):" + globalHDAngle, 50, 1100 );
  text("HD-rotate(j):"+(toggle1?"on":"off"), 50, 1150 );
  text("D-rotate(k):"+(toggle2?"on":"off"), 50, 1200 );
  text("leaftType(l):"+(leafSymmetry?"0":"1"), 50, 1250 );
  text("Colors( ' ) bg:"+globalBgHue+" ln:"+globalLineHue, 50, 1300 );
  text("incrementAll(-)", 50, 1350 );
}


void keyPressed() {
  switch (key) {
    case ',':
      zoomedIn = !zoomedIn;
      break;
    //VAR 1 - line num
    case 'q': 
    globalXScale = globalXScale-incrementer/10 > 0 ? globalXScale-incrementer/10 : .01;
      break;
    case 'w': 
      globalXScale+=incrementer/10;
      break;
    //VAR 2 - side num
    case 'a': 
      globalYScale = globalYScale-incrementer/10 > 0 ? globalYScale-incrementer/10 : .01;
      break;
    case 's': 
      globalYScale+=incrementer/10;
      
      break;
    //VAR 3 - render scale
    case 'z': 
      globalRndrScl = globalRndrScl-incrementer/10 > 0 ? globalRndrScl-incrementer/10 : .01;
      break;
    case 'x': 
      globalRndrScl+=incrementer/10;
      break;
    //VAR 5 - dimensions
    case 'd': 
      globalDimensions-=incrementer;
      if (globalDimensions < 1) globalDimensions = 1;
      
      break;
    case 'f': 
      globalDimensions+=incrementer;
      break;
    //VAR 6 - higher dimensions
    case 'c': 
      renderSpeed = renderSpeed-incrementer/10 > 0 ? renderSpeed-incrementer/10 : .01;
      break;
    case 'v': 
      renderSpeed+=incrementer/10;
      break;
    //VAR 7 - deitiy dimensions
    case 'g': 
      globalDeityNum-=incrementer;
      if (globalDeityNum < 1) globalDeityNum = 1;
      break;
    case 'h': 
      globalDeityNum+=incrementer;
      break;
    //VAR 4 - line width
    case 'e': 
      globalLineWidth-=.010;
      if (globalLineWidth <= 0) globalLineWidth = .001;
      
      break;
    case 'r': 
      globalLineWidth+=.010;
      break;
    //VAR 5 - incrementer
    case 't': 
      incrementer-=1;
      if (incrementer <= 0) incrementer = 1;
      break;
    case 'y': 
      incrementer+=1;
      break;
    //PAUSE
    case ' ': 
      isPaused = !isPaused;
      break;
    case 'm': 
      isShowingVars = !isShowingVars;
      break;
    case 'j': 
      toggle1 = !toggle1;
      break;
    case 'k': 
      toggle2 = !toggle2;
      break;
    case 'l': 
      leafSymmetry = !leafSymmetry;
      break;
    case 'b': 
      globalRndrScl = globalRndrScl/2;
      break;
    case 'n': 
      globalRndrScl = globalRndrScl*2;
      break;
    case '=': 
      saveFrame("../../../renderScreenShot/screenshot_######.png");
      break;
    case '-': 
      // ranIncrement();
      break;
    case '\\':
      globalAngle = 0;
      globalDeityAngle = 0;
      globalHDAngle = 0;
      globalDimensions = 1;
      renderSpeed = 1;
      globalYScale = 1;
      globalXScale = 1;
      globalDeityNum = 1;
      globalLineWidth = .01;
      globalRndrScl = 272; 
      transX = 0;
      transY = 0;
      invertLightness = false;
    break;
    case '.':
      invertLightness = !invertLightness;
    break;
    case '/':
      colorMode = colorMode < 3 ? colorMode+1 : 1;
      println("colormode: " + colorMode);
    break;
    case '[':
      globalAngle = globalAngle > 0 ? globalAngle-incrementer : 360;
    break;
    case ']':
      globalAngle = globalAngle < 360 ? globalAngle+incrementer : 0;

    break;
    case 'o':
      globalDeityAngle = globalDeityAngle > 0 ? globalDeityAngle-incrementer : 360;
    break;
    case 'p':
      globalDeityAngle = globalDeityAngle < 360 ? globalDeityAngle+incrementer : 0;

    break;
    case 'u':
      globalHDAngle = globalHDAngle > 0 ? globalHDAngle-incrementer : 360;
    break;
    case 'i':
      globalHDAngle = globalHDAngle < 360 ? globalHDAngle+incrementer : 0;

    break;
    case ';':
      
    break;
    case '\'':
      globalBgHue = globalBgHue < 361 ? globalBgHue + (int) incrementer : 1;
      globalLineHue = globalLineHue < 361 ? globalLineHue + (int) incrementer : 1;

    break;

      //RENDER OPTIONS 
    case '1': 
      renderOption = 1;
      break;
    case '2': 
      renderOption = 2;
      break;
    case '3': 
      renderOption = 3;
      break;
    case '4': 
      renderOption = 4;
      break;
    case '5': 
      renderOption = 5;
      break;
  }

  if (key == CODED) {
    switch (keyCode) {
      case UP:
        transY += incrementer/10;
      break;
      case DOWN:
        transY -= incrementer/10;
      break;
      case LEFT:
        transX += incrementer/10;

      break;
      case RIGHT:
        transX -= incrementer/10;

      break;
    }
  }

  

}

void mousePressed() {
  dragLocked = true; 
  xOffset = mouseX-transX; 
  yOffset = mouseY-transY; 

}

void mouseDragged() {
  if(dragLocked) {
    transX = mouseX-xOffset; 
    transY = mouseY-yOffset; 
  }
}

void mouseReleased() {
  dragLocked = false;
}

void mouseWheel(MouseEvent event) {
  if (globalRndrScl > 10) {
    float sclChange = globalRndrScl - event.getCount() * incrementer * 2 * (1+mouseX/100);
    globalRndrScl = sclChange > 0 ? sclChange : 1;
  }else {
    globalRndrScl = 10;
  }
  //  else if ( globalRndrScl == 10 && event.getCount() == 1) {
  //   globalRndrScl = 10 * 2;
  // } 
}