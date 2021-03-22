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
var spine;
(function (spine) {
    var SkeletonAnimation = (function (_super) {
        __extends(SkeletonAnimation, _super);
        function SkeletonAnimation(skeletonData) {
            var _this = _super.call(this) || this;
            _this.lastTime = 0;
            _this.renderer = new spine.SkeletonRenderer(skeletonData);
            _this.state = _this.renderer.state;
            _this.stateData = _this.renderer.stateData;
            _this.skeleton = _this.renderer.skeleton;
            _this.skeletonData = _this.renderer.skeletonData;
            _this.addChild(_this.renderer);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            return _this;
        }
        Object.defineProperty(SkeletonAnimation.prototype, "flipX", {
            get: function () {
                return this.renderer.scaleX == -1;
            },
            set: function (flip) {
                this.renderer.scaleX = flip ? -1 : 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkeletonAnimation.prototype, "flipY", {
            get: function () {
                return this.renderer.scaleY == 1;
            },
            set: function (flip) {
                this.renderer.scaleY = flip ? 1 : -1;
            },
            enumerable: true,
            configurable: true
        });
        SkeletonAnimation.prototype.setTimeScale = function (scale) {
            this.state.timeScale = scale;
        };
        SkeletonAnimation.prototype.play = function (anim, loop, trackID) {
            if (loop === void 0) { loop = 0; }
            if (trackID === void 0) { trackID = 0; }
            return this.start(trackID).add(anim, loop);
        };
        SkeletonAnimation.prototype.start = function (trackID) {
            if (trackID === void 0) { trackID = 0; }
            this.skeleton.setToSetupPose();
            return new spine.Track(this, trackID);
        };
        SkeletonAnimation.prototype.stop = function (track) {
            this.state.clearTrack(track);
        };
        SkeletonAnimation.prototype.stopAll = function (reset) {
            this.state.clearTracks();
            if (reset)
                this.skeleton.setToSetupPose();
        };
        SkeletonAnimation.prototype.onAddedToStage = function () {
            this.lastTime = Date.now() / 1000;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        };
        SkeletonAnimation.prototype.onRemovedFromStage = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        };
        SkeletonAnimation.prototype.onEnterFrame = function () {
            var now = Date.now() / 1000;
            this.renderer.update(now - this.lastTime);
            this.lastTime = now;
        };
        return SkeletonAnimation;
    }(egret.DisplayObjectContainer));
    spine.SkeletonAnimation = SkeletonAnimation;
    __reflect(SkeletonAnimation.prototype, "spine.SkeletonAnimation");
})(spine || (spine = {}));
