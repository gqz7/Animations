final int totalRings = 90;
PShape[] rings = new PShape[totalRings];
float[][] dustSeeds = new float[3000][4];
float dustAge = 0;
float galaxyAge = 0;

class SpaceDebris {

  void spawnGalaxies () {
  
      float innerRad = 1, outerRad = 9, increment = 1;
      for(int ringIndex = 0 ; ringIndex < totalRings ; ringIndex++){
        PShape ring = createShape();
        ring.setStrokeWeight(1.55);
        ring.beginShape(POINTS);
        ring.stroke(lerpColor(color(8888, 67, 100), color(9288, 100, 0), ringIndex/50f), 175f);
        for(int starIndex = 0 ; starIndex < 3000 ; starIndex++){
          float area = random(0, 1) * PI * 2;
          float radius = sqrt(random(sq(innerRad), sq(outerRad)));
          ring.vertex(radius * cos(area), radius * sin(area), random(-increment, increment));
        }
        ring.endShape();
        rings[ringIndex] = ring;
        innerRad += increment;
        outerRad += increment*1.5;
        increment += 1;
      }

  
  }
  
  
  void spawnDust () {
  
    for (int i = 0; i < dustSeeds.length; i++) {
      //println(random(0,PI*2));
      dustSeeds[i][0] = (float) random(-PI,PI);
      dustSeeds[i][1] = (float) random(1);
      dustSeeds[i][2] = (float) random(0.5,1);
      dustSeeds[i][3] = (float) random(-PI,PI);
    }
  
  }
  
  
  void renderGalaxies () {
   
    galaxyAge += renderSpeed;
    
      for(int index = 0 ; index < 50 ; index++){
        pushMatrix();
        rotateY((TWO_PI/(index*index)*galaxyAge)/25*renderSpeed);
        rotateX(PI/2);
        shape(rings[index]);
        popMatrix();
      }
  
  }
  
  void renderCirclingDust (float rad, float h) {
  
    dustAge += renderSpeed;
    //println(dustSeeds[0]);
    for (int i = 0; i < dustSeeds.length; i++) {
      
      
      float seed1 = dustSeeds[i][0];
      float seed2 = dustSeeds[i][3];
      boolean isMovingRight = dustSeeds[i][1] > .5;
      float speed = dustSeeds[i][2];
      float tempRad = rad * speed;
      
      float x = 0;
      float z = 0;
      
      if (isMovingRight) {
        x = cos(i+(dustAge*speed)/1111) * tempRad;
        z = sin(i+(dustAge*speed)/1111) * tempRad;
      
      } else {
        x = cos(i-(dustAge*speed)/1111) * tempRad;
        z = sin(i-(dustAge*speed)/1111) * tempRad;

      }
      
      float y = sin(seed1+dustAge/3333) * h;
      
      
      
      float light = map(sin(seed2+dustAge/7),-1,1, 25, 100);
      
      push();
        stroke(8527*speed, 30, light);
        translate(x,y,z);
        point(0,0);
      pop();
      
    
    
    }
  
    
  }



}
