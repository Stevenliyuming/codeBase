module codeBase {
    export class Image extends BaseGroup {
        private _bitmap: egret.Bitmap = null;
        private _texture: egret.Texture = null;
        private _autoSize: boolean = true;
        private _scale9GridEnable: boolean = false;
        private _scale9GridRect: egret.Rectangle = null;//九宫拉伸的尺寸
        private scale9RectData: number[] = [];
        private _fillMode: string = "scale";//scale, repeat.
        private _smoothing: boolean = false;

        public constructor(drawDelay: boolean = false) {
            super(drawDelay);
        }

        public createChildren(): void {
            super.createChildren();
            this._bitmap = new egret.Bitmap();
            this.addChild(this._bitmap);
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
         *  Sets/gets the common scaleEnable of the bitmap.
         */
        public get autoSize(): boolean {
            return this._autoSize;
        }
        public set autoSize(value: boolean) {
            if (this._autoSize != value) {
                this._autoSize = value;
                //if (!this._autoSize) {
                //    this.scaleX = 1;
                //    this.scaleY = 1;
                //}
                this.invalidate();
            }
        }

        /**
         * Sets/gets the bitmapData of the bitmap.
         */
        public get texture(): egret.Texture {
            return this._texture;
        }
        public set texture(value: egret.Texture) {
            if (this._texture != value) {
                this._texture = value;
                this.invalidate();
                this.onInvalidatePosition();
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

        /**
         * 图片平滑设置，优化图片拉伸.
         * @param value
         *
         */
        public set smoothing(value: boolean) {
            if (this._smoothing != value) {
                this._smoothing = value;
                this.invalidate();
            }
        }
        public get smoothing(): boolean {
            return this._smoothing;
        }
        
        public draw(): void {
            if (!this._bitmap || this._texture == null) return;
            if (this._bitmap.texture != this._texture) {
                this._bitmap.texture = this._texture;
                this.width = this._bitmap.texture.textureWidth;
                this.height = this._bitmap.texture.textureHeight;
            }
            if (this.scale9RectData.length == 4) {
                if (this._scale9GridRect == null) this._scale9GridRect = this.scale9Rect();
                this._scale9GridRect.x = this.scale9RectData[0];
                this._scale9GridRect.y = this.scale9RectData[2];
                this._scale9GridRect.width = this._bitmap.texture.$getTextureWidth() - (this.scale9RectData[0] + this.scale9RectData[1]);
                this._scale9GridRect.height = this._bitmap.texture.$getTextureHeight() - (this.scale9RectData[2] + this.scale9RectData[3]);
                this._bitmap.scale9Grid = this._scale9GridRect;
                this._bitmap.width = this.width;
                this._bitmap.height = this.height;
            } 
            else {
                this._bitmap.scale9Grid = null;
                if (this._autoSize) {
                    if (this._fillMode != "scale") {
                        this._bitmap.width = this.width;
                        this._bitmap.height = this.height;
                    } else {
                        this._bitmap.scaleX = this.width / this._bitmap.texture.textureWidth;
                        this._bitmap.scaleY = this.height / this._bitmap.texture.textureHeight;
                    }
                } else if (this._texture) {
                    this._bitmap.scaleX = 1;
                    this._bitmap.scaleY = 1;
                    this._bitmap.width = this._texture.textureWidth;
                    this._bitmap.height = this._texture.textureHeight;
                    this.$setWidth(this._texture.textureWidth);
                    this.$setHeight(this._texture.textureHeight);
                    if (this.anchorX != 0 || this.anchorY != 0) {
                        this.anchorOffsetX = this.width * this.anchorX;
                        this.anchorOffsetY = this.height * this.anchorY;
                    }
                }
            }
            this._bitmap.fillMode = this._fillMode;
            // if(this._bitmap.width != this.width) this._bitmap.width = this.width;
            // if(this._bitmap.height != this.height) this._bitmap.height = this.height;
        }

        public getBitmap(): egret.Bitmap {
            return this._bitmap;
        }

        /**
         * 获取xy位置的像素值,xy是舞台值
         * @param x
         * @param y
         */
        public getPixel32(x: number, y: number): Array<number> {
            if (this._bitmap && this._bitmap.texture) {
                var locolPoint: egret.Point = this.globalToLocal(x, y);
                return this._bitmap.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            return [];
        }

        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        public testPixel32(x: number, y: number): boolean {
            var datas: Array<number> = this.getPixel32(x, y);
            for (var i: number = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    return true;
                }
            }
            return false;
        }
    }
}