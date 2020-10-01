
const 
body = document.body,
canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;

document.body.appendChild(canvas);


canvas.style = 
`display: block;
position: static;
top: 0px;
left: 0px;
cursor: none;
margin:auto;
background-color: black`;
document.body.style = `margin: 0`;
context.strokeStyle = 'white'
const tr = 2
const yr = Math.sqrt(3)
const xy = 200

context.translate(width/2, height/2)

// context.save()
// context.beginPath()
// context.arc(0,0,2,0,Math.PI*2)
// context.lineTo(-xy,0)
// context.lineTo(xy,0)
// context.moveTo(0,0)
// context.lineTo(0,-xy)
// context.lineTo(0,xy)
// context.stroke()
// context.restore()


context.beginPath()
context.moveTo(0,-xy*tr)
context.lineTo(xy*yr,xy)
context.lineTo(-xy*yr,xy)
context.lineTo(0,-xy*tr)
// context.stroke()

// context.beginPath()
context.moveTo(0,xy*tr)
context.lineTo(-xy*yr,-xy)
context.lineTo(xy*yr,-xy)
context.lineTo(0,xy*tr)
context.stroke()

const tri = [[[0,-xy*tr],[xy*yr,xy],[-xy*yr,xy]], [[0,xy*tr], [-xy*yr,-xy], [xy*yr,-xy]]]

for (let i = 0; i < 1; i++) {
  
  for (let j = 0; j < tri[i].length; j++) {
    context.beginPath()
    
    // console.log(tri[i][j+1], j);
    for (let k = 0; k < 1; k++) {
      const p1 = tri[i][j];
      const p2 = tri[i+1][j];
      context.moveTo(p1[0], p1[1])
      context.lineTo(p2[0], p2[1])
      
    }

    context.stroke()

  }
  
}

const tri2 = [ [[0,-xy*tr], [xy*yr,-xy] ],[ [xy*yr,-xy], [xy*yr,xy]], [[xy*yr,xy], [0,xy*tr]], [[0,xy*tr], [-xy*yr,xy]], [[-xy*yr,xy],[-xy*yr,-xy]],[[-xy*yr,-xy],[0,-xy*tr]] ] 


for (let i = 0; i < 6; i++) {
  
  for (let j = 0; j < tri2[i].length-1; j++) {
    context.beginPath()
    
    // console.log(tri[i][j+1], j);
    for (let k = 0; k < 1; k++) {
      const p1 = tri2[i][j];
      const p2 = tri2[i][j+1];
      context.moveTo(p1[0], p1[1])
      context.lineTo(p2[0], p2[1])
      
    }

    context.stroke()

  }
  
}