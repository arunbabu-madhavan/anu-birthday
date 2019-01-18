import  {createPanda}  from './entities.js'
import  Timer from './timer.js'
import  Camera from './camera.js'
import { loadLevel, loadImage } from './loaders.js'

import {createCollisionLayer, createCameraLayer} from './layers.js'
import { setupKeyboard } from './input.js';
import {setupMouseControl} from'./debug.js'


const canvas = document.getElementById('screen');
const context = canvas.getContext("2d");
context.fillStyle="#26BAE0";
context.fillRect(0,0,640,640);

Promise.all([loadLevel("test"),createPanda()])
        .then(([level,panda]) => 
    {
        const camera  = new Camera();
        
        panda.pos.set(8,455);
        level.entities.add(panda);
        //  level.compositor.layers.push(createCollisionLayer(level)
        //                                  , createCameraLayer(camera));
    
        const input  = setupKeyboard(panda);
        window.camera = camera;
        input.listenTo(window);
        
      //  setupMouseControl(canvas,panda,camera);
        const timer = new Timer();
        window.timer = timer;
        timer.update = function update(deltaTime){
                        level.update(deltaTime);
                      if(timer.running)
                        level.compositor.draw(context,camera);
                    else
                        wish();
                    }

        timer.start();
    }); 


    function wish(){
        timer.update = ()=>{}

        context.clearRect(0,0,640,640);
        canvas.height= 788;
      
        canvas.width= 940;
        context.fillRect(0,0,940,788);


        loadImage("/atlas/Anubirthday.png").then(img => {
            context.drawImage(img,0,0);
        });

    }

   