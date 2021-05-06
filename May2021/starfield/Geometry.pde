class Geometry {
  
  void renderMain () {

    //renderMerkaba1();
    push();
      //rotateZ(-PI/4);
      //rotateZ((float)frames/300);
      //rotateY((float)frames/300);
      //triangleVortex1();
      //triangleVortex2();
      galaticVoid1();
    pop();
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
      float scale1 = i*i*111, zTrans1 = pow(i,3)*1111*endSz;
        
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
  
  void triangleVortex2 () {

      noFill();
      // vortex of triagles
      float startSz = .03;
      float endSz = 1;
      
      float roationPeriod = 3333;
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
      for ( float i = startSz; i < endSz; i+= .001) {
        
        
        //STROKE CONFIG  ------------------------------------------
        //COLOR
        //dark (center)  to light
        //stroke(map(i, startSz, endSz, 5, 360));
          
        //light (center)  to dark
        stroke( 
          ((map(i, startSz, endSz, 0, 360) % 360) + frames) % 360, 
          map(i, startSz, endSz, 70, 100), 
          map(i, startSz, endSz, 80, 100)
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
        float scale1 = 222-i*222, zTrans1 = pow(i,2)*2222*endSz;
          
        //RENDER ------------------------------------------
        push();
        
          //rotateY(((endSz-i) * mappedRotationScale*(1-i) ) );
          
          rotate( ((endSz-i) * mappedRotationScale* 42  ) );
          
          tri(scale1, zTrans1);
          tri(scale1, -zTrans1);
          
          rotate(PI);
          tri(scale1, zTrans1);
          tri(scale1, -zTrans1);
            
        pop();
        //END RENDER ------------------------------------------
        
      }
      pop();
      //END vortex of triagles

  }  
  
  void galaticVoid1 () {
  
    int particleLim = 42;
    
    for (float i = 0; i < particleLim; i++) {
      
      fill(
        (map(i, 0, particleLim, 0, 360) + frames) % 360, 
        70, 
        90
      );
      
      //======================================================================================================================================
      //random particles in Square
      //float x = sin((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(100+i))*200;
      //float y = sin((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(200+i))*200;
      //float z = cos((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(100))*200;
      //push();
      //  translate(calX, calY, calZ);
      //  sphere(1);
      //pop();
      
      //======================================================================================================================================
      //random particle wide tourus
      //float noiseX = (float) (noise.noise2(i*100, i*100)) * ((float)frames/17+1000)*20/(3333+i);
      //float noiseY = (float) (noise.noise2(i*100, i*100)) * ((float)frames/17+1000)*20/(3333+i);
      //float x = (float) (222 * Math.sin(noiseX) * Math.cos(noiseY));
      //float y = (float) (222 * Math.sin(x) * Math.sin(noiseY));
      //float calculatedZ = (float) (222 * Math.cos(x));
      //push();
      //  translate(calX, calY, calZ);
      //  sphere(1);
      //pop();
      
      
      //======================================================================================================================================
      // random Sphere (insides)
      int shapeSize = (int) i*5;
      
      for (float j = 0; j < sqrt(particleLim); j++) {
        float pNoise = ((float) noise.noise2(((i+j+10))+(float)frames/77777, ((i+j+10))+(float)frames/77777));
        float noiseLon = map(i , 0, sqrt(particleLim), 50, shapeSize) * pNoise;
        float noiseLat = map(j , 0, sqrt(particleLim), 50, shapeSize) * (pNoise+.1);
        
        float calX = (float) (shapeSize * sin(noiseLat) * cos(noiseLon));
        float calY = (float) (shapeSize * sin(noiseLat)   * sin(noiseLon));
        float calZ = (float) (shapeSize * cos(noiseLat));
        
        push();
          translate(calX, calY, calZ);
          sphere(1);
        pop();
      }


      //======================================================================================================================================
      // random Sphere (shell)
      int shapeSize2 = (int) particleLim*5;
      
      for (float j = 0; j < sqrt(particleLim); j++) {
        float pNoise = ((float) noise.noise2(((i+j+10))+(float)frames/77777, ((i+j+10))+(float)frames/77777));
        float noiseLon = map(i , 0, sqrt(particleLim), 50, shapeSize2) * pNoise;
        float noiseLat = map(j , 0, sqrt(particleLim), 50, shapeSize2) * (pNoise+.1);
        
        float calX = (float) (shapeSize2 * sin(noiseLat) * cos(noiseLon));
        float calY = (float) (shapeSize2 * sin(noiseLat)   * sin(noiseLon));
        float calZ = (float) (shapeSize2 * cos(noiseLat));
        
        push();
          translate(calX, calY, calZ);
          sphere(1);
        pop();
      }
      
      //float x = sin((float)(i*(frames+100)*2)/(1000))*50;
      //float y = sin((float)(i*(frames+100)*2)/(2000+i))*50;
      //float z = cos((float)(i*(frames+100)*2)/(1000))*50;
      
      
    
    }
  
  
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
