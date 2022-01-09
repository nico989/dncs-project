export class PulsanteLuce {
   private _mqttClient: any;
   private _message: string = '';
   private _topic: string = '';

   constructor(mqttClient: any) {
      this._mqttClient = mqttClient;
   }

   get message(): string {
      return this._message;
   }

   get topic(): string {
      return this._topic;
   }

   call(stanza: string, action: number) {
      this._topic = stanza + '/luce';
      if(action ==  0) {
         this.on();
      } else if (action == 1) {
         this.off();
      } else if (action == 2) {
         this.intensity();
      }
   }

   on() {
      this._topic += '/on';
      this._mqttClient.publish(this._topic, this._message);
   } 

   off() {
      this._topic += '/off';
      this._mqttClient.publish(this._topic, this._message);
   } 
   
   intensity() {
      this._topic += '/intensita';
      this._message = getRandomInt(0, 100).toString();
      this._mqttClient.publish(this._topic, this._message);
   } 
}

function getRandomInt(min: number, max: number) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
