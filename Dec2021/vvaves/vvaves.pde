//imports
import controlP5. *;

//GLOBAL VARS
//Noise algorithm that produces values used in this animation, not made by me
OpenSimplex2S noise;
//TEST VARS
final boolean isTesting = false;
boolean keepPrinting = true;
int printCount = 0;
int printLim = 100;
boolean switched = true;

//CONTROLERS
ControlP5 controller;
ControlGroup gui;

final float fps = 60;
float renderSpeed = .85;

int colorMode = 1;

//tracker for how many frames have elapsed
boolean isPaused = false;
float frames;
int time; //kindof like frames but frames will always increase by one. Time by increase at a slower or quicker rate for 
int count;

//width and height of canvas 
//to change the resolution update both the WIDTH AND HEIGHT also change the values on  line 48
final int WIDTH = 3840;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680
final int HEIGHT = 2160;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //950
final float centerX = WIDTH/2;
final float centerY = HEIGHT/2;
final float maxDistance = centerX+centerY;//centerX+centerY;


//Fluid sim related vars
float radius = .25;
final int N = 255;
final int iter = 16;
final int SCALE = 4;
float t = 0;

Fluid fluid;

void settings() {
  //set canvas size
  size(N*SCALE, N*SCALE);
//   size(WIDTH, HEIGHT); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720
  // fullScreen();
}

void setup() {
  
  //set colormode
  colorMode(HSB, 360, 100, 100, 1);
  //create objects
  controller = new ControlP5(this);
  noise = new OpenSimplex2S( 214719233 ); 
  fluid = new Fluid(.7, 0, 0.0000003);//new Fluid(0.2, 0, 0.0000001);
  noStroke(); 
  noCursor();
  frameRate(fps);

  //planet = new Planet("./testing (6).png", 1000); //switch to either 'earth-render' or 'mars-render' to see diffrent planets 

  createGUI();
  if (isTesting) {
    gui.show();
  } else {
    noCursor();
    gui.hide();
  }
  // noLoop(); ///uncomment to only render one frame

  //set up controllers

}

//loop function that runs on a loop 
void draw() {
  
  //println(radius);

//   perspective(1.5, width/height, 1, 4000);

  if (!isPaused) {
    //println(frames);
    frames+=renderSpeed;
    time++;
    // saveFrame("../../../newrender/img_######.png");
    renderScene();
  }


}

void mouseWheel(MouseEvent event) {
    radius += event.getCount() * 0.01;
    // if (radius > 1) {
    //     radius += event.getCount() * 0.01;
    // } else if ( radius == radiusLim && event.getCount() == 1) {
    //     radius = 1;
    // } else {
    //     radius = 1;
    // }
}

void renderScene () {
  clear(); // reset screen
    //background(0);
    
    drawFluid();

    if (isTesting) {

      //sphere 
      // noFill();
      // stroke(10000);
      // sphere(500);
      renderGUI();
    } 

}

void drawFluid () {
     background(0);
    int cx = mouseX/SCALE;// - int(0.5*width/SCALE);// int(0.5*width/SCALE);
    int cy = mouseY/SCALE;// - int(0.5*height/SCALE);//int(0.5*height/SCALE);

    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
        fluid.addDensity(cx+i, cy+j, random(100, 200));
        }
    }
   
    float angle = noise(t/3+1000) * TWO_PI;
    PVector v = PVector.fromAngle(angle);
    v.mult(0.2);
    fluid.addVelocity(cx, cy, v.x, v.y );
    fluid.step();

    PVector v2 = PVector.fromAngle(angle + PI);
    v2.mult(0.2);
    fluid.addVelocity(cx, cy, v2.x, v2.y );


    fluid.step();
    t += 0.01;

    fluid.renderD();
    //fluid.renderV();
    fluid.fadeD();
}

void printTestOutput () {
  String tempVar = "test";
  String var1 = "1: HELLO";
  String var2 = "2: " + tempVar;
  String var3 = "3: " + tempVar;
  String var4 = "4: " + tempVar;

  push();

    noStroke();
    fill(0);
    rect(0, 0, 200, 300, 0, 0, 20, 0); 

    fill(10000);
    text(var1, 40, 60);
    text(var2, 40, 90);
    text(var3, 40, 120);
    text(var4, 40, 150);
    
  pop();
}

void renderGUI () {
  textSize(20);
  blendMode(BLEND);
  camera();
  perspective();
  printTestOutput();
  
}

void createGUI () {
    Slider slider1 = controller.addSlider("radius")
     .setPosition(30,0)
     .setRange(0,1);

    Slider slider2 = controller.addSlider("infinityVar")
     .setPosition(30,20)
     .setRange(1,10);

    Slider slider3 = controller.addSlider("globalAngl")
     .setPosition(30,40)
     .setRange(.01,.5);

    Slider slider4 = controller.addSlider("renderSpeed")
     .setPosition(30,60)
     .setRange(.5,5);

    gui = controller.addGroup("gui", 0, 400, 300);
    
    gui.setBackgroundHeight(80);
    gui.setBackgroundColor(color(0,100));
    gui.hideBar();

    slider1.moveTo(gui);
    slider2.moveTo(gui);
    slider3.moveTo(gui);
    slider4.moveTo(gui);

}

void keyPressed() {
  switch (key) {
    case ' ': 
      isPaused = !isPaused;
      break;
    case 'r':
      fluid = new Fluid(.7, 0, 0.0000003);
      break;
    case 'm':
      float temp1 = random(.0214, .999);
      float temp2 = random(-1, 1);
      float temp3 = random(0.000000214, 0.0000009);
      println("New Fluid: ( " + temp1 + ", " + temp2 + ", " + temp3 + " )");
      fluid = new Fluid(temp1, 0, temp3);
      break;
    case 't':
      colorMode = colorMode < 3 ? colorMode+1 : 1;
      println(colorMode);
      break;
    case 'k':
      
  }

  

}
