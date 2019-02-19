//Clock Game
let time_ball;
let prevPos;
let first_clock;
let force_dir;
let force_mag; //Player specified variables
let current_arc_transparency;
let clocks = [];
let num_clocks = 6;


//Debug helper
function mousePressed() {
    // prevPos = createVector(mouseX, mouseY);
    time_ball.position.x = mouseX;
    time_ball.position.y = mouseY;
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    time_ball = new Ball();
    for (let i=0; i<num_clocks; i++){
        let center = createVector(200 + i*300, 600 + random([0, -1])*random(300));
        let temp_clock = new Clock(center, 200, 25, -90 + random([0, -1])*random(100));
        clocks.push(temp_clock);
    }

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
    let ball_gets_captured = false;
    for (let i=0; i<num_clocks; i++){
        let current_clock = clocks[i];
        current_clock.draw();
        let capture_report = current_clock.checkCaptureStatus(time_ball.position);
        if (capture_report['captured']){
            ball_gets_captured = true;
            let result_arm_pairs = capture_report['pair_info'];
            result_arm_pairs.sort((a,b) => a[2]-b[2]);
            let current_pair = result_arm_pairs[0];
            current_clock.drawArcBetweenArm(current_pair[0], current_pair[1]);
            time_ball.captured_by_clock = true;
            time_ball.clock_center = current_clock.center;
            // console.log(capture_report['pair_info']);
        }
    }
    if (!ball_gets_captured){
        time_ball.captured_by_clock = false;
        time_ball.drag = 0.99;
    }

    // first_clock.draw();
    // if (first_clock.betweenArms(time_ball.position, 0, 2)){
    //     first_clock.drawArcBetweenArm(0, 2);
    // }
    // let capture_report = first_clock.checkCaptureStatus(time_ball.position);
    // if (capture_report['captured']){
    //     let result_arm_pairs = capture_report['pair_info'];
    //     console.log(result_arm_pairs);
    //     result_arm_pairs.sort((a,b) => a[2]-b[2]);
    //     let current_pair = result_arm_pairs[0];
    //     first_clock.drawArcBetweenArm(current_pair[0], current_pair[1]);
    //     time_ball.captured_by_clock = true;
    //     time_ball.clock_center = first_clock.center;
    //     // console.log(capture_report['pair_info']);
    // }
    // else{
    //     time_ball.captured_by_clock = false;
    //     time_ball.drag = 0.99;
    // }
}


function noscroll() {
    window.scrollTo( 0, 0 );
}
// add listener to disable scroll
window.addEventListener('scroll', noscroll);
