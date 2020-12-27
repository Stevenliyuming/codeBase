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
    var ImageData = (function () {
        function ImageData(key, spriteNames) {
            this.framekey = "";
            this.frameNames = [];
            this.frameTextures = [];
            var s = this;
            s.framekey = key;
            s.frameNames = spriteNames.slice();
            s.init();
        }
        ImageData.prototype.init = function () {
            var s = this;
            var num = s.frameNames.length;
            for (var i = 0; i < num; ++i) {
                s.frameTextures[i] = RES.getRes(s.frameNames[i]);
            }
        };
        ImageData.prototype.setFrameData = function (key, spriteNames) {
            var s = this;
            s.framekey = key;
            s.frameNames = spriteNames.slice();
        };
        return ImageData;
    }());
    codeBase.ImageData = ImageData;
    __reflect(ImageData.prototype, "codeBase.ImageData");
    var AnimationData = (function () {
        function AnimationData() {
            this.frameListener = [];
            this.frameListenerObj = [];
            this.frameIndex = [];
        }
        return AnimationData;
    }());
    codeBase.AnimationData = AnimationData;
    __reflect(AnimationData.prototype, "codeBase.AnimationData");
    var ImageAnimation = (function (_super) {
        __extends(ImageAnimation, _super);
        /**
         * key 动画名称
         * frameName 帧图片命名前缀，例如pic1.png是第一帧，则frameName为pic
         * frameNum 帧数
         * sheetName 图集名称
         * frameStartIndex 从第几帧开始
         */
        function ImageAnimation(key, frameName, frameNum, sheetName, frameStartIndex) {
            if (frameStartIndex === void 0) { frameStartIndex = 0; }
            var _this = _super.call(this) || this;
            _this.mCurFrame = 0;
            _this.mDelta = 0;
            _this.mFrameDelta = 0;
            _this.FPS = 5;
            _this.SpriteFrames = new Array();
            _this.IsPlaying = false;
            _this.Foward = true;
            _this.AutoPlay = false;
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
            s.currentAnimationData = s.SpriteFrames[0];
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
            s.animationRun = new AnimationData;
            s.animationRun.fun = s.animationUpdate;
            s.animationRun.funObj = s;
            ImageAnimation.animationRunData.push(s.animationRun);
        };
        ImageAnimation.prototype.removeFromStage = function (e) {
            var s = this;
            var index = ImageAnimation.animationRunData.indexOf(s.animationRun);
            if (index != -1) {
                ImageAnimation.animationRunData.splice(index, 1);
            }
            s.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.removeFromStage, s);
        };
        ImageAnimation.prototype.Init = function () {
            var s = this;
            s.mDelta = 0;
            s.mCurFrame = 0;
            s.IsPlaying = true;
            //每帧动画的时间间隔
            s.mFrameDelta = 1 / s.FPS;
            if (!s.Foward) {
                s.mCurFrame = s.FrameCount - 1;
            }
            s.ImageSource.texture = s.currentAnimationData.frameTextures[s.mCurFrame];
            s.initImage();
        };
        ImageAnimation.prototype.initImage = function () {
            var s = this;
            if (!s.ImageSource) {
                s.ImageSource = new egret.Bitmap;
                s.addChild(s.ImageSource);
                s.setSprite(0);
            }
            s.ImageSource.anchorOffsetX = s.ImageSource.width * s.ax;
            s.ImageSource.anchorOffsetY = s.ImageSource.height * s.ay;
            s.width = s.ImageSource.width;
            s.height = s.ImageSource.height;
        };
        ImageAnimation.prototype.animationUpdate = function (gapTime) {
            var s = this;
            if (!s.IsPlaying || !s.currentAnimationData || 0 == s.FrameCount) {
                return;
            }
            if (gapTime > 1) {
                gapTime = 0;
            }
            s.mDelta += gapTime;
            if (s.mDelta > s.mFrameDelta) {
                s.mDelta -= s.mFrameDelta;
                s.frameListener(s.mCurFrame);
                if (s.Foward) {
                    s.mCurFrame++;
                }
                else {
                    s.mCurFrame--;
                }
                if (s.mCurFrame >= s.FrameCount) {
                    s.Loop -= 1;
                    if (s.Loop == 0) {
                        s.IsPlaying = false;
                        s.completeListener();
                        return;
                    }
                    else {
                        s.mCurFrame = 0;
                    }
                }
                else if (s.mCurFrame < 0) {
                    s.Loop -= 1;
                    if (s.Loop == 0) {
                        s.IsPlaying = false;
                        s.completeListener();
                        return;
                    }
                    else {
                        s.mCurFrame = s.FrameCount - 1;
                    }
                }
                s.setSprite(s.mCurFrame);
            }
        };
        ImageAnimation.frameUpdate = function (e) {
            ImageAnimation.mCurrentTime = egret.getTimer();
            ImageAnimation.mGapTime = (ImageAnimation.mCurrentTime - ImageAnimation.mLastTime) / 1000;
            ImageAnimation.mLastTime = ImageAnimation.mCurrentTime;
            var num = ImageAnimation.animationRunData.length;
            for (var i = 0; i < num; ++i) {
                ImageAnimation.animationRunData[i].fun.call(ImageAnimation.animationRunData[i].funObj, ImageAnimation.mGapTime);
            }
        };
        //添加动画数据接口
        ImageAnimation.prototype.AddAnimation = function (key, frameName, frameNum, sheetName, frameStartIndex) {
            if (frameStartIndex === void 0) { frameStartIndex = 0; }
            if (frameNum == 0) {
                alert("动画帧数据为空");
                return;
            }
            if (key == "") {
                alert("动画键值为空");
                return;
            }
            var s = this;
            var isHaveKey = false;
            for (var i = 0; i < s.SpriteFrames.length; ++i) {
                if (s.SpriteFrames[i].framekey == key) {
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
                var frameData = new ImageData(key, frameNames);
                s.SpriteFrames.push(frameData);
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
            s.Foward = foward;
            for (var i = 0; i < s.SpriteFrames.length; ++i) {
                if (s.SpriteFrames[i].framekey == key) {
                    s.currentAnimationData = s.SpriteFrames[i];
                    s.FrameCount = s.currentAnimationData.frameNames.length;
                    break;
                }
            }
            if (s.FrameCount == 0) {
                alert("不存在key对应的动画帧");
            }
            else {
                s.Init();
            }
        };
        ImageAnimation.prototype.stop = function (isClear) {
            if (isClear === void 0) { isClear = false; }
            var s = this;
            if (s.currentAnimationData) {
                s.IsPlaying = false;
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
            this.mFrameDelta = 1 / this.FPS;
        };
        ImageAnimation.prototype.setSprite = function (spriteIndex) {
            var s = this;
            s.ImageSource.texture = s.currentAnimationData.frameTextures[spriteIndex];
            // if (this.color >= 0) {
            // 	GameConfig.Inst.setImageColor(s.ImageSource, this.color);
            // }
        };
        ImageAnimation.prototype.clear = function () {
            var s = this;
            var index = ImageAnimation.animationRunData.indexOf(s.animationRun);
            if (index != -1) {
                ImageAnimation.animationRunData.splice(index, 1);
            }
        };
        ImageAnimation.dispose = function () {
            var s = this;
            if (ImageAnimation._init) {
                ImageAnimation._init = false;
                ImageAnimation._stage.removeEventListener(egret.Event.ENTER_FRAME, ImageAnimation.frameUpdate, s);
            }
            ImageAnimation.animationRunData.length = 0;
        };
        ImageAnimation.prototype.setAnchorPoint = function (ax, ay) {
            var s = this;
            s.ax = ax;
            s.ay = ay;
            var posX = s.ImageSource.x;
            var posY = s.ImageSource.y;
            s.ImageSource.anchorOffsetX = s.ImageSource.width * s.ax;
            s.ImageSource.anchorOffsetY = s.ImageSource.height * s.ay;
            s.ImageSource.x = posX;
            s.ImageSource.y = posY;
        };
        ImageAnimation.prototype.setColor = function (_color) {
            this.color = _color;
        };
        ImageAnimation.prototype.frameListener = function (frameIndex) {
            var s = this;
            var num = s.animationRun.frameIndex.length;
            var i;
            for (i = 0; i < num; ++i) {
                if (s.animationRun.frameIndex[i] == frameIndex) {
                    s.animationRun.frameListener[i].call(s.animationRun.frameListenerObj[i], s);
                }
            }
        };
        ImageAnimation.prototype.completeListener = function () {
            var s = this;
            if (s.animationRun.completeFun) {
                var fun = s.animationRun.completeFun;
                var funObj = s.animationRun.completeFunObj;
                s.animationRun.completeFun = null;
                s.animationRun.completeFunObj = null;
                fun.call(funObj, s);
            }
        };
        ImageAnimation.prototype.addCompleteListener = function (fun, thisObj) {
            var s = this;
            s.animationRun.completeFun = fun;
            s.animationRun.completeFunObj = thisObj;
        };
        ImageAnimation.prototype.addFrameListener = function (fun, thisObj, frameIndex) {
            var s = this;
            var num = s.animationRun.frameIndex.length;
            var i;
            for (i = 0; i < num; ++i) {
                if (s.animationRun.frameIndex[i] == frameIndex) {
                    break;
                }
            }
            if (i == num) {
                s.animationRun.frameListener.push(fun);
                s.animationRun.frameListenerObj.push(thisObj);
                s.animationRun.frameIndex.push(frameIndex);
            }
        };
        ImageAnimation.mLastTime = 0;
        ImageAnimation.mCurrentTime = 0;
        ImageAnimation.mGapTime = 0;
        ImageAnimation._init = false;
        ImageAnimation.animationRunData = [];
        return ImageAnimation;
    }(egret.Sprite));
    codeBase.ImageAnimation = ImageAnimation;
    __reflect(ImageAnimation.prototype, "codeBase.ImageAnimation");
})(codeBase || (codeBase = {}));
