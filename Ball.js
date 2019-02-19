//TODO: Create Damping Motions
//TODO: Create Movements Patterns 1. Direction 2. Charges
    //TODO: 1 Form
    //TODO: 2 Apply Force
//TODO: Circular Motion Implemenation
//TODO: Clean Up some codes regarding different shapes
class Ball {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.captured_by_clock = false;
        this.drag = 0.99;
        this.charge_rate = 0.4;
        this.display_angle_change_rate = 3.2;
        this.max_charge_display_angle = 1/2*PI;
        //User controlled parameters
        this.dir_vec = null;
        this.charged_speed = 0.2; //User defines charge
        this.max_charged_speed = 20; //The max user can charge;
        this.clock_boosted_diff = 40; //The max user can charge diff for arrow
        this.clock_boosted_rate_diff = 1;
        //circular_motion
        this.clock_center = null;
        this.current_circular_motion_angle = 0;
        this.circular_motion_speed = 0.05;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    still(){
        let still_vector = createVector(0,0);
        if (this.velocity.equals(still_vector) && this.acceleration.equals(still_vector)){
            return true;
        }
        return false;
    }

    update() {
        if (this.still()){
            //Do Circular Motion
            if (this.captured_by_clock){
                this.current_circular_motion_angle = p5.Vector.sub(this.position, this.clock_center).heading();
                this.current_circle_radius = p5.Vector.sub(this.position, this.clock_center).mag();
                this.current_circular_motion_angle += this.circular_motion_speed;
                this.position.x = this.clock_center.x + this.current_circle_radius * cos(this.current_circular_motion_angle);
                this.position.y = this.clock_center.y + this.current_circle_radius * sin(this.current_circular_motion_angle);
                this.drag = 0.99;
            }
            if (keyIsPressed && key == ' ') {
                if (this.captured_by_clock){
                    if (this.charged_speed < this.max_charged_speed + this.clock_boosted_diff){
                        this.charged_speed += this.charge_rate + this.clock_boosted_rate_diff;
                    }
                }
                else{
                    if (this.charged_speed < this.max_charged_speed){
                        this.charged_speed += this.charge_rate;
                    }
                }
            }
            this.createDirVec();
        }
        // else{
        //     if (this.captured_by_clock){
        //         this.drag = 0.01;
        //     }
        //     else{
        //         this.velocity.add(createVector(-1, 0));
        //     }
        // }
        if (Math.abs(this.velocity.x) <= 0.5 && Math.abs(this.velocity.y) <= 0.5){
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.velocity.mult(this.drag);
        //Clean Up the velocity so it become still vector
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.max_charge_display_angle += this.display_angle_change_rate;
    }

    display() {
        if (this.captured_by_clock){
            stroke(244, 212, 66);
            strokeWeight(2);
            fill(244, 212, 66); //Goku
            if (this.charged_speed >= this.max_charged_speed && this.still()){
                let diameter = 15+5*sin(this.max_charge_display_angle);
                ellipse(this.position.x, this.position.y, diameter, diameter);
            }
            else{
                ellipse(this.position.x, this.position.y, 20, 20);
            }
        }
        else{
            if (this.charged_speed >= this.max_charged_speed && this.still()){
                stroke(244, 66, 78);
                strokeWeight(2);
                fill(244, 66, 78); //Goku
                let diameter = 15+5*sin(this.max_charge_display_angle);
                ellipse(this.position.x, this.position.y, diameter, diameter);
            }
            else{
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.position.x, this.position.y, 20, 20);
            }
        }
        if (this.still()){
            this.drawDirArrow();
        }
    }

    checkEdges() {
        if (this.position.x > width) {
            this.velocity.x *= -1;
            this.position.x = width;
        } else if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        }
        if (this.position.y > height) {
            this.velocity.y *= -1;
            this.position.y = height;
        } else if (this.position.y < 0) {
            this.velocity.y *= -1;
            this.position.y = 0;
        }
    }

    createDirVec(){
        this.dir_vec = createVector(mouseX - this.position.x, mouseY - this.position.y);
        this.dir_vec.normalize();
    }

    getAngleInRange(middle, left, right){
        if (middle < left){
            return left;
        }
        else if(middle > right){
            return right;
        }
        return middle;
    }

    drawDirArrow(){
        angleMode(DEGREES);
        let current_charged_velocity = p5.Vector.mult(this.dir_vec, this.charged_speed);
        push();
        if (this.captured_by_clock){
            stroke(244, 212, 66);
        }
        else{
            if(this.charged_speed >= this.max_charged_speed){
                stroke(244, 66, 78);
            }
            else{
                stroke('white');
            }
        }
        strokeWeight(3);
        translate(this.position.x, this.position.y);
        // line(0, 0, this.dir_vec.x, this.dir_vec.y);
        rotate(this.dir_vec.heading());
        let arrowSize;
        if (this.captured_by_clock){
            if (this.charged_speed >= this.max_charged_speed ){
                arrowSize = 4 + this.charged_speed + 10*sin(this.max_charge_display_angle);
            }
            else{
                arrowSize = 8 + this.charged_speed;
            }
            translate(80 - arrowSize, 0);
        }
        else{
            if (this.charged_speed >= this.max_charged_speed ){
                arrowSize = 2 + this.charged_speed + 5*sin(this.max_charge_display_angle);
            }
            else{
                arrowSize = 4 + this.charged_speed;
            }
            translate(40 - arrowSize, 0);
        }
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }



}