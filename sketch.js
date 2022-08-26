function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(25);
  stroke(255,1);
  // stroke(255);
  // noStroke();
  strokeWeight(1);
  // noFill();
  fill(255,5);
}

let x = Math.random() * 500;
let y = Math.random() * 500;
let anchor = Math.random() * 500;
let inc = 0.1;

function draw() {
  background(0);

  // draw the jellyfish bell
  drawBell(x, y, anchor);


  x += inc;
  y += inc;
  anchor += inc;
  // noLoop();
}


function drawBell(xOffset, yOffset, anchorOffset) {

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 200;


  for (let angle = 0; angle <= 180; angle += 0.1) {
    const anchorRadius = noise(anchorOffset) * 400 + 600;   // get two random radii for the anchorpoints
    const anchorRadius2 = noise(anchorOffset) * 400 + 600;    // between 600-1000, and 400-800
    
    // generate noise
    const anchorNoise = noise(radians(angle), xOffset/500) * 720 - 360;
    const anchorNoise2 = noise(radians(angle), yOffset/500) * 720 - 360;
    const noiseX = noise(xOffset/200) * 400 - 200;
    const noiseY = noise(yOffset/200) * 400 - 200;
    const noiseX2 = noise(xOffset/200) * 200 - 100;
    const noiseY2 = noise(yOffset/200) * 200 - 100;

    // set position of curve anchor points
    const anchor1 = {
      x:centerX + anchorRadius * cos(anchorNoise), 
      y:centerY + anchorRadius2 * sin(anchorNoise)
    };
    const anchor2 = {
      x: centerX + anchorRadius * cos(anchorNoise2), 
      y: centerY + anchorRadius2 * sin(anchorNoise2)
    };

    // set position of curve endpoints
    const p1 = {
      x: centerX + radius * cos(radians(angle)+noiseX)+noiseX2, 
      y:centerY + radius * sin(radians(angle)+noiseX)+noiseY2
    };
    const p2 = {
      x: centerX + radius * cos(radians(angle+180)+noiseX)+noiseX2, 
      y: centerY + radius * sin(radians(angle+180)+noiseY)+noiseY2
    };

    // stroke(255)
    curve(anchor1.x, anchor1.y, p1.x, p1.y, p2.x, p2.y, anchor2.x, anchor2.y); // Draw a single curve

    // circle(anchor1.x, anchor1.y, 10);
    // circle(anchor2.x, anchor2.y, 10);

    // stroke(0,0,255)
    // line(anchor1.x, anchor1.y, p1.x, p1.y);
    // line(anchor2.x, anchor2.y, p2.x, p2.y);
    
  }
}