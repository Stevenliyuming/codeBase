module codeBase {
	/**
	 * 水平放置的容器
	 */
	export class HGroup extends Group {
		public _gap: number = 0;
		public _hAlign: string = egret.HorizontalAlign.LEFT;
		public _vAlign: string = egret.VerticalAlign.MIDDLE;

		public constructor() {
			super();
		}

		/**
		 * 初始化主场景的组件
		 * 这个方法在对象new的时候就调用,因为有些ui必须在加入stage之前就准备好
		 * 子类覆写该方法,添加UI逻辑
		 */
		public createChildren(): void {
			super.createChildren();
			this.invalidate();
		}

		/**
		 * 设置或获取参与布局元素间水平像素间隔
		 */
		public get gap(): number {
			return this._gap;
		}

		public set gap(value: number) {
			if (this._gap != value) {
				this._gap = value;
				this.invalidate();
			}
		}

		/**
		 * 水平方向布局方式
		 */
		public get hAlign(): string {
			return this._hAlign;
		}

		public set hAlign(value: string) {
			if (this._hAlign != value) {
				this._hAlign = value;
				this.invalidate();
			}
		}
		/**
		 * 垂直方向布局方式
		 */
		public get vAlign(): string {
			return this._vAlign;
		}

		public set vAlign(value: string) {
			if (this._vAlign != value) {
				this._vAlign = value;
				this.invalidate();
			}
		}

		/**
		 * 更新显示组件的各项属性,重新绘制显示
		 */
		public draw(): void {
			super.draw();
			this.updateLayout();
			if (this._showBg) {
				this.addChildAt(this._bgImage, 0)
			}
		}
		//public resetPosition():void{
		//    super.resetPosition();
		//}
		/**
		 * 更新容器水平布局
		 */
		public updateLayout(): void {
			var i: number = 0;
			var child: egret.DisplayObject = null;
			var childLast: egret.DisplayObject = null;
			var wElements: number = 0;
			//console.log("@@@@@HGroup numChildren=" + this.numChildren);
			for (i = 0; i < this.numChildren; i++) {
				if (this.getChildAt(i) != this._bgImage) {
					wElements += this.getChildAt(i).width;
				}
			}
			//console.log("@@@@@HGroup 000 wElements=" + wElements + ", gap=" + this._gap);
			wElements += (this.numChildren - 1) * this._gap;
			//console.log("@@@@@HGroup 1111 wElements=" + wElements + ", gap=" + this._gap);
			var firstChild: boolean = true;
			for (i = 0; i < this.numChildren; i++) {
				child = this.getChildAt(i);
				if (child == this._bgImage) continue;
				if (firstChild) {
					firstChild = false;
					if (this._hAlign == egret.HorizontalAlign.LEFT) {
						child.x = 0;
					} else if (this._hAlign == egret.HorizontalAlign.CENTER) {
						child.x = (this.width - wElements) / 2;
					} else if (this._hAlign == egret.HorizontalAlign.RIGHT) {
						child.x = this.width - wElements;
					}
				} else {
					childLast = this.getChildAt(i - 1);
					child.x = childLast.x + childLast.width + this.gap;
				}
				if (this._vAlign == egret.VerticalAlign.TOP) {
					child.y = 0;
				} else if (this._vAlign == egret.VerticalAlign.MIDDLE) {
					child.y = (this.height - child.height) / 2;
				} else if (this._vAlign == egret.VerticalAlign.BOTTOM) {
					child.y = this.height - child.height;
				}
				//console.log("@@@@@HGroup x=" + child.x + ", y=" + child.y);
			}
		}
	}
}