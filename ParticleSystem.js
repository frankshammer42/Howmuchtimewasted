class ParticleSystem{
    constructor(position, type, radius){
        this.center = position.copy();
        this.type = type;
        this.particles = [];
        this.radius = radius;
    }

    addParticle(pos){
        this.particles.push(new Particle(pos));
    }

    run(){
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            let diff = p5.Vector.sub(p.position, this.center);
            let dist = diff.mag();
            diff = diff.normalize();
            if (dist < this.radius){
                let ratio;
                if (this.type === 1){
                    ratio = 1 - dist / this.radius ;
                }
                else{
                    ratio = dist / this.radius - 1;
                }
                let force = p5.Vector.mult(diff, ratio);
                console.log(ratio);
                p.applyForce(force);
            }
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}