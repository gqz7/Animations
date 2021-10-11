class Stars {
 
  float[][] points;
  
  Stars () {
    int totalStars = width * height / 1000;
    points = new float[totalStars][3];
    
    for (int i = 0; i < points.length; ++i) {
      points[i][0] = random(-width/2, width/2);
      points[i][1] = random(-height/2, height/2);
      points[i][2] = 0;
    }
  }
  
  void render () {
    noStroke();
    push();
      translate(width/2, height/2);
      for (int i = 0; i < points.length; ++i) {
        float x = points[i][0];
        float y = points[i][1];
        fill(points[i][2]);
        move(x,y,i);
        rect(x, y, 1, 1);
      }
    pop();
    
  }
  
  void move (float x, float y, int i) {
    //points[i][0] = x * 1.01;
    //points[i][1] = y * 1.01;
    //points[i][2] += 1.5;
    points[i][0] = x * 1.02+( momentumPerc/2 )+(sin(momentumDir.x+PI)*points[i][2]/360); //  momentumPerc/10  * //x * (1 + momentumPerc/88 + points[i][2]/44400) - sin(momentumDir.x) * 1.5 ;//+ cos(momentumDir) * 10 ;
    points[i][1] = y * 1.02+( momentumPerc/2 )+(sin(momentumDir.y+PI)*points[i][2]/360);//y * (1 + momentumPerc/88 + points[i][2]/44400) - sin(momentumDir.y) * 1.5 ;//+ sin(momentumDir) * 10;
    points[i][2] += points[i][2] < 360 ? 3+momentumPerc: 0;

    if (points[i][0] < -width/2 || points[i][0] > width/2 || points[i][1] < -height/2 || points[i][1] > height/2  ) {
      points[i][0] = random(-width/2, width/2);
      points[i][1] = random(-height/2, height/2);
      points[i][2] = 0;
    }
  }
}
