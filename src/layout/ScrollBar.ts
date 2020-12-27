module codeBase{
	/***滚动器，可以设置裁剪滚动的内容，分为横向和纵向滚动 */
	export class ScrollBar extends LayoutContainer implements ILayout {
		protected skinBar: DisplayObject;
		protected _content: DisplayObject;
		protected _contentPos:egret.Point = new egret.Point;
		protected maskRect: DisplayObject;
		protected alignType: string;
		protected startPos: Point;
		protected stPos: Point;
		protected startTime: number;
		protected barVisible:boolean;
		protected mouseEnable:boolean = false;
		protected mouseOver:boolean = false;
		protected canvas: HTMLCanvasElement;
		protected mouseWheelFun:any;
		protected mouseWheelMoveStep:number = 5;
		
		/**
		 * w:滚动容器宽
		 * h:滚动容器高
		 * content:滚动容器内容
		 * align:容器滑动方向，水平和垂直滚动
		 * bar:滚动容器侧边或者底部滚动条
		 * barVisible:是否显示滚动条
		 */
		public constructor(w:number, h:number, content:DisplayObject, align:string = LayoutConst.VERTICAL, bar: DisplayObject = null, barVisible:boolean=true) {
			super();
			this.skinBar = bar || Skin.scrollBar;
			this.skinBar.alpha = 0;
			this.barVisible = barVisible;
			this.addChild(this.skinBar);
			this.width = w;
			this.height = h;
			if(!barVisible)
				this.skinBar.visible = false;
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
			this.startPos = new Point;
			this.stPos = new Point;
			this.content = content;
			this.alignType = align;
			this.setSize(w, h);
			this.layout(align);
		}

		protected onTouch(e: egret.TouchEvent) {
			switch (e.type) {
				case egret.TouchEvent.TOUCH_BEGIN:
					this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.stPos.x = e.stageX;
					this.stPos.y = e.stageY;
					// let rect:egret.Rectangle = this._content.scrollRect;
					// this.startPos.x = e.stageX - rect.x;
					// this.startPos.y = e.stageY - rect.y;
					this.startPos.x = e.stageX - this._contentPos.x;
					this.startPos.y = e.stageY - this._contentPos.y;
					this.hideShow(1);
					this.startTime = egret.getTimer();
					break;
				case egret.TouchEvent.TOUCH_MOVE:
					this.moveDo(e.stageX, e.stageY);
					break;
				case egret.TouchEvent.TOUCH_END:
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.hideShow(0, 100);
					this.timeMove(e.stageX, e.stageY);
					break;
			}
		}

		/**是否可以鼠标控制滚动 在滚动容器为垂直滚动的条件下才生效*/
		public setMouseWheelEnable(value:boolean) {
			let s = this;
			if(s.alignType == LayoutConst.VERTICAL) {
				s.mouseEnable = value;
				if(s.mouseEnable) {
					s.addMouseEvent();
				} else {
					s.removeMouseEvent();
				}
			}
		}

		// public onMouseMove(evt:egret.TouchEvent) {
		// 	//console.log("onTouchMove");
		// 	let s = this;
		// 	s.doMove(evt.target, evt.stageX, evt.stageY);
		// }

		protected addMouseEvent() {
			let s = this;
			//s.addEventListener(mouse.MouseEvent.MOUSE_OVER, s.onMouseMoveEvent, s);
			//s.addEventListener(mouse.MouseEvent.MOUSE_OUT, s.onMouseMoveEvent, s);
			s.addCanvasEventListener("mousewheel", s.onMouseWheel, s);
		}

		protected removeMouseEvent() {
			let s = this;
			//s.removeEventListener(mouse.MouseEvent.MOUSE_OVER, s.onMouseMoveEvent, s);
			//s.removeEventListener(mouse.MouseEvent.MOUSE_OUT, s.onMouseMoveEvent, s);
			if(s.canvas && s.mouseWheelFun) {
				s.canvas.removeEventListener("mousewheel", s.mouseWheelFun);
			}
		}

		/**
		 * 添加Canvas事件监听
		 * 例如
		 * canvas.addEventListener('mousemove',(evt: MouseEvent)=>{});
		 */
		public addCanvasEventListener(type: string, fun: Function, funObj: any) {
			let s = this;
			if (!s.canvas) {
				s.canvas = <HTMLCanvasElement>document.getElementsByTagName("CANVAS")[0];
			}
			let bindFun = fun.bind(funObj);
			s.mouseWheelFun = bindFun;
			s.canvas.addEventListener(type, bindFun);
		}

		protected onMouseMoveEvent(ev:egret.TouchEvent) {
			let s = this;
			//console.log(ev.type);
			if(ev.type == "mouseOver") {
				 s.mouseOver = true;
			} else if(ev.type == "mouseOut") {
				s.mouseOver = false;
				//s.hideShow(0);
			}
		}

		protected onMouseWheel(evt: WheelEvent) {
			let s = this;
			let pos = s.globalToLocal(evt.x, evt.y);
			if(pos.x >= s.maskRect.x && pos.x <= s.maskRect.x + s.maskRect.width && pos.y >= s.maskRect.y && pos.y <= s.maskRect.y + s.maskRect.height) {
				s.mouseWheelMoveY(evt.deltaY);
				s.hideShow(1);
			} else {
				s.hideShow(0);
			}
		}

		//缓动动画
		protected timeMove(x: number, y: number): void {
			var time: number = egret.getTimer() - this.startTime;
			if (time < 500) {
				var target: any = this._contentPos;//this._content;
				var maskRect: DisplayObject = this.maskRect;
				Tween.removeTweens(target);
				var dx: number = x - this.stPos.x;
				var dy: number = y - this.stPos.y;
				var distance: number = Math.sqrt(dx * dx + dy * dy);
				var value: number = (distance / time) * 100;
				var tw: Tween = Tween.get(target, { loop:false, onChange:()=>{
					let rect:egret.Rectangle = this._content.scrollRect;
					rect.x = -this._contentPos.x;
					rect.y = -this._contentPos.y;
					this._content.scrollRect = rect;
				}, onChangeObj:this });
				if (this.alignType == LayoutConst.VERTICAL) {
					var sign: number = dy > 0 ? 1 : -1;
					value *= sign;
					var h: number = target.y + value;
					if (h > 0 && target.y + value > 0) h = 0;//向下滑动
					if (h < 0 && target.y + value < (maskRect.height - this._content.height)) h = maskRect.height - this._content.height;//向上滑动
					tw.to({ y: h }, 400, Ease.sineOut).call(this.setBarPos, this);
				} else {
					var sign: number = dx > 0 ? 1 : -1;
					value *= sign;
					var w: number = target.x + value;
					if (w > 0 && target.x + value > 0) w = 0;//向右滑动
					if (w < 0 && target.x + value < (maskRect.width - this._content.width)) w = maskRect.width - this._content.width;//向左滑动
					tw.to({ x: w }, 400, Ease.sineOut).call(this.setBarPos, this);
				}
			}
		}

		public set isBarVisible(value) {
			this.barVisible = value;
		}

		protected setBarPos(): void {
			let s = this;
			if (s.alignType == LayoutConst.VERTICAL)
				s.skinBar.y = -s._content.y / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
			else
				s.skinBar.x = -s._content.x / (s._content.width - s.maskRect.width) * (s.maskRect.width - s.skinBar.width);
		}

		protected hideShow(alpha: number, time: number = 1000): void {
			if(!this.barVisible) return;
			if(this.skinBar.alpha == alpha) return;
			Tween.removeTweens(this.skinBar);
			if (alpha == 1) {
				this.skinBar.alpha = 1;
			} else {
				var tw: Tween = Tween.get(this.skinBar);
				tw.to({ alpha: alpha }, time);
			}
		}

		protected moveDo(x: number, y: number): void {
			let s = this;
			if (s.alignType == LayoutConst.VERTICAL) {
				s.canMoveY(y);
			} else if (s.alignType == LayoutConst.HORIZONTAL) {
				s.canMoveX(x);
			}
		}

		protected canMoveX(x: number): void {
			let s = this;
			var deltaWidth: number = s.maskRect.width - s._content.width;
			var xx = x - s.startPos.x;
			if (xx > deltaWidth && xx < 0) {
				s._contentPos.x = xx;
				let rect: egret.Rectangle = s._content.scrollRect;
				rect.y = -xx;
				s._content.scrollRect = rect;
				s.skinBar.x = -xx / (s._content.width - s.maskRect.width) * (s.maskRect.width - s.skinBar.width);
			}
		}

		protected canMoveY(y: number): void {
			let s = this;
			var deltaHeight: number = s.maskRect.height - s._content.height;
			var yy = y - s.startPos.y;
			if (yy > deltaHeight && yy < 0) {
				s._contentPos.y = yy;
				let rect: egret.Rectangle = s._content.scrollRect;
				rect.y = -yy;
				s._content.scrollRect = rect;
				s.skinBar.y = -yy / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
			}
		}

		protected mouseWheelMoveY(deltaY:number) {
			let s = this;
			let deltaHeight: number = s.maskRect.height - s._content.height;
			if (deltaHeight < 0) {
				// let rect:egret.Rectangle = s._content.scrollRect;
				// let yy = rect.y;
				// yy += deltaY;
				// if(yy > Math.abs(deltaHeight)) {
				// 	yy = deltaHeight;
				// } else if(yy < 0) {
				// 	yy = 0;
				// }
				// rect.y = yy;
				// s._content.scrollRect = rect;

				let yy = s._contentPos.y;
				yy -= deltaY;
				if(yy < deltaHeight) {
					yy = deltaHeight;
				} else if(yy > 0) {
					yy = 0;
				}
				s._contentPos.y = yy;
				let rect:egret.Rectangle = s._content.scrollRect;
				rect.y = -yy;
				s._content.scrollRect = rect;
				s.skinBar.y = -yy / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
			}
		}

		protected setMask(): void {
			// if (this.maskRect != null && this._content != null) {
			// 	this._content.mask = this.maskRect;
			// }
			if(this._content) {
				this._content.scrollRect = new egret.Rectangle(0, 0, this.width, this.height);
			}
		}

		protected setSkinBarPos(): void {
			this.skinBar.x = this.skinBar.y = 0;
			if (this.alignType == LayoutConst.VERTICAL) {
				this.skinBar.x = this.maskRect.width - this.skinBar.width;
			} else if (this.alignType == LayoutConst.HORIZONTAL) {
				this.skinBar.y = this.maskRect.height - this.skinBar.height;
			}
		}

		public layout(type:string=LayoutConst.VERTICAL, interval: number = 0): void {
			let s = this;
			s.alignType = type;
			if(s.alignType == LayoutConst.HORIZONTAL) {
				s.setMouseWheelEnable(false);
			}
			s.setSkinBarPos();
			if(s.content) {
				s.content.x = s.content.y = 0;
			}
		}

		/**重置滚动容器 */
		public reset() {
			let s = this;
			s.layout(s.alignType);
		}

		public setSize(w: number, h: number): void {
			this.maskRect = LayoutUI.getRect(w, h, Color.white);
			this.addChildAt(this.maskRect, 0);
			this.maskRect.visible = false;
			this.setMask();
			this.setSkinBarPos();
		}

		public set content(value: DisplayObject) {
			this._content = value;
			this.addChild(this._content);
			this.setMask();
		}
	}
}