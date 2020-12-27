module codeBase{
	export class UICreator {
		public constructor() {
		}

		/**
		 * 根据name关键字创建一个Bitmap对象
		 */
		public static createBitmap(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

        /**创建九宫格图片 */
        public static createScale9Image(name:string, alias:string=null, rect: Rectangle): egret.Bitmap {
            let result = new Scale9Image(name, alias, rect);
			return result;
        }

		/**
         * 获取xy位置的像素值,xy是舞台值
         * @param x
         * @param y
         */
        public getPixel32(target:egret.Bitmap, x:number,y:number ):Array<number> {
            if (target && target.texture){
                var locolPoint:egret.Point = target.globalToLocal(x,y);
                return target.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            return [];
        }

        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        public testPixel32(target:egret.Bitmap, x:number,y:number):boolean {
            var datas:Array<number> = this.getPixel32(target, x, y);
            for(var i:number = 0; i < datas.length; i++){
                if (datas[i] > 0 ) {
                    return true;
                }
            }
            return false;
        }
	}
}