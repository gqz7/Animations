final int totalRings = 50;
PShape[] rings = new PShape[totalRings];

class SpaceDebris {

  void spawn () {
  
      float innerRad = 1, outerRad = 9, increment = 1;
      for(int ringIndex = 0 ; ringIndex < totalRings ; ringIndex++){
        PShape ring = createShape();
        ring.setStrokeWeight(1.5);
        ring.beginShape(POINTS);
        ring.stroke(lerpColor(color(8888, 50, 100), color(9288, 100, 0), ringIndex/50f), 175f);
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
  
  
  void render () {
   
    
      for(int index = 0 ; index < 50 ; index++){
        pushMatrix();
        rotateY((TWO_PI/(index*index)*frameCount)/25*renderSpeed);
        rotateX(1.45f);
        shape(rings[index]);
        popMatrix();
      }
  
  }



}
