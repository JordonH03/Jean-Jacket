function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(100);
  stroke(255, 20);
  strokeWeight(1);
  noFill();
}

let i = 0;
function draw() {
  i++;
  background(0);

  // draw the jellyfish bell
  drawBell(i);


}


function drawBell(i) {

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 200 * noise(i / 300) + 100;
  const radius2 = 20 * noise(i / 300) + 20;

  
  translate(0, -150);


  for (let angle = 1; angle <= 360; angle += 0.2) {
    const x = centerX + radius * cos(radians(angle));
    const y = centerY + radius * sin(radians(angle)) + (200 - noise(radians(angle), i / 100) * 400);
    const noiseStrokeR = noise(radians(angle));
    const noiseStrokeG = noise(i / 100);
    const noiseStrokeB = noise(radians(angle), i / 100);
    stroke(
      Math.round(255 * noiseStrokeR + 10),
      Math.round(120 * noiseStrokeB + 40),
      Math.round(255 * noiseStrokeG),
      60
    );
    beginShape();
    const noiseY = noise(radius / 100) * 100;
    const noiseY2 = 50 - noise(radius / 100, i / 120) * 100;
    const noiseX = 500 - noise(radians(angle), i / 120) * 1000;
    curveVertex(centerX, centerY + 200);
    curveVertex(centerX, centerY - 120 + noiseY);
    curveVertex(x, y / 10 + 500 + noiseY2);
    curveVertex(x + noiseX, y / 10 + 1000);
    endShape();
  }
}


function drawTentacles() {
    // draw the jellyfish tentacles
  for (let angle = 1; angle <= 360; angle += 20) {
    const x = centerX + radius2 * 3 * cos(radians(angle));
    const x2 = centerX + (radius2 / 2) * cos(radians(angle));
    const y = centerY + radius2 * sin(radians(angle));
    const noiseStrokeR = noise(angle / 200);
    const noiseStrokeG = noise(i / 100);
    const noiseStrokeB = noise(angle / 200, i / 100);
    stroke(
      Math.round(255 * noiseStrokeR + 10),
      Math.round(120 * noiseStrokeB + 40),
      Math.round(255 * noiseStrokeG),
      120
    );
    strokeWeight(2);
    beginShape();
    const noiseY = noise(radius / 100) * 100;
    const noiseY2 = 50 - noise(i / 200, angle) * 100;
    const noiseX = 1000 - noise(radians(angle), i / 200) * 2000;
    const noiseX2 = 100 - noise(radians(360 - angle), i / 200) * 200;
    curveVertex(x2, centerY + 200);
    curveVertex(x2, centerY - 120 + noiseY);
    curveVertex(x + noiseX2, y / 1.1 + 500 + noiseY2);
    curveVertex(x + noiseX, y / 10 + 1000);
    endShape();
  }
}