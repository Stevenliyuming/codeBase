var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var TweenEffect = (function () {
        function TweenEffect() {
        }
        /**
         * 设置对象锚点
         * @param object
         * @param anchorX
         * @param anchorY
         */
        TweenEffect.setAnchorXY = function (object, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0.5; }
            if (anchorY === void 0) { anchorY = 0.5; }
            // if(object instanceof BaseGroup) {
            //     object.x += (anchorX - object.anchorX) * object.scaleX * object.width;
            //     object.y += (anchorY - object.anchorY) * object.scaleY * object.height;
            //     object.anchorX = anchorX;
            //     object.anchorY = anchorY;
            // } 
            // else 
            {
                var deltaWidth = anchorX * object.scaleX * object.width;
                var deltaHeight = anchorY * object.scaleY * object.height;
                object.anchorOffsetX = deltaWidth;
                object.anchorOffsetY = deltaHeight;
                object.x += deltaWidth;
                object.y += deltaHeight;
            }
        };
        /**
         * 从小到大
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.magnifyEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.scaleX = object.scaleY = object.alpha = 0;
            var total = total ? total : 300;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 重置元素
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.restoreEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "skewX": 0,
                        "skewY": 0,
                        "scaleX": 1,
                        "scaleY": 1,
                        "rotation": 0
                    }
                }
            ];
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从大到小淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.shrinkEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 0,
                        "scaleY": 0,
                        "alpha": 0
                    }
                }
            ];
            object.scaleX = object.scaleY = object.alpha = 1;
            var total = total ? total : 300;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左右飘动，alpha忽隐忽现
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.flutterEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetX": 1 * object.width
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetX": 1 * object.width
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.anchorOffsetX = object.alpha = 0;
            var total = total ? total : 6000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向右下角轻微缩小，再返回
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.flutterPositionEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.4,
                    "attr": {
                        "anchorOffsetX": -0.3 * object.width,
                        "anchorOffsetY": -0.2 * object.height,
                        "scaleX": 0.9,
                        "scaleY": 0.9,
                        "alpha": 0.7
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "anchorOffsetX": -0.2 * object.width,
                        "anchorOffsetY": -0.1 * object.height,
                        "scaleX": 0.95,
                        "scaleY": 0.95,
                        "alpha": 0.9
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": 0,
                        "anchorOffsetY": 0,
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.anchorOffsetX = object.anchorOffsetY = 0;
            object.scaleX = object.scaleY = object.alpha = 1;
            var total = total ? total : 6000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 淡入
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeInEffect = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            var total = total ? total : 500;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左侧淡入
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeInLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetX = 50;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 右侧淡入
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeInRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetX = -50;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 下侧淡入-上
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeInUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetY = -50;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 下侧淡入-下
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeInDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetY = 50;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeOut = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0,
                    }
                }
            ];
            object.alpha = 1;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左侧淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeOutLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetX": 50
                    }
                }
            ];
            object.alpha = 1;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左侧淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeOutRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetX": -50
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetX = 0;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 下侧淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeOutDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetY": -50
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 下侧淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.fadeOutUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0,
                        "anchorOffsetY": 50
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 800;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左右快速晃动
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.shake = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.22,
                    "attr": {
                        "anchorOffsetX": 0.1 * object.width
                    }
                },
                {
                    "percent": 0.44,
                    "attr": {
                        "anchorOffsetX": -0.1 * object.width
                    }
                },
                {
                    "percent": 0.66,
                    "attr": {
                        "anchorOffsetX": 0.1 * object.width
                    }
                },
                {
                    "percent": 0.88,
                    "attr": {
                        "anchorOffsetX": -0.1 * object.width
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": 0
                    }
                }
            ];
            var total = total ? total : 450;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上压扁
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.skip = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "scaleY": 0.8
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleY": 1.2
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "scaleY": 0.8
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleY": 1
                    }
                }
            ];
            object.scaleY = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向下淡化再复位，最终alpha为透明
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.arrowDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetY": -0.5 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0.3,
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上淡化再复位
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.arrowUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 0.3,
                        "anchorOffsetY": 0.5 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向右淡化再复位
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.arrowRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 0.3,
                        "anchorOffsetX": -0.5 * object.width
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetX = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向左淡化再复位
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.arrowLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 1,
                        "anchorOffsetX": 0.5 * object.width
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0.3,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetX = 0;
            easeFunName = "backIn";
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 忽隐忽现
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.flash = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "alpha": 0.4
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 0.9
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "alpha": 0.2
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 1;
            var total = total ? total : 2000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 忽隐忽现入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.flashIn = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "alpha": 0
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "alpha": 0
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 忽隐忽现退场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.flashOut = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "alpha": 0
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 旋转一周
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotation = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 1000;
            if (easeFunName) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: object.rotation + 360 }, total, easeFun);
        };
        /**
         * 旋转入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationIn = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = object.scaleX = object.scaleY = object.alpha = 0;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: object.rotation + 360, scaleX: 1, scaleY: 1, alpha: 1 }, total, easeFun);
        };
        /**
         * 旋转退场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationOut = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = 0;
            object.scaleX = object.scaleY = object.alpha = 1;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: object.rotation + 360, scaleX: 0, scaleY: 0, alpha: 0 }, total, easeFun);
        };
        /**
         * 从左旋转入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationInLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = 30;
            object.alpha = 0;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: 0, alpha: 1 }, total, easeFun);
        };
        /**
         * 从右旋转入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationInRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = -30;
            object.alpha = 0;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: 0, alpha: 1 }, total, easeFun);
        };
        /**
         * 向左侧旋转淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationOutLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = 0;
            object.alpha = 1;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: 30, alpha: 0 }, total, easeFun);
        };
        /**
         * 向右侧旋转淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationOutRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            total = total ? total : 500;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            object.rotation = 0;
            object.alpha = 1;
            egret.Tween.get(object, { loop: isLoop }).wait(delay).to({ rotation: -30, alpha: 0 }, total, easeFun);
        };
        /**
         * 微微放大晃动再复位
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.scaleOutRock = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.1,
                    "attr": {
                        "scaleY": 0.9,
                        "scaleX": 0.9,
                        "rotation": -3
                    }
                },
                {
                    "percent": 0.2,
                    "attr": {
                        "scaleY": 0.9,
                        "scaleX": 0.9,
                        "rotation": -3
                    }
                },
                {
                    "percent": 0.3,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": 3
                    }
                },
                {
                    "percent": 0.4,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": -3
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": 3
                    }
                },
                {
                    "percent": 0.6,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": -3
                    }
                },
                {
                    "percent": 0.7,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": 3
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "scaleY": 1.1,
                        "scaleX": 1.1,
                        "rotation": 3
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleY": 1,
                        "scaleX": 1,
                        "rotation": 0
                    }
                }
            ];
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 橡皮圈晃动
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rubberBand = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.3,
                    "attr": {
                        "scaleX": 1.25,
                        "scaleY": 0.75
                    }
                },
                {
                    "percent": 0.4,
                    "attr": {
                        "scaleX": 0.75,
                        "scaleY": 1.25
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleX": 1.15,
                        "scaleY": 0.85
                    }
                },
                {
                    "percent": 0.65,
                    "attr": {
                        "scaleX": 0.95,
                        "scaleY": 1.05
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "scaleX": 1.05,
                        "scaleY": 0.95
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1
                    }
                }
            ];
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上侧微弹
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounce = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.4,
                    "attr": {
                        "anchorOffsetY": 0.1 * object.height
                    }
                },
                {
                    "percent": 0.43,
                    "attr": {
                        "anchorOffsetY": 0.2 * object.height
                    }
                },
                {
                    "percent": 0.7,
                    "attr": {
                        "anchorOffsetY": 0.1 * object.height
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "anchorOffsetY": 0
                    }
                },
                {
                    "percent": 0.9,
                    "attr": {
                        "anchorOffsetY": 0.04 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 0 * object.height
                    }
                }
            ];
            object.anchorOffsetY = 0;
            var total = total ? total : 500;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 放大微微晃动
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceIn = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "scaleX": 1.1,
                        "scaleY": 1.1
                    }
                },
                {
                    "percent": 0.4,
                    "attr": {
                        "scaleX": 0.9,
                        "scaleY": 0.9
                    }
                },
                {
                    "percent": 0.6,
                    "attr": {
                        "scaleX": 1.03,
                        "scaleY": 1.03,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "scaleX": 0.97,
                        "scaleY": 0.97
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.scaleX = object.scaleY = 0.3;
            var total = total ? total : 500;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从下侧晃动入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceInDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.6,
                    "attr": {
                        "anchorOffsetY": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "anchorOffsetY": -10,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.9,
                    "attr": {
                        "anchorOffsetY": 5,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 0,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetY = -3000;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从下侧晃动入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceInUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.6,
                    "attr": {
                        "anchorOffsetY": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "anchorOffsetY": -10,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.9,
                    "attr": {
                        "anchorOffsetY": 5,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 0,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetY = 3000;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从左侧晃动入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceInLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.6,
                    "attr": {
                        "anchorOffsetX": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "anchorOffsetX": -10,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.9,
                    "attr": {
                        "anchorOffsetX": 5,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": 0,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetX = -3000;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从右侧晃动入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceInRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.6,
                    "attr": {
                        "anchorOffsetX": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "anchorOffsetX": -10,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.9,
                    "attr": {
                        "anchorOffsetX": 5,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": 0,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.anchorOffsetX = 3000;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 微微放大再缩小淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceOut = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "scaleX": 0.9,
                        "scaleY": 0.9
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleX": 1.1,
                        "scaleY": 1.1
                    }
                },
                {
                    "percent": 0.55,
                    "attr": {
                        "scaleX": 1.1,
                        "scaleY": 1.1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 0.3,
                        "scaleY": 0.3,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = object.scaleX = object.scaleY = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上侧快速出场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceOutUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "anchorOffsetY": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.40,
                    "attr": {
                        "anchorOffsetY": -20,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.45,
                    "attr": {
                        "anchorOffsetY": -20,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 2000,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向下侧快速出场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceOutDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "anchorOffsetY": -10,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.40,
                    "attr": {
                        "anchorOffsetY": 20,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.45,
                    "attr": {
                        "anchorOffsetY": 20,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": -2000,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向左侧快速出场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceOutLeft = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "anchorOffsetX": -25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": 2000,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetX = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向右侧快速出场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.bounceOutRight = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "anchorOffsetX": 25,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetX": -2000,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetX = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 摇摆
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.swing = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.2,
                    "attr": {
                        "rotation": 15
                    }
                },
                {
                    "percent": 0.4,
                    "attr": {
                        "rotation": -10
                    }
                },
                {
                    "percent": 0.6,
                    "attr": {
                        "rotation": 5
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "rotation": -5
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "rotation": 0
                    }
                }
            ];
            object.rotation = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 微微放大到正常
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.scaleIn = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.scaleX = object.scaleY = 1.2;
            var total = total ? total : 500;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 正常到微微放大淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.scaleOut = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1.2,
                        "scaleY": 1.2,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 500;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从大到小入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.scaleInBig = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.alpha = 0;
            object.scaleX = object.scaleY = 3;
            var total = total ? total : 500;
            easeFunName = "quadIn";
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从小到大淡出
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.scaleOutBig = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 3,
                        "scaleY": 3,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 500;
            easeFunName = "quadIn";
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 从右侧斜切入场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rightSpeedIn = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.6,
                    "attr": {
                        "skewX": 20,
                        "alpha": 1,
                        "anchorOffsetX": -0.4 * object.width
                    }
                },
                {
                    "percent": 0.8,
                    "attr": {
                        "skewX": -5,
                        "alpha": 1,
                        "anchorOffsetX": -0.2 * object.width
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "skewX": 0,
                        "alpha": 1,
                        "anchorOffsetX": 0
                    }
                }
            ];
            object.skewX = object.alpha = 0;
            object.anchorOffsetX = -1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 微微放大再复位
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.pluse = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleX": 1.1,
                        "scaleY": 1.1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1
                    }
                }
            ];
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 微微摇摆
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.rotationFlash = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "rotation": 5
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "rotation": -5
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "rotation": 0
                    }
                }
            ];
            object.rotation = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 呼吸效果
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.breath = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.25,
                    "attr": {
                        "scaleX": 0.92,
                        "scaleY": 0.92,
                        "alpha": 0.7
                    }
                },
                {
                    "percent": 0.5,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.75,
                    "attr": {
                        "scaleX": 0.92,
                        "scaleY": 0.92,
                        "alpha": 0.7
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "alpha": 1
                    }
                }
            ];
            object.scaleX = object.scaleY = object.alpha = 1;
            var total = total ? total : 5000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上快速移动再复原
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.shiftUp = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "anchorOffsetY": 1 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向下快速移动再复原
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.shiftDown = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.5,
                    "attr": {
                        "anchorOffsetY": -1 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.anchorOffsetY = 0;
            var total = total ? total : 1000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 向上移动，放大 再复原
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        TweenEffect.jump = function (object, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var attr = [
                {
                    "percent": 0.4,
                    "attr": {
                        "scaleX": 1.1,
                        "scaleY": 0.9,
                        "anchorOffsetY": 0.8 * object.height
                    }
                },
                {
                    "percent": 0.55,
                    "attr": {
                        "scaleX": 1.8,
                        "scaleY": 0.2,
                        "anchorOffsetY": 0.9 * object.height
                    }
                },
                {
                    "percent": 0.65,
                    "attr": {
                        "scaleX": 0.6,
                        "scaleY": 1.4,
                        "anchorOffsetY": 0.3 * object.height
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "anchorOffsetY": 0
                    }
                }
            ];
            object.anchorOffsetY = 0;
            object.scaleX = object.scaleY = 1;
            var total = total ? total : 2000;
            TweenEffect.start(object, attr, delay, total, easeFunName, isLoop);
        };
        /**
         * 左右快速摇摆，暂停
         * @param object
         * @param angle
         * @param dutation
         * @param isLoop
         */
        TweenEffect.rock = function (object, angle, dutation, isLoop) {
            if (angle === void 0) { angle = 25; }
            if (dutation === void 0) { dutation = 200; }
            if (isLoop === void 0) { isLoop = false; }
            var _beginRotation = object.rotation;
            egret.Tween.get(object, { loop: isLoop }).to({ rotation: angle + _beginRotation }, dutation).to({ rotation: _beginRotation }, dutation).to({ rotation: _beginRotation - angle }, dutation)
                .to({ rotation: _beginRotation }, dutation).to({ rotation: angle + _beginRotation }, dutation).to({ rotation: _beginRotation }, dutation).to({ rotation: _beginRotation - angle }, dutation)
                .to({ rotation: _beginRotation }, dutation).wait(2000);
        };
        /**
         * 上下 左右浮动
         * @param object
         * @param duration
         * @param space
         * @param isLoop
         * @param direction 1上下浮动 其他
         */
        TweenEffect.fly = function (object, duration, space, isLoop, direction) {
            if (duration === void 0) { duration = 500; }
            if (space === void 0) { space = 3; }
            if (isLoop === void 0) { isLoop = true; }
            if (direction === void 0) { direction = 1; }
            var _oldX, _oldY;
            _oldX = object.x;
            _oldY = object.y;
            if (direction == 1) {
                egret.Tween.get(object, { loop: isLoop }).to({ y: (_oldY + space) }, duration).to({ y: _oldY }, duration).to({ y: (_oldY - space) }, duration).to({ y: _oldY }, duration);
            }
            else {
                egret.Tween.get(object, { loop: isLoop }).to({ x: (_oldX + space) }, duration).to({ x: _oldX }, duration).to({ x: (_oldX - space) }, duration).to({ x: _oldX }, duration);
            }
        };
        /**
         * 具体的动画实现
         * @param object
         * @param attr
         * @param delay
         * @param total
         * @param easeFunName
         * @param isLoop
         */
        TweenEffect.start = function (object, attr, delay, total, easeFunName, isLoop) {
            if (delay === void 0) { delay = 0; }
            if (total === void 0) { total = 0; }
            if (easeFunName === void 0) { easeFunName = ""; }
            if (isLoop === void 0) { isLoop = false; }
            egret.Tween.removeTweens(object);
            var index = 0;
            var attr = attr;
            var total = total;
            var tweenTime = 0;
            if (codeBase.StringUtil.isUsage(easeFunName)) {
                var easeFun = eval("egret.Ease." + easeFunName);
            }
            else {
                easeFun = null;
            }
            setTimeout(function loop() {
                if (index >= attr.length) {
                    if (isLoop) {
                        index = 0;
                    }
                    else {
                        return;
                    }
                }
                if (index > 0) {
                    tweenTime = (attr[index]["percent"] - attr[index - 1]["percent"]) * total;
                }
                else {
                    tweenTime = attr[index]["percent"] * total;
                }
                egret.Tween.get(object).to(attr[index]["attr"], tweenTime, easeFun).call(loop, this);
                index++;
            }, delay);
        };
        return TweenEffect;
    }());
    codeBase.TweenEffect = TweenEffect;
    __reflect(TweenEffect.prototype, "codeBase.TweenEffect");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=TweenEffect.js.map