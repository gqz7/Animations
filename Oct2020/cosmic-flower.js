
const 
body = document.body,
canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let 
speed = 1,
animationPaused = false;


const 
uti =  {
  /*key; 
    - means it it takes no parameters
    * means doesnt need params

  m = Math
  c = Context
  u = Utility
    otherwise they will be listed in comment
  */
  mpi : Math.PI, 
  mran: () => { return Math.random() },
  mrnd: (num) => { return Math.round(num) },
  mcli: (num) => { return Math.ceil(num) },
  mflr: (num) => { return Math.floor(num) },
  ctr : (x,y) => { context.translate(x,y) },
  uie:  (input) => { switch (input.code) { case 'Space':  animationPaused = !animationPaused; if (!animationPaused) { infinity() }  break; case 'ArrowUp': speed = speed < 1 ? speed+.1 : 1; break; case "ArrowDown": speed = speed > .2 ? speed-.1 : .2; } },
  mpow: (base, expo) => { return Math.pow(base, expo) },
  mmp : (n, min1, max1, min2, max2) => { return ((n - min1) * (max2 - min2) / (max1 - min1) + min2) },
  ccs:  () => { context.save(); context.setTransform(1, 0, 0, 1, 0, 0); context.clearRect(0, 0, canvas.width, canvas.height); context.restore() }
};


let
time = 0,
forwardTime = true,
seedX =  uti.mran() * 10000,
seedY =  uti.mran() * 10000,
startClr = uti.mran() * 360,
maxTime = 3337,
maxItterations = 200;
// console.log(seed);
window.onload = () => {

  uti.msn= (x,y) => {return toxi.math.noise.simplexNoise.noise(x,y)}

  //set styles and adjust orgin to center-screen
  canvas.style = 
  `display: block;
  position: static;
  top: 0px;
  left: 0px;
  cursor: none;
  margin:auto;
  background-color: black`;
  document.body.style = `margin: 0`;

  //BEFORE ANIMATION CYCLE
  context.translate(width/2,height/2);    


  //USER INPUT EVENT LISTENER
  document.addEventListener('keydown', uti.uie, false);
  //start Infinite loop animation
  infinity()

}

function infinity () {

  detirmineTime()

  uti.ccs()

  renderPoints(calPoints(time));

  if ( !animationPaused ) {
    setTimeout( window.requestAnimationFrame, 0, infinity )
  }

}

function renderPoints (arr) {

  let rotateNoise = uti.msn(time/222+seedX,time/222+seedY)/100;
  
  context.rotate(rotateNoise)
  context.save()
  for (let i = 0; i < arr.length; i++) {
    renderRom(arr[i])
    renderRom({...arr[i], a: arr[i].a + Math.PI/2})
    const angle = Math.PI/7;
    context.rotate(angle)
  }
  context.restore()

}

function calPoints(s) { 

let mNoise = uti.msn(s/222+seedX,s/222+seedY);

const allArr=[];

let i = maxItterations;

  while ( i > 10 ) {

    i-= .15;
    const noiseNum = i/300+(mNoise);
    const newNoise = uti.msn(noiseNum/40,noiseNum/40)*(11/(1+i/100)); 

    const 
      // newNoise = uti.msn(noiseSeed+i/333,noiseSeed+i/333)*(2/(1+i/1000)),
      data = calData(i, i, newNoise)
      allArr.push(...data)
  }

  return allArr
}

function calData(idx, s, n) {

 let a = n*(1+s/7)/3;
  let 
    originData = [[150, s*2, 0],[0, 70, 180]],
    rombiArr = [],
    rombi= {s: s, a: a };
 
    for (let i = 0; i < originData.length; i++) {
          const 
            data = originData[i],
            hue =  (s*2 + startClr - time*3.7 + data[2])%360,
            light = uti.mmp(idx, 0, maxItterations, 100, 0);

          rombiArr.push( {
            ...rombi,
            index: idx,
            style: `hsl(${hue}, 100%, ${light}%)`, 
            x: data[0], 
            y: data[1], 
          })
    }

  return rombiArr

}

function renderRom(rombi) { //{x, y, angle, style, size}
    const {x, y, a: angle, style, s, index} = rombi;
    // console.log(size);
    const size = s//
    context.save() //save
      context.lineWidth = uti.mmp(index, maxItterations, 0, .7, 0);
      context.translate(x, y) //translates
      context.rotate(angle) //rotates
      context.strokeStyle = style
      context.beginPath() //begin
      context.moveTo(size/2,0); //moveTo
      context.lineTo(0,-size) ///lineTo
      context.lineTo(-size/2,0) //^
      context.lineTo(0,size) //^
      context.lineTo(size/2,0) //^
      context.stroke() //stroke
      // context.stroke() //stroke
    context.restore() //restore
}

function detirmineTime() {

  let result;

  if (forwardTime && time < maxTime) {
    result = time+=speed
  } else if (forwardTime && time >= maxTime) {
    
      setTimeout(()=>{forwardTime = false;}, 100)
      result = time

  } else if (!forwardTime && time > 1) {
      result = time-=speed
  } else if ( time <= 1){

    forwardTime = true;
    seedX = Math.random()*10000
    seedY = Math.random()*10000
    result = 1.1
      
  }

  time = result
} 