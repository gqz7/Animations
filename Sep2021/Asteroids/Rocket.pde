
int size = 30;

class Rocket {
  PImage rocketImgOn;
  PImage rocketImgOff;
  float posX;
  float posY;
  //in degrees
  float rotation;
  float speed;
  int maxSpeed;
  int boosterClock = 0;
  ArrayList<Bullet> bullets;

  Rocket () {
    
    bullets = new ArrayList<Bullet>();
    rocketImgOn = loadImage("./rb-on.png");
    rocketImgOff = loadImage("./rb-off.png");
    
    posX = width / 2;
    posY = height / 2;
    
    rotation = 0;
    maxSpeed = 25;
    speed = 0;

  }


  void render () {
    println(bullets.size());
    
    ArrayList<Bullet> removeList = new ArrayList<Bullet>();
    for (Bullet b : bullets) {
      b.render();
      if (b.move()) removeList.add(b);
    }
    bullets.removeAll(removeList);


    push();
      translate(posX, posY);
      rotate(rotation * PI / 180 );
      image((boosterClock > 0 ? rocketImgOn : rocketImgOff), 0-size/2, 0-size/2, size, size);
    pop();
    
  }
  
  void move () {

    if (boosterClock > 0) boosterClock--;
    
    if (boosterClock == 0 && speed > .2) speed -= speed/maxSpeed/3;
    
    float rotationRad = (rotation * PI / 180) + PI/2 ;

    float newX = posX - (speed * cos(rotationRad));
    float newY = posY - (speed * sin(rotationRad));

    posX = newX;
    posY = newY;

    checkOffScreen();

    // fill(0);
    // circle(newX, newY, 10);
    if (speed < 0) speed = 0;
  } 

  void checkOffScreen () {
    if (posY < 0) posY = height;
    if (posX < 0) posX = width;
    if (posY > height) posY = 0;
    if (posX > width) posX = 0;
  }
  
  void propel (boolean boost) {
    if (boost) {
      boosterClock = 20;
      if (speed < maxSpeed) {
        speed += .1;
      
      } 
    } else {
      boosterClock = 0;
      if (speed > 0) {
        speed -= .01;
      
      }
    }
  }

  void turn (boolean turnLeft) {
    float turnRate = 3;
    float newR = turnLeft ? rotation - turnRate : rotation + turnRate;
    rotation = newR % 360;
    if (speed > 1) speed -= speed/maxSpeed / 10;

    // println(rotation);
    // println(newR);
    // if (newR < 0) newR = 360 - newR;
  }
  
  void fire () {
    //println("pew" );
    bullets.add(new Bullet(posX, posY, rotation, speed, this));
  
  }

}
