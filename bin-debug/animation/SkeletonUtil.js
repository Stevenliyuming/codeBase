var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var SkeletonUtil = (function () {
        function SkeletonUtil() {
            this.dragonBonesTime = NaN;
        }
        Object.defineProperty(SkeletonUtil, "Instance", {
            get: function () {
                if (!SkeletonUtil.inst) {
                    SkeletonUtil.inst = new SkeletonUtil;
                    SkeletonUtil.inst.init();
                }
                return SkeletonUtil.inst;
            },
            enumerable: true,
            configurable: true
        });
        SkeletonUtil.prototype.init = function () {
            var s = this;
            s.worldClock = new dragonBones.WorldClock;
        };
        //创建影片剪辑帧动画
        SkeletonUtil.prototype.createMovieClipAnimation = function (mcData, mcTexture, mcName) {
            var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            var clip = new egret.MovieClip(mcDataFactory.generateMovieClipData(mcName));
            return clip;
        };
        //初始骨骼动画数据
        SkeletonUtil.prototype.initDragonBonesData = function (skeName, filePath) {
            if (filePath === void 0) { filePath = ""; }
            var skejson = filePath + skeName + "_ske_json";
            var texjson = filePath + skeName + "_tex_json";
            var texpng = filePath + skeName + "_tex_png";
            var skeData = RES.getRes(skejson);
            //console.log(skeData);
            var textureData = RES.getRes(texjson);
            //console.log(aniData);
            var textureAtlas = RES.getRes(texpng);
            //console.log(anitexture);
            dragonBones.EgretFactory.factory.parseDragonBonesData(skeData, skeName);
            dragonBones.EgretFactory.factory.parseTextureAtlasData(textureData, textureAtlas, skeName);
        };
        /**创建骨骼动画骨架显示容器
         * skeName 龙骨文件名
         * armatureName 龙骨骨架名
         * dragonBonesName 龙骨名
         */
        SkeletonUtil.prototype.createSkeletonDisplay = function (filePath, skeName, armatureName, dragonBonesName) {
            var s = this;
            var data1 = dragonBones.EgretFactory.factory.getDragonBonesData(skeName);
            var data2 = dragonBones.EgretFactory.factory.getTextureAtlasData(skeName);
            if (!data1 || !data2) {
                s.initDragonBonesData(skeName, filePath);
            }
            //不需要世界时钟驱动
            var displayObj = dragonBones.EgretFactory.factory.buildArmatureDisplay(armatureName, dragonBonesName);
            //newDisplayObj.animation.play();
            return displayObj;
        };
        //创建骨骼动画骨架
        SkeletonUtil.prototype.createSkeletonArmature = function (filePath, skeName, armatureName, dragonBonesName) {
            var s = this;
            var data1 = dragonBones.EgretFactory.factory.getDragonBonesData(skeName);
            var data2 = dragonBones.EgretFactory.factory.getTextureAtlasData(skeName);
            if (!data1 || !data2) {
                s.initDragonBonesData(filePath, skeName);
            }
            //var factory = new dragonBones.EgretFactory();
            //需要世界时钟驱动
            var armature = dragonBones.EgretFactory.factory.buildArmature(armatureName, dragonBonesName);
            s.worldClock.clock.add(armature);
            //armature.animation.gotoAndPlay("");
            //let armatureDisplay = armature.display;
            //启动计时器更新世界时钟
            if (s.dragonBonesTime != s.dragonBonesTime) {
                s.dragonBonesTime = egret.getTimer();
                egret.startTick(s.onTicker, s);
            }
            return armature;
        };
        SkeletonUtil.prototype.onTicker = function (timeStamp) {
            var s = this;
            var now = timeStamp;
            var pass = now - s.dragonBonesTime;
            s.dragonBonesTime = now;
            s.worldClock.clock.advanceTime(pass / 1000);
            return false;
        };
        SkeletonUtil.prototype.dispose = function () {
            var s = this;
            if (s.dragonBonesTime == s.dragonBonesTime) {
                egret.stopTick(s.onTicker, s);
                s.dragonBonesTime = NaN;
            }
        };
        return SkeletonUtil;
    }());
    codeBase.SkeletonUtil = SkeletonUtil;
    __reflect(SkeletonUtil.prototype, "codeBase.SkeletonUtil");
})(codeBase || (codeBase = {}));
