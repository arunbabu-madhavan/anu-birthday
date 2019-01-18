export default class Timer{

    constructor(deltaTime= 1/60)
    {
        this.requestId;
        this.deltaTime = deltaTime;
        let accumulatedTime = 0;
        let lastTime =0;
        let running =0;
        if(accumulatedTime > 1){
            accumulatedTime = 1;
        }
    this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime)/1000;
            
            while(accumulatedTime > deltaTime){
                this.update(this.deltaTime);
                accumulatedTime-=deltaTime;
        }
            lastTime = time;
           this.enqueue();
    }
   }
   
   enqueue()
   {
       this.requestId= requestAnimationFrame(this.updateProxy);
   }

   stop()
   {
       this.running =0;
       cancelAnimationFrame(this.requestId);
   }

   start()
   {
       this.running = 1;
    this.enqueue();
   }

}