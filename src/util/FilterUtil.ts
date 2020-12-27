module codeBase{
	export class FilterUtil {
		private glowFilter: egret.GlowFilter = null;
		private static instance:FilterUtil;
		private constructor() {
		}

		public static get getInstance() {
			if(!FilterUtil.instance) {
				FilterUtil.instance = new FilterUtil;
				FilterUtil.instance.init();
			}
			return FilterUtil.instance;
		}

		private init() {
			let s = this;
			s.InitLightFilter();
		}

		private InitLightFilter() {
			var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
			var alpha: number = 0.6;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%
			var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength: number = 6;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255
			var quality: number = egret.BitmapFilterQuality.MEDIUM;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner: boolean = false;          /// 指定发光是否为内侧发光
			var knockout: boolean = false;       /// 指定对象是否具有挖空效果
			this.glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
		}

		/**设置发光滤镜 
		 * alpha:0-1
		 * strength:0-255
		*/
		public setGlowFilter(obj: any, color:number = 0x33CCFF, alpha:number = 0.6, strength:number=6) {
			let s = this;
			s.glowFilter.color = color;
			s.glowFilter.alpha = alpha;
			s.glowFilter.strength = strength;
			obj.filters = [this.glowFilter];
		}

		/**清除滤镜 */
		public cleanFilter(obj) {
			obj.filters = [];
		}

		/**设置对象颜色
		 * color 颜色
		 * alpha:透明度 默认值1
		 */
		public setDisplayColor(display:egret.DisplayObject, color: number, alpha:number=1) {
			// 将16进制颜色分割成rgb值
			let spliceColor = (color) => {
				let result = { r: -1, g: -1, b: -1 };
				result.b = color % 256;
				result.g = Math.floor((color / 256)) % 256;
				result.r = Math.floor((color / 256) / 256);
				return result;
			}
			let result = spliceColor(color);
			//console.log(result);
			let colorMatrix = [
				1, 0, 0, 0, 40,
				0, 1, 0, 0, 10,
				0, 0, 1, 0, 0,
				0, 0, 0, 1, 0
			];
			colorMatrix[0] = result.r / 255;
			colorMatrix[6] = result.g / 255;
			colorMatrix[12] = result.b / 255;
			colorMatrix[18] = alpha;
			let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
			display.filters = [colorFilter];
		}
	}
}