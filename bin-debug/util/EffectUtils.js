var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 各种动态效果
     */
    var EffectUtils = (function () {
        function EffectUtils() {
        }
        /**
         * obj   旋转对象
         * time  旋转一周用时，毫秒
         * loop  循环
         */
        EffectUtils.rotationEffect = function (obj, time, loop) {
            if (time === void 0) { time = 1000; }
            if (loop === void 0) { loop = false; }
            var onComplete1 = function () {
                if (obj != null) {
                    egret.Tween.get(obj, { loop: loop }).to({ rotation: obj.rotation + 360 }, time).call(onComplete1, this);
                }
            };
            onComplete1();
        };
        //抖动对象特效
        //类似ios密码输入错误的特效
        EffectUtils.shakeObj = function (obj, callFun, funObj) {
            if (callFun === void 0) { callFun = null; }
            if (funObj === void 0) { funObj = null; }
            var shakeNum = 80;
            var oldX = obj.x;
            var oldY = obj.y;
            egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: oldX }, shakeNum).call(function () {
                    obj.x = oldX;
                    obj.y = oldY;
                    if (callFun && funObj) {
                        callFun.call(funObj);
                    }
                }, this);
            }, this, shakeNum * 5);
        };
        //抖动对象特效
        // 1：抖动  2：震动
        EffectUtils.shakeScreen = function (target, effectType, callFun, funObj) {
            if (effectType === void 0) { effectType = 1; }
            if (callFun === void 0) { callFun = null; }
            if (funObj === void 0) { funObj = null; }
            var shakeNum = 40;
            var oldX = target.x;
            var oldY = target.y;
            if (effectType == 1) {
                egret.Tween.get(target).to({ x: target.x - 10 }, shakeNum);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x + 20 }, shakeNum);
                }, this, shakeNum * 2);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x - 20 }, shakeNum);
                }, this, shakeNum * 3);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x + 20 }, shakeNum);
                }, this, shakeNum * 4);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: oldX }, shakeNum).call(function () {
                        target.x = oldX;
                        target.y = oldY;
                        if (callFun && funObj) {
                            callFun.call(funObj);
                        }
                    }, this);
                }, this, shakeNum * 5);
            }
            else {
                egret.Tween.get(target).to({ x: target.x - 10, y: target.y }, shakeNum);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x + 20, y: target.y }, shakeNum);
                }, this, shakeNum * 2);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x, y: target.y + 15 }, shakeNum);
                }, this, shakeNum * 3);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x, y: target.y - 20 }, shakeNum);
                }, this, shakeNum * 4);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: target.x, y: target.y + 10 }, shakeNum);
                }, this, shakeNum * 5);
                egret.setTimeout(function () {
                    egret.Tween.get(target).to({ x: oldX, y: oldY }, shakeNum).call(function () {
                        target.x = oldX;
                        target.y = oldY;
                        if (callFun && funObj) {
                            callFun.call(funObj);
                        }
                    }, this);
                }, this, shakeNum * 6);
            }
        };
        /**
        * 给显示对象增加特效
        * obj           对象
        * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
        */
        EffectUtils.playEffect = function (obj, cartoonType, callFun, funObj) {
            if (cartoonType === void 0) { cartoonType = 1; }
            if (callFun === void 0) { callFun = null; }
            if (funObj === void 0) { funObj = null; }
            var oldX = obj.x;
            var oldY = obj.y;
            var onComplete2 = function () {
                obj.x = oldX;
                obj.y = oldY;
                if (callFun && funObj) {
                    callFun.call(funObj);
                }
            };
            var onComplete1 = function () {
                if (cartoonType == 1) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                }
                else if (cartoonType == 2) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                }
                else if (cartoonType == 3) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
                }
            };
            egret.Tween.removeTweens(obj);
            obj.scaleX = 1.0;
            obj.scaleY = 1.0;
            egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        };
        /**
        * 给显示对象增加持续放大特效
        * obj  对象
        */
        EffectUtils.playScaleEffect = function (obj) {
            var self = this;
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        obj.scaleX = 1;
                        obj.scaleY = 1;
                        egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self);
                    };
                    obj.alpha = 1;
                    egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self);
                }
            };
            onComplete1();
        };
        /**
        * 显示对象上下浮动特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         浮动高度
        * todo          多个对象跳动
        */
        EffectUtils.flyObj = function (obj, time, space) {
            if (space === void 0) { space = 50; }
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        };
        /**
        * 显示对象摇头特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         摇头幅度
        * todo          多个对象摇头
        * 注意：需要将对象的锚点位置：0.5,1
        */
        EffectUtils.rockObj = function (obj, time, space) {
            if (space === void 0) { space = 20; }
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        };
        return EffectUtils;
    }());
    codeBase.EffectUtils = EffectUtils;
    __reflect(EffectUtils.prototype, "codeBase.EffectUtils");
})(codeBase || (codeBase = {}));
