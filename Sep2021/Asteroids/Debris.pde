
  class Debris {
  
    PShape shape;
    PVector pos;
    float dir;
    int totalSides;
    float radius;
    float nS;
    float nM;
    float nR;
    float inc;
    int health;
    int loading;
    
    Debris () {
      rMax = 120;
      radius = 120;//random(rMin, rMax);
      pos = new PVector(random(width), random(height));
      this.totalSides = (int) (map(radius, 10, 50, 7, 20) + random(1, 5));//(int) random(6,radius/2);
      dir = random(0, TWO_PI);
      nS =random(1000, 2000);
      nM = map(radius, rMin, rMax, .17, .25);
      nR = random(.2, .6);
      inc = map(radius, rMin, rMax, .75, .15);
      health = (int)(radius*5*(1+(float)hMult/1000));
      loading = 0;
      
      
      totalMass += radius;
    }
    
     Debris ( int sides, float radius, PVector pos, float dir) {
      this.radius = radius;
      this.pos = pos;
      this.totalSides = sides;//(int) random(6,radius/2);
      this.dir = dir;
      nS =random(1000, 2000);
      nM = map(radius, rMin, rMax, .17, .25);
      nR = random(.2, .6);
      inc = map(radius, rMin, rMax, .75, .15);
      health = (int)(radius*5*(1+(float)hMult/1000));
      loading = 90;
      
      totalMass += radius;
      //createShape();
    
    }

  
    void render() {
      
      noStroke();
      push();
      translate(pos.x, pos.y);
      //fill(360);
      //circle(0,0,radius*2);
      fill(0, 10, (50*nR + 10)*((float)loading/100));
      beginShape();

      for (float a = 0; a < TWO_PI; a+=inc){
         
         float xoff = (float) map(cos(a), 0, 1, 1, nM);
         float yoff = (float) map(sin(a), 0, 1, 1, nM);
         float r = map((float)noise.noise2(xoff+nS,  yoff+nS), 0, 1, radius, radius*(1+nR));
         float x = r * cos(a);
         float y = r * sin(a);
         vertex(x,y);
      }

      endShape(CLOSE);
      pop();
      
      update();
    }
    
    void update() {
      PVector force = PVector.fromAngle(dir);
      force.setMag(.9+inc/3);
      pos.add(force);
      if (loading == 100) {
        checkHits();
      } else {
        loading++;
      }
      
    }
    void checkHits() {
    
      checkOffScreen();
      for (Rocket r : allRockets) {
        int playerDis = (int) r.pos.dist(this.pos);
        if (playerDis < this.radius*1.5) {
          r.health -= this.radius;
          if (r.health <= 0) {
            r.gameOver();
            return;
          }
          destroy();
          return;
          
        }
        ArrayList<Bullet> removeList = new ArrayList<Bullet>();
        for (Bullet b: r.bullets) {
          int bulletDis = (int) b.pos.dist(pos);
          if (bulletDis < radius*1.2) {
            removeList.add(b);
            int sOff = this.health-(int)b.power;
            println(this.health);
            r.score += (int)b.power + (sOff < 0 ? sOff : 0);
            this.health -= b.power;
            if (this.health <= 0) {
              destroy();
              break;
            }
            
          } 
        }
        
        r.bullets.removeAll(removeList);

      
      }
    
    }
    
    void destroy () {
      if (radius >= 20 && radius < 40) {
        
        Debris d1 = new Debris(totalSides/2, radius/2, pos.copy(), dir+PI/2 + random(-.1, .1));
        Debris d2 = new Debris(totalSides/2, radius/2, pos.copy(), dir-PI/2 + random(-.1, .1));
        allDebris.add(d1);
        allDebris.add(d2);
      
      } else if (radius >= 40) {
        int pieces = (int)random(2,6);
        float nRad = radius/pieces;
        int sides = totalSides / pieces;
        for (int i = 1; i <= pieces; i++) {
          float nDir = map(i, 1, pieces, 0, TWO_PI) + dir + random(-1, 1);
          //println(nDir);
          Debris newD = new Debris(sides, nRad, pos.copy(), nDir);
          allDebris.add(newD);
          
        }
        
      }
      allDebris.remove(this);
      
    }
    
    void checkOffScreen () {
      if (pos.y < -radius*2) pos.y = height+radius*2;
      if (pos.x < -radius*2) pos.x = width+radius*2;
      if (pos.y > height+radius*2) pos.y = -radius*2;
      if (pos.x > width+radius*2) pos.x = -radius*2;
    }
      
  
  }
