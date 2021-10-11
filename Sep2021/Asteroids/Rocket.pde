
int size = 30;

class Rocket {
  PImage rocketImgOn;
  PImage rocketImgOff;
  float posX;
  float posY;
  //in degrees
  float rotation;
  PVector pos; 
  PVector mtm;
  float mtmLim;
  float boosterTemp;
  int maxBoosterTemp;
  int boosterClock;
  ArrayList<Bullet> bullets;
  ArrayList<Integer[]> trail;
  float bcdMax;
  float bulletCoolDown;
  float health;
  float healthMax;
  float score;
  

  Rocket () {
    
    healthMax = 100;
    score = 0;
    health = healthMax;
    bullets = new ArrayList<Bullet>();
    trail = new ArrayList<Integer[]>();
    rocketImgOn = loadImage("./rb-on.png");
    rocketImgOff = loadImage("./rb-off.png");

    
    pos = new PVector( width / 2, height / 2);
    mtm = new PVector(0,0);
    mtmLim = 7;
    
    boosterClock = 0;
    bulletCoolDown = .01;
    bcdMax = 1;
    rotation = 0;
    maxBoosterTemp = 10;
    boosterTemp = 0;

  }
  
  void renderTrail() {
    //  println(trail.size());
    ArrayList<Integer[]> trailToRemove = new ArrayList<Integer[]>();
    for (Integer[] p : trail) {
      if (p[2] <= 0) trailToRemove.add(p);
      p[2]--;
      int hue = (int) map(p[2], 1, 50, 0, 340);
      int brt = (int) map(p[2], 1, 50, 0, 100);
      fill(hue, 50, brt);
      rect(p[0], p[1], 2,2);
    
    }
    trail.removeAll(trailToRemove);
  }

  void render () {
    PVector booster1 = new PVector(0.0, 0.0, 0.0);
    PVector booster2 = new PVector(0.0, 0.0, 0.0);
    booster1.set(pos);
    booster2.set(pos);
     PVector aV = PVector.fromAngle(PI/2);
    booster1.add(aV);
    booster2.sub(aV);
    booster1.div(1.01);
    booster2.mult(1.01);
    
    
    
    trail.add(new Integer[]{(int)booster1.x, (int)booster1.y, 50});
    trail.add(new Integer[]{(int)booster2.x, (int)booster2.y, 50});
    // //println(trail.get(0)[0]);
    // //println(trail.get(0)[1]);
    // //println(trail.get(0)[2]);
    
    renderTrail();
    
    ArrayList<Bullet> removeList = new ArrayList<Bullet>();
    for (Bullet b : bullets) {
      b.render();
      if (b.move()) removeList.add(b);
    }
    bullets.removeAll(removeList);


    push();
      //translate(posX, posY);
      translate(pos.x, pos.y);
      rotate(rotation * PI / 180 );
      image((boosterClock > 0 ? rocketImgOn : rocketImgOff), 0-size/2, 0-size/2, size, size);
    pop();
    
  }
  
  void move () {

    // println(momentumDir);
    if (boosterClock > 0) boosterClock--;
    bulletCoolDown = bulletCoolDown-.01 > .01 ? bulletCoolDown-.01 : .01;    

    if (boosterClock == 0 && boosterTemp > .2) boosterTemp -= boosterTemp/maxBoosterTemp/15;
    if (boosterTemp < 0) boosterTemp = 0;

    pos.add(mtm);
    
    checkOffScreen();
    
  } 

  void checkOffScreen () {
    int radius = (int) size/2; 
      if (pos.y < -radius*2) pos.y = height+radius*2;
      if (pos.x < -radius*2) pos.x = width+radius*2;
      if (pos.y > height+radius*2) pos.y = -radius*2;
      if (pos.x > width+radius*2) pos.x = -radius*2;
  }
  
