class Geometry {
  
  void renderMain () {
    
    //FLOATING STARS
    spaceDebris.renderCirclingDust(3000, 900);
   
    //GALAXY BOTTOM
    push();
      translate(0,1000,0);
      blendMode(ADD);
      spaceDebris.renderGalaxies();
    pop();
    
    //GALAXY TOP
    push();
      translate(0,-1000,0);
      rotateX(PI);
      blendMode(ADD);
      spaceDebris.renderGalaxies();
    pop();
    
    //FLOWER
    push();    
      rotateZ(PI/6);
      blendMode(BLEND);
      spaceFlower.drawFlower(27, false); //spaceFlower.drawFlower(27, false);
    pop();
    
    
    nebula.render1(1500, 900);
    
    
    //pyramid(frames);
    //println(frames/100);
    //push();
    //  blendMode(BLEND);
    //  //rotateZ(PI);
    //  //rotateX(frames/1000);
    //  //rotateX(frames/1000);
    //  rotateY(frames/1000);
    //  // //rotateX(PI/4);
    //  rotate(2.679);
      
       
    //  //rotateY(.1);
    //  //rotateX(frames/100);
    //  //merkabah(250);   
      
    //  pyramid(25);
    
    //float testRadius = 250;
    //noFill();
    ////X
    //strokeWeight(testRadius/50);
    //stroke(0, 100, 70);
    //line(-testRadius, 0, testRadius, 0); //RED IS X
    ////Y
    //stroke(3333, 100, 70);
    //line(0, -testRadius, 0, testRadius); //GREEN IS Y
    ////Z
    //push();
    //rotateY(PI/2);
    //stroke(6666, 100, 70);
    //line(-testRadius, 0, testRadius, 0); //BLUE IS Z
    //pop();
    //pop();
     
        
  }
  
  void pyramid ( float size ) {
    
    float size1 = size;
    float size2 = size / 3;
    //noStroke();
    stroke(10000);
    strokeWeight(1);
      
    push();
    
     translate(-size/3, -size/3, -size/3);
      //noFill();
      
      beginShape(TRIANGLES);      
        
      fill(9000, 50, 1000);
      
      vertex( size2,  size1,  -size1);
      vertex( size1,  size1,  size1);
      vertex( -size1, size2,  size1);
      vertex( size2,  size1,  -size1);
      
      vertex( size1,  -size1, size2);
      vertex( -size1, size2,  size1);
      vertex( size2,  size1,  -size1);
      vertex( size1,  -size1, size2);
      
      
      vertex( size1,  -size1, size2);
      vertex( size2,  size1,  -size1);
      vertex( size1,  size1,  size1);
      vertex( size1,  -size1, size2);
      
      
      vertex( size1,  -size1, size2);
      vertex(-size1, size2,  size1 );
      vertex( size1,  size1,  size1);
      vertex( size1,  -size1, size2);
      
      endShape();
    
    pop();
     
     
    push();
    
      
     translate(size2, size2, size2);
    
      //noFill();
      
      beginShape(TRIANGLES);      
        
      fill(3000, 50, 1000);
      
      vertex( -size2, -size1,  size1);
      vertex( -size1, -size1, -size1);
      vertex( size1, -size2,  -size1);
      vertex( -size2, -size1,  size1);
      
      vertex( -size1,  size1, -size2);
      vertex( size1, -size2,  -size1);
      vertex( -size2, -size1,  size1);
      vertex( -size1,  size1, -size2);
      
      
      vertex( -size1,  size1, -size2);
      vertex( -size2, -size1,  size1);
      vertex( -size1, -size1, -size1);
      vertex( -size1,  size1, -size2);
      
      
      vertex( -size1,  size1, -size2);
      vertex(size1, -size2,  -size1 );
      vertex( -size1, -size1, -size1);
      vertex( -size1,  size1, -size2);      
      endShape();
    
    pop();
    
    
  
  }
  

  void merkabah (float size) {
    
    float size1 = size;
    float size2 = size / 2;
    //const size1 = frames/5 < 120 ? frames/5 : 120,
    //          size2 = frames/10 < 60 ? frames/10 : 60;

    float[][] merkabahPoints = {
        { size1,  size1,  size1,  0},
        { size2,  size1,  -size1, 30},
        { -size1, size2,  size1,  60},
        { size1,  -size1, size2,  130},
        
        { -size1, -size1, -size1, 180},
        { -size2, -size1, size1,  225},
        { size1,  -size2, -size1, 270},
        { -size1, size1,  -size2, 315},
    };
    
    //BEGIN SHAPE
    //stroke(0);
    noStroke();
    fill(10000);
    //translate(merkabahPoints[0][0], merkabahPoints[0][1], merkabahPoints[0][2]);
    //beginShape(TRIANGLES);
    for (int i = 0; i < 5; i++) {
      push();
      
        float[] point = merkabahPoints[i];
        
        fill(map(point[3], 0, 360, 0, 10000),50,100);
        
        float x = point[0];
        float y = point[1];
        float z = point[2];
        //vertex(x, y, z);
        translate(x,y,z);
        box(10);
      pop();
    }
    //endShape();
  
  }
   
    
      //triangleVortex1();
      //triangleVortex2();
      // particleRender(3, 0, 22, 222);
      // particleRender(2, 0, 22, 222);
      //particleRender(2, 0, 35, 3);
      //particleRender(3, 0, 37, 5);
  
 
    
