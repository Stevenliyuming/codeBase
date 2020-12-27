module codeBase{
	// export class EventType {
	// 	public static CLOSE_VIDEO: string = "CLOSE_VIDEO";
	// }

	//谁发送 谁监听
	export class GameDispatcher extends egret.EventDispatcher {
		private static instance: GameDispatcher;
		private constructor() {
			super();
		}

		public static getInstance(): GameDispatcher {
			if (GameDispatcher.instance == null) {
				GameDispatcher.instance = new GameDispatcher();
			}
			return GameDispatcher.instance;
		}

		public addEventListener(eventName: string, func: Function, thisObj: any, useCapture: boolean = false, priority: number = 1): void {
			super.addEventListener(eventName, func, thisObj, useCapture, priority);
		}

		public removeEventListener(eventName: string, func: Function, thisObj: any, useCapture: boolean = false): void {
			super.removeEventListener(eventName, func, thisObj, useCapture);
		}

		public hasEventListener(eventName: string): boolean {
			return super.hasEventListener(eventName);
		}

		public once(eventName: string, func: Function, thisObj: any, useCapture: boolean = false): void {
			super.once(eventName, func, thisObj, useCapture)
		}

		public dispatchEvent(event: egret.Event): boolean {
			var t1: number = egret.getTimer();
			var result: boolean = super.dispatchEvent(event);
			var gap: number = egret.getTimer() - t1;
			if (gap > 5) {
				//console.log(StringUtil.substitute("send Evt gap = {1} name = {0}", event.type, gap));
			}
			return result;
		}

		public willTrigger(eventName: string): boolean {
			return super.willTrigger(eventName);
		}
	}
}