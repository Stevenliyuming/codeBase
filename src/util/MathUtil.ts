module codeBase{
	export class MathUtil {
		public static DOUBLE_PI:number = Math.PI * 2;
		public static TRIBLE_PI:number = Math.PI * 3;
		public static HALF_PI:number = Math.PI / 2;
		public static TRIBLE_HALF_PI:number = MathUtil.HALF_PI * 3;
		public static QUATER_PI:number = Math.PI / 4;
		public static QUATER_TRIBLE_PI:number = MathUtil.TRIBLE_PI / 4;
		public static ANGEL_TO_RADIAN = Math.PI / 180;
		public static RADIAN_TO_ANGEL = 180 / Math.PI;

		public constructor() {
		}

		/**范围内获取随机数*/
		public static random(min: number, max: number, fixedNum: number = 0): number {
			var rangeScale = max - min;
			var randomNum = Math.random();
			var num:number = min + randomNum * rangeScale;
			return parseFloat(num.toFixed(fixedNum));
			//return (min + Math.round(Rand * Range));
			//return (min + Math.round(Rand * Range));
		}

		/**
		 * obj:需要修改角度的物体
		 * xy:物体碰到x或者y轴
		 */
		public static changeObjectRotation(obj:egret.DisplayObject, xy: string) {
			let rot:number;
			if (xy == 'x') {
				rot = 360 - obj.rotation;
			} else {
				rot = 180 - obj.rotation;
			}
			//rot += GameUtil.Instance.getRandomNumber(-10, 10);
			//改变物体的移动角度
			obj.rotation = rot;
			// let rad = rot * MathUtil.ANGEL_TO_RADIAN;
			// this.speedX = this.speed * Math.sin(rad);
			// this.speedY = this.speed * Math.cos(rad);
		}

		/**
		 * 面向目标物体方向
		 */
		public static lookTo(obj:egret.DisplayObject, target:egret.DisplayObject) {
			//let p1 = obj.localToGlobal();
			let p2 = target.localToGlobal(target.anchorOffsetX, target.anchorOffsetY);
			p2 = obj.parent.globalToLocal(p2.x, p2.y);
			let radian = Math.atan2(p2.y - obj.y, p2.x - obj.x);
			let angle = radian * MathUtil.RADIAN_TO_ANGEL;
			obj.rotation = angle + 90;
		}

		/**
		 * 面向px、py方向
		 * px、py需要转换成全局坐标
		 */
		public static lookToPosition(obj:egret.DisplayObject, px:number, py:number) {
			let p1 = obj.parent.localToGlobal(obj.x, obj.y);
			//let p2 = target.localToGlobal();
			//p2 = obj.parent.globalToLocal(p2.x, p2.y);
			let radian = Math.atan2(py - p1.y, px - p1.x);
			let angle = radian * MathUtil.RADIAN_TO_ANGEL;
			obj.rotation = angle + 90;
		}

		/**
		 * 格式化旋转角度的值：白鹭对象旋转角度值范围，（0，180）顺时针；（0，-180）逆时针
		 */
		public clampRotation(value): number {
			value %= 360;
			if (value > 180) {
				value -= 360;
			} else if (value < -180) {
				value += 360;
			}
			return value;
		}

		/**计算两点连线的线角度（弧度，正负pi）
		 * @param startX 起点x
		 * @param startY 起点y
		 * @param endX 终点x
		 * @param endY 终点y
		 * */
		public static calculateAngle(startX :number,startY :number, endX :number,endY :number) :number {
			if(endX == startX)
			{
				if(endY == startY)return 0;
				//return (startY > endY ? -MathUtil.HALF_PI:MathUtil.HALF_PI);
			}
			return Math.atan2(endY - startY,endX - startX);
		}

		/**计算两点间的距离*/
		public static distance(aX :number,aY :number,bX :number,bY :number) :number {
			var d1 :number,d2 :number;
			d1 = bY - aY;
			d2 = bX - aX;
			return Math.sqrt(d1 * d1 + d2 * d2);
		}

		/**检测碰撞*/
		public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
			var rect1: egret.Rectangle = obj1.getBounds();
			var rect2: egret.Rectangle = obj2.getBounds();
			rect1.x = obj1.x;
			rect1.y = obj1.y;
			rect2.x = obj2.x;
			rect2.y = obj2.y;
			return rect1.intersects(rect2);
		}

		/**
         * 得到对应角度值的cos近似值
         * @param value {number} 角度值
         * @returns {number} cos值
         */
        public static cos(value:number):number {
			return egret.NumberUtils.cos(value);
        }

		/**
         * 得到对应角度值的sin近似值
         * @param value {number} 角度值
         * @returns {number} sin值
         */
        public static sin(value:number):number {
			return egret.NumberUtils.sin(value);
        }

		/**
         * 根据两点距离,获取xy的步进值
         * @source point 起始位置
         * @source point 结束位置
         * @walkSpeed Number 单帧行走的线速度
         */  
        public static speedXY(source:egret.Point, target:egret.Point, walkSpeed:number):egret.Point {
            var diC:number = egret.Point.distance(source, target);
            var frams:number = Math.floor(Global.FRAME_RATE *diC/walkSpeed) - 1;
            frams = frams<=0?1:frams;
            var ydC:number =  target.y - source.y;
            var xdC:number =  target.x - source.x;
            //console.log("DirectionUtil.speedXY diC=" + diC + ", xdC/frams=" + xdC + "/" + frams + ", ydC/frams=" + ydC + "/" + frams);
            return new egret.Point(Math.round(xdC/frams*100)/100, Math.round(ydC/frams*100)/100);
        }
	}
}