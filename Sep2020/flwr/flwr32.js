
const 
body = document.body,
canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let 
speed = 1,
animationPaused = true;


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
time = 9,
forwardTime = true,
seed = uti.mran() * 10000,
startClr = uti.mran() * 360,
maxTime = 3337,
maxItterations = 177;

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

  renderPoints(calPoints(time, seed), seed);

  if ( !animationPaused ) {
    setTimeout( window.requestAnimationFrame, 37, infinity )
  }

}

function renderPoints (arr, s) {
  // let mNoise = uti.msn(time/300+s,time/300+s+.1)*1.7;
  
  const angl = forwardTime ? -.03 : .03;
  context.rotate(angl)
  context.save()
  for (let i = 0; i < arr.length; i++) { //*(1+mapNumber(i, maxIter, 0, 0, (timeMax/10 - time/10)))
    renderRom(arr[i])
    context.rotate(uti.mmp(i, 0, maxItterations, 0, -(maxTime/1111 - time/1111))/i)/10000
  }
  context.restore()

}

function calPoints(s) { 
let mNoise = uti.msn(s/777+seed,s/777+seed+.1);
const allArr=[]; 
  for (let i = maxItterations; i > 0; i-=.5) { //*(1+mapNumber(i, maxIter, 0, 0, (timeMax/10 - time/10)))
    const 
      sjze = i*2,
      newNoise = i/300+(mNoise)*(9/(1+i/100)),  //uti.msn(noiseNum,noiseNum)*(9/(1+i/100)); 
      data = calData(i, sjze, newNoise)
      allArr.push(...data)
  }

return allArr
}

function calData(idx, s, n) {

const
 angles = [n, n+uti.mpi, -n, -n+uti.mpi],
 rombus = [];  
 let a = n;

for (let j = 0; j < angles.length; j++) {
  a+=n/1000
  let 
    originData = [[(-s/6.9)+(s/3.42), -s*Math.sqrt(3)/8*1.17],[0, s*3*1.17 -s*Math.sqrt(3)/8*1.17],[s/6.9, -s*Math.sqrt(3)/8*1.17],[s/6.9, s*3*1.17]],
    rombiArr = [],
    rombi= {s: s, a: a };

    a/=2;
 
    for (let i = 0; i < originData.length; i++) {

      const 
        data = originData[i],
        hue =  (s + startClr - time)%360,
        light = uti.mmp(s, 0, maxItterations, 94, 0);

      rombiArr.push( {
        ...rombi,
        style: `hsl(${hue}, 100%, ${light}%)`, 
        x: data[0], 
        y: data[1], 
      })

    }

    rombus.push(...rombiArr);
  
}


return rombus

}

function renderRom(rombi) { //{x, y, angle, style, size}
    const {x, y, a: angle, style, s} = rombi;
    // console.log(size);
    const size = s//
    context.save() //save
      context.lineWidth = s/100;
      context.translate(x, y) //translates
      context.rotate(angle/2) //rotates
      context.strokeStyle = style
      context.beginPath() //begin
      context.moveTo(size/2,0); //moveTo
      context.lineTo(0,-size) ///lineTo
      context.lineTo(-size/2,0) //^
      context.lineTo(0,size) //^
      context.lineTo(size/2,0) //^
      context.stroke() //stroke
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
    seed = Math.random()
    result = 1.1
      
  }

  time = result
}