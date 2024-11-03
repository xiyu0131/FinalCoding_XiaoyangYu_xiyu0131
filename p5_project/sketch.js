
//This class draws groups of lines using a class.
//In this class, the startX, startY, endX, endY, angle, numLines, color, space, strokeWeight
//are used as parameters.
class lineGroup {
  constructor(startX, startY, endX, endY, angle, numLines, color, space, strokeWeight) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.angle = angle;
    this.numLines = numLines;
    this.color = color;
    this.lineSpacing = space; 
    this.strokeWeight = strokeWeight;
  }

  draw() {
    stroke(this.color);// Set the color of the lines.
    strokeWeight(this.strokeWeight);// Set the line thickness.

     // Draw each line in the group at an offset based on line spacing and angle.
    for (let i = 0; i < this.numLines; i++) {
      // Calculate horizontal and vertical offsets for each line.
      let offsetX = cos(this.angle) * this.lineSpacing * i;
      let offsetY = sin(this.angle) * this.lineSpacing * i;
      
      // Draw the line with the calculated offsets.
      line(this.startX + offsetX, this.startY + offsetY, this.endX + offsetX, this.endY + offsetY);
    }
  }
}

//Storing the line groups into an array.
let groups = [];
let colorMiddle;// Color for the middle layer.
let colorTop; // Color for the top layer.

//Setting variables to hold the audio and fft object.
let audio;
let fft;

// Preload the audio file for use
function preload(){
  audio=loadSound('assets/NeverFadeAway.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);// Set canvas to full window size.
  background(0);   // Set background to black.

  drawLineGroups();// Draw the initial set of line groups.
  colorMiddle = color(random(200));// Define color for the middle layer.
  colorTop = color(random(188,255), 188, 255);// Define color for the top layer.


  audio.play();
  fft= new p5.FFT();// Initialize FFT for analyzing audio frequencies
}


function draw() {
  // Get energy level for treble frequencies
  let spectrum = fft.analyze();
  let treble = fft.getEnergy("treble");


  // Draw all base layer line groups stored in the groups array.
  for (let group of groups) {
    group.draw();
  }

  drawMiddleLayer(treble);// Draw the middle layer based on treble energy level.

  drawTopLayer();// Draw the top layer.

  showInstruction();// Display on-screen instructions

}

function drawLineGroups() {
  // Clear existing groups when resizing
  groups = [];
  
  // Define properties for each line group in the base layer.
  let baseLayer1StartX = 0.15 * windowWidth;
  let baseLayer1StartY = 0.75 * windowHeight;
  let baseLayer1EndX = 0.544 * windowWidth;
  let baseLayer1EndY = 0.4 * windowHeight;
  let baseLayer1Angle = PI / 6.78;

  let baseLayer2StartX = 0.582 * windowWidth;
  let baseLayer2StartY = 0.325 * windowHeight;
  let baseLayer2EndX = 0.72 * windowWidth;
  let baseLayer2EndY = 0.203 * windowHeight;
  let baseLayer2Angle = PI / 6.78; 

  let baseLayer3StartX = 0.2314 * windowWidth;
  let baseLayer3StartY = 0.814 * windowHeight;
  let baseLayer3EndX = 0.83 * windowWidth;
  let baseLayer3EndY = 0.285 * windowHeight;
  let baseLayer3Angle = PI / 6.78; 


  // Set a random color for the base layer.
  let colorBase = color(random(150, 255));



  // Add new line groups to the groups array with specified properties.
  groups.push(new lineGroup(baseLayer1StartX, baseLayer1StartY, baseLayer1EndX, baseLayer1EndY, baseLayer1Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer2StartX, baseLayer2StartY, baseLayer2EndX, baseLayer2EndY, baseLayer2Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer3StartX, baseLayer3StartY, baseLayer3EndX, baseLayer3EndY, baseLayer3Angle, 10, colorBase, 5, 3));


}

function drawMiddleLayer(treble) {

  // Flash middle layer based on treble energy
  let opacity = map(treble, 255, 0, 50, 255); // Map treble to opacity
  fill(0, opacity);

  //Drawing rectangle as middle layer.
  let middleLayerX=0.38*windowWidth;
  let middleLayerY=0.061*windowHeight;
  let middleLayerWidth=0.211*windowWidth;
  let middleLayerHeight=0.885*windowHeight;

  noStroke();
  rect(middleLayerX,middleLayerY,middleLayerWidth,middleLayerHeight);
}

function drawTopLayer(){

  // Draw a triangle as part of the top layer.
  let topLayer1X1=0.398*windowWidth;
  let topLayer1X2=0.166*windowWidth;
  let topLayer1X3=0.398*windowWidth;
  let topLayer1Y1=0.505*windowHeight;
  let topLayer1Y2=0.711*windowHeight;
  let topLayer1Y3=0.919*windowHeight;

  fill(colorTop);
  triangle(topLayer1X1,topLayer1Y1,topLayer1X2,topLayer1Y2,topLayer1X3,topLayer1Y3);

  // Draw first quadrilateral as part of the top layer.
  let topLayer2X1=0.558*windowWidth;
  let topLayer2X2=0.585*windowWidth;
  let topLayer2X3=0.558*windowWidth;
  let topLayer2X4=0.636*windowWidth;
  let topLayer2Y1=0.308*windowHeight;
  let topLayer2Y2=0.283*windowHeight;
  let topLayer2Y3=0.425*windowHeight;
  let topLayer2Y4=0.357*windowHeight;

  fill(colorTop);
  quad(topLayer2X1,topLayer2Y1,topLayer2X2,topLayer2Y2,topLayer2X4,topLayer2Y4,topLayer2X3,topLayer2Y3);

  // Draw second quadrilateral as part of the top layer.
  let topLayer3X1=0.558*windowWidth;
  let topLayer3X2=0.558*windowWidth;
  let topLayer3X3=0.725*windowWidth;
  let topLayer3X4=0.666*windowWidth;
  let topLayer3Y1=0.5*windowHeight;
  let topLayer3Y2=0.643*windowHeight;
  let topLayer3Y3=0.494*windowHeight;
  let topLayer3Y4=0.403*windowHeight;

  fill(colorTop);
  quad(topLayer3X1,topLayer3Y1,topLayer3X2,topLayer3Y2,topLayer3X3,topLayer3Y3, topLayer3X4,topLayer3Y4);
}



function windowResized() {
  // Adjust canvas size and redraw the shape when the window is resized.
  resizeCanvas(windowWidth, windowHeight);
  drawLineGroups();
}

function mousePressed() {
  if (!audio.isPlaying()) { 
      audio.play(); // Play sound only if it's not already playing
  } else {
      audio.stop(); // stop the sound if it's already playing
      audio.play(); // Then play it again
  }
}

function showInstruction() {
  textSize(32); 
  fill(255, 255, 0); // Set text color to yellow
  textAlign(RIGHT, BOTTOM); 
  text('Click anywhere to play the music', width-20, height-20); // Draw the text at bottom right corner.
}
