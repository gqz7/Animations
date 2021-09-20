class Bullet {
  float posX;
  float posY;
  float rotation;
  float speed;
  float maxSpeed;
  int bColor;
  Rocket owner;

  Bullet(float posX, float posY, float rotation, float speed, Rocket owner) {
      this.posX = posX; 
      this.posY = posY; 
      this.rotation = rotation;   
      this.owner = owner;
      this.speed = speed + 20;
      bColor = (int) random(222,300);
  }
  
  void render () {
    fill(bColor, 100, 100);
    rect(posX, posY, 4, 4);
  }
  
  boolean move () {
  
    float rotationRad = (rotation * PI / 180) + PI/2 ;

    float newX = posX - (speed * cos(rotationRad));
    float newY = posY - (speed * sin(rotationRad));

    posX = newX;
    posY = newY;

    return checkOffScreen();
  }
  boolean checkOffScreen () {
    if (posY < 0 ||posX < 0 ||posY > height || posX > width) {
    
      // owner.bullets.remove(owner.bullets.indexOf(this));
      return true;
    }
    return false;
  }

}
