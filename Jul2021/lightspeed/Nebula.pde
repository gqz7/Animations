float nebulaTime = 0;


class Nebula {


  void render (float radius, float nebHeight) {

    //noStroke();
    //fill(8000, 100, 100);

    nebulaTime += renderSpeed * .03;
    blendMode(BLEND);

    float res = 3; //1
    float layers = (nebHeight/(res/2f)); //*2
    float starsInLayer = (radius*(PI*2)/res); //*2*2*2

    for (float i = 0; i < layers; i++) {
      //if (printCount < 25) {
      // printCount++;
      // println(sin(map(layers/2f, 0, layers, -PI, PI)), i);
      // }
      for (float j = 0; j < starsInLayer; j++) {


        float y = map(i, 0, layers, -nebHeight, nebHeight);
        float x = cos(map(j, 0, starsInLayer, -PI, PI)) * radius;//map(abs(y), 0, nebHeight, radius, radius/2)  ;
        float z = sin(map(j, 0, starsInLayer, -PI, PI)) * radius;//map(abs(y), 0, nebHeight, radius, radius/2);

        //x += sin(map(x, -radius, radius, -PI, PI))*100;
        //y += sin(map(y, -nebHeight, nebHeight, -PI, PI))*100;
        //z += sin(map(y, -radius, radius, -PI, PI))*100;

        float xOff = map(cos(map(j, 0, starsInLayer, -PI, PI)), -1, 1, 7, 13);
        float yOff = map(i, 0, layers, 12093, 12097);
        float zOff = map(sin(map(j, 0, starsInLayer, -PI, PI)), -1, 1, 7, 13);
        //if (true) {
        // printCount++;
        // println(map(j, 0, starsInLayer, -PI, PI));
        // }


        float hueN = (float) noise.noise3_Classic(xOff +3324+ nebulaTime/7, yOff+3724+ nebulaTime/5, zOff +3924); //+ nebulaTime +3424 ,  + 3424

        float hue = 0;
        float sat = 0;
        float light = 0;

        if (hueN < 0) {
          //background
          //hueN = (float) noise.noise2(xOff + 4112 - nebulaTime/10, yOff + 5152 + nebulaTime/7);
          hueN = (float) noise.noise3_Classic(xOff/1.5 - nebulaTime/15 +4112, yOff +5152 + nebulaTime/10, zOff/1.5 - nebulaTime/15 +3424); //+ nebulaTime +3424 ,  + 3424


          hue = abs(map(hueN, -1, 1, 0, 5000) + map(abs(y), 0, nebHeight, 4000, 500)) % 10000;
          sat = map(abs(y), 0, nebHeight, 40, 85);
          light = map(abs(y), 0, nebHeight, 100, 0) * (hueN);
        } else {
          //org
          float preHue = hueN > .7 ? map(hueN, .7, 1, 8000, 4000) : map(hueN, 0, .7, 4000, 8000); //
          hue = abs(preHue + map(abs(y), 0, nebHeight, 1000, 0)) % 10000;//abs(map(hueN +.3, 0, 1, 4000, 7000) + map(abs(y), 0, nebHeight, 1000, 0)) % 10000;
          sat = abs(map(hueN, -1, 1, 30, 0)) + map(abs(y), 0, nebHeight, 60, 90);
          light = map(abs(y), 0, nebHeight, 100, 0) * (hueN) ;
        }

        //hue = abs(map(hueN , 0, 1, 0, 6000) + map(abs(y), 0, nebHeight, 2000, 0)) % 10000;
        //sat = map(abs(y), 0, nebHeight, 60, 80);
        //light = map(abs(y), 0, nebHeight, 100, 0) * hueN;


        if (light > 0) {


          push();

          translate(x, y, z);

          noStroke();
          fill(hue, sat, light);
          box(res);


          //stroke(hue, sat, light);
          //point(0,0);



          pop();
        }
      }
    }
  }
}
