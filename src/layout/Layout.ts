module codeBase{
	/**
	 * 为方便使用,简写名称
	 */
	export class TextField extends egret.TextField { };
	export class Sprite extends egret.Sprite { };
	export class Shape extends egret.Shape { };
	export class DisplayObject extends egret.DisplayObject { };
	export class DisplayObjectContainer extends egret.DisplayObjectContainer { };
	export class Point extends egret.Point { };
	export class Rectangle extends egret.Rectangle { };
	export class Bitmap extends egret.Bitmap { };
	export class BitmapData extends egret.BitmapData { };
	export class Stage extends egret.Stage { };
	export class Tween extends egret.Tween { };
	export class Ease extends egret.Ease { };

	/**
	 * 布局组件变化事件分发和侦听处理类
	 */
	export class LayoutEvent extends egret.EventDispatcher {
		//button event
		public static readonly MOUSE_OVER: string = "event-over";//移进
		public static readonly MOUSE_OUT: string = "event-out";//移出
		public static readonly MOUSE_DOWN: string = "event-down";//点下
		public static readonly MOUSE_MOVE: string = "event-move";//移动
		public static readonly MOUSE_UP: string = "event-up";//弹开
		public static readonly CLICK: string = "event-click";//单击

		//tabbar event
		public static readonly CHANGE: string = "change";//更换
		public static readonly COMPLETE: string = "complete";//完成
		public static readonly ERROR: string = "error";//错误
		public static readonly RENDER_COMPLETE: string = "render complete";//渲染完成
		public static readonly UPDATE: string = "update";//更新
		public static readonly START: string = "start";//开始
		public static readonly MOVE: string = "move";//移动
		public static readonly OVER: string = "over";//结束
		public static readonly PAUSE: string = "pause";//暂停
		public static readonly STOP: string = "stop";//停止
		public static readonly PLAY: string = "play";//播放
		public static readonly OPEN: string = "open";//开启
		public static readonly CLOSE: string = "close";//关闭

		public currentTarget: Object;
		public type: string;
		public data: Object;
		public dataType: Object;
		public constructor(type: string = "", data: Object = null, currentTarget: Object = null) {
			super();
			this.type = type;
			this.data = data;
			this.currentTarget = currentTarget;
		}
	}

	export class FONT {
		public static fontName: string = "黑体";
	}

	export class LayoutConst {
		/**布局 横版*/
		public static readonly HORIZONTAL: string = "horizontal";
		/**布局 竖版*/
		public static readonly VERTICAL: string = "vertical";

		/**形状 方块*/
		public static readonly SHAPE_RECT: string = "shape rect";
		/**形状 圆角方块*/
		public static readonly SHAPE_RECT_ROUND: string = "shape rect round";
		/**形状 圆块*/
		public static readonly SHAPE_CIRCLE: string = "shape circle";
		/**版本 调试*/
		public static readonly VER_DEBUG: string = "debug";
		/**版本 发布*/
		public static readonly VER_RELEASE: string = "release";
	}

	export interface IItem {
		update(): void;
		addItem(item: DisplayObject): void;
		removeItem(item: DisplayObject): void;
		hasItem(index: number): boolean;
		getItem(index: number): DisplayObject;
		getNextItem(): DisplayObject;
		reset(): void;
	}

	export interface ILayout {
		layout(type: string, interval: number): void;
	}

	export interface IOnoff {
		open(): void;
		close(): void;
	}

	/**颜色 */
	export class Color {
		public static get random(): number { return Math.random() * 0XFFFFFF };
		public static get white(): number { return 0XFFFFFF };
		public static get black(): number { return 0X000000 };
		public static get gray(): number { return 0X666666 };
		public static get red(): number { return 0XFF0000 };
		public static get green(): number { return 0X00FF00 };
		public static get bule(): number { return 0X0000FF };
		public static get skinNormal(): number { return 0X15191C };
		public static get skinDown(): number { return 0X999999 };
		public static get titleBackground(): number { return 0X20262B };
		public static getRandomArray(count: number): number[] {
			var colors: number[] = [];
			for (var i: number = 0; i < count; i++) colors.push(Math.random() * 0XFFFFFF);
			return colors;
		};
		/** 可改变颜色的亮暗,value值是-255到255*/
		public static lightenDarkenColor(color: number, value: number): number {
			var r = (color >> 16) + value;
			if (r > 255) r = 255;
			else if (r < 0) r = 0;
			var b = ((color >> 8) & 0x00FF) + value;
			if (b > 255) b = 255;
			else if (b < 0) b = 0;
			var g = (color & 0x0000FF) + value;
			if (g > 255) g = 255;
			else if (g < 0) g = 0;
			return (g | (b << 8) | (r << 16));
		}
	}

	/**皮肤 */
	export class Skin {
		/**随机色的矩形与圆 */
		public static get randomRect(): Sprite { return LayoutUI.getRect(60, 60, Color.random) };
		public static get randomCircle(): Sprite { return LayoutUI.getCircle(50, Color.random) };
		/**默认点 */
		public static get pointNormal(): Sprite { return LayoutUI.getCircle(6, Color.black) };
		public static get pointDown(): Sprite { return LayoutUI.getCircle(6, Color.gray) };
		/**默认按钮 */
		public static get buttonNormal(): Sprite { return LayoutUI.getRect(60, 60, Color.skinNormal) };
		public static get buttonDown(): Sprite { return LayoutUI.getRect(60, 60, Color.skinDown) };
		/**默认单选框 */
		public static get radioOff(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.white) };
		public static get radioOn(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.black, 1) };
		/**默认复选框 */
		public static get checkBoxOff(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.white) };
		public static get checkBoxOn(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.black, 1) };
		/**默认开关 */
		public static get switchOff(): Sprite { return LayoutUI.getSwitch(Color.skinNormal, Color.white) };
		public static get switchOn(): Sprite { return LayoutUI.getSwitch(Color.skinNormal, Color.white, 1) };
		/**默认进度条 */
		public static get progressBackground(): Sprite { return LayoutUI.getRect(300, 20, Color.skinNormal); }
		public static get progressValue(): Sprite { return LayoutUI.getRect(300, 20, Color.skinDown); }
		/**默认滑动器 */
		public static get sliderBackground(): Sprite { return LayoutUI.getRect(300, 10, Color.skinNormal); }
		public static get sliderValue(): Sprite { return LayoutUI.getRect(300, 10, Color.skinDown); }
		public static get sliderBar(): Sprite { return LayoutUI.getCircle(15, Color.white); }
		/**默认滚动条 */
		public static get scrollBar(): Sprite { return LayoutUI.getRect(10, 10, Color.skinNormal); }
		/**上下页切换组件 */
		public static get pnBarPrevNormal(): Sprite { return LayoutUI.getPolygon(3, 20, Color.skinNormal, 180); }
		public static get pnBarPrevDown(): Sprite { return LayoutUI.getPolygon(3, 20, Color.skinDown, 180); }
		public static get pnBarNextNormal(): Sprite { return LayoutUI.getPolygon(3, 20, Color.skinNormal); }
		public static get pnBarNextDown(): Sprite { return LayoutUI.getPolygon(3, 20, Color.skinDown); }

		public static getRodatioButton(label: string): BasicButton {
			var btn: BasicButton = new BasicButton(Skin.radioOff, Skin.radioOn);
			btn.skinAutoScale = false;
			btn.label = label;
			btn.labelColor = Color.black;
			btn.setLabelPoint(40, 0);
			return btn;
		}

		public static getCheckBox(label: string): MoreSkinButton {
			var skins: any[] = [Skin.checkBoxOff, Skin.checkBoxOff, Skin.checkBoxOn, Skin.checkBoxOn]
			var btn: MoreSkinButton = new MoreSkinButton(skins);
			btn.skinAutoScale = false;
			btn.label = label;
			btn.toggleSwitch = true;
			btn.labelColor = Color.black;
			btn.setLabelPoint(50, 2);
			return btn;
		}
	}

	/**
	 * 简单的布局
	 */
	export class SimpleLayout {
		/**参数：数组,X轴个数,X轴距离,Y轴距离,X轴位置,Y轴位置,正排/反排 */
		public static displayRank(array: any[], xNum: number = 1, xDis: number = 0, yDis: number = 0, x: number = 0, y: number = 0, sign: number = 1): void {
			var display: egret.DisplayObject;
			for (var i: number = 0; i < array.length; i++) {
				display = array[i];
				display.x = x + Math.floor(i % xNum) * (display.width + xDis) * sign;
				display.y = y + Math.floor(i / xNum) * (display.height + yDis) * sign;
			}
		}
	}

	/**
	 * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆角高
	 */
	export class LayoutUI {
		/**得到矩形框*/
		public static getLineRect(w: number, h: number, c: number = 0, s: number = 1, x: number = 0, y: number = 0): Sprite {
			var node: Sprite = new Sprite();
			node.graphics.lineStyle(s, c);
			node.graphics.drawRect(x, y, w, h);
			node.graphics.endFill();
			return node;
		}

		/**得到圆形框*/
		public static getLineCircle(r: number, c: number = 0, s: number = 1, x: number = 0, y: number = 0): Sprite {
			var node: Sprite = new Sprite();
			node.graphics.lineStyle(s, c);
			node.graphics.drawCircle(x, y, r);
			node.graphics.endFill();
			return node;
		}

		/**得到渐变矩形 a为角度偏移率0,0.5,1,2分别为四个正方向*/
		public static getMatrixRect(w: number, h: number, c1: number = 0, c2: number = 0, a: number = 0): Sprite {
			var node = new Sprite();
			var matrix = new egret.Matrix();
			matrix.createGradientBox(w, h, Math.PI * a, 0, 0);
			node.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
			node.graphics.drawRect(0, 0, w, h);
			node.graphics.endFill();
			return node;
		}

		/**得到矩形*/
		public static getRect(w: number, h: number, c: number = 0, x: number = 0, y: number = 0): Sprite {
			var s: Sprite = new Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRect(x, y, w, h);
			s.graphics.endFill();
			return s;
		}

		/**得到矩形中间带一个X*/
		public static getRectAndX(w: number, h: number, c: number = 0, x: number = 0, y: number = 0): Sprite {
			var s: Sprite = this.getRect(w, h, c, x, y)
			s.addChild(this.getX(w, h, c, 1, x, y));
			return s;
		}

		/**得到一个X*/
		public static getX(w: number, h: number, c: number = 0, s: number = 1, x: number = 0, y: number = 0): Sprite {
			var container: Sprite = new Sprite;
			var l1: Sprite = new Sprite;
			l1.graphics.lineStyle(s, c);
			l1.graphics.moveTo(0, 0);
			l1.graphics.lineTo(w, h);
			var l2: Sprite = new Sprite;
			l2.graphics.lineStyle(s, c);
			l2.graphics.moveTo(w, 0);
			l2.graphics.lineTo(0, h);
			container.addChild(l1);
			container.addChild(l2);
			return container;
		}

		/**得到圆角矩形*/
		public static getRoundRect(w: number, h: number, c: number = 0, ew: number = 5, eh: number = 5, x: number = 0, y: number = 0): Sprite {
			var s: Sprite = new Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRoundRect(x, y, w, h, ew, eh);
			s.graphics.endFill();
			return s;
		}

		/**得到圆形*/
		public static getCircle(r: number, c: number = 0, x: number = 0, y: number = 0): Sprite {
			var s: Sprite = new Sprite();
			s.graphics.beginFill(c);
			s.graphics.drawCircle(x, y, r);
			s.graphics.endFill();
			return s;
		}

		/**得到多边形,side边数,rotation角度*/
		public static getPolygon(side: number = 3, r: number = 10, c: number = 0, rotation: number = 0): Sprite {
			var s: Sprite = new Sprite;
			s.rotation = rotation;
			s.graphics.beginFill(c);
			for (var i: number = 0; i <= side; i++) {
				var lineX: number = Math.cos((i * (360 / side) * Math.PI / 180)) * r;
				var lineY: number = Math.sin((i * (360 / side) * Math.PI / 180)) * r;
				if (i == 0) s.graphics.moveTo(lineX, lineY);
				else s.graphics.lineTo(lineX, lineY);
			}
			s.graphics.endFill();
			return s;
		}

		/**得到圆角矩形与三角形合体rc是正方形颜色,pc是三角形颜色*/
		public static getArrowRoundRect(w: number, h: number, rc: number, pc: number = 0, rotation: number = 0): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getRoundRect(w, h, rc));
			var p: Sprite = this.getPolygon(3, w / 3, pc, 30 + rotation);
			p.x = s.width >> 1; p.y = s.height >> 1;
			s.addChild(p);
			return s;
		}

		/**得到滚动条的bar*/
		public static getScrollLineBar(w: number, h: number, c: number): Sprite {
			var s: Sprite = new Sprite;
			var _h: number = h / 3;
			for (var i: number = 0; i < 3; i++) {
				var r: Sprite = this.getRect(w, 1, c, 0, i * _h);
				s.addChild(r);
			}
			return s;
		}

		/**得到圆角矩形-加*/
		public static getAddRoundRect(w: number, h: number, c: number): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getRoundRect(w, h, c));
			var r1: Sprite = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
			var r2: Sprite = this.getRect(2, h / 2, 0, w / 2 - 1, h / 4);
			s.addChild(r1);
			s.addChild(r2);
			return s;
		}

		/**得到圆角矩形-减*/
		public static getRemoveRoundRect(w: number, h: number, c: number): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getRoundRect(w, h, c));
			var r: Sprite = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
			s.addChild(r);
			return s;
		}

		/**得到带文字的圆角方形*/
		public static getRoundRectText(w: number, h: number, c: number, str: string = "click"): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getRoundRect(w, h, c));
			var text: TextField = new TextField;
			text.name = "text";
			text.text = str;
			text.x = (s.width - text.width) >> 1;
			text.y = (s.height - text.height) >> 1;
			s.addChild(text);
			return s;
		}

		/**得到矩形-switchButton bc背景颜色，gc钩选的颜色,type为0是没有钩 为1是有钩*/
		public static getSwitch(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
			var node: Sprite = LayoutUI.getRoundRect(80, 50, bc, 60, 60);
			node.addChild(LayoutUI.getCircle(22, gc, type == 0 ? 25 : 55, 25));
			return node;
		}

		/**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
		public static getCheckBoxRect(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getRect(40, 40, bc));
			if (type == 1) {
				var r: Sprite = new Sprite;
				r.graphics.beginFill(gc);
				r.graphics.moveTo(0, 20);
				r.graphics.lineTo(20, 36); r.graphics.lineTo(44, 8); r.graphics.lineTo(36, 0); r.graphics.lineTo(20, 18);
				r.graphics.lineTo(12, 8); r.graphics.lineTo(0, 20);
				s.addChild(r);
			}
			return s;
		}

		/**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
		public static getRadioCircle(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
			var s: Sprite = new Sprite;
			s.addChild(this.getCircle(16, bc, 16, 16));
			s.graphics.lineStyle(1, 0);
			if (type == 1) {
				var r: Sprite = this.getCircle(8, gc, 16, 16)
				s.addChild(r);
			}
			return s;
		}

		/**得到矩形-网格
		 * rect.x是x轴数量
		 * rect.y是y轴数量
		 * rect.width是网格宽
		 * rect.height是网格高
		 * lc网格线颜色
		 * */
		public static getGridding(rect: Rectangle, c: number = 0): Sprite {
			var s: Sprite = new Sprite;
			s.graphics.lineStyle(0.1, c);
			var disx: number = rect.width / rect.x;
			var disy: number = rect.height / rect.y;
			for (var i: number = 0; i < rect.x; i++) {
				s.graphics.moveTo(0, i * disy);
				s.graphics.lineTo(rect.width, i * disy);
			}
			for (i = 0; i < rect.y; i++) {
				s.graphics.moveTo(i * disx, 0);
				s.graphics.lineTo(i * disx, rect.height);
			}
			return s;
		}

		/***得到爱心 */
		public static getHeart(r: number = 15, c: number = 0XFF0000): Sprite {
			var s: Sprite = new Sprite;
			s.graphics.beginFill(c);
			s.graphics.moveTo(0, 0);
			s.graphics.lineTo(0, -r * 2)
			s.graphics.cubicCurveTo(r, -r * 2.5, r * 2, -r * 1.5, 0, 0);
			s.graphics.moveTo(0, 0);
			s.graphics.lineTo(0, -r * 2)
			s.graphics.cubicCurveTo(-r, -r * 2.5, -r * 2, -r * 1.5, 0, 0);
			s.graphics.endFill();
			s.anchorOffsetX = -s.width / 2;
			s.anchorOffsetY = -s.height;
			return s;
		}
	}

	export class LayoutSprite extends Sprite {
		private _type: string = LayoutConst.SHAPE_RECT;
		private _color: number = 0;
		private _data: any;
		private _hasBg: boolean;
		private display: Sprite;
		private bg: Sprite;
		public constructor() {
			super();
			this.display = new Sprite;
			this.bg = new Sprite;
		}

		set type(value: string) { this._type = value }
		get type(): string { return this._type }

		set color(value: number) { this._color = value; this._data.c = value; this.draw(); }
		get color(): number { return this._color }

		/**{w:1,h:1,r:1,c:1,ew:1,eh:1} */
		set data(value: Object) { this._data = value; this.draw(); }

		protected draw(): void {
			let s = this;
			s._color = s._data.c;
			s.display.graphics.clear();
			s.display = s.getDisplay(s._data);
			s.addChild(s.display);
			s.setPosition();
		}

		protected setPosition(): void {
			let s = this;
			if (s._hasBg && s.type != LayoutConst.SHAPE_CIRCLE) {
				s.display.x = (s.bg.width - s.display.width) >> 1;
				s.display.y = (s.bg.height - s.display.height) >> 1;
			}
		}

		public setBackground(color: number, side: number = 1) {
			let s = this;
			s._hasBg = true;
			var d: any = s._data;
			var o: any = {};
			for (var i in d) {
				o[i] = d[i];
			}
			o.c = color;
			if (o.w) o.w = o.w + side * 2;
			if (o.h) o.h = o.h + side * 2;
			if (o.r) o.r = o.r + side;
			s.bg.graphics.clear();
			s.bg = s.getDisplay(o);
			s.addChildAt(s.bg, 0);
			s.setPosition();
		}

		protected getDisplay(o: any): Sprite {
			switch (this.type) {
				case LayoutConst.SHAPE_RECT:
					return LayoutUI.getRect(o.w, o.h, o.c);
				case LayoutConst.SHAPE_RECT_ROUND:
					return LayoutUI.getRoundRect(o.w, o.h, o.c, o.ew, o.eh);
				case LayoutConst.SHAPE_CIRCLE:
					return LayoutUI.getCircle(o.r, o.c);
			}
		}
	}

	export class LayoutContainer extends DisplayObjectContainer {
		private dataEvent: Object = new Object;
		protected stageWidth: number;
		protected stageHeight: number;
		public constructor() {
			super();
			this.init();
			this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
		}

		private addToStage(): void {
			this.render();
		}

		/**加载到舞台之前调用 */
		protected init(): void {

		}

		/**加载到舞台之后调用 */
		protected render(): void {
			let s = this;
			s.stageWidth = s.stage.stageWidth;
			s.stageHeight = s.stage.stageHeight;
		}

		/**分发事件*/
		public dispEvent(type: string, data: Object = null, dataType: Object = null): void {
			if (this.dataEvent) {
				var fun: Function = this.dataEvent[type] as Function;
				if (fun != null) {
					var layoutEvent: LayoutEvent = new LayoutEvent;
					layoutEvent.currentTarget = this;
					layoutEvent.data = data;
					layoutEvent.type = type;
					layoutEvent.dataType = dataType;
					if (fun["this"]) {
						(<Function>fun).apply(fun["this"], [layoutEvent]);
					} else {
						fun(layoutEvent)
					}
				}
			}
		}

		/**帧听事件*/
		public addEvent(type: string, listener: Function, thisObj: any = null): void {
			let s = this;
			if (s.dataEvent && s.dataEvent[type] == null) {
				listener["this"] = thisObj
				s.dataEvent[type] = listener;
			}
		}

		/**删除事件*/
		public removeEvent(type: string, listener: Function): void {
			let s = this;
			if (s.dataEvent && s.dataEvent[type]) {
				delete s.dataEvent[type];
			}
		}

		/**把自己从父级删除*/
		public removeFromParent(value: boolean = false): void {
			let s = this;
			let _parent: DisplayObjectContainer = this.parent as DisplayObjectContainer;
			if (value) s.dispose();
			if (_parent && _parent.contains(s)) _parent.removeChild(s);
			_parent = null;
		}

		/**删除所有的*/
		public removeChildAll(dispose: boolean = false): void {
			while (this.numChildren > 0) {
				this.removeChildIndex(0, dispose);
			}
		}

		/**删除index层的*/
		public removeChildIndex(index: number, dispose: boolean): void {
			let s = this;
			if (index >= 0 || index < s.numChildren) {
				let basicContent:any = s.getChildAt(index);
				if (basicContent instanceof LayoutContainer) {
					basicContent.removeFromParent(dispose);
				} else {
					let display: DisplayObject = this.getChildAt(index) as DisplayObject;
					if (display.parent) display.parent.removeChild(display);
				}
			}
		}

		/**销毁*/
		public dispose(): void {
			let s = this;
			s.removeChildAll(true);
			s.dataEvent = null;
			s.stageWidth = null;
			s.stageHeight = null;
		}
	}

	/**基本按钮： 正常、按下状态 */
	export class BasicButton extends LayoutContainer implements IOnoff {
		protected statusNormal: DisplayObject;
		protected statusDown: DisplayObject;
		protected skinContainer: DisplayObjectContainer;
		protected text: TextField;
		/**皮肤大小随字体大小变化 */
		public skinAutoScale: boolean = true;

		public constructor(normal: DisplayObject = null, down: DisplayObject = null) {
			super();
			let s = this;
			s.statusNormal = normal || Skin.buttonNormal;
			s.statusDown = down || Skin.buttonDown;
			s.skinContainer = new DisplayObjectContainer;
			s.addChild(s.skinContainer);
			//s.skinContainer.addChild(normal);
			//s.skinContainer.addChild(down);
			s.updateSkin(s.statusNormal);
			s.text = (new TextLabel).textField;
			s.addChild(s.text);

			this.open();
		}

		public open(): void {
			let s = this;
			s.close();
			s.touchEnabled = true;
			s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
			s.setGray(false);
		}

		public close(): void {
			let s = this;
			s.touchEnabled = false;
			s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
			if (s.stage) s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
		}

		public closeAndSetGray(): void {
			let s = this;
			s.close();
			s.setGray(true);
		}

		public setLabelPoint(x: number, y: number): void {
			let s = this;
			// s.text.anchorOffsetX = 0;
			// s.text.anchorOffsetY = 0;
			s.text.x = x; 
			s.text.y = y;
		}

		set labelCircle(value: string) {
			let s = this;
			s.text.text = value;
			s.skinAutoScale = false;
			s.text.x = s.text.y = 0;
			s.text.anchorOffsetX = s.text.textWidth >> 1;
			s.text.anchorOffsetY = s.text.textHeight >> 1;
		}

		set labelColor(value: number) {
			this.text.textColor = value;
		}

		set label(value: string) {
			let s = this;
			s.text.text = value;
			//var width: number = this.text.width + 20;
			s.setSkinSize();
			s.setTextPosition();
		}

		get label(): string {
			return this.text.text;
		}

		get textFild(): TextField {
			return this.text;
		}

		/**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
		public setTextFlow(textFlow: egret.ITextElement[]): void {
			let s = this;
			s.text.textFlow = textFlow;
			s.setSkinSize();
			s.setTextPosition();
		}

		public setSkinNormal(): void {
			let s = this;
			s.updateSkin(s.statusNormal);
		}

		public setSkinDown(): void {
			let s = this;
			s.updateSkin(s.statusDown);
		}

		protected onTouch(e: egret.TouchEvent): void {
			let s = this;
			if (!s.stage) return;
			if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
				s.stage.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
				s.updateSkin(s.statusDown);
				s.dispEvent(LayoutEvent.CLICK);
			} else {
				s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
				s.updateSkin(s.statusNormal);
			}
		}

		protected get textWidth(): number {
			return this.text.width + 20;
		}

		protected get textHeight(): number {
			return this.text.height + 20;
		}

		protected setSkinSize(): void {
			let s = this;
			if (s.skinAutoScale && s.text.text != "") {
				var scale: number = s.textWidth / s.statusNormal.width;
				if (s.statusNormal instanceof Bitmap) {
					s.statusNormal.width = s.textWidth;
					s.statusDown.width = s.textWidth;
				} else {
					s.statusNormal.scaleX = s.statusDown.scaleX = scale;
				}
				var height: number = s.textHeight;
				if (height >= s.statusNormal.height) {
					scale = height / s.statusNormal.height;
					if (s.statusNormal instanceof Bitmap) {
						s.statusNormal.height = s.textHeight;
						s.statusDown.height = s.textHeight;
					} else {
						s.statusNormal.scaleY = s.statusDown.scaleY = scale;
					}
				}
			}
		}

		protected setTextPosition(): void {
			let s = this;
			s.text.anchorOffsetX = s.text.width >> 1;
			s.text.anchorOffsetY = s.text.height >> 1;
			if (s.textWidth > s.statusNormal.width) s.text.x = s.textWidth >> 1;
			else s.text.x = s.statusNormal.width >> 1;
			if (s.textHeight > s.statusNormal.height) s.text.y = s.textHeight >> 1;
			else s.text.y = s.statusNormal.height >> 1;
		}

		protected updateSkin(skin: DisplayObject): void {
			let s = this;
			// skin.visible=true;
			// skin == s.statusDown? s.statusNormal.visible=false:s.statusDown.visible=false;
			s.skinContainer.removeChildren();
			s.skinContainer.addChild(skin);
		}

		/**设置可示对象是否为灰色 */
		public setGray(isGray: boolean): void {
			if (isGray) {
				this.filters = [new egret.ColorMatrixFilter([
					0.3, 0.6, 0.08, 0, 0,
					0.3, 0.6, 0.08, 0, 0,
					0.3, 0.6, 0.08, 0, 0,
					0, 0, 0, 1, 0])
				]
			} else {
				this.filters = [];
			}
		}

		public dispose(): void {
			super.dispose();
			this.close();
		}
	}

	/**多个皮肤按钮,构造函数的参数必须大于2个且必须是2的次方
	 * 使用四个皮肤就可以模拟ToggleSwitch
	*/
	export class MoreSkinButton extends BasicButton {
		protected _currentPage: number = 0;
		protected skins: any[] = [];
		protected _toggleSwitch: boolean = false;

		public constructor(skins: any[]) {
			super(skins[0], skins[1]);
			this.skins = skins;
		}

		/**更新到第几个按钮同时刷新皮肤 */
		public updatePage(value: number) {
			let s = this;
			s.currentPage = value;
			s.setSkinNormal();
		}

		set currentPage(value: number) {
			let s = this;
			value = value * 2 == s.skins.length ? 0 : value;
			s._currentPage = value;
			s.statusNormal = s.skins[value * 2];
			s.statusDown = s.skins[(value * 2) + 1];
			s.setSkinSize();
		}

		get currentPage(): number {
			return this._currentPage;
		}

		set toggleSwitch(value: boolean) {
			this._toggleSwitch = value;
		}

		protected onTouch(e: egret.TouchEvent): void {
			let s = this;
			if (e.type == egret.TouchEvent.TOUCH_END) {
				if (s._toggleSwitch) {
					s.currentPage = 1 - s.currentPage;
				}
			}
			super.onTouch(e);
		}
	}

	export class SwitchButton extends MoreSkinButton {
		public constructor() {
			var normal: Sprite = Skin.switchOn;
			var down: Sprite = Skin.switchOn;
			var normal2: Sprite = Skin.switchOff;
			var down2: Sprite = Skin.switchOff;
			var skins: any = [normal, down, normal2, down2];
			super(skins);
			this.toggleSwitch = true;
		}
	}

	export class TextLabel extends LayoutContainer {
		private _textFiled: TextField;
		public constructor(str: string = "", c: number = 0XFFFFFF) {
			super();
			this._textFiled = new TextField;
			this._textFiled.textAlign = egret.HorizontalAlign.LEFT;
			this._textFiled.verticalAlign = egret.VerticalAlign.MIDDLE;
			this._textFiled.text = str;
			this._textFiled.textColor = c;
			this._textFiled.fontFamily = FONT.fontName;
			this.addChild(this._textFiled);
		}
		set text(value) {
			this._textFiled.text = value;
		}
		get textField(): TextField {
			return this._textFiled;
		}
	}

	export class BasicView extends LayoutContainer {
		protected createText(x: number = 0, y: number = 0, s: string = ""): TextField {
			var text: TextField = (new TextLabel).textField;
			text.x = x; text.y = y; text.text = s;
			this.addChild(text);
			return text;
		}
		protected createRect(w: number, h: number, c: number = 0, x: number = 0, y: number = 0): Sprite {
			var sprite: Sprite = LayoutUI.getRect(w, h, c, x, y);
			this.addChild(sprite);
			return sprite;
		}
		protected createCircle(r: number, c: number = 0, x: number = 0, y: number = 0): Sprite {
			var sprite: Sprite = LayoutUI.getCircle(r, c, x, y);
			this.addChild(sprite);
			return sprite;
		}
		protected createRectBySprite(s: Sprite, w: number, h: number, c: number = 0, x: number = 0, y: number = 0): void {
			s.graphics.clear();
			s.graphics.beginFill(c);
			s.graphics.drawRect(x, y, w, h);
			s.graphics.endFill();
		}
		/**创建纯色背景 */
		protected createBackground(c: number = 0, a: number = 1): Sprite {
			var s: Sprite = this.createRect(this.stageWidth, this.stageHeight, c);
			s.alpha = a; 
			s.touchEnabled = true;//用于阻止下层点击事件
			return s;
		}
		/**创建渐变色背景 */
		protected createBgGradientFill(c1: number = 0X017AC3, c2: number = 0XDDDDDD): Sprite {
			var w: number = this.stageWidth;
			var h: number = this.stageHeight;
			var matrix: egret.Matrix = new egret.Matrix();
			matrix.createGradientBox(w, h, Math.PI / 2);
			var sprite: Sprite = new Sprite;
			sprite.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
			sprite.graphics.drawRect(0, 0, w, h);
			this.addChild(sprite);
			return sprite;
		}
	}

	/**基础的组件类*/
	export class BasicComponent extends BasicView implements IItem, ILayout {
		protected items: any[] = [];
		protected index: number = 0;
		public addItem(item: DisplayObject): void {
			this.items.push(item);
		}
		public removeItem(item: DisplayObject): void {
			let s = this;
			var index: number = s.items.indexOf(item);
			if (index >= 0) s.items.splice(index, 1);
		}
		public hasItem(index: number): boolean {
			let s = this;
			return s.items.length > 0 && (index >= 0 && index < s.items.length);
		}
		public getItem(index: number): DisplayObject {
			return this.items[index];
		}
		public getNextItem(): DisplayObject {
			return this.items[this.index++];
		}
		public getIndexByItem(item: DisplayObject): number {
			return this.items.indexOf(item);
		}
		public reset(): void {
			this.index = 0;
		}
		public update(): void {
		}
		/**布局 type类型为横向或纵向，interval为对象间的间隔*/
		public layout(type: string = LayoutConst.VERTICAL, interval: number = 10): void {
			let s = this;
			let item: DisplayObject;
			let num = s.items.length;
			for (let i = 0; i < num; i++) {
				item = s.items[i];
				if (type == LayoutConst.VERTICAL) {
					item.y = (item.height + interval) * i;
				} else {
					item.x = (item.width + interval) * i;
				}
			}
		}
		/**销毁*/
		public dispose(): void {
			let s = this;
			s.reset();
			let item: DisplayObject;
			while (s.hasItem(s.index)) {
				item = s.getItem(s.index);
				s.removeItem(item);
				if (item instanceof LayoutContainer) {
					item.removeFromParent(true);
				}
			}
		}
	}

	/**提示警告框 手动关闭*/
	export class AlertBar extends BasicComponent {
		protected bg: LayoutSprite;
		protected bgColor: number;
		protected text: TextField;
		public constructor(title: string = "提示或警告") {
			super();
			this.bgColor = Color.gray;
			this.text = (new TextLabel).textField;
			this.text.text = title;
		}
		/**加载到舞台之后调用 */
		protected render(): void {
			super.render();
			this.initView();
		}
		protected initView(): void {
			var node: Sprite = this.createBackground(0, 0.3);

			var tw: number = this.text.width;
			var th: number = this.text.height;
			var w: number = tw + 80;
			var h: number = th + 120;
			var x: number = (this.stageWidth - w) >> 1;
			var y: number = (this.stageHeight - h) >> 1;
			this.bg = new LayoutSprite;
			this.bg.type = LayoutConst.SHAPE_RECT_ROUND;
			this.bg.data = { w: w, h: h, c: this.bgColor, ew: 10, eh: 10 };
			this.bg.setBackground(0, 2);
			this.bg.x = x; this.bg.y = y;
			this.addChild(this.bg);

			var btn: BasicButton = new BasicButton;
			btn.label = "确 定";
			this.bg.addChild(btn);
			btn.x = (w - btn.width) >> 1;
			btn.y = this.text.y + th + 40;
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

			this.text.x = x + ((w - tw) >> 1);
			this.text.y = y + 20;
			this.addChild(this.text);
		}
		private onClick(e: egret.TouchEvent): void {
			this.removeFromParent(true);
			this.dispEvent(LayoutEvent.CLOSE);
		}
		/**设置背景色 */
		set color(value: number) {
			this.bgColor = value;
			if (this.bg) this.bg.color = value;
		};
		public dispose(): void {
			super.dispose();
			this.bg = null;
			this.bgColor = null;
			this.text = null;
		}
	}

	/**提示警告框 自动关闭*/
	export class AlertAutoBar extends AlertBar {
		private time: number;
		public constructor(title: string = "提示或警告", closeTime: number = 3) {
			super(title);
			this.time = closeTime;
		}
		protected initView(): void {
			var tw: number = this.text.width;
			var th: number = this.text.height;
			var w: number = tw + 20;
			var h: number = th + 20;
			var x: number = (this.stageWidth - w) >> 1;
			var y: number = (this.stageHeight - h) >> 1;
			this.bg = new LayoutSprite;
			this.bg.type = LayoutConst.SHAPE_RECT_ROUND;
			this.bg.data = { w: w, h: h, c: this.bgColor, ew: 10, eh: 10 };
			this.bg.setBackground(0, 2);
			this.bg.x = x; this.bg.y = y;
			this.addChild(this.bg);

			this.text.x = x + ((w - tw) >> 1);
			this.text.y = y + ((h - th) >> 1);
			this.addChild(this.text);
			this.alpha = 0;
			var ty = this.y - 50;
			Tween.get(this).to({ alpha: 1 }, 500).wait(this.time * 1000).to({ alpha: 0, y: ty }, 500).call(this.backCall, this);
		}
		private backCall(): void {
			Tween.removeTweens(this);
			this.removeFromParent(true);
			this.time = null;
			this.dispEvent(LayoutEvent.CLOSE);
		}
		public dispose(): void {
			super.dispose();
			Tween.removeTweens(this);
		}
	}

	/**提示警告框 滚动显示*/
	export class AlertRollBar extends AlertBar {
		private bgWidth: number;
		public constructor(title: string = "提示或警告", bgWidth: number = 200) {
			super(title);
			this.bgWidth = bgWidth;
		}
		protected initView(): void {
			var tw: number = this.text.width;
			var th: number = this.text.height;
			var w: number = this.bgWidth;
			var h: number = th + 20;
			var x: number = (this.stageWidth - w) >> 1;
			var y: number = 100;
			this.bg = new LayoutSprite;
			this.bg.type = LayoutConst.SHAPE_RECT;
			this.bg.data = { w: w, h: h, c: this.bgColor };
			this.bg.x = x; this.bg.y = y;
			this.addChild(this.bg);
			var m: Sprite = LayoutUI.getRect(w, h, 0, x, y);
			this.addChild(m)
			this.bg.mask = m;


			this.text.x = w;
			this.text.y = 10;
			this.bg.addChild(this.text);
			var time: number = 2000 + this.text.text.length * 100;
			var tx: number = -tw;
			Tween.get(this.text).to({ x: tx }, time).call(this.backCall, this);
		}
		private backCall(): void {
			Tween.removeTweens(this);
			Tween.removeTweens(this.text);
			this.removeFromParent(true);
			this.bgWidth = null;
			this.dispEvent(LayoutEvent.CLOSE);
		}
	}

	/**复选框按钮 */
	export class CheckBoxBar extends BasicComponent {
		public addItemLabel(label: string, item: MoreSkinButton = null): void {
			if (item == null) item = Skin.getCheckBox(label);
			else item.label = label;
			this.addItem(item)
		}

		public addItem(item: BasicButton): void {
			super.addItem(item);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.addChild(item);
		}

		public removeItem(item: BasicButton): void {
			super.removeItem(item);
			item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			item.removeFromParent(true);
		}

		protected onClick(e: egret.TouchEvent): void {
			var item: MoreSkinButton = e.currentTarget as MoreSkinButton;
			this.dispEvent(LayoutEvent.CHANGE);
		}

		public get selectIndexs(): number[] {
			var nums: number[] = [];
			for (var i: number = 0; i < this.items.length; i++) {
				var btn: MoreSkinButton = this.items[i] as MoreSkinButton;
				if (btn.currentPage == 1) nums.push(i);
			}
			return nums;
		}
	}

	/**单选框按钮 */
	export class RadioButtonBar extends CheckBoxBar {
		protected _selectIndex: number;
		public isAutoLayout: boolean = false;

		public addItemLabel(label: string, item: BasicButton = null): void {
			if (item == null) item = Skin.getRodatioButton(label);
			else item.label = label;
			this.addItem(item)
		}

		protected render(): void {
			this.update();
		}

		public update(): void {
			var item: BasicButton;
			if (this.isAutoLayout == true) {
				for (var i: number = 0; i < this.items.length; i++) {
					item = this.items[i];
					item.x = (item.width + 10) * i;
				}
			}
		}

		protected onClick(e: egret.TouchEvent): void {
			var item: BasicButton = e.currentTarget as BasicButton;
			this.selectIndex = this.items.indexOf(item);
			this.dispEvent(LayoutEvent.CHANGE);
		}

		set selectIndex(index: number) {
			this._selectIndex = index;
			var item: BasicButton = this.items[index];
			this.items.map(setSkinNormal, this);
			function setSkinNormal(i: BasicButton): void {
				i.setSkinNormal();
			}
			item.setSkinDown();
		}

		get selectIndex() {
			return this._selectIndex;
		}
	}

	/**选项栏组件 */
	export class TabbarBar extends CheckBoxBar {
		protected _selectIndex: number = 0;
		protected onClick(e: egret.TouchEvent): void {
			var curr: MoreSkinButton = e.currentTarget as MoreSkinButton;
			this.selectItem(curr)
		}
		protected selectItem(curr: MoreSkinButton): void {
			this.reset();
			while (this.hasItem(this.index)) {
				var item: MoreSkinButton = this.getNextItem() as MoreSkinButton;
				item.currentPage = 0;
				item.setSkinNormal();
				item.open();
			}
			if (curr) {
				curr.close();
				curr.currentPage = 1;
				curr.setSkinNormal();
				this._selectIndex = this.items.indexOf(curr);
				this.dispEvent(LayoutEvent.CHANGE, this._selectIndex);
			}
		}
		set selectIndex(value: number) { this._selectIndex = value, this.selectItem(this.getItem(value) as MoreSkinButton) }
		get selectIndex(): number { return this._selectIndex }
	}
}