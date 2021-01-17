module codeBase {
    export class EffectUtil {
        //存放当前动画的显示对象 key:display.hashCode  value:EffectData
        private static effectDic: Object = {};
        /**
         * 呼吸效果 默认急促
         * @param display
         * @param duration 200
         * @param alphaStart 1
         * @param alphaEnd 1
         * @param range 幅度  0.03
         */
        public static breatheEffect(display: egret.DisplayObject, duration: number = 200, alphaStart: number = 1, alphaEnd: number = 1, range: number = 0.03): void {
            if (display == null || display == undefined) return;

            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //Anchor改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = (1 - range);//0.97
            display.scaleY = (1 + range);//1.03
            //开始动态
            var onComplete: Function = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: (1 + range), scaleY: (1.03 + range), alpha: alphaEnd }, duration + 200).to({ scaleX: (1 - range), scaleY: (1 + range), alpha: alphaStart }, duration).call(onComplete, this);
                }
            };
            //开始 1.03 1.06 to 0.97 1.03
            egret.Tween.get(display).to({ scaleX: (1 + range), scaleY: (1.03 + range), alpha: alphaEnd }, duration + 200).to({ scaleX: (1 - range), scaleY: (1 + range), alpha: alphaStart }, duration).call(onComplete, this);
        }
        /**
         *  暂停呼吸效果
         * @param display
         */
        public static pauseBreatheEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                // if(display instanceof BaseGroup) {
                //     display.anchorX = effectData.oldAnchorX;
                //     display.anchorY = effectData.oldAnchorY;
                // } 
                // else 
                {
                    display.anchorOffsetX = effectData.oldAnchorX;
                    display.anchorOffsetY = effectData.oldAnchorY;
                }
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 上下弹 很Q的动态 急促
         * @param display
         */
        public static upDownEffect(display: egret.DisplayObject, duration: number = 500): void {
            if (display == null || display == undefined) return;
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //Anchor改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = 0.9;
            display.scaleY = 1.1;
            //开始动态
            var onComplete: Function = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: 1.1, scaleY: 0.9 }, duration).to({ scaleX: 0.9, scaleY: 1.1 }, duration).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ scaleX: 1.1, scaleY: 0.9 }, duration).to({ scaleX: 0.9, scaleY: 1.1 }, duration).call(onComplete, this);
        }
        /**
         *  暂停上下弹 很Q的动态 急促
         * @param display
         */
        public static pauseUpDownEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                // if(display instanceof BaseGroup) {
                //     display.anchorX = effectData.oldAnchorX;
                //     display.anchorY = effectData.oldAnchorY;
                // } 
                // else 
                {
                    display.anchorOffsetX = effectData.oldAnchorX;
                    display.anchorOffsetY = effectData.oldAnchorY;
                }
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 气泡的感觉 很Q的动态 缓缓
         * @param display
         */
        public static paopaoEffect(display: egret.DisplayObject, duration: number = 1500): void {
            if (display == null || display == undefined) return;
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.scaleX = 0.95;
            display.scaleY = 1.05;
            //开始动态
            var onComplete: Function = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ scaleX: 1.04, scaleY: 0.96 }, duration).to({ scaleX: 0.95, scaleY: 1.05 }, duration).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ scaleX: 1.04, scaleY: 0.96 }, duration).to({ scaleX: 0.95, scaleY: 1.05 }, duration).call(onComplete, this);
        }
        /**
         *  暂停泡泡效果
         * @param display
         */
        public static pausePaopaoEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                // if(display instanceof BaseGroup) {
                //     display.anchorX = effectData.oldAnchorX;
                //     display.anchorY = effectData.oldAnchorY;
                // } 
                // else 
                {
                    display.anchorOffsetX = effectData.oldAnchorX;
                    display.anchorOffsetY = effectData.oldAnchorY;
                }
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 摇摆 摇摆
         * @param display
         */
        public static rockEffect(display: egret.DisplayObject, angle: number = 25, duration: number = 200): void {
            if (display == null || display == undefined) return;

            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.8;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            display.rotation = 0;
            //开始动态
            var onComplete: Function = function () {
                if (effectData.loop) {
                    egret.Tween.get(display).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).wait(2000).call(onComplete, this);
                }
            };
            //开始
            egret.Tween.get(display).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration).to({ rotation: angle }, duration).to({ rotation: 0 }, duration).to({ rotation: -angle }, duration).to({ rotation: 0 }, duration)
                .wait(2000).call(onComplete, this);
        }
        /**
         *  暂停摇摆 摇摆
         * @param display
         */
        public static pauseRockEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                // if(display instanceof BaseGroup) {
                //     display.anchorX = effectData.oldAnchorX;
                //     display.anchorY = effectData.oldAnchorY;
                // } 
                // else 
                {
                    display.anchorOffsetX = effectData.oldAnchorX;
                    display.anchorOffsetY = effectData.oldAnchorY;
                }
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.rotation = 0;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 旋转
         * @param display
         * @param direction
         * @param duration
         */
        public static rotationEffect(display: egret.DisplayObject, direction: number = 1, duration: number = 5000): void {
            if (display == null || display == undefined) return;
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.5;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX * display.scaleX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY * display.scaleY;
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            //AnchorX改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            //开始动态
            if (direction == 1) {
                var onComplete1: Function = function () {
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
                var onComplete2: Function = function () {
                    if (effectData.loop) {
                        display.rotation = 0;
                        egret.Tween.get(display).to({ rotation: -360 }, duration).call(onComplete2, this);
                    }
                };
                //开始
                display.rotation = 0;
                egret.Tween.get(display).to({ rotation: -360 }, duration).call(onComplete2, this);
            }

        }
        public static pauseRotationEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                // if(display instanceof BaseGroup) {
                //     display.anchorX = effectData.oldAnchorX;
                //     display.anchorY = effectData.oldAnchorY;
                // } 
                // else 
                {
                    display.anchorOffsetX = effectData.oldAnchorX;
                    display.anchorOffsetY = effectData.oldAnchorY;
                }
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.rotation = 0;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 显示对象上线浮动特效
         * obj           对象
         * direction     浮动方向
         * time          浮动时间 毫秒
         * space         浮动高度
         * todo          多个对象跳动
         */
        public static flyObjEffect(display: egret.DisplayObject, duration: number = 200, space: number = 50, direction: number = 1, alphaStart: number = 1, alphaEnd: number = 1): void {
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                //存储
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
                effectData.loop = true;
            }
            egret.Tween.removeTweens(display);
            if (direction == 1) {
                if (effectData.isPlay == false) {
                    //开始动态
                    var onComplete: Function = function () {
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
                    var onComplete: Function = function () {
                        if (effectData.loop) {
                            egret.Tween.get(display).to({ x: (effectData.oldX + space), alpha: alphaEnd }, duration).to({ x: (effectData.oldX - space), alpha: alphaStart }, duration).call(onComplete, this);
                        }
                    };
                    egret.Tween.get(display).to({ x: (effectData.oldX + space), alpha: alphaEnd }, duration).to({ x: (effectData.oldX - space), alpha: alphaStart }, duration).call(onComplete, this);
                    effectData.isPlay = false;
                }
            }

        }
        public static pauseFlyObjEffect(display: egret.DisplayObject): void {
            if (display == null || display == undefined) return;
            if (this.effectDic[display.hashCode] != null && this.effectDic[display.hashCode] != undefined) {
                var effectData: EffectData = this.effectDic[display.hashCode];
                //回复旧数值
                display.alpha = 1;
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            }
        }

        /**
         * 从大到小 或者从小到大
         * @param display 显示对象
         * @param duration 多久完成该动画
         * @param type 1 从小到大  2 从大到小
         */
        public static smallTobig(display: egret.DisplayObject, duration: number = 200, type: number = 1): void {
            if (display == null || display == undefined) return;
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                effectData.newAnchorX = 0.5;
                effectData.newAnchorY = 0.5;
                effectData.oldX = display.x;
                effectData.oldY = display.y;
                effectData.newX = effectData.oldX + display.width * effectData.newAnchorX * display.scaleX;
                effectData.newY = effectData.oldY + display.height * effectData.newAnchorY * display.scaleY;
                this.effectDic[display.hashCode] = effectData;
            } else {
                effectData = this.effectDic[display.hashCode];
            }
            //Anchor改变后新的位置
            // if(display instanceof BaseGroup) {
            //     display.anchorX = effectData.newAnchorX;
            //     display.anchorY = effectData.newAnchorY;
            // } else 
            {
                display.anchorOffsetX = effectData.newAnchorX * display.width;
                display.anchorOffsetY = effectData.newAnchorY * display.height;
            }
            display.x = effectData.newX;
            display.y = effectData.newY;
            if (type == 1) {
                display.scaleX = 0;
                display.scaleY = 0;
                egret.Tween.get(display).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            } else if (type == 2) {
                display.scaleX = 1;
                display.scaleY = 1;
                egret.Tween.get(display).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backOut);
            }
        }

        public static playEffect(display:egret.DisplayObject, cartoonType: number = 1): void {
            if (display == null || display == undefined) return;
            var effectData: EffectData = null;
            if (this.effectDic[display.hashCode] == null || this.effectDic[display.hashCode] == undefined) {
                effectData = new EffectData();
                EffectUtil.saveOldValue(display, effectData);//记录旧值
                this.effectDic[display.hashCode] = effectData;
            } else {
                return;
            }

            var onComplete2: Function = function () {
                effectData = this.effectDic[display.hashCode];
                display.x = effectData.oldX;
                display.y = effectData.oldY;
                display.scaleX = effectData.oldScaleX;
                display.scaleY = effectData.oldScaleY;
                //停止动画
                egret.Tween.removeTweens(display);
                //移除
                this.effectDic[display.hashCode] = null;
            };
            var onComplete1: Function = function () {
                if (cartoonType == 1) {
                    egret.Tween.get(display).to({ scaleX: 1, scaleY: 1, x: display.x - display.width / 4, y: display.y - display.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                } else if (cartoonType == 2) {
                    egret.Tween.get(display).to({ scaleX: 1, scaleY: 1, x: display.x - display.width / 4, y: display.y - display.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                } else if (cartoonType == 3) {
                    egret.Tween.get(display).to({ scaleX: 1, scaleY: 1, x: display.x - display.width / 4, y: display.y - display.height / 4 }, 100).call(onComplete2, this);
                }
            };
            egret.Tween.get(display).to({ scaleX: 0.8, scaleY: 0.8, x: display.x + display.width / 4, y: display.y + display.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        }

        private static saveOldValue(display: egret.DisplayObject, effectData: EffectData): void {
            //记录旧值
            effectData.oldX = display.x;
            effectData.oldY = display.y;
            // if(display instanceof BaseGroup) {
            //     effectData.oldAnchorX = display.anchorX;
            //     effectData.oldAnchorY = display.anchorY;
            // } 
            // else 
            {
                effectData.oldAnchorX = display.anchorOffsetX;
                effectData.oldAnchorY = display.anchorOffsetY;
            }
            effectData.oldScaleX = display.scaleX;
            effectData.oldScaleY = display.scaleY;
            effectData.oldAlpha = display.alpha;
            effectData.loop = true;
        }
    }
}