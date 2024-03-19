"use strict";

let grid;
let resolution = 10;
let cols;
let rows;

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  populateInitialLivingCells();
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function populateInitialLivingCells() {
  // randomly populate living cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  drawGrid();
  grid = getNextGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] === 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1); // -1 to better align cells
      }
    }
  }
}

function getNextGrid() {
  let nextGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countLiveNeighbors(i, j);
      if (state === 0 && neighbors === 3) {
        nextGrid[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = state;
      }
    }
  }

  return nextGrid;
}

function countLiveNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // wrap around grid to find neighbors
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y]; // remove current cell's value
  return sum;
}
