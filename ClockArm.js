class ClockArm{
    constructor(type, al, ac){
        this.arm_length = al;
        this.arm_color = ac;
        this.current_angle = 0;
        this.type = type; //0 sec, 1 min, 2 hour
    }

    draw(){
        strokeWeight(8);
        noFill();
        this.current_angle = this.getAngle();
        push();
        rotate(this.current_angle);
        stroke(this.arm_color.x, this.arm_color.y, this.arm_color.z);
        line(0, 0, this.arm_length, 0);
        pop();

    }

    getAngle(){
        let current_unit_value;
        let result_angle;
        switch(this.type){
            case 0:
                current_unit_value = second();
                result_angle = map(current_unit_value, 0, 60, 0, 360);
                break;
            case 1:
                current_unit_value = minute();
                result_angle = map(current_unit_value, 0, 60, 0, 360);
                break;
            case 2:
                current_unit_value = hour();
                result_angle = map(current_unit_value % 12, 0, 12, 0, 360);
                break;
        }
        return result_angle;
    }
}