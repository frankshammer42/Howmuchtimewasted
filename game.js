//Clock Game
let time_ball;
let prevPos;
let first_clock;
let force_dir;
let force_mag; //Player specified variables


//Debug helper
function mousePressed() {
    // prevPos = createVector(mouseX, mouseY);
    time_ball.position.x = mouseX;
    time_ball.position.y = mouseY;
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    let center = createVector(600, 600);
    first_clock = new Clock(center, 200, 25);
    time_ball = new Ball();
    // console.log(minute_arm.arm_length);
    // console.log(hour_arm.arm_length);
}


function keyPressed() {
    console.log("wtf???????????");
    console.log(keyCode);
    if (keyCode === 68) {
        time_ball.velocity = p5.Vector.mult(time_ball.dir_vec, time_ball.charged_speed);
        time_ball.charged_speed = 0.5;
        console.log(time_ball.velocity);
    }
}

function draw() {
    // if (keyIsPressed && key == 'e') {
    //     console.log("Reciprocate the energy");
    // }
    background(51);

    time_ball.update();
    time_ball.checkEdges();
    time_ball.display();

    first_clock.draw();
    if (first_clock.betweenArms(time_ball.position, 0, 2)){
        first_clock.drawArcBetweenArm(0, 2);
    }
}


function noscroll() {
    window.scrollTo( 0, 0 );
}
// add listener to disable scroll
window.addEventListener('scroll', noscroll);
