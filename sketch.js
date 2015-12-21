var yoff = 0.0;
var wind;
var position;
var mySound;
var soundtrack;
   // 2nd dimension of perlin noise
//var mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('Goodbye Mix by Spheriá.mp3');
}
function setup() {
  createCanvas(1700, 770);
  //soundtrack.loop();
  mySound.setVolume(0.9);
  mySound.play();

// amplitude = new p5.Amplitude(0.875);

  //cnv.mouseClicked(function() {
    //if (sound.isPlaying() ){
      //sound.stop();
    //} else {
      //sound.play();
    //}
  //});
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY&units=imperial&APPID=7bbbb47522848e8b9c26ba35c226c734';
  loadJSON(url, gotWeather);
  // Circle starts in the middle
  position = createVector(width/2, height/2);
  // wind starts as (0,0)
  wind = createVector();

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
    var y = map(noise(xoff, yoff), 0, 1, 100, 600);

    // Option #2: 1D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);
//var currentHour = hour();
var currentMinute = minute();
xoff += map(currentMinute, 1440, 1, 0.2, 0.01);
 yoff += map(currentMinute, 1440, 1, 0.01, 0.0003);


 //console.log(xoff, yoff);


  //  if(currentM > 8) {
  //   	 	xoff += 0.01;
  //       yoff += 0.0007;
  //   	 }
   //
  //      if(currentHour > 16) {
  //        xoff += 0.2;
  //        yoff += 0.007;
  //      }
  //      else {
  //     	xoff += 0.002;
  //       yoff += 0.0001;
  //     }

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.01;
  }
  // increment y dimension for noise
  yoff += -0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  push();
  translate(32, height - 32);
  // Rotate by the wind's angle
  rotate(wind.heading() + PI/2);
  noStroke();
  fill(255);
  ellipse(0, 0, 48, 48);

  stroke(45, 123, 182);
  strokeWeight(3);
  line(0, -16, 0, 16);

  noStroke();
  fill(45, 123, 182);
  triangle(0, -18, -6, -10, 6, -10);
  pop();

  // Move in the wind's direction
  position.add(wind);

  stroke(0);
  fill(51);
  ellipse(position.x, position.y, 16, 16);

  if (position.x > width)  position.x = 0;
  if (position.x < 0)      position.x = width;
  if (position.y > height) position.y = 0;
  if (position.y < 0)      position.y = height;


  var volume = map(mouseX, 0, width, 0, 1);
    volume = constrain(volume, 0, 1);
    mySound.amp(volume);

    // Set the rate to a range between 0.1 and 4
    // Changing the rate alters the pitch
    var speed = map(mouseY, 0.1, height, 0, 2);
    speed = constrain(speed, 0.01, 4);
    mySound.rate(speed);

    // Draw some circles to show what is going on
    stroke(0);
    fill(51, 100);
    ellipse(mouseX, 100, 48, 48);
    stroke(0);
    fill(51, 100);
    ellipse(100, mouseY, 48, 48);

  //  background += map(currentMinute, 255, 255, 255, 255, 171, 0);


}







function gotWeather(weather) {
console.log(weather);
  // Get the angle (convert to radians)
  var angle = radians(Number(weather.wind.deg));
  // Get the wind speed
  var windmag = Number(weather.wind.speed);

  // Display as HTML elements
  //var temperatureDiv = createDiv(floor(weather.main.temp) + '&deg;');
  //var windDiv = createDiv("WIND " + windmag + " <small>MPH</small>");

  // Make a vector
  wind = p5.Vector.fromAngle(angle);
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}
