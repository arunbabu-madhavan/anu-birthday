import TileResolver from "./tileresolver.js";
import Timer from "./timer.js";
import { loadImage } from "./loaders.js";


export default class TileCollider{
    constructor(tileMatrix){
        this.tiles = new TileResolver(tileMatrix,32);
    }

    checkX(entity){

        let x;

        if(entity.vel.x > 0){
            x = entity.pos.x +entity.width;
        }
        else if (entity.vel.x < 0){
            x = entity.pos.x;
        }
        else{
            return;
        }

        const  matches = 
            this.tiles.searchByRange(x,x ,
                entity.pos.y , entity.pos.y  + entity.height);
                matches.forEach(match =>{

        if(match.tile.name === 'sky' || match.tile.name === 'butterfly')
        {
            return;
        }

        if(match.tile.name === 'flower')
        {
           
            timer.stop();
          
            return;
        }

        if(entity.vel.x > 0){
           
            if(entity.pos.x + entity.width  > match.x1){
                entity.pos.x = match.x1 - entity.width;
                entity.vel.x = 0;
            }
        }
        else if(entity.vel.x < 0){
           // console.log(entity.pos.y,match.y1)
            if((entity.pos.x)  < match.x2){
                entity.pos.x = match.x2 ;
                entity.vel.x = 0;
            }
        }
    });
}


    checkY(entity){

        let y;

        if(entity.vel.y > 0){
            y = entity.pos.y +entity.height;
        }
        else if (entity.vel.y < 0){
            y = entity.pos.y;
        }
        else{
            return;
        }
        const  matches = 
            this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.width ,
                y,y);
                matches.forEach(match =>{

        if(match.tile.name === 'sky'|| match.tile.name === 'butterfly')
        {
            return;
        }
        if(match.tile.name === 'flower')
        {
            timer.stop();

            return;
        }

        if(entity.vel.y > 0){
           
            if((entity.pos.y) + entity.height  > match.y1 ){
                entity.pos.y = match.y1 - entity.height;
                entity.vel.y = 0;
            }
        }
        else if(entity.vel.y < 0){
           // console.log(entity.pos.y,match.y1)
            if((entity.pos.y)  < match.y2){
                entity.pos.y = match.y2 ;
                entity.vel.y = 0;
            }
        }
    });
  
}
}
