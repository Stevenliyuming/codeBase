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
		// /**默认点 */
		// public static get pointNormal(): Sprite { return LayoutUI.getCircle(6, Color.black) };
		// public static get pointDown(): Sprite { return LayoutUI.getCircle(6, Color.gray) };
		// /**默认按钮 */
		// public static get buttonNormal(): Sprite { return LayoutUI.getRect(60, 60, Color.skinNormal) };
		// public static get buttonDown(): Sprite { return LayoutUI.getRect(60, 60, Color.skinDown) };
		// /**默认单选框 */
		// public static get radioOff(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.white) };
		// public static get radioOn(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.black, 1) };
		// /**默认复选框 */
		// public static get checkBoxOff(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.white) };
		// public static get checkBoxOn(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.black, 1) };
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

		// /**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
		// public static getCheckBoxRect(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
		// 	var s: Sprite = new Sprite;
		// 	s.addChild(this.getRect(40, 40, bc));
		// 	if (type == 1) {
		// 		var r: Sprite = new Sprite;
		// 		r.graphics.beginFill(gc);
		// 		r.graphics.moveTo(0, 20);
		// 		r.graphics.lineTo(20, 36); r.graphics.lineTo(44, 8); r.graphics.lineTo(36, 0); r.graphics.lineTo(20, 18);
		// 		r.graphics.lineTo(12, 8); r.graphics.lineTo(0, 20);
		// 		s.addChild(r);
		// 	}
		// 	return s;
		// }

		// /**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
		// public static getRadioCircle(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
		// 	var s: Sprite = new Sprite;
		// 	s.addChild(this.getCircle(16, bc, 16, 16));
		// 	s.graphics.lineStyle(1, 0);
		// 	if (type == 1) {
		// 		var r: Sprite = this.getCircle(8, gc, 16, 16)
		// 		s.addChild(r);
		// 	}
		// 	return s;
		// }

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
}