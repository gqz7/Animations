class Particle {
  PVector v; 
  float dir;
  float vel;
  short lit; 
  float hue;
  Particle (PVector v, float dir) {
    this.v = v;
    this.dir = dir+random(0,PI);
    this.vel = random(.1,2);
    lit = 100;
    hue = random(0, 50);;
  }
  Particle (PVector v, float dir, float hue) {
    this.v = v;
    this.dir = dir+random(0,PI);
    this.vel = random(.1,1);
    this.hue = hue;
    lit = 100;
  }
  
  boolean move () {
      lit-=.25;  
      hue+=.25;
      PVector force = PVector.fromAngle(dir);
      force.setMag(vel);
      v.add(force);
      if (lit <= 0) return true;
      return false;
  }
  
  void render () {
    noStroke();
    fill(hue, map(hue, 0, 360, 50, 100), lit);
    rect(v.x, v.y, 1.5, 1.5);
  }
}
