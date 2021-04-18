class Geometry {
  
  void renderMain () {
    noFill();
    stroke(360);
    strokeWeight(5);
    
    /////////// render static triagle
    float startSz = .03;
    float endSz = 1;
    
    float roationPeriod = 2222;

    
    //println(frames%100 < 51, frames);
    
    float mappedRotation = (float)frames % roationPeriod;
    
    float mappedRotationScale = 
      mappedRotation < roationPeriod/2 + 1 
      ? mappedRotation < roationPeriod/4 + 1 
        ? map( mappedRotation/roationPeriod, 0, .25, 0, -1)
        : map( mappedRotation/roationPeriod, .25, .5, -1, 0)
      : mappedRotation < roationPeriod/4*3 + 1
        ? map( mappedRotation/roationPeriod, .5, .75, 0, 1)
        : map( mappedRotation/roationPeriod, .75, 1, 1, 0);
      
    //println(mappedRotation, mappedRotationScale, mappedRotation/roationPeriod);
         
    // middle entity
    float scale2 = 10;
    push();
      //rotate(14.95);
      tri(scale2*10, 0);
      push();
        rotate(PI);
        tri(scale2*10, 0);
      pop();
    pop();
    ///////////  
    
    // vortex of triagles
    push();
    for ( float i = startSz; i < endSz; i+= .001*(1+i/1111+(float)frames/7777777)) {
      
      
      //STROKE CONFIG  ------------------------------------------
      //COLOR
      //dark (center)  to light
      //stroke(map(i, startSz, endSz, 5, 360));
      
      //light (center)  to dark
      stroke( 
        map(i*2, startSz, endSz, 0, 360) % 360, 
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
      
        rotate( (i*PI*6*mappedRotationScale) );
      
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
    
    
  }
  
  void tri (float scale, float zTrans) {
    
    //rotate(45);
    push();
    translate(0, 0, zTrans);
    //rotate(-45);
    triangle(0, -1*scale, 1*scale, .5*scale, -1*scale, .5*scale);
    pop();
  } 

}
