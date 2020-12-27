module codeBase{
	export class BezierUtil {
		public constructor() {
		}

		/**
		 * 利用egret的缓动动画Tween来实现动画  
			二次方贝塞尔公式  
			起点P0  控制点P1  终点P2  
			(1 - t)^2*P0 + 2 t (1 - t)*P1 + t^2*P2  
			在1秒内，obj的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
		 */
		public static bezierMove(obj:any, p0:egret.Point, p1:egret.Point, p2:egret.Point, moveTime:number=1000, easeType:Function=null, callFun:Function=null, funObj:any=null) {
			if(!obj["factor"]) {
				obj["factor"] = 0;
			}
			obj["factor"] = 0;
			obj.x = p0.x;
			obj.y = p0.y;  
			egret.Tween.get(obj, { onChange:()=>{
				let value = obj.factor;
				obj.x = (1 - value) * (1 - value) * p0.x + 2 * value * (1 - value) * p1.x + value * value * p2.x;
				obj.y = (1 - value) * (1 - value) * p0.y + 2 * value * (1 - value) * p1.y + value * value * p2.y;
			}, onChangeObj:obj }).to({ factor: 1 }, moveTime, easeType).call(()=>{
				if(callFun && funObj) {
					callFun.call(funObj, [obj]);
				}
			}, this); 
		} 
	}
}