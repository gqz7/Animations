class Particle {
  PVector v; 
  float dir;
  float vel;
  short l; 
  Particle (PVector v, float dir) {
    this.v = v;
    this.dir = dir+random(0,PI);
    this.vel = random(.1,1);
    l = 360;
  }
  
  boolean move () {
      l--;  
      PVector force = PVector.fromAngle(dir);
      force.setMag(vel);
      v.add(force);
      if (l <= 0) return true;
      return false;
  }
  
  void render () {
    noStroke();
    fill(l);
    rect(v.x, v.y,2,2);
  }
}
