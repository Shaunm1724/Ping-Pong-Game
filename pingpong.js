let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  if (leftScore >= 5 || rightScore >= 5) {
    // Display a game-over message
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    
    // Optionally, you can reset the scores to 0 or perform other actions as needed.
    leftScore = 0;
    rightScore = 0;
    
    // Exit the draw loop to stop the game
    noLoop();
    return;
  }
  background(0);

  leftPaddle.show();
  rightPaddle.show();
  //leftPaddle.update();
  //rightPaddle.update();

  ball.update();
  ball.show();

  //Handle keyboard controls
  if (keyIsDown(87)) {
    leftPaddle.move(-1); // 'W' key
  }
  if (keyIsDown(83)) {
    leftPaddle.move(1); // 'S' key
  }

  if (keyIsDown(UP_ARROW)) {
    rightPaddle.move(-1); // Move up when the UP_ARROW key is pressed
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.move(1); // Move down when the DOWN_ARROW key is pressed
  }


  // Check for collisions with paddles
  if (ball.hits(leftPaddle)) {
    ball.xSpeed *= -1;
  }
  if (ball.hits(rightPaddle)) {
    ball.xSpeed *= -1;
  }

  // Check for scoring
  if (ball.x > width) {
    leftScore++;
    ball.reset();
  }
  if (ball.x < 0) {
    rightScore++;
    ball.reset();
  }

  // Display scores
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, (3 * width) / 4, 50);
}

class Paddle {
  constructor(isLeft) {
    this.width = 10;
    this.height = 100;
    this.isLeft = isLeft;
    this.x = isLeft ? 0 + this.width : width - this.width;
    this.y = height / 2;
  }

  show() {
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  move(dir) {
    this.y += dir * 5;
    this.y = constrain(this.y, this.height / 2, height - this.height / 2);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 15;
    this.xSpeed = 10;
    this.ySpeed = 5;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y > height - this.radius / 2 || this.y < this.radius / 2) {
      this.ySpeed *= -1;
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius);
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 10;
    this.ySpeed = 5;
  }

  hits(paddle) {
    let halfPaddleHeight = paddle.height / 2;
    let halfPaddleWidth = paddle.width / 2;

    return (
      this.x + this.radius / 2 > paddle.x - halfPaddleWidth &&
      this.x - this.radius / 2 < paddle.x + halfPaddleWidth &&
      this.y + this.radius / 2 > paddle.y - halfPaddleHeight &&
      this.y - this.radius / 2 < paddle.y + halfPaddleHeight
    );
  }
}
