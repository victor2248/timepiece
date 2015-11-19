var yoff = 0.0;        // 2nd dimension of perlin noise

function setup() {
  createCanvas(1700, 800);
}

function draw() {
  background('orange');

  fill(0, 128, 255);
  // We are going to draw a polygon out of the wave points
  beginShape();

  var xoff = 90;       // Option #1: 2D Noise
  // float xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (var x = 3; x <= width; x += 50) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 100,600);

    // Option #2: 1D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);

   if(second() > 30) {
    	 	xoff += 0.1;
        yoff += 0.001;
    	 } else {
      	xoff += 0.002;
        yoff += 0.0001;
      }

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.02;
  }
  // increment y dimension for noise
  yoff += -0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}
