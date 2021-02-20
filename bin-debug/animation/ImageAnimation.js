var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var codeBase;
(function (codeBase) {
    /**
     * 动画帧数据
     */
    var FrameData = (function () {
        function FrameData(key, spriteNames) {
            this.framekey = "";
            this.frameNames = [];
            this.frameTextures = [];
            var s = this;
            s.framekey = key;
            s.frameNames = s.frameNames.concat(spriteNames);
            s.init();
        }
        FrameData.prototype.init = function () {
            var s = this;
            var num = s.frameNames.length;
            for (var i = 0; i < num; ++i) {
                s.frameTextures[i] = RES.getRes(s.frameNames[i]);
            }
        };
        FrameData.prototype.setFrameData = function (key, spriteNames) {
            var s = this;
            s.framekey = key;
            s.frameNames = s.frameNames.concat(spriteNames);
        };
        return FrameData;
    }());
    codeBase.FrameData = FrameData;
    __reflect(FrameData.prototype, "codeBase.FrameData");
    /**
     * 动画事件相关数据
     */
    var AnimationEvenData = (function () {
        function AnimationEvenData() {
            this.frameListenerArr = {};
            // public frameListener:Function[] = [];
            // public frameListenerObj:any[] = [];
            // public frameIndex:number[] = [];
        }
        return AnimationEvenData;
    }());
    codeBase.AnimationEvenData = AnimationEvenData;
    __reflect(AnimationEvenData.prototype, "codeBase.AnimationEvenData");
    /**
     * 帧动画
     */
    var ImageAnimation = (function (_super) {
        __extends(ImageAnimation, _super);
        /**
         * key 动画名称;
         * frameName 帧图片命名规则，例如pic1.png是第一帧，则frameName为pic;
         * frameNum 帧数;
         * sheetName 动画帧所在的图集名称;
         * frameStartIndex 从第几帧开始播放
         */
        function ImageAnimation(key, frameName, frameNum, sheetName, frameStartIndex) {
            if (frameStartIndex === void 0) { frameStartIndex = 0; }
            var _this = _super.call(this) || this;
            _this.currentFrameIndex = 0;
            _this.deltaTime = 0;
            _this.frameDeltaTime = 0;
            _this.FPS = 5;
            _this.frameDataArr = new Array();
            _this.isPlaying = false;
            _this.fowardPlay = true;
            _this.autoPlay = false;
            _this.Loop = 1;
            _this.loopCounter = 0;
            //当前动画数据
            _this.currentAnimationData = null;
            _this.FrameCount = 0;
            _this.defaultAnimationKey = "";
            _this.ax = 0.5;
            _this.ay = 0.5;
            _this.color = -1;
            var s = _this;
            //添加默认动画数据
            s.AddAnimation(key, frameName, frameNum, sheetName, frameStartIndex);
            //默认帧动画key
            s.defaultAnimationKey = key;
            s.currentAnimationData = s.frameDataArr[0];
            s.initImage();
            s.addEventListener(egret.Event.ADDED_TO_STAGE, s.AddToStage, s);
            return _this;
        }
        ImageAnimation.prototype.AddToStage = function (e) {
            var s = this;
            if (!ImageAnimation._init) {
                ImageAnimation._init = true;
                ImageAnimation.mLastTime = egret.getTimer();
                ImageAnimation._stage = s.stage;
                ImageAnimation._stage.addEventListener(egret.Event.ENTER_FRAME, ImageAnimation.frameUpdate, s);
            }
            s.removeEventListener(egret.Event.ADDED_TO_STAGE, s.AddToStage, s);
            //s.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.removeFromStage, s);
            //动画数据
            s.animationEvenData = new AnimationEvenData;
            s.animationEvenData.updateFun = s.animationUpdate;
            s.animationEvenData.funObj = s;
            ImageAnimation.animationDataArr.push(s.animationEvenData);
        };
        ImageAnimation.prototype.removeFromStage = function (e) {
            var s = this;
            var index = ImageAnimation.animationDataArr.indexOf(s.animationEvenData);
            if (index >= 0) {
                ImageAnimation.animationDataArr.splice(index, 1);
            }
            //s.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.removeFromStage, s);
        };
        ImageAnimation.prototype.Init = function () {
            var s = this;
            s.deltaTime = 0;
            s.currentFrameIndex = 0;
            s.isPlaying = true;
            //每帧动画的时间间隔
            s.frameDeltaTime = 1 / s.FPS;
            if (!s.fowardPlay) {
                s.currentFrameIndex = s.FrameCount - 1;
            }
            s.imageSource.texture = s.currentAnimationData.frameTextures[s.currentFrameIndex];
            s.initImage();
        };
        ImageAnimation.prototype.initImage = function () {
            var s = this;
            if (!s.imageSource) {
                s.imageSource = new egret.Bitmap;
                s.addChild(s.imageSource);
                s.setSprite(0);
            }
            s.imageSource.anchorOffsetX = s.imageSource.width * s.ax;
            s.imageSource.anchorOffsetY = s.imageSource.height * s.ay;
            s.width = s.imageSource.width;
            s.height = s.imageSource.height;
        };
        ImageAnimation.prototype.animationUpdate = function (gapTime) {
            var s = this;
            if (!s.isPlaying || !s.currentAnimationData || 0 == s.FrameCount) {
                return;
            }
            if (gapTime > 1) {
                gapTime = 0;
            }
            s.deltaTime += gapTime;
            if (s.deltaTime > s.frameDeltaTime) {
                s.deltaTime -= s.frameDeltaTime;
                s.frameListenerCall(s.currentFrameIndex);
                if (s.fowardPlay) {
                    s.currentFrameIndex++;
                }
                else {
                    s.currentFrameIndex--;
                }
                if (s.currentFrameIndex >= s.FrameCount) {
                    s.Loop -= 1;
                    if (s.Loop == 0) {
                        s.isPlaying = false;
                        s.completeListenerCall();
                        return;
                    }
                    else {
                        s.currentFrameIndex = 0;
                    }
                }
                else if (s.currentFrameIndex < 0) {
                    s.Loop -= 1;
                    if (s.Loop == 0) {
                        s.isPlaying = false;
                        s.completeListenerCall();
                        return;
                    }
                    else {
                        s.currentFrameIndex = s.FrameCount - 1;
                    }
                }
                s.setSprite(s.currentFrameIndex);
            }
        };
        ImageAnimation.frameUpdate = function (e) {
            ImageAnimation.mCurrentTime = egret.getTimer();
            ImageAnimation.mGapTime = (ImageAnimation.mCurrentTime - ImageAnimation.mLastTime) / 1000;
            ImageAnimation.mLastTime = ImageAnimation.mCurrentTime;
            var num = ImageAnimation.animationDataArr.length;
            for (var i = 0; i < num; ++i) {
                ImageAnimation.animationDataArr[i].updateFun.call(ImageAnimation.animationDataArr[i].funObj, ImageAnimation.mGapTime);
            }
        };
        //添加动画数据接口
        ImageAnimation.prototype.AddAnimation = function (key, frameName, frameNum, sheetName, frameStartIndex) {
            if (frameStartIndex === void 0) { frameStartIndex = 0; }
            if (frameNum <= 0) {
                alert("动画帧数不能小于0");
                return;
            }
            if (key == "") {
                alert("动画键值不能为空");
                return;
            }
            var s = this;
            var isHaveKey = false;
            for (var i = 0; i < s.frameDataArr.length; ++i) {
                if (s.frameDataArr[i].framekey === key) {
                    isHaveKey = true;
                    break;
                }
            }
            //避免有相同key的动画
            if (!isHaveKey) {
                var frameNames = [];
                for (var i = 0; i < frameNum; ++i) {
                    frameNames[i] = sheetName + "." + frameName + ("" + (frameStartIndex + i));
                }
                var frameData = new FrameData(key, frameNames);
                s.frameDataArr.push(frameData);
            }
            return s;
        };
        ImageAnimation.prototype.show = function (pr, px, py) {
            var s = this;
            pr.addChild(s);
            s.x = px;
            s.y = py;
        };
        //播放指定key对应的动画
        ImageAnimation.prototype.play = function (key, loop, foward) {
            if (loop === void 0) { loop = 1; }
            if (foward === void 0) { foward = true; }
            var s = this;
            //if(s.currentAnimationData.framekey == key) return;
            s.currentAnimationData = null;
            s.FrameCount = 0;
            s.Loop = loop;
            s.fowardPlay = foward;
            for (var i = 0; i < s.frameDataArr.length; ++i) {
                if (s.frameDataArr[i].framekey === key) {
                    s.currentAnimationData = s.frameDataArr[i];
                    s.FrameCount = s.currentAnimationData.frameNames.length;
                    break;
                }
            }
            if (s.FrameCount == 0) {
                alert("不存在key对应的动画");
            }
            else {
                s.Init();
            }
        };
        ImageAnimation.prototype.stop = function (isClear) {
            if (isClear === void 0) { isClear = false; }
            var s = this;
            if (s.currentAnimationData) {
                s.isPlaying = false;
                s.setSprite(0);
                // if (this.color >= 0) {
                // 	this.color = -1;
                // 	GameConfig.Inst.clearColor(this.ImageSource);
                // }
                if (isClear) {
                    s.clear();
                }
            }
        };
        //设置动画帧率
        ImageAnimation.prototype.setFPS = function (fps) {
            this.FPS = fps;
            //每帧动画的时间间隔时间
            this.frameDeltaTime = 1 / this.FPS;
        };
        ImageAnimation.prototype.setSprite = function (spriteIndex) {
            var s = this;
            s.imageSource.texture = s.currentAnimationData.frameTextures[spriteIndex];
            // if (this.color >= 0) {
            // 	GameConfig.Inst.setImageColor(s.ImageSource, this.color);
            // }
        };
        ImageAnimation.prototype.clear = function () {
            var s = this;
            var index = ImageAnimation.animationDataArr.indexOf(s.animationEvenData);
            if (index != -1) {
                ImageAnimation.animationDataArr.splice(index, 1);
            }
            // s.removeCompleteListener();
            // s.removeFrameListener();
        };
        ImageAnimation.dispose = function () {
            var s = this;
            if (ImageAnimation._init) {
                ImageAnimation._init = false;
                ImageAnimation._stage.removeEventListener(egret.Event.ENTER_FRAME, ImageAnimation.frameUpdate, s);
            }
            ImageAnimation.animationDataArr.length = 0;
        };
        ImageAnimation.prototype.setAnchorPoint = function (ax, ay) {
            var s = this;
            s.ax = ax;
            s.ay = ay;
            var posX = s.imageSource.x;
            var posY = s.imageSource.y;
            s.imageSource.anchorOffsetX = s.imageSource.width * s.ax;
            s.imageSource.anchorOffsetY = s.imageSource.height * s.ay;
            s.imageSource.x = posX;
            s.imageSource.y = posY;
        };
        ImageAnimation.prototype.setColor = function (_color) {
            this.color = _color;
        };
        /**
         * 执行帧监听
         */
        ImageAnimation.prototype.frameListenerCall = function (frameIndex) {
            var s = this;
            var frameListenerObj = s.animationEvenData.frameListenerArr[s.currentAnimationData.framekey];
            if (frameListenerObj) {
                var num = frameListenerObj.frameIndex.length;
                var i = void 0;
                for (i = 0; i < num; ++i) {
                    if (frameListenerObj.frameIndex[i] == frameIndex) {
                        break;
                    }
                }
                //执行帧监听
                if (i == num) {
                    frameListenerObj.frameListener[i].call(frameListenerObj.frameListenerObj[i], s);
                }
            }
        };
        /**
         * 执行动画完成监听
         */
        ImageAnimation.prototype.completeListenerCall = function () {
            var s = this;
            if (s.animationEvenData.completeFun && s.animationEvenData.completeFunObj) {
                var fun = s.animationEvenData.completeFun;
                var funObj = s.animationEvenData.completeFunObj;
                s.animationEvenData.completeFun = null;
                s.animationEvenData.completeFunObj = null;
                fun.call(funObj, s);
            }
        };
        /**
         * 添加动画完成监听
         */
        ImageAnimation.prototype.addCompleteListener = function (fun, thisObj) {
            var s = this;
            s.animationEvenData.completeFun = fun;
            s.animationEvenData.completeFunObj = thisObj;
        };
        /**
         * 移除完成监听
         */
        ImageAnimation.prototype.removeCompleteListener = function () {
            var s = this;
            s.animationEvenData.completeFun = null;
            s.animationEvenData.completeFunObj = null;
        };
        /**
         * 添加帧监听
         * fun:帧回调函数
         * thisObj:回调函数指向
         * frameIndex:回调帧
         * animationKey:回调帧所处的帧动画
         */
        ImageAnimation.prototype.addFrameListener = function (fun, thisObj, frameIndex, animationKey) {
            var s = this;
            var frameListenerObj = s.animationEvenData.frameListenerArr[animationKey];
            if (!frameListenerObj) {
                frameListenerObj = {
                    frameListener: [],
                    frameListenerObj: [],
                    frameIndex: []
                };
                s.animationEvenData.frameListenerArr[animationKey] = frameListenerObj;
            }
            var num = frameListenerObj.frameIndex.length;
            var i;
            for (i = 0; i < num; ++i) {
                if (frameListenerObj.frameIndex[i] == frameIndex) {
                    break;
                }
            }
            //添加新的帧监听
            if (i == num) {
                frameListenerObj.frameListener.push(fun);
                frameListenerObj.frameListenerObj.push(thisObj);
                frameListenerObj.frameIndex.push(frameIndex);
            }
        };
        /**
         * 移除帧监听
         */
        ImageAnimation.prototype.removeFrameListener = function (frameIndex, animationKey) {
            var s = this;
            var frameListenerObj = s.animationEvenData.frameListenerArr[animationKey];
            if (frameListenerObj) {
                var num = frameListenerObj.frameIndex.length;
                var i = void 0;
                for (i = 0; i < num; ++i) {
                    if (frameListenerObj.frameIndex[i] == frameIndex) {
                        break;
                    }
                }
                //添加新的帧监听
                if (i == num) {
                    frameListenerObj.frameListener.splice(i, 1);
                    frameListenerObj.frameListenerObj.splice(i, 1);
                    frameListenerObj.frameIndex.splice(i, 1);
                }
            }
        };
        ImageAnimation.mLastTime = 0;
        ImageAnimation.mCurrentTime = 0;
        ImageAnimation.mGapTime = 0;
        ImageAnimation._init = false;
        ImageAnimation.animationDataArr = [];
        return ImageAnimation;
    }(egret.Sprite));
    codeBase.ImageAnimation = ImageAnimation;
    __reflect(ImageAnimation.prototype, "codeBase.ImageAnimation");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=ImageAnimation.js.map