module codeBase {
	/**
	 * 为方便使用,简写名称
	 */
	export class TextField extends egret.TextField { };
	export class Sprite extends egret.Sprite { };
	export class Shape extends egret.Shape { };
	export class DisplayObject extends egret.DisplayObject { };
	export class DisplayObjectContainer extends egret.DisplayObjectContainer { };
	export class Point extends egret.Point { };
	export class Rectangle extends egret.Rectangle { };
	export class Bitmap extends egret.Bitmap { };
	export class BitmapData extends egret.BitmapData { };
	export class Stage extends egret.Stage { };
	export class Tween extends egret.Tween { };
	export class Ease extends egret.Ease { };

	export interface ILayout {
		layout(type: string, interval: number): void;
	}

	export interface IOnoff {
		open(): void;
		close(): void;
	}

	/**
	 * 简单的布局
	 */
	export class SimpleLayout {
		/**参数：数组,X轴个数,X轴距离,Y轴距离,X轴位置,Y轴位置,正排/反排 */
		public static displayRank(array: any[], xNum: number = 1, xDis: number = 0, yDis: number = 0, x: number = 0, y: number = 0, sign: number = 1): void {
			var display: egret.DisplayObject;
			for (var i: number = 0; i < array.length; i++) {
				display = array[i];
				display.x = x + Math.floor(i % xNum) * (display.width + xDis) * sign;
				display.y = y + Math.floor(i / xNum) * (display.height + yDis) * sign;
			}
		}
	}
}