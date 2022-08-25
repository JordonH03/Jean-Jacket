function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(10);
  stroke(255);
  strokeWeight(1);
  noFill();
  noiseDetail(24);
}

let x = 0;
let y = 1000;
let anchor = 500;
let inc = 0.1;

function draw() {
  background(0);

  // draw the jellyfish bell
  drawBell(x, y, anchor);


  x += inc;
  y += inc;
  anchor += inc;
}


function drawBell(xOffset, yOffset, anchorOffset) {

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 200;


  for (let angle = 0; angle <= 180; angle += 90) {
    // const anchorRadius = 1000;
    const anchorRadius = noise(anchorOffset/100, anchorOffset/100) * 400 + 600;   // get two random radii for the anchorpoints
    const anchorRadius2 = noise(anchorOffset/100, anchorOffset/100) * 400 + 600;    // between 600-1000, and 400-800
    
    // generate noise
    const anchorNoise = noise(radians(angle), xOffset/1000) * 400 - 200;
    const anchorNoise2 = noise(radians(angle), yOffset/1000) * 400 - 200;
    const noiseX = noise(radians(angle), xOffset/1000) * 200 - 100;
    const noiseY = noise(radians(angle), yOffset/1000) * 200 - 100;
    const noiseX2 = noise(radians(angle+180), xOffset/1000) * 200 - 100;
    const noiseY2 = noise(radians(angle+180), yOffset/1000) * 200 - 100;

    // set position of curve anchor points
    const anchor1 = {
      x:centerX + anchorRadius * cos(radians(angle))+anchorNoise, 
      y:centerY + anchorRadius * sin(radians(angle))+anchorNoise
    };
    const anchor2 = {
      x: centerX + anchorRadius2 * cos(radians(angle + 180))+anchorNoise2, 
      y: centerY + anchorRadius2 * sin(radians(angle + 180))+anchorNoise2
    };

    // set position of curve endpoints
    const p1 = {
      x: centerX + radius * cos(radians(angle)+noiseX), 
      y:centerY + radius * sin(radians(angle)+noiseY)
    };
    const p2 = {
      x: centerX + radius * cos(radians(angle+180)+noiseX), 
      y: centerY + radius * sin(radians(angle+180)+noiseY)
    };

    stroke(255)
    curve(anchor1.x, anchor1.y, p1.x, p1.y, p2.x, p2.y, anchor2.x, anchor2.y); // Draw a single curve

    circle(anchor1.x, anchor1.y, 10);
    circle(anchor2.x, anchor2.y, 10);

    stroke(0,0,255)
    line(anchor1.x, anchor1.y, p1.x, p1.y);
    line(anchor2.x, anchor2.y, p2.x, p2.y);
    
  }
}