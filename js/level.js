import Compositor from "./compositior.js";
import Matrix from "./math.js";
import TileCollider from "./tilecollider.js";

export default class Level{
    constructor(){

        this.gravity = 1200;
        this.totalTime =  0;
        this.compositor = new Compositor();
        this.entities = new Set;
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles,32);
    }


    createTiles(backgrounds){
     

        backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if(range.length == 4){
               const [xStart,xLen,yStart,yLen] = range;
              this.applyRange(background,xStart,xLen,yStart,yLen);
            }
                                    else if(range.length == 2){
                                        const [xStart,yStart] = range;
                                        this.applyRange(background,xStart,1,yStart,1);
                                    }
                                });
    });
    }
    applyRange(background,xStart,xLen,yStart,yLen) 
    {
        for(let x=xStart;x<xStart+ xLen;x++)
           for(let y=yStart;y<yStart+yLen;y++)
              this.tiles.set(x,y,{name:background.tile});
      }
    

    update(deltaTime){
        this.entities.forEach(entity =>{
            entity.update(deltaTime)
            entity.pos.x +=entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);
           
            entity.pos.y +=entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);
           
            entity.vel.y += this.gravity * deltaTime;
         
        
        });
        this.totalTime +=deltaTime;
    }
}