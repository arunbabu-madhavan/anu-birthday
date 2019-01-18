
import {Vec2} from './math.js'


export default class Entity{
    constructor(width,height)
    {
        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
        this.width =  width;
        this.height = height;
        this.traits = [];
    }

    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime){
        this.traits.forEach(trait => {
            trait.update(this,deltaTime);
        });
    }
    
}
