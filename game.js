//Clock Game
let time_ball;
let prevPos;
let first_clock;
let force_dir;
let force_mag; //Player specified variables
let current_arc_transparency;
let clocks;


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
    if (keyCode === 68) {
        time_ball.velocity = p5.Vector.mult(time_ball.dir_vec, time_ball.charged_speed);
        time_ball.charged_speed = 0.5;
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
    // if (first_clock.betweenArms(time_ball.position, 0, 2)){
    //     first_clock.drawArcBetweenArm(0, 2);
    // }
    let capture_report = first_clock.checkCaptureStatus(time_ball.position);
    if (capture_report['captured']){
        let result_arm_pairs = capture_report['pair_info'];
        console.log(result_arm_pairs);
        result_arm_pairs.sort((a,b) => a[2]-b[2]);
        let current_pair = result_arm_pairs[0];
        first_clock.drawArcBetweenArm(current_pair[0], current_pair[1]);
        time_ball.captured_by_clock = true;
        time_ball.clock_center = first_clock.center;
        // console.log(capture_report['pair_info']);
    }
    else{
        time_ball.captured_by_clock = false;
        time_ball.drag = 0.99;
    }
}


function noscroll() {
    window.scrollTo( 0, 0 );
}
// add listener to disable scroll
window.addEventListener('scroll', noscroll);
