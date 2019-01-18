import Level from './level.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

import SpriteSheet from './spritesheet.js';
import { createAnimation } from './animation.js';

export function loadImage(url){
    return new Promise(resolve =>{
        const image = new Image();
        image.onload = () =>{
            resolve(image);
        };
        image.src = url;
    });
}

export function LoadJSON(url){
   return fetch(url)
    .then(r=>r.json());
}

export function loadSpritesheet(name){
   return LoadJSON(`sprites/${name}.json`)
                .then(sheetSpec =>  Promise.all([sheetSpec,loadImage(sheetSpec.imageUrl)])
                    .then(([sheetSpec,image])=>{
                        const sprites = new SpriteSheet(image,sheetSpec.tileSize);
                    if(sheetSpec.tiles) {
                        sheetSpec.tiles.forEach(tileSpec =>{
                            sprites.define(tileSpec.name
                                ,tileSpec.index[0],tileSpec.index[1],
                                tileSpec.width,tileSpec.height);
                        });
                    }
                    if(sheetSpec.frames) {
                        sheetSpec.frames.forEach(frameSpec => {
                            sprites.define(frameSpec.name,...frameSpec.rect);
                        });
                    }
                    if(sheetSpec.animations) {
                        sheetSpec.animations.forEach(animSpec => {
                            const animation = createAnimation(animSpec.frames,animSpec.frameLength);
                            sprites.defineAnimation(animSpec.name,animation);
                        });
                    }
            
                return sprites;
   }));
}

export function loadLevel(name){
    return LoadJSON(`levels/${name}.json`).then
    (levelSpec => 
        Promise.all([levelSpec, loadSpritesheet(levelSpec.spritesheet)]))
        .then(([levelSpec,bgsprites]) =>{

            const level = new Level();
            level.createTiles(levelSpec.backgrounds);

            const backgroundLayer = createBackgroundLayer(level,bgsprites);
            level.compositor.layers.push(backgroundLayer);
            const spriteLayer = createSpriteLayer(level.entities);
            level.compositor.layers.push(spriteLayer);
            
            return level;
        });
}