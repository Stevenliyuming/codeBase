module codeBase {
	export class MyEventDispatcher implements egret.IEventDispatcher{
		$hashCode: number;
		public constructor() {
		}

		addEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void {

		}

		once(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void {

		}

		removeEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean):void {

		}

		hasEventListener(type:string):boolean {
			return false;
		}

		dispatchEvent(event:egret.Event):boolean {
			return true;
		}

		willTrigger(type:string):boolean {
			return false;
		}

		public get hashCode(): number {
            return this.$hashCode;
        }
	}
}