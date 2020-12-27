var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var EffectUtil = (function () {
        function EffectUtil() {
        }
        /**
         * 呼吸效果 默认急促
         * @param display
         * @param duration 200
         * @param alphaStart 1
         * @param alphaEnd 1
         * @param range 幅度  0.03
         */
        EffectUtil.breatheEffect = function (display, duration, alphaStart, alphaEnd, range) {
            if (duration === void 0) { duration = 200; }
            if (alphaStart === void 0) { alphaStart = 1; }
            if (alphaEnd === void 0) { alphaEnd = 1; }
            if (range === void 0) { range = 0.03; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = (1 - range); //0.97
            display.scaleY = (1 + range); //1.03
            //开始动态
            var onComplete = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: (1 + range), scaleY: (1.03 + range), alpha: alphaEnd }, duration + 200).to({ scaleX: (1 - range), scaleY: (1 + range), alpha: alphaStart }, duration).call(onComplete, this);
                }
            };
            //开始 1.03 1.06 to 0.97 1.03
            egret.Tween.get(display).to({ scaleX: (1 + range), scaleY: (1.03 + range), alpha: alphaEnd }, duration + 200).to({ scaleX: (1 - range), scaleY: (1 + range), alpha: alphaStart }, duration).call(onComplete, this);
        };
        /**
         *  暂停呼吸效果
         * @param display
         */
        EffectUtil.pauseBreatheEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.anchorX = effectData.oldAnchorX;
                display.anchorY = effectData.oldAnchorY;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 上下弹 很Q的动态 急促
         * @param display
         */
        EffectUtil.upDownEffect = function (display, duration) {
            if (duration === void 0) { duration = 500; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = 0.9;
            display.scaleY = 1.1;
            //开始动态
            var onComplete = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: 1.1, scaleY: 0.9 }, duration).to({ scaleX: 0.9, scaleY: 1.1 }, duration).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ scaleX: 1.1, scaleY: 0.9 }, duration).to({ scaleX: 0.9, scaleY: 1.1 }, duration).call(onComplete, this);
        };
        /**
         *  暂停上下弹 很Q的动态 急促
         * @param display
         */
        EffectUtil.pauseUpDownEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.anchorX = effectData.oldAnchorX;
                display.anchorY = effectData.oldAnchorY;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 气泡的感觉 很Q的动态 缓缓
         * @param display
         */
        EffectUtil.paopaoEffect = function (display, duration) {
            if (duration === void 0) { duration = 1500; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = 0.95;
            display.scaleY = 1.05;
            //开始动态
            var onComplete = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: 1.04, scaleY: 0.96 }, duration).to({ scaleX: 0.95, scaleY: 1.05 }, duration).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ scaleX: 1.04, scaleY: 0.96 }, duration).to({ scaleX: 0.95, scaleY: 1.05 }, duration).call(onComplete, this);
        };
        /**
         *  暂停泡泡效果
         * @param display
         */
        EffectUtil.pausePaopaoEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.anchorX = effectData.oldAnchorX;
                display.anchorY = effectData.oldAnchorY;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 摇摆 摇摆
         * @param display
         */
        EffectUtil.rockEffect = function (display, angle, duration) {
            if (angle === void 0) { angle = 25; }
            if (duration === void 0) { duration = 200; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.rotation = 0;
            //开始动态
            var onComplete = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).wait(2000).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).wait(2000).call(onComplete, this);
        };
        /**
         *  暂停摇摆 摇摆
         * @param display
         */
        EffectUtil.pauseRockEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.anchorX = effectData.oldAnchorX;
                display.anchorY = effectData.oldAnchorY;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.rotation = 0;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 旋转
         * @param display
         * @param direction
         * @param duration
         */
        EffectUtil.rotationEffect = function (display, direction, duration) {
            if (direction === void 0) { direction = 1; }
            if (duration === void 0) { duration = 5000; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.5;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX * display.scaleX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY * display.scaleY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            //开始动态
            if (direction == 1) {
                var onComplete1 = function () {
                    if (effectData.loop) {
                        display.rotation = 0;
                        egret.Tween.get(display).to({ rotation: 360 }, duration).call(onComplete1, this);
                    }
                };
                //开始
                display.rotation = 0;
                egret.Tween.get(display).to({ rotation: 360 }, duration).call(onComplete1, this);
            }
            else if (direction == -1) {
                var onComplete2 = function () {
                    if (effectData.loop) {
                        display.rotation = 0;
                        egret.Tween.get(display).to({ rotation: -360 }, duration).call(onComplete2, this);
                    }
                };
                //开始
                display.rotation = 0;
                egret.Tween.get(display).to({ rotation: -360 }, duration).call(onComplete2, this);
            }
        };
        EffectUtil.pauseRotationEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.anchorX = effectData.oldAnchorX;
                display.anchorY = effectData.oldAnchorY;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.rotation = 0;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 显示对象上线浮动特效
         * obj           对象
         * direction     浮动方向
         * time          浮动时间 毫秒
         * space         浮动高度
         * todo          多个对象跳动
         */
        EffectUtil.flyObjEffect = function (display, duration, space, direction, alphaStart, alphaEnd) {
            if (duration === void 0) { duration = 200; }
            if (space === void 0) { space = 50; }
            if (direction === void 0) { direction = 1; }
            if (alphaStart === void 0) { alphaStart = 1; }
            if (alphaEnd === void 0) { alphaEnd = 1; }
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                EffectUtil.saveOldValue(display, effectData); //记录旧值
                //存储
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            egret.Tween.removeTweens(display);
            if (direction == 1) {
                if (effectData.isPlay == false) {
                    //开始动态
                    var onComplete = function () {
                        if (effectData.loop) {
                            egret.Tween.get(display).to({ y: (effectData.oldY + space), alpha: alphaEnd }, duration).to({ y: (effectData.oldY - space), alpha: alphaStart }, duration).call(onComplete, this);
                        }
                    };
                    egret.Tween.get(display).to({ y: (effectData.oldY + space), alpha: alphaEnd }, duration).to({ y: (effectData.oldY - space), alpha: alphaStart }, duration).call(onComplete, this);
                    effectData.isPlay = false;
                }
            }
            else if (direction == 0) {
                if (effectData.isPlay == false) {
                    //开始动态
                    var onComplete = function () {
                        if (effectData.loop) {
                            egret.Tween.get(display).to({ x: (effectData.oldX + space), alpha: alphaEnd }, duration).to({ x: (effectData.oldX - space), alpha: alphaStart }, duration).call(onComplete, this);
                        }
                    };
                    egret.Tween.get(display).to({ x: (effectData.oldX + space), alpha: alphaEnd }, duration).to({ x: (effectData.oldX - space), alpha: alphaStart }, duration).call(onComplete, this);
                    effectData.isPlay = false;
                }
            }
        };
        EffectUtil.pauseFlyObjEffect = function (display) {
            if (display == null || display == undefined)
                return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.alpha = 1;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        };
        /**
         * 给显示对象增加特效
         * obj           对象
         * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
         */
        EffectUtil.playEffect = function (obj, cartoonType) {
            if (cartoonType === void 0) { cartoonType = 1; }
            if (EffectUtil.isPlayEffectPlay) {
                return;
            }
            EffectUtil.isPlayEffectPlay = true;
            var onComplete2 = function () {
                this.isPlayEffectPlay = false;
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
            egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        };
        EffectUtil.saveOldValue = function (display, effectData) {
            //记录旧值
            effectData.oldX = display.x;
            effectData.oldY = display.y;
            effectData.oldAnchorX = display.anchorX;
            effectData.oldAnchorY = display.anchorY;
            effectData.oldScaleX = display.scaleX;
            effectData.oldScaleY = display.scaleY;
            effectData.oldAlpha = display.alpha;
            effectData.loop = true;
        };
        /**
         * 从大到小 或者从小到大
         * @param display 显示对象
         * @param duration 多久完成该动画
         * @param type 1 从小到大  2 从大到小
         */
        EffectUtil.smallTobig = function (display, duration, type) {
            if (duration === void 0) { duration = 200; }
            if (type === void 0) { type = 1; }
            if (display == null || display == undefined)
                return;
            var effectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new codeBase.EffectData();
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.5;
                effectData.oldX = display.x;
                effectData.oldY = display.y;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX * display.scaleX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY * display.scaleY;
                this.effectDic[display.hashCode] = effectData;
            }
            else {
                effectData = this.effectDic[display.hashCode];
            }
            //AnchorX改变后新的位置
            display.anchorX = effectData.newAnchorX;
            display.anchorY = effectData.newAnchorY;
            display.x = effectData.newX;
            display.y = effectData.newY;
            if (type == 1) {
                display.scaleX = 0;
                display.scaleY = 0;
                egret.Tween.get(display).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            }
            else if (type == 2) {
                display.scaleX = 1;
                display.scaleY = 1;
                egret.Tween.get(display).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backOut);
            }
        };
        EffectUtil.effectDic = {}; //存放当前动画的显示对象 key:display.hashCode  value:EffectData
        EffectUtil.isPlayEffectPlay = false;
        return EffectUtil;
    }());
    codeBase.EffectUtil = EffectUtil;
    __reflect(EffectUtil.prototype, "codeBase.EffectUtil");
})(codeBase || (codeBase = {}));
