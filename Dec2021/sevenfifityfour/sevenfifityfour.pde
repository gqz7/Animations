final int W = 3840;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680
final int H = 2160;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //950
boolean isPaused = false;
float frames;
int time; 
float renderSpeed = 1.0;

float globalVar1 = 2;
int globalVar2 = 2;
int globalVar3 = 330;

void settings() {
  //set canvas size
  fullScreen();
  size(W, H); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}


void setup() {
  //set colormode
  colorMode(HSB, 360, 100, 100);
  // noLoop();

    // background(0);
}

//loop function that runs on a loop 
void draw() {
 
  if (!isPaused) {
    //println(frames);
    frames+=renderSpeed;
    time++;
    // saveFrame("../../../newrender/img_######.png");
  }

  renderScene();

}


void renderScene () {

    clear();
    background(0);
    displayVars();
    
    stroke(360);
    strokeWeight(.5);
    
    translate(W/2, H/2);
    renderEntity(globalVar1, globalVar2, globalVar3);
    
 
}

void renderEntity (float numOfLines, int numOfSides, float leafSize) {
    for (int i = 0; i < numOfSides; ++i) {
      push();

        rotate(map(i, 0, numOfSides, 0, TWO_PI));

        renderLeaf(numOfLines, leafSize);

      pop();
    }
}

void renderLeaf (float numOfLines, float size) {
  push();
        for (float i = 0; i < numOfLines; ++i) {

            float lineLength = map(i, numOfLines, 0, 0, numOfLines*2) % numOfLines/2;

            float x1 = (cos(map(i, 0, numOfLines, 0, TWO_PI)) * size);
            float y1 = (sin(map(i, 0, numOfLines, 0, TWO_PI)) * size);

            line(x1, y1, 0, -size);
        }

    pop();
}

void displayVars() {
  textSize(20);
  fill(360);
  push();
    text("var1: " + globalVar1, 50, 100);
    text("var2: " + globalVar2, 50, 150 );
    text("var3: " + globalVar3, 50, 200 );
  pop();
}


void keyPressed() {
  switch (key) {
    //VAR 1
    case 'q': 
      globalVar1-=1;
      break;
    case 'w': 
      globalVar1+=1;
      break;
    //VAR 2
    case 'a': 
      globalVar2-=1;
      break;
    case 's': 
      globalVar2+=1;
      break;
    //VAR 3
    case 'z': 
      globalVar3-=10;
      break;
    case 'x': 
      globalVar3+=10;
      break;
    case ' ': 
      isPaused = !isPaused;
      break;
      
  }

  

}


void entityGrid () {

    clear();
    background(0);
    
    stroke(360);
    strokeWeight(.5);
    
    int minNum = (int)globalVar1;
    int maxNum = (int)globalVar1 + 8;

    int minSpace = H < W ? H : W;

    int enitiySz = (int) (minSpace / ((maxNum-minNum+1) * 2.5));

    for (int lineNum = minNum; lineNum <= maxNum; ++lineNum) {
      for (int sideNum = minNum; sideNum <= maxNum; ++sideNum) {
        push();
          float transX = map(lineNum, minNum, maxNum, 0, W - enitiySz*3) + enitiySz*1.5;
          float transY = map(sideNum, minNum, maxNum, 0, H - enitiySz*3) + enitiySz*1.5;
          translate(transX, transY);

          renderEntity(lineNum, sideNum, enitiySz);

        pop();
      }
    }
}