module codeBase {
	export class BaseGroup extends egret.DisplayObjectContainer {
		//是否已加入过显示列表中,可用来判断各组件是否已经具备显示赋值的作用
		private _isAddedToStage: boolean = false;
		private _top: number = NaN;
		private _left: number = NaN;
		private _bottom: number = NaN;
		private _right: number = NaN;
		private _horizontalCenter: number = NaN;
		private _verticalCenter: number = NaN;
		//相对父级的注册点
		protected _registryOffsetX: number = 0;
		protected _registryOffsetY: number = 0;
		//xy自身原点偏移比例
		private _anchorX: number = 0;
		private _anchorY: number = 0;

		//是否重新计算位置布局
		protected _hasInvalidatePosition: boolean = false;
		//延迟绘制
		private _drawDelay: boolean = false;
		//是否下一帧重绘
		private _hasInvalidate: boolean = false;

		public _data: any = null;//可携带的数据
		private _enabled: boolean = true;//不可用状态

		public constructor() {
			super();
			this._drawDelay = false;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			//console.log("this._drawDelay=" + this._drawDelay)
		}

		/**
		 * 第一次加入场景的时候会运行该方法
		 */
		public onAddToStage(event: Event): void {
			this._isAddedToStage = true;
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.createChildren();
			this.initData();
			this.onInvalidatePosition();
			this.invalidate();
			//console.log("222222this._drawDelay=" + this._drawDelay)
		}

		/**
		 * 初始化一些必要的逻辑数据
		 * 这个方法是在第一次加入stage的时候,做调用
		 */
		public initData(): void {
		}

		/**
		 * 初始化主场景的组件
		 * 子类覆写该方法,添加UI逻辑
		 */
		public createChildren(): void {
			this.touchEnabled = false;//默认不接受事件
			//this.setSize(Style.BASEGROUP_WIDTH, Style.BASEGROUP_HEIGHT);
		}

		/**
		 * 覆写width方法,在width改变的时候,做逻辑运算
		 * @param w
		 */
		public set width(w: number) {
			if (w >= 0) {
				super.$setWidth(w);
				if (this._anchorX != 0) this.anchorOffsetX = w * this._anchorX;
				this.onInvalidatePosition();
				this.invalidate();
			}
		}

		public get width(): number {
			return this.$getWidth();
		}

		/**
		 * 覆写height方法,在height改变的时候,做逻辑运算
		 * @param h
		 */
		public set height(h: number) {
			if (h >= 0) {
				super.$setHeight(h);
				if (this._anchorY != 0) this.anchorOffsetY = h * this._anchorY;
				this.onInvalidatePosition();
				this.invalidate();
			}
		}

		public get height(): number {
			return this.$getHeight();
		}

		/**
		 * Moves the component to the specified position.
		 * @param xpos the x position to move the component
		 * @param ypos the y position to move the component
		 */
		public move(xpos: number, ypos: number): void {
			this.x = xpos;
			this.y = ypos;
		}

		/**
		 * Sets the size of the component.
		 * @param w The width of the component.
		 * @param h The height of the component.
		 */
		public setSize(w: number, h: number): void {
			if (this.width != w || this.height != h) {
				this.width = w;
				this.height = h;
				this.onInvalidatePosition();
				this.invalidate();
			}
		}

		///////////////////////////////////
		// 组件相对布局设置
		///////////////////////////////////
		public get top(): number {
			return this._top;
		}
		/**
		 * 设置顶距
		 */
		public set top(value: number) {
			if (this._top != value) {
				this._top = value;
				this.onInvalidatePosition();
			}
		}

		/**
		 * 设置左距
		 */
		public get left(): number {
			return this._left;
		}

		public set left(value: number) {
			if (this._left != value) {
				this._left = value;
				this.onInvalidatePosition();
			}
		}

		public get bottom(): number {
			return this._bottom;
		}
		/**
		 * 设置底距
		 */
		public set bottom(value: number) {
			if (this._bottom != value) {
				this._bottom = value;
				this.onInvalidatePosition();
			}
		}

		public get right(): number {
			return this._right;
		}
		/**
		 * 设置右距
		 */
		public set right(value: number) {
			if (this._right != value) {
				this._right = value;
				this.onInvalidatePosition();
			}
		}

		public get horizontalCenter(): number {
			return this._horizontalCenter;
		}
		/**
		 * 设置水平居中相对位置
		 */
		public set horizontalCenter(value: number) {
			if (this._horizontalCenter != value) {
				this._horizontalCenter = value;
				this.onInvalidatePosition();
			}
		}

