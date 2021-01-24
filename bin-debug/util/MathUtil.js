var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**范围内获取随机数[min, max)
         * min:最小值
         * max:最大值
         * fixedNum:保留的小数位
        */
        MathUtil.random = function (min, max, fixedNum) {
            if (fixedNum === void 0) { fixedNum = 0; }
            if (min >= max)
                return 0;
            var rangeNum = max - min;
            var randomNum = Math.random();
            var num = min + randomNum * rangeNum;
            // console.log(num);
            // var numStr = num.toFixed(fixedNum);//toFixed()函数括号里的值就是要保留的位数，值在0-20之间，在保留一位的同时也会进行四舍五入的计算;math.round()：用于对数进行四舍五入
            // num = parseFloat(numStr);
            // if(fixedNum == 0 && num == max) {//解决四舍五入问题
            // 	num -= 1;
            // }
            // return num;
            return MathUtil.toFixed(num, fixedNum);
        };
        /**
         * 取数字固定的小数点位数
         */
        MathUtil.toFixed = function (n, fixed) {
            // return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
            return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
        };
        /**
         * obj:需要修改角度的物体
         * xy:物体碰到x或者y轴
         */
        MathUtil.changeObjectRotation = function (obj, xy) {
            var rot;
            if (xy == 'x') {
                rot = 360 - obj.rotation;
            }
            else {
                rot = 180 - obj.rotation;
            }
            //rot += GameUtil.Instance.getRandomNumber(-10, 10);
            //改变物体的移动角度
            obj.rotation = rot;
            // let rad = rot * MathUtil.ANGEL_TO_RADIAN;
            // this.speedX = this.speed * Math.sin(rad);
            // this.speedY = this.speed * Math.cos(rad);
        };
        /**
         * 面向目标物体方向
         * target:目标物体
         */
        MathUtil.lookToObject = function (obj, target) {
            //let p1 = obj.localToGlobal();
            var p2 = target.localToGlobal(target.anchorOffsetX, target.anchorOffsetY);
            p2 = obj.parent.globalToLocal(p2.x, p2.y);
            var radian = Math.atan2(p2.y - obj.y, p2.x - obj.x);
            var angle = radian * MathUtil.RADIAN_TO_ANGEL;
            obj.rotation = angle + 90;
        };
        /**
         * 面向px、py代表的点方向
         * px、py需要转换成全局坐标
         */
        MathUtil.lookToPosition = function (obj, px, py) {
            var p1 = obj.parent.localToGlobal(obj.x, obj.y);
            //let p2 = target.localToGlobal();
            //p2 = obj.parent.globalToLocal(p2.x, p2.y);
            var radian = Math.atan2(py - p1.y, px - p1.x);
            var angle = radian * MathUtil.RADIAN_TO_ANGEL;
            obj.rotation = angle + 90;
        };
        /**
         * 格式化旋转角度的值：白鹭对象旋转角度值范围，（0，180）顺时针；（0，-180）逆时针
         */
        MathUtil.prototype.clampRotation = function (value) {
            value %= 360;
            if (value > 180) {
                value -= 360;
            }
            else if (value < -180) {
                value += 360;
            }
            return value;
        };
        /**计算两点连线的线角度（弧度，正负pi）
         * @param startX 起点x
         * @param startY 起点y
         * @param endX 终点x
         * @param endY 终点y
         * */
        MathUtil.calculateAngle = function (startX, startY, endX, endY) {
            if (endX == startX) {
                if (endY == startY)
                    return 0;
                //return (startY > endY ? -MathUtil.HALF_PI:MathUtil.HALF_PI);
            }
            return Math.atan2(endY - startY, endX - startX);
        };
        /**计算两点间的距离*/
        MathUtil.distance = function (aX, aY, bX, bY) {
            var d1, d2;
            d1 = bY - aY;
            d2 = bX - aX;
            return Math.sqrt(d1 * d1 + d2 * d2);
        };
        /**检测碰撞*/
        MathUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        /**
         * 得到对应角度值的cos近似值
         * @param value {number} 角度值
         * @returns {number} cos值
         */
        MathUtil.cos = function (value) {
            return egret.NumberUtils.cos(value);
        };
        /**
         * 得到对应角度值的sin近似值
         * @param value {number} 角度值
         * @returns {number} sin值
         */
        MathUtil.sin = function (value) {
            return egret.NumberUtils.sin(value);
        };
        /**
         * 根据两点距离,获取xy的步进值
         * @source point 起始位置
         * @source point 结束位置
         * @walkSpeed Number 单帧行走的线速度
         */
        MathUtil.speedXY = function (source, target, walkSpeed) {
            var diC = egret.Point.distance(source, target);
            var frams = Math.floor(codeBase.GlobalSetting.FRAME_RATE * diC / walkSpeed) - 1;
            frams = frams <= 0 ? 1 : frams;
            var ydC = target.y - source.y;
            var xdC = target.x - source.x;
            //console.log("DirectionUtil.speedXY diC=" + diC + ", xdC/frams=" + xdC + "/" + frams + ", ydC/frams=" + ydC + "/" + frams);
            return new egret.Point(Math.round(xdC / frams * 100) / 100, Math.round(ydC / frams * 100) / 100);
        };
        MathUtil.DOUBLE_PI = Math.PI * 2;
        MathUtil.TRIBLE_PI = Math.PI * 3;
        MathUtil.HALF_PI = Math.PI / 2;
        MathUtil.TRIBLE_HALF_PI = MathUtil.HALF_PI * 3;
        MathUtil.QUATER_PI = Math.PI / 4;
        MathUtil.QUATER_TRIBLE_PI = MathUtil.TRIBLE_PI / 4;
        MathUtil.ANGEL_TO_RADIAN = Math.PI / 180;
        MathUtil.RADIAN_TO_ANGEL = 180 / Math.PI;
        return MathUtil;
    }());
    codeBase.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "codeBase.MathUtil");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=MathUtil.js.map