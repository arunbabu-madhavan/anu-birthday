import Trait from './Trait.js'
export default class Go extends Trait{
    constructor(){
        super('go');

        this.dir = 0;
        this.speed = 200;
        this.distance = 0;
        this.heading = 1;
    }

   
    update(entity,deltatime){
      
            entity.vel.x = this.speed * this.dir;
           if(this.dir){
                this.distance +=
                     Math.abs(entity.vel.x * deltatime);
            this.heading  =  this.dir;
           }
           else
            this.distance =0;
    }
}