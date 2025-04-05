// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
}

function drawVector(v, color) {
  let canvas = document.getElementById('example');
  let ctx = canvas.getContext('2d');

  ctx.strokeStyle = color;

  let cx = canvas.width / 2;
  let cy = canvas.height / 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy);

  let x = v.elements[0] * 20;
  let y = v.elements[1] * 20;

  ctx.lineTo(cx + x, cy - y)
  ctx.stroke();
}

function handleDrawEvent() {
  let canvas = document.getElementById('example');
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let v1x = document.getElementById('v1x').value;
  let v1y = document.getElementById('v1y').value;
  let v1 = new Vector3([v1x, v1y, 0]);

  let v2x = document.getElementById('v2x').value;
  let v2y = document.getElementById('v2y').value;
  let v2 = new Vector3([v2x, v2y, 0]);

  drawVector(v1, 'red');
  drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
  let canvas = document.getElementById('example');
  let ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let v1x = document.getElementById('v1x').value;
  let v1y = document.getElementById('v1y').value;
  let v1 = new Vector3([v1x, v1y, 0]);

  let v2x = document.getElementById('v2x').value;
  let v2y = document.getElementById('v2y').value;
  let v2 = new Vector3([v2x, v2y, 0]);

  drawVector(v1, 'red');
  drawVector(v2, 'blue');

  let operation = document.getElementById('op-select').value;
  if (operation === 'add') {
    let v3 = v1.add(v2);
    drawVector(v3, 'green');
  } else if (operation === 'sub') {
    let v3 = v1.sub(v2);
    drawVector(v3, 'green');
  } else if (operation === 'div') {
    let s = document.getElementById('scal').value;
    let v3 = v1.div(s);
    let v4 = v2.div(s);
    drawVector(v3, 'green');
    drawVector(v4, 'green')
  } else if (operation === 'mul') {
    let s = document.getElementById('scal').value;
    let v3 = v1.mul(s);
    let v4 = v2.mul(s);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (operation === 'mag') {
    console.log("Magnitude v1: ", v1.magnitude());
    console.log("Magnitude v2: ", v2.magnitude());
  } else if (operation === 'nor') {
    v1.normalize();
    v2.normalize();
    drawVector(v1, 'green');
    drawVector(v2, 'green');
  } else if (operation === 'ang') {
    let angle = angleBetween(v1, v2);
    console.log("Angle: ", angle);
  } else if (operation === 'are') {
    let area = areaTriangle(v1, v2);
    console.log("Area of the triangle: ", area);
  }
}

function angleBetween(v1, v2) {
  let dot = Vector3.dot(v1, v2);
  let cosT =  dot / (v1.magnitude() * v2.magnitude());
  const angRad = Math.acos(cosT);
  const angDeg = angRad * (180 / Math.PI);
  return angDeg;
}

function areaTriangle(v1, v2) {
  let cross = Vector3.cross(v1, v2);
  let area = cross.magnitude() / 2;
  return area;
}