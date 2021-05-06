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
  


}