  void particleRender (int shapeOpt, int clrOpt, int particleLim, int size) {
    
    if (shapeOpt == 3) rotateX(PI/2);
    
    int count = 0;
    
    for (float i = 0; i < particleLim; i++) {
      
     switch (clrOpt) {
       case 0:
        fill(
          (map(i, 0, particleLim, 0, 10000) + frames) % 10000, 
          70, 
          90
        );
       break;
     
     }
      
      switch (shapeOpt) {
      
        case 0:
         //======================================================================================================================================
        //random particles in Square
          float calX = sin((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(100+i))*size;
          float calY = sin((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(200+i))*size;
          float calZ = cos((float)(noise.noise2(i*100, i*100)*(frames+1000)*20)/(100))*size;
          push();
            translate(calX, calY, calZ);
            sphere(1);
          pop();
        
        break;
        case 1:
          //======================================================================================================================================
          //random particle wide tourus
          float noiseX = (float) (noise.noise2(i*100, i*100)) * ((float)frames/17+1000)*20/(3333+i);
          float noiseY = (float) (noise.noise2(i*100, i*100)) * ((float)frames/17+1000)*20/(3333+i);
                calX = (float) (size * sin(noiseX) * cos(noiseY));
                calY = (float) (size * sin(calX) * sin(noiseY));
                calZ = (float) (size * cos(calX));
          push();
            translate(calX, calY, calZ);
            sphere(.1);
          pop();
         break;
         case 2:
                //======================================================================================================================================
            // random Sphere (shell)
            float shapeSize = (float) size;
            
            for (float j = 0; j < sqrt(particleLim); j++) {
              float pNoise = ((float) noise.noise2(((i+j+10))+(float)frames/99999, ((i+j+10))+(float)frames/99999));
              float noiseLon = map(i , 0, sqrt(particleLim), 50, shapeSize) * pNoise;
              float noiseLat = map(j , 0, sqrt(particleLim), 50, shapeSize) * (pNoise+.1);
              
                    calX = (float) (shapeSize * sin(noiseLat) * cos(noiseLon));
                    calY = (float) (shapeSize * sin(noiseLat)   * sin(noiseLon));
                    calZ = (float) (shapeSize * cos(noiseLat));
              
              push();
              
                rotateX(map(j, 0, sqrt(particleLim), 0, PI*2));
                translate(calX, calY, calZ);
                sphere(.1);
              pop();
            }
  
         break;
         case 3:
           //======================================================================================================================================
          // random Sphere (inside)
          int shapeSize2 = (int) size;//particleLim*5;
          
          for (float j = 0; j < sqrt(particleLim); j++) {
            float lonNoise = ((float) noise.noise2(((i+j*13))+(float)frames/16777+10, ((i+j*10))+(float)frames/17777+10));
            float latNoise = ((float) noise.noise2(((i+j*15))+(float)frames/17777+27, ((i+j*17))+(float)frames/14777+27));
            float zNoise = ((float) noise.noise2(((i+j+100))+(float)frames/7777, ((i+j+100))+(float)frames/7777));
            float noiseLon = map(j*i, 0, sqrt(particleLim)*particleLim, shapeSize2/2, shapeSize2) * lonNoise;
            float noiseLat = map(j*i, 0, sqrt(particleLim)*particleLim, shapeSize2/2, shapeSize2) * latNoise;
            
                  calX = (float) (shapeSize2 * sin(noiseLat) * cos(noiseLon));
                  calY = (float) (shapeSize2 * sin(noiseLat)   * sin(noiseLon));
                  calZ = (float) (shapeSize2 * cos(noiseLat)) * zNoise;
            
            push();
              rotateX(zNoise*PI*2);
              translate(calX, calY, calZ);
              sphere(1);
            pop();
            count++;
             //println(shapeSize2 * lonNoise);
  
          }
         break;
         case 4:
          //float x = sin((float)(i*(frames+100)*2)/(1000))*50;
          //float y = sin((float)(i*(frames+100)*2)/(2000+i))*50;
          //float z = cos((float)(i*(frames+100)*2)/(1000))*50;
         
         break;
      }
     
    }
    
   
  
  }
  
  void tri (float scale, float zTrans) {
    
    //rotate(45);
    push();
    translate(0, 0, zTrans);
    //rotate(-45);
    triangle(0, -1*scale, 1*scale, .5*scale, -1*scale, .5*scale);
    pop();
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
        ((map(i*2, startSz, endSz, 0, 10000) % 10000) + frames) % 10000, 
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
      float scale1 = map(i, startSz, endSz, 3, 0), zTrans1 = map(i, startSz, endSz, 0, 100);
        
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
