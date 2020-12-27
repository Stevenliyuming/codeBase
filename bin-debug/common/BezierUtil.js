var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var BezierUtil = (function () {
        function BezierUtil() {
        }
        /**
         * 利用egret的缓动动画Tween来实现动画
            二次方贝塞尔公式
            起点P0  控制点P1  终点P2
            (1 - t)^2*P0 + 2 t (1 - t)*P1 + t^2*P2
            在1秒内，obj的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
         */
        BezierUtil.bezierMove = function (obj, p0, p1, p2, moveTime, easeType, callFun, funObj) {
            if (moveTime === void 0) { moveTime = 1000; }
            if (easeType === void 0) { easeType = null; }
            if (callFun === void 0) { callFun = null; }
            if (funObj === void 0) { funObj = null; }
            if (!obj["factor"]) {
                obj["factor"] = 0;
            }
            obj["factor"] = 0;
            obj.x = p0.x;
            obj.y = p0.y;
            egret.Tween.get(obj, { onChange: function () {
                    var value = obj.factor;
                    obj.x = (1 - value) * (1 - value) * p0.x + 2 * value * (1 - value) * p1.x + value * value * p2.x;
                    obj.y = (1 - value) * (1 - value) * p0.y + 2 * value * (1 - value) * p1.y + value * value * p2.y;
                }, onChangeObj: obj }).to({ factor: 1 }, moveTime, easeType).call(function () {
                if (callFun && funObj) {
                    callFun.call(funObj, [obj]);
                }
            }, this);
        };
        return BezierUtil;
    }());
    codeBase.BezierUtil = BezierUtil;
    __reflect(BezierUtil.prototype, "codeBase.BezierUtil");
})(codeBase || (codeBase = {}));
