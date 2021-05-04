class Geometry {
  
  void renderMain () {

    renderMerkaba1();
    triangleVortex1();

  }
  
  void tri (float scale, float zTrans) {
    
    //rotate(45);
    push();
    translate(0, 0, zTrans);
    //rotate(-45);
    triangle(0, -1*scale, 1*scale, .5*scale, -1*scale, .5*scale);
    pop();
  } 

  void renderMerkaba1 () {
      
      noFill();
      strokeWeight(1);
      stroke(360);
      /////////// render static triagle
      //println(mappedRotation, mappedRotationScale, mappedRotation/roationPeriod);
          
      // middle entity
      float scale2 = 77;
      
      float triCount = 777;
      
      
      for (float i = 0; i < triCount; i++) {      
          stroke((map(i, 0, triCount/77, 0, 360)+frames)%360, 100, 50);
          push();
        
            //rotateX(map(i, 0, triCount, -PI, PI)*2);
            //rotateY(map(i, 0, triCount, -PI, PI)*2);
            rotateZ(map(i, 0, triCount, -PI, PI)*2+(float)frames/1000);
            
              tri( scale2/i, 0);
            push();
              rotate(PI);
              tri( scale2/i, 0);
            pop();
          pop();    
      }
      
      
  }

  void triangleVortex1 () {

      noFill();
      // vortex of triagles
      float startSz = .03;
      float endSz = 1;
      
      float roationPeriod = 2222;
      float mappedRotation = (float)frames % roationPeriod;
      
      float mappedRotationScale = 
        mappedRotation < roationPeriod/2 + 1 
        ? mappedRotation < roationPeriod/4 + 1 
          ? map( mappedRotation/roationPeriod, 0, .25, 0, -1)
          : map( mappedRotation/roationPeriod, .25, .5, -1, 0)
        : mappedRotation < roationPeriod/4*3 + 1
          ? map( mappedRotation/roationPeriod, .5, .75, 0, 1)
          : map( mappedRotation/roationPeriod, .75, 1, 1, 0);
        

      push();
      for ( float i = startSz; i < endSz; i+= .001*(1+i/1111+(float)frames/7777777)) {
        
        
      //STROKE CONFIG  ------------------------------------------
      //COLOR
      //dark (center)  to light
      //stroke(map(i, startSz, endSz, 5, 360));
        
      //light (center)  to dark
      stroke( 
        ((map(i*2, startSz, endSz, 0, 360) % 360) + frames) % 360, 
        map(i, startSz, endSz, 0, 100), 
        map(i, startSz, endSz, 100, 1)
        );
        
      //fill(
      //  map(i*2, startSz, endSz, 0, 360) % 360, 
      //  map(i, startSz, endSz, 0, 100), 
      //  map(i, startSz, endSz, 100, 1)
      //);
        
      //WEIGHT
      strokeWeight(map(i, startSz, endSz, 1, 0));
        
      // ------------------------------------------------------------------------------------
        
      //SHAPE SIZE
      float scale1 = i*i*height/7, zTrans1 = pow(i,3)*height*endSz;
        
      //RENDER ------------------------------------------
      push();
        
        rotate( (i*PI*3*mappedRotationScale) );
        
        tri(scale1, zTrans1);
        tri(scale1, -zTrans1);
        
        push();
          rotate(PI);
          tri(scale1, zTrans1);
          tri(scale1, -zTrans1);
        pop();
          
      pop();
      //END RENDER ------------------------------------------
        
      }
      pop();
      //END vortex of triagles

  }
  
  void renderDepthMarkers (int depthZ) {
    
    //markers for postive and negitive Z values
    push();
      fill(180,100,50);
        translate(0,0, -depthZ);
        circle(0,0,10);
      fill(0,100,50);
        translate(0,0, depthZ);
        circle(0,0,10);
    pop();
    
    ///////////  
  }
  
  
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
