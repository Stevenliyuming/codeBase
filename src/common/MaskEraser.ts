module codeBase{
	/**
	 * 橡皮擦擦除效果 使用此效果比较消耗性能
	 */
	export class MaskEraser extends egret.DisplayObjectContainer {
		private eraserSp: egret.Sprite;
		private reverseMask: egret.Bitmap;
		private renderTexture: egret.RenderTexture;
		private renderTex: egret.RenderTexture;
		private _bitmapMask: egret.Bitmap;
		private _reverseMask: egret.Sprite;
		private eraseImageTexture: egret.Texture;
		private eraseImg: egret.Bitmap;
		private startPoint: egret.Point;
		private movePoint: egret.Point;
		private size: number = 100;

		public constructor(touchAble: boolean = false) {
			super();
			this.touchEnabled = touchAble;
			//this.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		}

		public show(pr: egret.DisplayObjectContainer, px: number, py: number, eraseImg: egret.Texture) {
			let s = this;
			s.eraseImageTexture = eraseImg;
			s.x = px;
			s.y = py;
			pr.addChild(s);
			s.onAddedToStage(null);
		}

		private onAddedToStage(event: egret.Event) {
			let s = this;
			s.eraseImg = new egret.Bitmap(s.eraseImageTexture);
			s.addChild(s.eraseImg);
			s.width = s.eraseImg.width;
			s.height = s.eraseImg.height;

			s.eraserSp = new egret.Sprite;
			s.addChild(s.eraserSp);
			//去除圆角中的黑边
			s.eraserSp.visible = false;

			s.renderTexture = new egret.RenderTexture();
			// 遮罩图
			s._bitmapMask = new egret.Bitmap();
			// 将原来的遮罩图的混合模式设置为擦除
			s._bitmapMask.blendMode = egret.BlendMode.ERASE;
			//绘制一个黑色的Sprite作为反遮罩
			s._reverseMask = new egret.Sprite();
			s._reverseMask.graphics.beginFill(0, 1);
			s._reverseMask.graphics.drawRect(0, 0, s.width, s.height);
			s._reverseMask.graphics.endFill();
			// 把上面的遮罩加进黑色的Sprite作为反遮罩
			s._reverseMask.addChild(s._bitmapMask);
			// 创建一个RenderTexture，把反遮罩绘制上去
			s.renderTex = new egret.RenderTexture();
			s.reverseMask = new egret.Bitmap();
			// 添加反遮罩位图对象
			s.addChild(s.reverseMask);

			if (s.touchEnabled) {
				s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTapBegin, s);
				s.addEventListener(egret.TouchEvent.TOUCH_END, s.onTapEnd, s);
			}
		}

		/** 手指按下开始擦除
		 * px 手指全局x坐标
		 * py 手指全局y坐标
		*/
		public controlStart(px: number, py: number): void {
			let s = this;
			s.startPoint = s.eraserSp.globalToLocal(px, py);
			s.clamErasePoint();
			s.eraserSp.graphics.lineStyle(s.size, 0x0);
			s.eraserSp.graphics.moveTo(s.startPoint.x, s.startPoint.y);
			s.eraserSp.graphics.lineTo(s.startPoint.x, s.startPoint.y);
			s.createReverseMask2();
		}

		/** 跟随手指坐标移动擦除
		 * px 手指全局x坐标
		 * py 手指全局y坐标
		*/
		public controlMove(px: number, py: number): void {
			let s = this;
			if (!s.startPoint) {
				s.controlStart(px, py);
				return;
			}
			s.movePoint = s.eraserSp.globalToLocal(px, py);
			s.clamErasePoint();
			if (s.movePoint.x > (s.eraseImg.x + s.eraseImg.width)
				|| s.movePoint.x < s.eraseImg.x
				|| s.movePoint.y > (s.eraseImg.y + s.eraseImg.height)
				|| s.movePoint.y < s.eraseImg.y)
				return;
			s.eraserSp.graphics.lineTo(s.movePoint.x, s.movePoint.y);
			s.createReverseMask2();
		}

		private onTapBegin(e: egret.TouchEvent): void {
			let s = this;
			s.controlStart(e.stageX, e.stageY);
			if (!s.hasEventListener(egret.TouchEvent.TOUCH_MOVE))
				s.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.mouseMove, s);
		}

		private mouseMove(e: egret.TouchEvent): void {
			let s = this;
			s.controlMove(e.stageX, e.stageY);
		}

		private onTapEnd(e: egret.TouchEvent): void {
			if (this.hasEventListener(egret.TouchEvent.TOUCH_MOVE))
				this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}

		private clamErasePoint() {
			let s = this;
			//开始擦除位置
			if (s.startPoint) {
				if (s.startPoint.x > s.width - s.size / 2) {
					s.startPoint.x = s.width - s.size / 2
				}
				if (s.startPoint.x < s.size / 2) {
					s.startPoint.x = s.size / 2
				}
				if (s.startPoint.y > s.height - s.size / 2) {
					s.startPoint.y = s.height - s.size / 2
				}
				if (s.startPoint.y < s.size / 2) {
					s.startPoint.y = s.size / 2
				}
			}

			//移动擦除位置
			if (s.movePoint) {
				if (s.movePoint.x > s.width - s.size / 2) {
					s.movePoint.x = s.width - s.size / 2
				}
				if (s.movePoint.x < s.size / 2) {
					s.movePoint.x = s.size / 2
				}
				if (s.movePoint.y > s.height - s.size / 2) {
					s.movePoint.y = s.height - s.size / 2
				}
				if (s.movePoint.y < s.size / 2) {
					s.movePoint.y = s.size / 2
				}
			}
		}

		// 创建一个位图的反遮罩
		private rect = new egret.Rectangle;
		private createReverseMask2() {
			let s = this;
			// 遮罩图Texture
			s.rect.setTo(0, 0, s.width, s.height);
			s.renderTexture.drawToTexture(s.eraserSp, s.rect);//new egret.Rectangle(0, 0, s.width, s.height));
			s._bitmapMask.texture = s.renderTexture;
			// RenderTexture，把反遮罩绘制上去
			s.renderTex.drawToTexture(s._reverseMask);
			// 得到最终的反遮罩位图对象
			s.reverseMask.texture = s.renderTex;
			if (!s.mask) {
				s.mask = s.reverseMask;
			}
		}
	}
}