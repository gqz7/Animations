
  //CAMERA VARS
  int cameraSelection = 3;
  int position = 0;
  float radius = 1400;
  float cameraSpeed = renderSpeed;
  boolean rotateHorizontal = false;
  float camZoomSpeed = 20;
  final float startingZ = (height /2) / tan(PI / 6);
  final int radiusLim = 5;//(int)radius/5;
  final int radiusMax = (int) radius*5;
  
  // final int camMLim = 30;
  //float posZoomDis = 50;

  void mouseWheel(MouseEvent event) {
    if (radius > radiusLim) {
      radius += event.getCount() * camZoomSpeed;
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
         
         curX = sin((float)frames/444*cameraSpeed) * radius;
         
         curY = sin((float)frames/888*cameraSpeed) * -radius/3;
      
         curZ = cos((float)frames/555*cameraSpeed) * radius;
       
    
    } else if (camOpt == 2) {
          //Perfect ORBIT CAM              
         
         curX = sin((float)frames/111*cameraSpeed) * radius;
         
         curY = 0;//sin((float)frames/555*cameraSpeed) * -radius/3;
      
         curZ = cos((float)frames/111*cameraSpeed) * radius;
       
    
    } else if (camOpt == 3) {
         //MOUSE CONTROLED CAM
         
         curX = sin(map(mouseX, 0, width, 0, PI*2))*-radius;
         curY = sin(map(mouseY, 0, height, PI*.75, PI*6/4))*radius*2;
         curZ = cos(map(mouseX, 0, width, 0, PI*2))*-radius;
    
    } else if (camOpt == 4) {
          //Static cam         
         
         curY = 0;//sin((float)(frames+111)/111*cameraSpeed) * radius;
         
         curZ = radius;//sin((float)frames/111*cameraSpeed) * radius;
      
         curX = 0;//sin((float)frames/111*cameraSpeed) * radius;
       
    
    } else if (camOpt == 5) {
          
          //Zoom head on cam     
          float zoomSpeed = map(radius, 0, 1400, .1, .9);
          //println(radius, zoomSpeed);
          if (position == 0) {
            radius-= zoomSpeed * renderSpeed;
            if (radius < -85) {
            
              position = 1;
            }
          } else {
          
            radius+= zoomSpeed * renderSpeed ;
            
            if (radius > 1400) {
            
              cameraSelection = 6;
              frames = 0;
              switched = true;
              
            }
          
          }
         
         curY = 0;
         
         curZ = radius;
      
         curX = 0;
       
    
    } else if (camOpt == 6) {
          //zoom ORBIT CAM    
          
         float rotateSpeed = map (radius, 1400, 440, 3, 1.5 );
         //println(radius, rotateSpeed);
          
         if (radius > 444) radius -= .217 * renderSpeed;
         
         curX = sin((float)frames/(333*rotateSpeed)*cameraSpeed) * radius;
         
         curY = sin((float)frames/(1555*rotateSpeed)*cameraSpeed) * -radius/3;
      
         curZ = cos((float)frames/(333*rotateSpeed)*cameraSpeed) * radius;
       
    
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
    fill(1500, 100, 100); //YELLOW IS POSTIVE X
    
    push();
     translate(testRadius*4, 0, 0);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(8000, 100, 100); //PURPLE IS NEGITIVE X
     
    push();
     translate(-testRadius*4, 0, 0);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(0, 100, 100); //RED IS POSTIVE Z
    
    push();
     translate(0, 0, testRadius*4);
     circle(0, 0, testRadius/4);
    pop();
    
    fill(6000, 100, 100); //BLUE IS NEGITIVE Z
     
    push();
     translate(0, 0, -testRadius*4);
     circle(0, 0, testRadius/4);
    pop();
    
    //create 
    
    //CREATE X Y Z LINES
    noFill();
    //X
    strokeWeight(testRadius/50);
    stroke(0, 100, 70);
    line(-testRadius, 0, testRadius, 0); //RED IS X
    //Y
    stroke(3333, 100, 70);
    line(0, -testRadius, 0, testRadius); //GREEN IS Y
    //Z
    push();
    rotateY(PI/2);
    stroke(6666, 100, 70);
    line(-testRadius, 0, testRadius, 0); //BLUE IS Z
    pop();
  }

}
