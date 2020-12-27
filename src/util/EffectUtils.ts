module codeBase{
    /**
     * 各种动态效果
     */
    export class EffectUtils {
        /**
         * obj   旋转对象
         * time  旋转一周用时，毫秒
         * loop  循环
         */
        public static rotationEffect(obj:egret.DisplayObject, time: number = 1000, loop:boolean=false): void {
            var onComplete1: Function = function () {
                if (obj != null) {
                    egret.Tween.get(obj, { loop:loop }).to({ rotation: obj.rotation + 360 }, time).call(onComplete1, this);
                }
            };
            onComplete1();
        }

        //抖动对象特效
        //类似ios密码输入错误的特效
        public static shakeObj(obj: egret.DisplayObject, callFun: Function = null, funObj: any = null): void {
            var shakeNum = 80;
            var oldX: number = obj.x;
            var oldY: number = obj.y;
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
                egret.Tween.get(obj).to({ x: oldX }, shakeNum).call(() => {
                    obj.x = oldX;
                    obj.y = oldY;
                    if (callFun && funObj) {
                        callFun.call(funObj);
                    }
                }, this);
            }, this, shakeNum * 5);
        }


        //抖动对象特效
        // 1：抖动  2：震动
        public static shakeScreen(target: egret.DisplayObject, effectType: number = 1, callFun: Function = null, funObj: any = null): void {
            var shakeNum = 40;
            var oldX: number = target.x;
            var oldY: number = target.y;

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
                    egret.Tween.get(target).to({ x: oldX }, shakeNum).call(() => {
                        target.x = oldX;
                        target.y = oldY;
                        if (callFun && funObj) {
                            callFun.call(funObj);
                        }
                    }, this);
                }, this, shakeNum * 5);
            } else {
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
                    egret.Tween.get(target).to({ x: oldX, y: oldY }, shakeNum).call(() => {
                        target.x = oldX;
                        target.y = oldY;
                        if (callFun && funObj) {
                            callFun.call(funObj);
                        }
                    }, this);
                }, this, shakeNum * 6);
            }
        }

        /**
        * 给显示对象增加特效
        * obj           对象
        * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
        */
        public static playEffect(obj: egret.DisplayObject, cartoonType: number = 1, callFun: Function = null, funObj: any = null): void {
            var oldX: number = obj.x;
            var oldY: number = obj.y;
            var onComplete2: Function = function () {
                obj.x = oldX;
                obj.y = oldY;
                if (callFun && funObj) {
                    callFun.call(funObj);
                }
            };
            var onComplete1: Function = function () {
                if (cartoonType == 1) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                } else if (cartoonType == 2) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                } else if (cartoonType == 3) {
                    egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
                }
            };
            egret.Tween.removeTweens(obj);
			obj.scaleX = 1.0;
			obj.scaleY = 1.0;
            egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        }


        /**
        * 给显示对象增加持续放大特效
        * obj  对象
        */
        public static playScaleEffect(obj: egret.DisplayObject): void {
            let self = this;
            var onComplete1: Function = function () {
                if (obj != null) {
                    var onComplete2: Function = function () {
                        obj.scaleX = 1;
                        obj.scaleY = 1;
                        egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self)
                    };
                    obj.alpha = 1;
                    egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self)
                }
            };
            onComplete1();
        }

        /**
        * 显示对象上下浮动特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         浮动高度
        * todo          多个对象跳动
        */
        public static flyObj(obj: egret.DisplayObject, time:number, space: number = 50): void {
            var onComplete1: Function = function () {
                if (obj != null) {
                    var onComplete2: Function = function () {
                        egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        }

        /**
        * 显示对象摇头特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         摇头幅度
        * todo          多个对象摇头
        * 注意：需要将对象的锚点位置：0.5,1
        */
        public static rockObj(obj, time, space: number = 20): void {
            var onComplete1: Function = function () {
                if (obj != null) {
                    var onComplete2: Function = function () {
                        egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                    };
                    egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
                }
            };
            onComplete1();
        }

        /**
        * 文字打字机效果
        * obj           文本对象
        * content       文字
        * interval      打字间隔 毫秒
        */
        // export function typerEffect(obj, content: string = "", interval: number = 200): void {
        //     var strArr: Array<any> = content.split("");
        //     var len: number = strArr.length;
        //     for (var i = 0; i < len; i++) {
        //         egret.setTimeout(function () {
        //             obj.appendText(strArr[Number(this)]);
        //         }, i, interval * i);
        //     }
        // }
    }
}