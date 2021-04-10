module codeBase {
	/**皮肤 
	 * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆角高
	*/
	export class UISkin {
		/**随机色的矩形与圆 */
		public static get randomRect(): Sprite { return UISkin.getRect(60, 60, UIColor.random) };
		public static get randomCircle(): Sprite { return UISkin.getCircle(50, UIColor.random) };
		// /**默认点 */
		public static get pointNormal(): Sprite { return UISkin.getCircle(6, UIColor.black) };
		public static get pointDown(): Sprite { return UISkin.getCircle(6, UIColor.gray) };
		/**默认按钮 */
		public static get buttonNormal(): Sprite { return UISkin.getRect(60, 60, UIColor.skinNormal) };
		public static get buttonDown(): Sprite { return UISkin.getRect(60, 60, UIColor.skinDown) };
		/**默认单选框 */
		public static get radioOff(): Sprite { return UISkin.getRadioCircle(UIColor.white, UIColor.white) };
		public static get radioOn(): Sprite { return UISkin.getRadioCircle(UIColor.white, UIColor.black, 1) };
		/**默认复选框 */
		public static get checkBoxOff(): Sprite { return UISkin.getCheckBoxRect(UIColor.white, UIColor.white) };
		public static get checkBoxOn(): Sprite { return UISkin.getCheckBoxRect(UIColor.white, UIColor.black, 1) };
		public static get checkBoxDisable(): Sprite { return UISkin.getCheckBoxRect(UIColor.gray, UIColor.white) };
		/**默认开关 */
		public static get switchOff(): Sprite { return UISkin.getSwitch(UIColor.skinNormal, UIColor.white) };
		public static get switchOn(): Sprite { return UISkin.getSwitch(UIColor.skinNormal, UIColor.white, 1) };
		/**默认进度条 */
		public static get progressBackground(): Sprite { return UISkin.getRect(300, 20, UIColor.skinNormal); }
		public static get progressSkin(): Sprite { return UISkin.getRect(300, 20, UIColor.skinDown); }
		/**默认滑动器 */
		public static get sliderBackground(): Sprite { return UISkin.getRect(300, 10, UIColor.skinNormal); }
		public static get sliderSkin(): Sprite { return UISkin.getRect(300, 10, UIColor.skinDown); }
		public static get sliderBar(): Sprite { return UISkin.getCircle(15, UIColor.white); }
		/**默认滚动条 */
		public static get scrollBar(): Sprite { return UISkin.getRect(10, 10, UIColor.skinNormal); }
		/**上下页切换组件 */
		public static get pnBarPrevNormal(): Sprite { return UISkin.getPolygon(3, 20, UIColor.skinNormal, 180); }
		public static get pnBarPrevDown(): Sprite { return UISkin.getPolygon(3, 20, UIColor.skinDown, 180); }
		public static get pnBarNextNormal(): Sprite { return UISkin.getPolygon(3, 20, UIColor.skinNormal); }
		public static get pnBarNextDown(): Sprite { return UISkin.getPolygon(3, 20, UIColor.skinDown); }

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
			var node: Sprite = UISkin.getRoundRect(80, 50, bc, 60, 60);
			node.addChild(UISkin.getCircle(22, gc, type == 0 ? 25 : 55, 25));
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
}