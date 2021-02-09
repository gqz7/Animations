class Star {
  
  public float x;
  public float y;
  public float light;
  public float hue;
  
  Star(float xInit, float yInit, float lightInit, float hueInit) {
    
    x = xInit;
    y = yInit;
    light = lightInit;
    hue = hueInit;

  }
  
  public void render() {
    float
      x2 = x*(1.15),
      y2 = y*(1.15);

    int[] tempColor = calcColor();
    
    stroke(tempColor[0],tempColor[1],tempColor[2]);

    line(width/2+x, height/2+y, width/2+x2, height/2+y2);
    
  }
  
  public int[] calcColor() {

    int saturation = 100;

    int convertedSaturation;
    int convertedBrightness;
    
    int intLight = light < 0 ? 0 : round(light);
    
    try {
      convertedSaturation = 
      2 * (
        saturation * (
          light < 50 
            ? intLight 
            : 100 - intLight 
        )
      ) / (intLight + saturation);


    } catch ( ArithmeticException e ) {
        convertedSaturation = 0;
    }
    
    convertedBrightness = convertedSaturation + intLight;
    
    int newHue = round(hue % 360);
    
    return new int[] { newHue, convertedSaturation, convertedBrightness };
  } 

  public void update(int idx) {

    float NewX = x * (1 + .07);
    float NewY = y * (1 + .07);


    if (NewX > width/1.5 || NewX < -width/1.5 || NewY > width/1.5 || NewY < -width/1.5) {

        starList[idx] = createNewStar();

    } else {
        x = NewX;
        y = NewY;
        light -= (frames/470 ) + .9;
        hue += 10;
    }

  }

    
}
