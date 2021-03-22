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
    var Track = (function (_super) {
        __extends(Track, _super);
        function Track(skelAnimation, trackID) {
            var _this = _super.call(this) || this;
            _this.animations = [];
            _this.disposed = false;
            _this.loop = 0;
            _this.trackID = trackID;
            _this.skelAnimation = skelAnimation;
            _this.stateListener = {
                complete: function () { return _this.onComplete(); },
                interrupt: function () { return _this.onInterrupt(); },
                event: function (_, event) { return _this.onCustomEvent(event); },
                start: undefined, end: undefined, dispose: undefined
            };
            return _this;
        }
        Track.prototype.waitPlayStart = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(0 /* PlayStart */, resolve); });
        };
        Track.prototype.waitPlayEnd = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(1 /* PlayEnd */, resolve); });
        };
        Track.prototype.waitLoopStart = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(2 /* LoopStart */, resolve); });
        };
        Track.prototype.waitLoopEnd = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(3 /* LoopEnd */, resolve); });
        };
        Track.prototype.waitInterrupt = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(4 /* Interrupt */, resolve); });
        };
        Track.prototype.waitTrackEnd = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(6 /* TrackEnd */, resolve); });
        };
        Track.prototype.waitEvent = function () {
            var _this = this;
            return new Promise(function (resolve) { return _this.once(5 /* Custom */, resolve); });
        };
        Track.prototype.waitNamedEvent = function (name) {
            var _this = this;
            return new Promise(function (resolve) {
                var callback = function (event) {
                    if (event.data.name == name) {
                        _this.off(5 /* Custom */, callback);
                        resolve(event);
                    }
                };
                _this.on(5 /* Custom */, callback);
            });
        };
        Track.prototype.add = function (name, loop, listener) {
            if (loop === void 0) { loop = 1; }
            if (!this.disposed) {
                this.animations.push({ name: name, loop: loop, listener: listener });
                if (this.animations.length == 1) {
                    this.playNextAnimation();
                }
            }
            return this;
        };
        Track.prototype.setAnimation = function (name, loop) {
            if (this.trackEntry)
                this.trackEntry.listener = null;
            this.trackEntry = this.skelAnimation.state.setAnimation(this.trackID, name, loop);
            this.trackEntry.listener = this.stateListener;
            this.skelAnimation.renderer.update(0);
        };
        Track.prototype.playNextAnimation = function () {
            if (!this.disposed && this.animations.length > 0) {
                var _a = this.animations[0], name_1 = _a.name, listener = _a.listener;
                if (listener) {
                    if (listener.playStart)
                        this.on(0 /* PlayStart */, listener.playStart, listener);
                    if (listener.playEnd)
                        this.on(1 /* PlayEnd */, listener.playEnd, listener);
                    if (listener.loopStart)
                        this.on(2 /* LoopStart */, listener.loopStart, listener);
                    if (listener.loopEnd)
                        this.on(3 /* LoopEnd */, listener.loopEnd, listener);
                    if (listener.interrupt)
                        this.on(4 /* Interrupt */, listener.interrupt, listener);
                    if (listener.custom)
                        this.on(5 /* Custom */, listener.custom, listener);
                }
                this.loop = 0;
                this.setAnimation(name_1, false);
                this.emit(0 /* PlayStart */);
                this.emit(2 /* LoopStart */);
            }
        };
        Track.prototype.onComplete = function () {
            if (!this.disposed) {
                var animation = this.animations[0];
                this.emit(3 /* LoopEnd */);
                if (++this.loop != animation.loop) {
                    this.setAnimation(animation.name, false);
                    this.emit(2 /* LoopStart */);
                }
                else {
                    var listener = animation.listener;
                    this.emit(1 /* PlayEnd */);
                    this.animations.shift();
                    if (listener) {
                        this.off(0 /* PlayStart */, listener.playStart);
                        this.off(1 /* PlayEnd */, listener.playEnd);
                        this.off(2 /* LoopStart */, listener.loopStart);
                        this.off(3 /* LoopEnd */, listener.loopEnd);
                        this.off(4 /* Interrupt */, listener.interrupt);
                        this.off(5 /* Custom */, listener.custom);
                    }
                    if (this.animations.length > 0) {
                        this.playNextAnimation();
                    }
                    else {
                        this.disposed = true;
                        this.trackEntry.listener = null;
                        this.trackEntry = null;
                        this.emit(6 /* TrackEnd */);
                    }
                }
            }
        };
        Track.prototype.onInterrupt = function () {
            if (!this.disposed) {
                this.disposed = true;
                this.animations.length = 0;
                this.emit(4 /* Interrupt */);
            }
        };
        Track.prototype.onCustomEvent = function (event) {
            if (!this.disposed) {
                this.emit(5 /* Custom */, event);
            }
        };
        return Track;
    }(spine.EventEmitter));
    spine.Track = Track;
    __reflect(Track.prototype, "spine.Track");
})(spine || (spine = {}));
