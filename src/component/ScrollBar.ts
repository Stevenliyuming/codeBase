module codeBase{
	/***滚动器，可以设置裁剪滚动的内容，分为横向和纵向滚动 */
	export class ScrollBar extends LayoutComponent implements ILayout {
		protected sliderBarV: DisplayObject;
		protected sliderBarH: DisplayObject;
		protected _content: DisplayObject;
		protected _contentPos:egret.Point;
		protected viewPort: DisplayObject;
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
		public constructor(w:number, h:number, content:DisplayObject, align:string = Style.VERTICAL, sliderSKin: DisplayObject = null, barVisible:boolean=true) {
			super();
			let s = this;
			s.width = w;
			s.height = h;
			s.touchEnabled = true;
			s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
			s.startPos = new Point;
			s.stPos = new Point;
			s._contentPos = new egret.Point;
			s.content = content;
			s.alignType = align;

			s.sliderBarV = sliderSKin || Skin.scrollBar;
			s.sliderBarV.alpha = 0;
			s.barVisible = barVisible;
			s.addChild(s.sliderBarV);
			s.sliderBarV.visible = barVisible;

			s.setSize(w, h);
			s.layout(align);
		}

		protected onTouch(e: egret.TouchEvent) {
			let s = this;
			switch (e.type) {
				case egret.TouchEvent.TOUCH_BEGIN:
					s.stage.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
					s.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouch, s);
					s.stPos.x = e.stageX;
					s.stPos.y = e.stageY;
					s.startPos.x = e.stageX - s._contentPos.x;
					s.startPos.y = e.stageY - s._contentPos.y;
					s.hideShow(1);
					s.startTime = egret.getTimer();
					break;
				case egret.TouchEvent.TOUCH_MOVE:
					s.moveDo(e.stageX, e.stageY);
					break;
				case egret.TouchEvent.TOUCH_END:
					s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
					s.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouch, s);
					s.hideShow(0, 100);
					s.timeMove(e.stageX, e.stageY);
					break;
			}
		}

		/**是否可以鼠标控制滚动 在滚动容器为垂直滚动的条件下才生效*/
		public setMouseWheelEnable(value:boolean) {
			let s = this;
			if(s.alignType == Style.VERTICAL) {
				if(s.mouseEnable == value) return;
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
			s.mouseWheelFun = fun.bind(funObj);
			s.canvas.addEventListener(type, s.mouseWheelFun);
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
			if(pos.x >= s.viewPort.x && pos.x <= s.viewPort.x + s.viewPort.width && pos.y >= s.viewPort.y && pos.y <= s.viewPort.y + s.viewPort.height) {
				s.mouseWheelMoveY(evt.deltaY);
				s.hideShow(1);
			} else {
				s.hideShow(0);
			}
		}

		//缓动动画
		protected timeMove(x: number, y: number): void {
			let s = this;
			var time: number = egret.getTimer() - s.startTime;
			if (time < 500) {
				var target: any = s._contentPos;//this._content;
				var maskRect: DisplayObject = s.viewPort;
				Tween.removeTweens(target);
				var dx: number = x - s.stPos.x;
				var dy: number = y - s.stPos.y;
				var distance: number = Math.sqrt(dx * dx + dy * dy);
				var value: number = (distance / time) * 100;
				var tw: Tween = Tween.get(target, { loop:false, onChange:()=>{
					let rect:egret.Rectangle = s._content.scrollRect;
					rect.x = -s._contentPos.x;
					rect.y = -s._contentPos.y;
					s._content.scrollRect = rect;
				}, onChangeObj:s });
				if (this.alignType == Style.VERTICAL) {
					var sign: number = dy > 0 ? 1 : -1;
					value *= sign;
					var h: number = target.y + value;
					if (h > 0 && target.y + value > 0) h = 0;//向下滑动
					if (h < 0 && target.y + value < (maskRect.height - s._content.height)) h = maskRect.height - s._content.height;//向上滑动
					tw.to({ y: h }, 400, Ease.sineOut).call(s.setBarPos, s);
				} else {
					var sign: number = dx > 0 ? 1 : -1;
					value *= sign;
					var w: number = target.x + value;
					if (w > 0 && target.x + value > 0) w = 0;//向右滑动
					if (w < 0 && target.x + value < (maskRect.width - s._content.width)) w = maskRect.width - s._content.width;//向左滑动
					tw.to({ x: w }, 400, Ease.sineOut).call(s.setBarPos, s);
				}
			}
		}

		public set isBarVisible(value) {
			this.barVisible = value;
		}

		protected setBarPos(): void {
			let s = this;
			if(!s.barVisible) return;
			if (s.alignType == Style.VERTICAL)
				s.sliderBarV.y = -s._content.y / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
			else
				s.sliderBarV.x = -s._content.x / (s._content.width - s.viewPort.width) * (s.viewPort.width - s.sliderBarV.width);
		}

		protected hideShow(alpha: number, time: number = 1000): void {
			let s = this;
			if(!s.barVisible) return;
			if(s.sliderBarV.alpha == alpha) return;
			Tween.removeTweens(s.sliderBarV);
			if (alpha == 1) {
				s.sliderBarV.alpha = 1;
			} else {
				var tw: Tween = Tween.get(s.sliderBarV);
				tw.to({ alpha: alpha }, time);
			}
		}

		protected moveDo(x: number, y: number): void {
			let s = this;
			if (s.alignType == Style.VERTICAL) {
				s.canMoveY(y);
			} else if (s.alignType == Style.HORIZONTAL) {
				s.canMoveX(x);
			}
		}

		protected canMoveX(x: number): void {
			let s = this;
			var deltaWidth: number = s.viewPort.width - s._content.width;
			var xx = x - s.startPos.x;
			if (xx > deltaWidth && xx < 0) {
				s._contentPos.x = xx;
				let rect: egret.Rectangle = s._content.scrollRect;
				rect.x = -xx;
				s._content.scrollRect = rect;
				s.sliderBarV.x = -xx / (s._content.width - s.viewPort.width) * (s.viewPort.width - s.sliderBarV.width);
			}
		}

		protected canMoveY(y: number): void {
			let s = this;
			var deltaHeight: number = s.viewPort.height - s._content.height;
			var yy = y - s.startPos.y;
			if (yy > deltaHeight && yy < 0) 
			{
				s._contentPos.y = yy;
				let rect: egret.Rectangle = s._content.scrollRect;
				rect.y = -yy;
				s._content.scrollRect = rect;
				s.sliderBarV.y = -yy / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
			}
		}

		protected mouseWheelMoveY(deltaY:number) {
			let s = this;
			let deltaHeight: number = s.viewPort.height - s._content.height;
			if (deltaHeight < 0) {
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
				s.sliderBarV.y = -yy / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
			}
		}

		protected setScrollRect(): void {
			let s = this;
			if(s._content) {
				s._content.scrollRect = new egret.Rectangle(0, 0, s.width, s.height);
			}
		}

		protected setSliderBarPos(): void {
			let s = this;
			s.sliderBarV.x = s.sliderBarV.y = 0;
			if (s.alignType == Style.VERTICAL) {
				s.sliderBarV.x = s.viewPort.width;// + s.sliderBar.width;
			} else if (s.alignType == Style.HORIZONTAL) {
				s.sliderBarV.y = s.viewPort.height;// - s.sliderBar.height;
			}
		}

		public layout(type:string=Style.VERTICAL, interval: number = 0): void {
			let s = this;
			s.alignType = type;
			if(s.alignType == Style.HORIZONTAL) {
				s.setMouseWheelEnable(false);
			}
			s.setSliderBarPos();
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
			let s = this;
			s.viewPort = LayoutUI.getRect(w, h, Color.white);
			s.addChildAt(s.viewPort, 0);
			s.viewPort.visible = false;
			s.setScrollRect();
			s.setSliderBarPos();
		}

		public set content(value: DisplayObject) {
			let s = this;
			if(s._content == value) return;
			if(s._content && s == s._content.parent) {
				if(s._content instanceof LayoutComponent) s._content.removeFromParent(true);
				else s.removeChild(s._content);
			}
			s._content = value;
			s.addChild(s._content);
			s.setScrollRect();
		}

		public sliderBarSkins(barV:DisplayObject=null, barH:DisplayObject=null) {
			let s = this;			
			if (s.alignType == Style.VERTICAL) {
				if(s.sliderBarV && s.sliderBarV != barV) {
					if(s.contains(s.sliderBarV)) s.removeChild(s.sliderBarV);
				}
				s.sliderBarV = barV;
				if(s.sliderBarV) {
					s.addChild(s.sliderBarV);
				}
			} else if (s.alignType == Style.HORIZONTAL) {
				if(s.sliderBarH && s.sliderBarH != barH) {
					if(s.contains(s.sliderBarV)) s.removeChild(s.sliderBarH);
				}
				s.sliderBarH = barH;
				if(s.sliderBarH) {
					s.addChild(s.sliderBarH);
				}
			}
			s.setSliderBarPos();
		}
	}
}