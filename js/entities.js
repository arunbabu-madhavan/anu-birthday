import Entity from './entity.js'
import {loadSpritesheet} from './loaders.js'
import Jump from './traits/Jump.js'
import Go from './traits/go.js';
import { createAnimation } from './animation.js';


export function createPanda(){
   
   return loadSpritesheet("panda").then(pandaSprite => {
    const panda = new Entity(48,59);
    panda.addTrait(new Go());
    panda.addTrait(new Jump());
    
    const runAnim = createAnimation(['walk-1','walk-2','idle'],32);

    function routeFrame(panda){
        if(panda.jump.engageTime!==0)
        {
            return 'jump-2';
        }
        else if(panda.go.dir !==0 ){
            return runAnim(panda.go.distance);
        }

        return 'idle';
    }

    panda.draw =function(context){
        pandaSprite.draw(routeFrame(this),context,0,0,panda.go.heading < 0);
    }


    return panda;
    });
}