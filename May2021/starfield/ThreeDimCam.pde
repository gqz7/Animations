
  //CAMERA VARS
  int cameraSelection = 3;
  float radius = 500;
  float cameraSpeed = 1;
  final float startingZ = (height /2) / tan(PI / 6);
  final int camMLim = 30;
  final int radiusLim = (int)radius/100;
  

  void mouseWheel(MouseEvent event) {
    if (radius > radiusLim) {
      radius += event.getCount() * radiusLim;
    } else if ( radius == radiusLim && event.getCount() == 1) {
      radius = radiusLim * 2;
    } else {
      radius = radiusLim;
    }
  }

class ThreeDimCam {
 
  
  void configureCamera(int camOpt) { 
    
    float curX = 0, curY = 0, curZ = 0;
  
    if (camOpt == 0) {
       //AUTO ROTATE CAM
   
         float [] rotationP = {777, 872, 4142};
         float [] camPos = new float [3];
         
         for (int i = 0; i < rotationP.length; i++) {
           
           float rotationPX = rotationP[i];
           
           float framesMod = frames%rotationPX;
           float camP = framesMod < rotationPX/2 + 1 
              ? framesMod < rotationPX/4 + 1 
                ? map( framesMod/rotationPX, 0, .25, 0, -1)
                : map( framesMod/rotationPX, .25, .5, -1, 0)
              : framesMod < rotationPX/4*3 + 1
                ? map( framesMod/rotationPX, .5, .75, 0, 1)
                : map( framesMod/rotationPX, .75, 1, 1, 0);
                
           camPos[i] = camP * radius; 
         
         }
         
         curX = camPos[0]+24;
         curY = camPos[1]+12;
         curZ = 1000;//camPos[2]/10+10;
         
    } else if (camOpt == 1) {
          //Random ORBIT CAM              
         
         curX = sin((float)frames/222*cameraSpeed) * radius;
         
         curY = sin((float)frames/444*cameraSpeed) * -radius/3;
      
         curZ = cos((float)frames/333*cameraSpeed) * radius;
       
    
    } else if (camOpt == 2) {
          //Perfect ORBIT CAM              
         
         curX = sin((float)frames/111*cameraSpeed) * radius;
         
         curY = sin((float)frames/555*cameraSpeed) * -radius/3;
      
         curZ = cos((float)frames/111*cameraSpeed) * radius;
       
    
    } else if (camOpt == 3) {
         //MOUSE CONTROLED CAM
         
         curX = sin(map(mouseX, 0, width, 0, PI*2))*-radius;
         curY = sin(map(mouseY, 0, height, PI*.75, PI*6/4))*radius*2;
         curZ = cos(map(mouseX, 0, width, 0, PI*2))*-radius;
    
    } 
  
  
    camera(
       curX,   //(float)mouseX/4 + width/8, //X
       curY,   //(float)mouseY/4 + height/8, //Y
       curZ,   //500-frames,  //Z
       0,      //centerX
       0,      //centerY
       0,      //centerZ
       0, 
       1, 
       0
    );
  }

  // ========================================================================================================================================
  void renderCamGumball() {
    
    int testRadius = 250;
  
    fill(100, 0, 100);
    noStroke();
    //noFill();
    //strokeWeight(10);
    
    int count = 0;
    
     float curX = cos(map(mouseX, 0, width, 0, PI*2))*testRadius;
     float curY = sin(map(mouseY, 0, height, 0, PI*2))*testRadius;
    
    
    for (float i = 0; i <= PI*2; i+=PI/testRadius) {
      count++;
        //println(count, ((cos(i)*200)) );
      
      float cosI = cos(i)*testRadius;
      float sinI = sin(i)*testRadius;
      //float tanI = tan(i)*200;
      
      //create X/Z circle      
      float sz = 3;
      
      if (cosI > curX+testRadius/20 || cosI < curX-testRadius/20) {
        
        fill(100, 0, 100);
      
      } else {
      
          sz = 10;
        fill(0, 100, 80);
         
      }   
      push();
       translate(cosI, 0, sinI);
       circle(0, 0, sz);
      pop();
      
      //create Y/Z circle
      sz = 3;
      
      if (sinI > curY+testRadius/20 || sinI < curY-testRadius/20) {
        
        fill(100, 0, 100);
      
      } else {
      
         sz = 10;
        fill(0, 100, 80);
        
      }   
      
      
      push();
       translate(0, sinI, cosI);
       circle(0, 0, sz);
      pop();
      
    }
  
    // println(curZ);
    
    //CREATE CIRCLE
    fill(60, 100, 100); //YELLOW IS POSTIVE X
    
    push();
     translate(testRadius*4, 0, 0);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(300, 100, 100); //PURPLE IS NEGITIVE X
     
    push();
     translate(-testRadius*4, 0, 0);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(0, 100, 100); //RED IS POSTIVE Z
    
    push();
     translate(0, 0, testRadius*4);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(180, 100, 100); //BLUE IS NEGITIVE Z
     
    push();
     translate(0, 0, -testRadius*4);
     circle(0, 0, testRadius/4);
    pop();
    
    //create 
    
    //CREATE X Y Z LINES
    
    //X
    strokeWeight(testRadius/50);
    stroke(0, 100, 70);
    line(-testRadius, 0, testRadius, 0);
    //Y
    stroke(120, 100, 70);
    line(0, -testRadius, 0, testRadius);
    //Z
    push();
    rotateY(PI/2);
    stroke(240, 100, 70);
    line(-testRadius, 0, testRadius, 0);
    pop();
  }

}
