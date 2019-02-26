//For both death and birth animation
class Particle{
    constructor(position){
        this.position = position.copy();
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.lifespan = 255;
        this.drag = 0.99;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update(){
        this.velocity.mult(this.drag);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    draw(){
        // stroke(200, this.lifespan);
        // strokeWeight(2);
        stroke(0, this.lifespan);
        strokeWeight(2);
        fill(255, this.lifespan);
        ellipse(this.position.x, this.position.y, 12, 12);
    }

    isDead(){
        return this.lifespan < 0;
    }

    run(){
        this.update();
        this.draw();
    }

}