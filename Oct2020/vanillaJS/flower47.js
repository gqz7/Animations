
const 
body = document.body,
canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let 
speed = .7,
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
seed =  6983.02727,
startClr = 377,
maxTime = 333,
maxItterations = 177;
console.log(seed);
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
  let mNoise = uti.msn(time/3333,time/2222)/333;
  
  const angl = forwardTime ? -.002 : .002;
  context.rotate(-angl)
  context.save()
  for (let i = 0; i < arr.length; i++) {
    renderRom(arr[i])
    const angle = Math.PI/3.5
    context.rotate(angle)
  }
  context.restore()

}

function calPoints(s) { 
let mNoise = uti.msn(s/1111+seed,s/1111+seed+.1);
console.log(mNoise);
const allArr=[];

let i = maxItterations;

  while ( i > 1 ) {

  i-= .22//(2.567+Math.log(i)/Math.log(.132))
    const 
      newNoise = uti.msn(mNoise+i/1000,mNoise+i/1000), 
      data = calData(i, i, newNoise)
      allArr.push(...data)
  }

  return allArr
}

function calData(idx, s, n) {

const
 rombus = [];  
 let a = n*(1+s/7);
  let 
    originData = [[170, s*2.5, 0],[0, 120, 180]],
    rombiArr = [],
    rombi= {s: s, a: a };
 
    for (let i = 0; i < originData.length; i++) {

          const 
            data = originData[i],
            hue =  (s*1.7 + startClr - time*2 + originData[i][2])%360,
            light = uti.mmp(idx, 0, maxItterations, 98, 0);

          rombiArr.push( {
            ...rombi,
            index: idx,
            style: `hsl(${hue}, 100%, ${light}%)`, 
            x: data[0], 
            y: data[1], 
          })

        rombus.push(...rombiArr);
      
    }


  return rombus

}

function renderRom(rombi) { //{x, y, angle, style, size}
    const {x, y, a: angle, style, s, index} = rombi;
    // console.log(size);
    const size = s//
    context.save() //save
      context.lineWidth = uti.mmp(index, maxItterations, 0, 1.3, 0);
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
    result = 1.1
      
  }

  time = result
} 