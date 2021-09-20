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
    push();
      translate(width/2, height/2);
      for (int i = 0; i < points.length; ++i) {
        float x = points[i][0];
        float y = points[i][1];
        fill(points[i][2]);
        move(x,y,i);
        rect(x, y, 2, 2);
      }
    pop();
    
  }
  
  void move (float x, float y, int i) {
    points[i][0] = x * 1.01;
    points[i][1] = y * 1.01;
    points[i][2] += 1.5;

    if (points[i][0] < -width/2 || points[i][0] > width/2 || points[i][1] < -height/2 || points[i][1] > height/2  ) {
      points[i][0] = random(-width/2, width/2);
      points[i][1] = random(-height/2, height/2);
      points[i][2] = 0;
    }
  }
}