		public get verticalCenter(): number {
			return this._verticalCenter;
		}
		/**
		 * 设置竖直居中相对位置
		 */
		public set verticalCenter(value: number) {
			if (this._verticalCenter != value) {
				this._verticalCenter = value;
				this.onInvalidatePosition();
			}
		}

		/**
		 * 设置是否下一帧计算相对位置
		 */
		public onInvalidatePosition(): void {//重新计算布局位置
			//console.log("onInvalidatePosition 000 name=" + this.name);
			//if (this._drawDelay) return;
			let s = this;
			if (!s._hasInvalidatePosition) {
				//console.log("onInvalidatePosition 111 name=" + this.name);
				s._hasInvalidatePosition = true;
				s.addEventListener(egret.Event.ENTER_FRAME, s.resetPosition, s);
				let child: any;
				for (var i: number = 0; i < s.numChildren; i++) {
					child = s.getChildAt(i);
					if (child instanceof BaseGroup) {
						child.onInvalidatePosition();
					}
				}
			}
		}
		/**
		 * 容器相对位置刷新
		 */
		public resetPosition(): void {
			let s = this;
			//console.log("resetPosition name=" + s.name);
			var pr: egret.DisplayObject = s.parent;
			if (pr != null) {
				var parentWidth: number = pr.width;
				var parentHeight: number = pr.height;
				var thisWidth: number = s.width;
				var thisHeight: number = s.height;
				//为了保证得到的宽高是数值型,这里进行了严格的检测
				if (isNaN(parentWidth) || parentHeight == undefined) {
					parentWidth = 0;
				}
				if (isNaN(parentHeight) || parentHeight == undefined) {
					parentHeight = 0;
				}

				if (isNaN(thisWidth) || thisWidth == undefined) {
					thisWidth = 0;
				}
				if (isNaN(thisHeight) || thisHeight == undefined) {
					thisWidth = 0;
				}

				var widthChanged: boolean = false;//宽度有改变
				var heightChanged: boolean = false;//高度有改变
				if (!isNaN(s._top) && isNaN(s._bottom)) {
					s.y = s._top;
				} else if (!isNaN(s._bottom) && isNaN(s._top)) {
					s.y = parentHeight - s._bottom - thisHeight;
				} else if (!isNaN(s._top) && !isNaN(s._bottom)) {
					s.y = s._top;
					thisHeight = parentHeight - s._top - s._bottom;
					if (s.height != thisHeight) {
						s.height = thisHeight;
						heightChanged = true;
					}
				}

				if (!isNaN(s._left) && isNaN(s._right)) {
					s.x = s._left;
				} else if (!isNaN(s._right) && isNaN(s.left)) {
					s.x = parentWidth - s._right - thisWidth;
				} else if (!isNaN(s.left) && !isNaN(s._right)) {
					s.x = s._left;
					thisWidth = parentWidth - s._left - s._right;
					if (s.width != thisWidth) {
						s.width = thisWidth;
						widthChanged = true;
					}
				}

				if (!isNaN(s._horizontalCenter) && !widthChanged) {//宽度有改变的情况下(左右拉伸),水平居中不再生效
					s.x = (parentWidth - thisWidth) / 2 + s._horizontalCenter;
					//console.log("this._horizontalEnabled=" + this._horizontalEnabled + ", x=" + this._x);
				}
				if (!isNaN(s._verticalCenter) && !heightChanged) {//高度有改变的情况下(上下拉伸),竖直居中不再生效
					s.y = (parentHeight - thisHeight) / 2 + s._verticalCenter;
					//console.log("this._verticalEnabled=" + this._verticalEnabled + ", y=" + this._y);
				}

				if (s._registryOffsetX != 0 || s._registryOffsetY != 0) {
					s.x = s._registryOffsetX;
					s.y = s._registryOffsetY;
				}
				
				s.anchorOffsetX = s._anchorX * s.width;
				s.anchorOffsetY = s._anchorY * s.height;

				//改变子级布局
				if (widthChanged || heightChanged) {
					let child: any;
					for (var i: number = 0; i < s.numChildren; i++) {
						child = s.getChildAt(i);
						if (child instanceof BaseGroup)
							child.onInvalidatePosition();
					}
				}
			}
			s.removeEventListener(egret.Event.ENTER_FRAME, s.resetPosition, s);
			s._hasInvalidatePosition = false;
		}

