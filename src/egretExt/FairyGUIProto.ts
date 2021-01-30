module codeBase {
	export class FairyGUIProto {
		public constructor() {
		}
		public static inject():void
		{
			let fair:any;
			if(window["fairygui"]==null)return;		
			fair = window["fairygui"]
			fair.GRoot.prototype["__winResize"] = function():void{
				this.setSize(this._displayObject.width == 0?egret.MainContext.instance.stage.stageWidth:this._displayObject.width, this._displayObject.height == 0?egret.MainContext.instance.stage.stageHeight:this._displayObject.height);
			}
			fair.TweenManager.killAllTweens = function () {                        
				var cnt = fair.TweenManager._totalActiveTweens;            
				for (var i = 0; i < cnt; i++) {
					var tweener = fair.TweenManager._activeTweens[i];
					if (tweener != null && !tweener._killed) {
						tweener.kill();                    
					}
				}            
			};
		}
	}
}
