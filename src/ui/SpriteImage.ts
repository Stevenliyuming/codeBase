module codeBase{
	export class SpriteImage extends BaseGroup {
		private bitmap: egret.Bitmap;
		public left: any;
		public right: any;
		public top: any;
		public bottom: any;
		public horizontalCenter: any;
		public verticalCenter: any;

		public constructor() {
			super();
			let self = this;
			self.bitmap = new egret.Bitmap;
			self.addChild(self.bitmap);
		}

		public set texture(value) {
			this.bitmap.texture = value;
		}

		public get texture() {
			return this.bitmap.texture;
		}

		public set width(value) {
			egret.superSetter(SpriteImage, this, "width", value);
			if (this.bitmap) {
				this.bitmap.width = value;
			}
		}

		public get width() {
			if (this.bitmap) {
				return this.bitmap.width;
			}
			return undefined;
		}

		public set height(value) {
			egret.superSetter(SpriteImage, this, "height", value);
			if (this.bitmap) {
				this.bitmap.height = value;
			}
		}

		public get height() {
			if (this.bitmap) {
				return this.bitmap.height;
			}
			return undefined;
		}

		// public get anchorOffsetX(): number {
		// 	return this.bitmap.$anchorOffsetX;
		// }

		// public set anchorOffsetX(value: number) {
		// 	this.bitmap.anchorOffsetX = value;
		// }

		// public get anchorOffsetY(): number {
		// 	return this.bitmap.$anchorOffsetY;
		// }

		// public set anchorOffsetY(value: number) {
		// 	this.bitmap.anchorOffsetY = value;
		// }

		/**
		 * scale9Rectangle : [左边距,右边距,上边距,下边距]
		 * 
		 */
		public scale9Grid(scale9Rectangle: number[] = []) {
			let s = this;
			if (scale9Rectangle.length == 4 && s.bitmap.texture) {
				let x = scale9Rectangle[0];
				let y = scale9Rectangle[2];
				let width = s.bitmap.texture.$getTextureWidth() - (scale9Rectangle[0] + scale9Rectangle[1]);
				let height = s.bitmap.texture.$getTextureHeight() - (scale9Rectangle[2] + scale9Rectangle[3]);
				s.bitmap.scale9Grid = new egret.Rectangle(x, y, width, height);
			}
		}

		/**创建精灵位图
		 * 区别于Bitmap,精灵位图有容器和布局约束的功能
		 * scale9Rectangle : [左边距,右边距,上边距,下边距]
		 */
		public static createImage(texture: egret.Texture, scale9Rectangle: number[] = []): SpriteImage {
			let img = new SpriteImage;
			img.texture = texture;
			img.scale9Grid(scale9Rectangle);
			return img;
		}
	}
}
