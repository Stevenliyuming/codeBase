module codeBase {
	/**
	 * 带有默认背景的容器
	 * 可以设置裁剪区域
	 */
	export class Group extends BaseGroup {
		/**
		 * 是否显示默认样式 ,
		 * 默认为true,显示.
		 */
		public _showBg: boolean = false;
		/**
		 * 默认背景的颜色
		 */
		private _bgColor: number = 0xCCCCCC;
		/**
		 * 默认背景的显示对象
		 */
		public _bgImage: egret.Bitmap = null;
		private _bgTexture: egret.Texture = null;//背景材质
		//默认背景的显示对象九宫拉伸的设定
		//private _scale9GridEnable: boolean = false;//九宫拉伸生效
		private _scale9GridRect: egret.Rectangle = null;//九宫拉伸的尺寸
		private scale9RectData:number[] = [];
		private _fillMode: string = "scale";//scale, repeat.
		/**
		 * 默认背景是否带边框
		 */
		private _border: boolean = false;
		/**
		 * 是否将子代剪切到视区的边界,
		 * 默认为true,剪切.
		 */
		private _clip: boolean = false;

		//没有像素点时是否能触发事件
		private _touchNonePixel: boolean = false;

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
		}

		/**
		 * 默认样式色块颜色值. 
		 */
		public get bgColor(): number {
			return this._bgColor;
		}

		public set bgColor(value: number) {
			if (this._bgColor != value && this._showBg) {
				this._bgColor = value;
				this._bgTexture = null;
				this.invalidate();
			}
		}

		/**
		 * Sets/gets the fillMode of the scale9Grid bitmap.(scale|repeat)
		 */
		public get fillMode(): string {
			return this._fillMode;
		}
		public set fillMode(value: string) {
			if (this._fillMode != value) {
				this._fillMode = value;
				this.invalidate();
			}
		}

		/**
		 * 设置默认背景是否显示
		 */
		public set showBg(value: boolean) {
			if (this._showBg != value) {
				this._showBg = value;
				//console.log("!!!Group set showDefaultSkin=" + this._showDefaultSkin)
				this.invalidate();
			}
		}
		public get showBg(): boolean {
			return this._showBg;
		}

		/**
		 * 设置剪裁
		 * @param value
		 */
		public set clip(value: boolean) {
			if (value != this._clip) {
				this._clip = value;
				this.invalidate();
			}
		}
		public get clip(): boolean {
			return this._clip;
		}

		/**
		 * 更新显示组件的各项属性,重新绘制显示
		 */
		public draw(): void {
			//console.log("Group draw");
			if (this.width == 0 || this.height == 0) return;
			super.draw();
			//console.log("Group draw this._clip=" + this._clip + ", _showBg=" + this._showBg);
			if (this._clip) {//剪裁
				var rect: egret.Rectangle = ObjectPool.getByClass(egret.Rectangle);
				if (this.scrollRect) {
					ObjectPool.recycleClass(this.scrollRect);
					this.scrollRect = null;
				}
				rect.width = this.width;
				rect.height = this.height;
				rect.x = 0;
				rect.y = 0;
				this.scrollRect = rect;
			} else {
				this.scrollRect = null;
			}

			//console.log("Group draw this._showDefaultSkin=" + this._showDefaultSkin);
			if (this._showBg || (this._touchNonePixel && this.touchEnabled)) {
				this.addDefaultSkin();
				if (this._bgImage) {
					this._bgImage.visible = true;
					if (this._touchNonePixel && !this._showBg) {//如果设置没有像素点能触发事件 并且没有设置默认样式 则设置alpha=0即可
						this._bgImage.alpha = 0;
					} else {
						this._bgImage.alpha = 1;
					}
				}
			} else {
				if (this._bgImage) {
					this._bgImage.visible = false;
					if (this._bgImage.parent) {
						this._bgImage.parent.removeChild(this._bgImage);
					}
				}
			}
		}

        /**
         * 创建背景应用的quad 用于showdefaultskin显示 
         */
		private addDefaultSkin(): void {
			//console.log("Group addDefaultSkin this.width=" + this.width + ", this.height=" + this.height)
			if (this.width > 0 && this.height > 0) {
				if (this._bgImage == null) {
					this._bgImage = new egret.Bitmap();
				}
				if (this._bgTexture == null) {//生成默认材质
					this._bgImage.fillMode = egret.BitmapFillMode.SCALE;//拉伸放大方式铺满
					var shape: egret.Shape = new egret.Shape();
					shape.width = this.width;
					shape.height = this.height;
					shape.graphics.beginFill(this._bgColor, 1);
					shape.graphics.drawRect(0, 0, this.width, this.height);
					shape.graphics.endFill();
					if (this._border) {
						shape.graphics.lineStyle(1, 0x00ff00, 1);
						shape.graphics.drawRect(0, 0, this.width, this.height);
					}
					var renderTexture: egret.RenderTexture = new egret.RenderTexture();
					renderTexture.drawToTexture(shape);
					this._bgTexture = renderTexture;
					this._bgImage.texture = this._bgTexture;
				} else {
					this._bgImage.texture = this._bgTexture;
				}
			}

			if (this._bgImage && (this._showBg || (this._touchNonePixel && this.touchEnabled))) {
				if (!this._bgImage.parent) this.addChildAt(this._bgImage, 0);
				if (this.scale9RectData.length == 4) {
					if(this._scale9GridRect == null) this._scale9GridRect = this.scale9Rect();
					this._scale9GridRect.x = this.scale9RectData[0];
					this._scale9GridRect.y = this.scale9RectData[2];
					this._scale9GridRect.width = this._bgImage.texture.$getTextureWidth() - (this.scale9RectData[0] + this.scale9RectData[1]);
					this._scale9GridRect.height = this._bgImage.texture.$getTextureHeight() - (this.scale9RectData[2] + this.scale9RectData[3]);
					this._bgImage.scale9Grid = this._scale9GridRect;
				} else {
					this._bgImage.scale9Grid = null;
				}
				this._bgImage.width = this.width;
				this._bgImage.height = this.height;
				this._bgImage.fillMode = this._fillMode;
			}
		}

		/**
		 * 默认皮肤的边框显示
		 * true, 显示边框;false,不显示边框.
		 * @param value
		 *
		 */
		public set border(value: boolean) {
			if (this._border != value) {
				this._border = value;
				this.invalidate();
			}
		}
		public get border(): boolean {
			return this._border;
		}

		/**
		 * 获取背景图显示对象
		 * @returns {egret.Bitmap}
		 */
		public getDefaultSkin(): egret.Bitmap {
			return this._bgImage;
		}

		/**
		 * 背景的默认材质
		 * 会取代自动绘制的背景图
		 * @param value
		 */
		public set bgTexture(value: egret.Texture) {
			if (this._bgTexture != value) {
				this._bgTexture = value;
				this.invalidate();
			}
		}
		public get bgTexture(): egret.Texture {
			return this._bgTexture;
		}

		public get touchNonePixel(): boolean {
			return this._touchNonePixel;
		}
		/**
		 * 无像素时是否能触发事件
		 */
		public set touchNonePixel(value: boolean) {
			if (value != this._touchNonePixel) {
				this._touchNonePixel = value;
				this.invalidate();
			}
		}

		/**
		 * scale9Rectangle : [左边距,右边距,上边距,下边距]
		 * 
		 */
		public scale9Grid(scale9RectData: number[] = []) {
			let s = this;
			if (scale9RectData.length == 4) {
				this.scale9RectData = scale9RectData.concat();
			} else {
				this.scale9RectData.length = 0;
			}
			this.invalidate();
		}

		private scale9Rect() {
			let rect = new egret.Rectangle();
			rect.x = 1;
			rect.y = 1;
			rect.width = 1;
			rect.height = 1;
			return rect;
		}
	}
}