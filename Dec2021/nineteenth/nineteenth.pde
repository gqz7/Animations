final int WIDTH = 1024;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680
final int HEIGHT = 640;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //950
boolean isPaused = false;
float frames;
int time; 
float renderSpeed = 1.0;

void settings() {
  //set canvas size
  fullScreen();
  size(WIDTH, HEIGHT); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}


void setup() {
  //set colormode
  colorMode(HSB, 360, 100, 100);

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

void transStatic () {
    loadPixels();
  
  //3 686 399
  //2 073 600
  for (int i = 0; i < width; i++) {
   for (int j = 0; j < width; j++) {
     int pNum = i * width + j ;
      
     if (pNum < 655360) { //pNum < 2073600 //8294400
        float dis = sqrt(pow(i-HEIGHT/2,2) + pow(j-WIDTH/2,2));
        int ranColorHue = random(1) < .25 ? 159 : random(1) < .5 ? 290 : random(1) < .75 ? 177 : 309; 
        float light = map(dis, 777, 222, 2.39, 0) * (random(70)+30);
        pixels[pNum] = color(ranColorHue, random(100), light);
    //    pixels[pNum] = color(random(360), random(100), random(100));
      
     }
     //println(pNum);
   }
  }

  updatePixels();
//    for (int i = 0; i < WIDTH; i+=3) {
//         for (int j = 0; j < HEIGHT; j+=3) {
//             int pNum = i * WIDTH + j ;
            
//             if (pNum < 655360) { //pNum < 2073600 //8294400
//             int ranColorHue = random(1) < .25 ? 159 : random(1) < .5 ? 290 : random(1) < .75 ? 177 : 309; 
//                 pixels[pNum] = color(ranColorHue, random(100), random(70)+30);
//                 // pixels[pNum] = color(random(360), random(100), random(100));
            
//             }
//             // println(pNum);
//         }
//    }

}

void renderScene () {

    clear();
    // background(0);

    transStatic();
    
    push();
        translate(WIDTH/2, HEIGHT/2);
        rotate(frames/100);
        int numOfLines = 444;
        for (int i = 0; i < numOfLines; ++i) {

            float lineLength = map(i, numOfLines, 0, 0, numOfLines*2) % numOfLines/2;
            float hue = abs(map(i, 0, numOfLines, 0, 720)- frames) % 360;
          
            float sat = (map(lineLength, 0, numOfLines/2, 0, 100));//abs(map(i, 0, numOfLines, 0, 200) - frames) % 100;
            float light = (map(lineLength, 0, numOfLines/2, 100, 0));
            stroke( hue, sat, light);

            strokeWeight(map(lineLength, 0, numOfLines/2, .5, 5));

            // float centerX = WIDTH/2;// + (cos(map(time*10, 0, numOfLines, 0, PI*2)) * 3);
            // float centerY = HEIGHT/2;// + (sin(map(time*10, 0, numOfLines, 0, PI*2)) * 3);
            
            float x1 = (cos(map(i, 0, numOfLines, 0, PI*2)) * lineLength);
            float y1 = (sin(map(i, 0, numOfLines, 0, PI*2)) * lineLength);
            line(x1, y1, 0, 0);
        }

    pop();
}
