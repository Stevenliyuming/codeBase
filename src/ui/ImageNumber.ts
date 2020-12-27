module codeBase{
	//图片字体类
	export class ImageNumber extends egret.Sprite {
		private numberImages: egret.Bitmap[] = [];
		private numberImagePool: egret.Bitmap[] = [];
		private numberTexture: any = {};
		/**图片字名称，如：num0、num1等表示0、1两张图，则imageAlias设置为num */
		private imageAlias: string;
		private sheetAlias: string;
		/**显示数值 */
		private numberValue: string;
		/**水平和垂直对齐方式 */
		public verticalAlign: string;
		public horizontalAlign: string;
		/**
		 * imageAlias 单张字体图片命名格式
		 * sheetAlias 全部字体图片的纹理图集
		 * verticalAlign 垂直方向的对齐方式 默认顶部对齐
		 * horizontalAlign 水平方向的对齐方式 默认左边对齐
		 */
		public constructor(imageAlias: string, sheetAlias: string = "", verticalAlign: string = "top", horizontalAlign: string = "left") {
			super();
			let s = this;
			s.imageAlias = imageAlias;
			s.sheetAlias = sheetAlias;
			s.verticalAlign = verticalAlign.toLowerCase();
			s.horizontalAlign = horizontalAlign.toLowerCase();
		}

		public show(pr: egret.DisplayObjectContainer, px: number, py: number, defaultText: string = null) {
			let s = this;
			if (s.parent != pr) {
				pr.addChild(s);
			}
			s.x = px;
			s.y = py;
			s.numberValue = defaultText;
			s.setNumber();
		}

		public set text(value: string) {
			let s = this;
			if (s.numberValue != value) {
				s.numberValue = value;
				s.setNumber();
			}
		}

		public get text() {
			let s = this;
			return s.numberValue;
		}

		private setNumber() {
			let s = this;
			if (s.numberImages.length > 0) {
				for (let i = 0; i < s.numberImages.length; ++i) {
					s.removeChild(s.numberImages[i]);
					s.numberImagePool.push(s.numberImages[i]);
				}
				s.numberImages.length = 0;
			}
			if (s.numberValue && s.numberValue.length > 0) {
				let num = s.numberValue.length;
				let numberBitmap: egret.Bitmap;
				let tex: egret.Texture;
				let name;
				let spriteWidth: number = 0;
				let spriteHeight: number = 0;
				let temp: number = num / 2;//Math.floor(num / 2);
				for (let i = 0; i < num; ++i) {
					name = s.numberValue[i];
					if (s.numberImagePool.length > 0) {
						numberBitmap = s.numberImagePool.pop();
					} else {
						numberBitmap = new egret.Bitmap;
					}
					tex = s.numberTexture[s.imageAlias + name];
					if (!tex) {
						tex = RES.getRes(s.sheetAlias + `.${s.imageAlias + name}`);
					}
					numberBitmap.texture = tex;
					if (numberBitmap) {
						s.addChild(numberBitmap);
						if (s.horizontalAlign == "left") {
							numberBitmap.x = 0 + i * numberBitmap.width;
						} else if (s.horizontalAlign == "center") {
							numberBitmap.x = 0 + (i - temp) * numberBitmap.width;
						} else if (s.horizontalAlign == "right") {
							numberBitmap.x = 0 - (i + 1) * numberBitmap.width;
						}

						if (s.verticalAlign == "top") {
							numberBitmap.y = 0;
						} else if (s.verticalAlign == "middle") {
							numberBitmap.y = 0 - numberBitmap.height / 2;
						} else if (s.verticalAlign == "bottom") {
							numberBitmap.y = 0 - numberBitmap.height;
						}
						s.numberImages.push(numberBitmap);
						spriteWidth += numberBitmap.width;
						spriteHeight = numberBitmap.height;
					}
				}
				s.width = spriteWidth;
				s.height = spriteHeight;
			}
		}
	}
}
