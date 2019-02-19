//TODO: Create Damping Motions
//TODO: Create Movements Patterns 1. Direction 2. Charges
    //TODO: 1 Form
    //TODO: 2 Apply Force
//TODO: Circular Motion Implemenation
class Ball {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.catched_by_clock = false;
        this.drag = 0.99;
        this.charge_rate = 0.4;
        this.display_angle_change_rate = 3.2;
        this.max_charge_display_angle = 1/2*PI;
        //User controlled parameters
        this.dir_vec = null;
        this.charged_speed = 0.5; //User defines charge
        this.max_charged_speed = 20; //The max user can charge;
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
            if (keyIsPressed && key == ' ') {
                if (this.charged_speed < this.max_charged_speed){
                    this.charged_speed += this.charge_rate;
                }
            }
            this.createDirVec();
        }
        if (Math.abs(this.velocity.x) <= 0.05 && Math.abs(this.velocity.y) <= 0.05){
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

    drawDirArrow(){
        let current_charged_velocity = p5.Vector.mult(this.dir_vec, this.charged_speed);
        push();
        if (this.charged_speed >= this.max_charged_speed){
            stroke(244, 66, 78);
        }
        else{
            stroke('white');
        }
        strokeWeight(3);
        if (this.charged_speed >= this.max_charged_speed){
            fill(244, 66, 78);
        }
        else{
            fill('white');
        }
        translate(this.position.x, this.position.y);
        // line(0, 0, this.dir_vec.x, this.dir_vec.y);
        rotate(this.dir_vec.heading());
        let arrowSize;
        if (this.charged_speed >= this.max_charged_speed ){
            arrowSize = 2 + this.charged_speed + 5*sin(this.max_charge_display_angle);
        }
        else{
            arrowSize = 4 + this.charged_speed;
        }
        translate(40 - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }



}