		/**
		 * 可设置的携带数据
		 */
		public get data(): any {
			return this._data;
		}

		public set data(value: any) {
			this._data = value;
		}

		/**
		 * 清理数据
		 */
		public clean(): void {
		}

		/**
		* 设置enabled状态
		* @return
		*/
		public get enabled(): boolean {
			return this._enabled;
		}

		public set enabled(value: boolean) {
			this._enabled = value;
		}

		/**
		 * 中心x位置
		 * @returns {number}
		 */
		public get cx(): number {
			return this.width / 2;
		}
		/**
		 * 中心y位置
		 * @returns {number}
		 */
		public get cy(): number {
			return this.height / 2;
		}

		/**
		 * 从场景中移除对象
		 */
		public removeFromParent(): void {
			if (this.parent) (<egret.DisplayObjectContainer>this.parent).removeChild(this);
		}

		/**
		 * 返回全局x,y值
		 * @returns {egret.Point}
		 */
		public getGlobalXY(): egret.Point {
			var point: egret.Point = new egret.Point(0, 0);
			this.localToGlobal(point.x, point.y, point);
			return point;
		}

		/**
		 * 返回实际宽度
		 * @returns {number}
		 */
		public get actualWidth(): number {
			return this.width * this.scaleX;
		}
		/**
		 * 返回实际高度
		 * @returns {number}
		 */
		public get actualHeight(): number {
			return this.height * this.scaleX;
		}

		/**
		 * 获取注册点相对的偏移像素值
		 * 官方很奇葩,修改了注册点后,子组件竟然不是以改注册点的值作为起始xy的0值
		 * 这里计算出实际的偏移值,供大家使用
		 */
		public getRegPoint(): egret.Point {
			var regPoint: egret.Point = new egret.Point(0, 0);
			if (this.anchorOffsetX != 0) {
				regPoint.x = this.anchorOffsetX;
			}
			if (this.anchorOffsetY != 0) {
				regPoint.y = this.anchorOffsetY;
			}
			return regPoint;
		}

		public invalidate(): void {
			//当前无效标识状态_hasInvalidate为flase(即还没有进行延时绘制)并且没有设置延迟绘制标识_drawDelay
			if (!this._hasInvalidate && !this._drawDelay) {
				//console.log("add invalidate draw")
				this.addEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
				this._hasInvalidate = true;
			}
		}

		/**
		 * 重绘通知
		 */
		public onInvalidate(event: egret.Event): void {
			this.draw();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
			this._hasInvalidate = false;
		}

		public draw(): void {
			//console.log("draw name=" + this.name);
		}

		/**
		 * 设置延迟draw
		 * @param delay
		 */
		public set drawDelay(delay: boolean) {
			//console.log("drawDelay=" + delay)
			this._drawDelay = delay;
			if (this._drawDelay) {
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
				this._hasInvalidate = false;
			} else {
				this.invalidate();
			}
		}

		public get drawDelay(): boolean {
			return this._drawDelay;
		}

		/**
		 * 判断曾经加入过显示列表中
		 * 可以用来判断各属性是否已经准备好显示和使用
		 * @returns {boolean}
		 */
		public get isAddedToStage(): boolean {
			return this._isAddedToStage;
		}


		/**
		 * 设置x原点偏移比例
		 * @param value
		 */
		public set anchorX(value: number) {
			if (this._anchorX != value) {
				this._anchorX = value;
				this.onInvalidatePosition();
			}
		}

		public get anchorX(): number {
			return this._anchorX;
		}

		/**
		 * 设置y原点偏移比例
		 * @param value
		 */
		public set anchorY(value: number) {
			if (this._anchorY != value) {
				this._anchorY = value;
				this.onInvalidatePosition();
			}
		}

		public get anchorY(): number {
			return this._anchorY;
		}

		/**
		 * 设置注册点x偏移值
		 * @param value
		 */
		public set registryOffsetX(value: number) {
			if (this._registryOffsetX != value) {
				this._registryOffsetX = value;
				this.onInvalidatePosition();
			}
		}
		public get registryOffsetX(): number {
			return this._registryOffsetX;
		}

		/**
		 * 设置注册点y偏移值
		 * @param value
		 */
		public set registryOffsetY(value: number) {
			if (this._registryOffsetY != value) {
				this._registryOffsetY = value;
				this.onInvalidatePosition();
			}
		}
		public get registryOffsetY(): number {
			return this._registryOffsetY;
		}
	}
}