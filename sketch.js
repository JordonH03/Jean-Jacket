// Randomly determine the initial values for the offsets of the creature's shape
let xOffset = Math.random() * 1000;
let yOffset = Math.random() * 1000;
let anchorOffset = Math.random() * 1000;
let inc = 0.1; // above values will be incremented by 0.1 each frame

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(50);
  stroke(0,1);
  strokeWeight(1);
}

function draw() {

  // Draw the creature
  background(0);
  drawCreature(x, y, anchor);

  // Simulate the creature's movment by incrementing the values over time
  x += inc;
  y += inc;
  anchor += inc;
}

/**
 * This function draws the body of the creature. The general shape of the creature is composed of several lines drawn by the curve() function.
 * The position and curvature of the creature is newly calculated each call, using the noise() function to ensure the shapes are random and 
 * smooth.
 * @param {Number} xOffset argument for the noise of the x-value of curve endpoints
 * @param {Number} yOffset argument for the noise of the y-value of curve endpoints
 * @param {Number} anchorOffset arguement for the nosie of the curve anchor points
 */
function drawCreature(xOffset, yOffset, anchorOffset) {
  const centerX = noise(xOffset/100) * width;  // Randomize the center of the shapes
  const centerY = noise(yOffset/100) * height; // to simulate movement
  const radius = 200; // Radius of the curve points 

  // Draw the shape
  for (let angle = 0; angle <= 270; angle += 0.1) {

    // Generate radii for the anchor points between 500-900
    const anchorRadius = noise(anchorOffset) * 400 + 500;
    const anchorRadius2 = noise(anchorOffset) * 400 + 500;
    
    // Generate random offsets for the points
    const anchorNoise = noise(radians(angle), xOffset/500) * 720 - 360;
    const anchorNoise2 = noise(radians(angle), yOffset/500) * 720 - 360;
    const noiseX = noise(xOffset/200) * 400 - 200;
    const noiseY = noise(yOffset/200) * 400 - 200;
    const noiseX2 = noise(xOffset/200) * 200 - 100;
    const noiseY2 = noise(yOffset/200) * 200 - 100;

    // Set position of curve anchor points
    const anchor1 = {
      x:centerX + anchorRadius * cos(anchorNoise), 
      y:centerY + anchorRadius2 * sin(anchorNoise)
    };
    const anchor2 = {
      x: centerX + anchorRadius * cos(anchorNoise2), 
      y: centerY + anchorRadius2 * sin(anchorNoise2)
    };

    // Set position of curve endpoints
    const p1 = {
      x: centerX + radius * cos(radians(angle)+noiseX)+noiseX2, 
      y:centerY + radius * sin(radians(angle)+noiseX)+noiseY2
    };
    const p2 = {
      x: centerX + radius * cos(radians(angle+180)+noiseX)+noiseX2, 
      y: centerY + radius * sin(radians(angle+180)+noiseY)+noiseY2
    };


    // Draw the curve
    fill(
      noise(radians(angle))*100+150,
      noise(radians(angle))*100+150,
      noise(radians(angle))*100+150,
      15
    );
    curve(anchor1.x, anchor1.y, p1.x, p1.y, p2.x, p2.y, anchor2.x, anchor2.y);
  }
}