  void propel (boolean boost) {
    if (boost) {
      boosterClock = 20;
      if (boosterTemp < maxBoosterTemp) {
        boosterTemp += .05;
      
      } 
      
      if (mtm.mag() < mtmLim) {
        float rotationRad = (rotation * PI / 180) - PI/2;
        PVector boostV = PVector.fromAngle(rotationRad);
        boostV.mult(boosterTemp/100);
        mtm.add(boostV);
        
      } else {
        mtm.setMag(mtmLim-.01);
      }
    } else {
      boosterClock = 0;
      if (boosterTemp > 0) {
        boosterTemp -= .03;
      
      }
      mtm.div(1.01);

    }

    momentumDir = mtm;

  }

  void turn (boolean turnLeft, boolean isSlowing) {
    float turnRate = isSlowing ? 1/(1+momentumPerc) : 5/(1+momentumPerc);
    float newR = turnLeft ? rotation - turnRate : rotation + turnRate;
    rotation = newR % 360;
    if (boosterTemp > 1) boosterTemp -= boosterTemp/maxBoosterTemp / 20;

  }
  
  void fire () {
    //println("pew" );
    if (bulletCoolDown < bcdMax) {
       bulletCoolDown += .1;
       float power = map(bulletCoolDown/(bcdMax), 0, 1, 200, 320);
       bullets.add(new Bullet(pos.x, pos.y, rotation, power, this));
    }
  }
  
  void renderSpeed () {
    //BAR DIMS
    int barHeight = 100;
    int barWidth = 25;
    float boosterTempPerc = boosterTemp/(maxBoosterTemp+.03);
    momentumPerc = mtm.mag() / (mtmLim+.03);
    
    float boosterTempBarHeight = map(boosterTempPerc, 1, 0, 0, barHeight*.9); 
    float momentumBarHeight = map(momentumPerc, 1, 0, 0, barHeight*.9); 
    
    //COLOR
    float tempHue = map(boosterTempPerc, 1, 0, 200, 270);
    color tempClr = color(tempHue, 100, 100);
    float mtmHue = map(momentumPerc, 1, 0, 0, 120);
    color mtmClr = color(mtmHue, 100, 100);
    

    //RENDER
    push();
      fill(50);
      rect(0,height-barHeight,barWidth*2.25,barHeight, 0, 15, 0 ,0);
      fill(tempClr);
      rect(0, height-barHeight*.9+boosterTempBarHeight, barWidth*.75, barHeight, 0, 5, 0 ,0);
      fill(mtmClr);
      rect(barWidth*1.15, height-barHeight*.9+momentumBarHeight, barWidth*.75, barHeight, 5, 5, 0 ,0);

    pop();

  }
  
  void renderScore () {
  
    fill(15);
    push();
      rect(width/2-250, height-45,500,45,10,10,0,0);
    pop();
    //stroke(360);
    fill(360);
    textSize(15);
    text("Score: " + ((int)score), width/2-175, height-15);
    text("Highscore: " + (highScore), width/2+60, height-15);
  
  }
  
  void renderCoolDown () {

    ////////////////
    //BAR DIMS
    int barHeight = 100;
    int barWidth = 25;
    float bulletCDPerc = bulletCoolDown/(bcdMax+.03);
    float coolDownBarHeight = map(bulletCDPerc, 0, 1, 0, barHeight*.8); 
    float healthPerc = health/healthMax;
    float healthBarHeight = map(healthPerc, 1, 0, 0, barHeight*.75); 
    
    //COLOR
    float bhue = map(bulletCDPerc, 1, 0, 0, 120);
    color bclr = color(bhue, 100, 100);
    float hhue = map(healthPerc, 0, 1, 0, 120);
    color hclr = color(hhue, 100, 100);
    
    //RENDER
    push();
      fill(50);
      rect(width-barWidth*2.25,height-barHeight,barWidth*2.25,barHeight, 15, 0, 0 ,0);
      fill(bclr);
      rect(width-barWidth*.75, height-barHeight*.9+coolDownBarHeight, barWidth*.75, barHeight, 5, 0, 0 ,0); 
      fill(hclr);
      rect(width-barWidth*1.85, height-barHeight*.9+healthBarHeight, barWidth*.75, barHeight, 5, 5, 0 ,0);
    pop();
  }
  
  void gameOver () {
    
    if (score > highScore) {
      PrintWriter output = createWriter("hs.txt");
      output.print((int)score);
      output.close();
    
    }
    
    
    setup();
  
  }
  

}
