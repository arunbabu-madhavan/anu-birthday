
export default class SpriteSheet
{
    constructor(image,size){
        this.image = image;
        this.tiles = new Map;
        this.dimensions = new Map;
        this.animations = new Map;
        this.size = size;
    }

    defineAnimation(name,animation){
        this.animations.set(name,animation);
    }

    define(name,x,y,width,height){
        const buffers = [false,true].map(flip=>{
            const buffer = document.createElement('canvas');
            buffer.width= width;
            buffer.height = height;
            const context =  buffer.getContext('2d');
           
            if(flip){
                context.scale(-1,1);
                context.translate(-width,0);
            }

            context.drawImage(this.image,
                       x,y, width, height,
                       0,0, width, height);
            
             return buffer;
                    });

        this.tiles.set(name,buffers);
        this.dimensions.set(name,{height,width});
    }

    draw(name,context,x,y, flip =false){
        const buffer = this.tiles.get(name)[flip?1:0];
        const dim = this.dimensions.get(name);
        context.drawImage(buffer,x,y); 
    }

    drawAnimation(name,context,x,y,distance){
        const animation = this.animations.get(name);
        this.drawTile(animation(distance),context,x,y);
    }

    drawTile(name,context,x,y){
        const buffer = this.tiles.get(name)[0];
        const dim = this.dimensions.get(name);
 
        context.drawImage
          (buffer,  (x*  this.size)%dim.width ,
                    (y *  this.size)%dim.height, 
                    this.size, this.size,
                    x* this.size,y* this.size,
                     this.size, this.size
     ); 
    }
}