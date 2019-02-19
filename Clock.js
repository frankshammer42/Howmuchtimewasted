//Holder to scale up the level
//TODO: Create Scalable Arms Container
class Clock{
    constructor(center, second_arm_length, arm_length_diff){
        let second_arm_color = createVector(random(255), random(255), random(255));
        let minute_arm_color = createVector(random(255), random(255), random(255));
        let hour_arm_color = createVector(random(255), random(255), random(255));
        this.center = center;
        this.second_arm = new ClockArm(0, second_arm_length, second_arm_color);
        this.minute_arm = new ClockArm(1, second_arm_length-arm_length_diff, minute_arm_color);
        this.hour_arm = new ClockArm(2, second_arm_length-2*arm_length_diff, hour_arm_color);
        this.distance_threshold = this.hour_arm.arm_length;
    }

    draw(){
        push();
        translate(this.center.x, this.center.y);
        rotate(-90);
        this.second_arm.draw();
        this.minute_arm.draw();
        this.hour_arm.draw();
        stroke(255);
        point(0, 0);
        pop();
    }

   drawArcBetweenArm(type_0, type_1){
        let first_angle;
        let second_angle;
        first_angle = this.getAngleByType(type_0);
        second_angle = this.getAngleByType(type_1);
        //Make sure the angle is always less than 180
        let temp = first_angle;
        if (second_angle > first_angle){
            first_angle = second_angle;
            second_angle = temp;
        }
        push();
        translate(this.center.x, this.center.y);
        rotate(-90);
        stroke(150, 100, 255);
        fill(150, 100, 255, 50);
        if (first_angle - second_angle < 180 && first_angle - second_angle > 0){
            arc(0, 0, 2*this.distance_threshold, 2*this.distance_threshold, second_angle+1.6, first_angle-1.6);
        }
        else{
            arc(0, 0, 2*this.distance_threshold, 2*this.distance_threshold, first_angle+1.6, second_angle-1.6);
        }
        pop();
    }

    getAngleByType(type){
        let angle;
        switch(type){
            case 0:
                angle = this.second_arm.current_angle;
                break;
            case 1:
                angle = this.minute_arm.current_angle;
                break;
            case 2:
                angle = this.hour_arm.current_angle;
                break;
        }
        return angle
    }

    //Return Boolean
    betweenArms(pos, type_0, type_1){
        let first_angle;
        let second_angle;
        first_angle = this.getAngleByType(type_0);
        second_angle = this.getAngleByType(type_1);
        //Make sure the angle is always less than 180
        let temp = first_angle;
        if (second_angle > first_angle){
            first_angle = second_angle;
            second_angle = temp;
        }
        //Compare the angle <= shitty way
        let center = this.center;
        let distance_vector = p5.Vector.sub(pos, this.center);
        let distance = distance_vector.mag();
        let pos_angle = p5.Vector.sub(pos, this.center).heading() + 90;
        if (pos_angle < 0){
            pos_angle = 360 + pos_angle;
        }
        if (pos_angle > 360){
            pos_angle = pos_angle - 360;
        }
        if (first_angle - second_angle < 180){
            if (pos_angle < max(second_angle, first_angle) && pos_angle > min(second_angle, first_angle)
                && distance < this.distance_threshold){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            if (pos_angle > second_angle && pos_angle > first_angle
                && distance < this.distance_threshold){
                return true;
            }
            else{
                return false;
            }
        }
    }

    //Return Capture Report 1: Captured? 2: In between which two arms
    checkCaptureStatus(pos){
        let report = {};
        report['pair_info'] = [];
        for (let i=0; i<3; i++){
            for (let j=i+1; j<3; j++){
                let first_angle = this.getAngleByType(i);
                if (this.betweenArms(pos, i, j)){
                    report['captured'] = true;
                    let second_angle = this.getAngleByType(j);
                    let angle_diff = Math.abs(second_angle-first_angle);
                    if (angle_diff > 180){
                        angle_diff = 360 - angle_diff;
                    }
                    let result = [i, j, angle_diff];
                    report['pair_info'].push(result) ;
                }
            }
        }
        return report;
    }


}