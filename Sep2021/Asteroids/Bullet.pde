class Bullet {

  PVector pos;
  float rotation;
  float power;
  float maxSpeed;
  int bColor;
  Rocket owner;

  Bullet(float posX, float posY, float rotation, float power, Rocket owner) {

      
      pos = new PVector(posX, posY);

      this.rotation = (rotation * PI / 180) - PI/2;   
      this.owner = owner;
      this.power = pow(abs(power/2-160),1.35)+25;
      //println(this.power);
      bColor = (int) power;
  }
  
  void render () {
    fill(bColor, 100, 100);
    rect(pos.x, pos.y, 3, 3);
  }
  
  boolean move () {
      
    pos.add(PVector.fromAngle(rotation).mult(15));

    for (int i = 0; i < random(-10,2); i++) {
      Particle newP = new Particle(pos.copy(), rotation-PI/2, bColor);
      
      debrisParticles.add(newP);
    }

    return checkOffScreen();
  }
  boolean checkOffScreen () {
    if (pos.y < 0 || pos.x < 0 ||pos.y > height || pos.x > width) {
    
      // owner.bullets.remove(owner.bullets.indexOf(this));
      return true;
    }
    return false;
  }

}
