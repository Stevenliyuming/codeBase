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
    var VideoBox = (function (_super) {
        __extends(VideoBox, _super);
        /**
         * @inheritDoc
         */
        function VideoBox(url) {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.loaded = false;
            /**
             * @private
             */
            _this.closed = false;
            /**
             * @private
             */
            _this.heightSet = NaN;
            /**
             * @private
             */
            _this.widthSet = NaN;
            /**
             * @private
             * pc上视频卡住的时候不能暂停
             */
            _this.waiting = false;
            /**
             * @private
             * 用户是否设置了 pause
             */
            _this.userPause = false;
            /**
             * @private
             * 用户是否设置了 play
             */
            _this.userPlay = false;
            _this.isPlayed = false;
            _this._fullscreen = true;
            /**
             * @private
             *
             */
            _this.onVideoLoaded = function () {
                _this.video.removeEventListener("canplay", _this.onVideoLoaded);
                var video = _this.video;
                _this.loaded = true;
                if (_this.posterData) {
                    _this.posterData.width = _this.getPlayWidth();
                    _this.posterData.height = _this.getPlayHeight();
                }
                video.width = video.videoWidth;
                video.height = video.videoHeight;
                window.setTimeout(function () {
                    _this.dispatchEventWith(egret.Event.COMPLETE);
                }, 200);
            };
            _this.$renderNode = new egret.sys.BitmapNode();
            _this.src = url;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.loadPoster, _this);
            if (url) {
                _this.load();
            }
            return _this;
        }
        /**
         * @inheritDoc
         */
        VideoBox.prototype.load = function (url) {
            var _this = this;
            url = url || this.src;
            this.src = url;
            if (true && !url) {
                egret.$error(3002);
            }
            if (this.video && this.video.src == url) {
                return;
            }
            var video;
            if (!this.video || egret.Capabilities.isMobile) {
                video = document.createElement("video");
                this.video = video;
                video.controls = null;
            }
            else {
                video = this.video;
            }
            video.src = url;
            video.setAttribute("autoplay", "autoplay");
            video.setAttribute("webkit-playsinline", "true");
            video.setAttribute("playsinline", "true");
            video.setAttribute("muted", "false");
            video.setAttribute("crossorigin", "anonymous");
            video.setAttribute("x5-video-player-type", "h5-page");
            video.addEventListener("canplay", this.onVideoLoaded);
            video.addEventListener("error", function () { return _this.onVideoError(); });
            video.addEventListener("ended", function () { return _this.onVideoEnded(); });
            // video.addEventListener("waiting", () => {
            // 	this.waiting = true;
            // });
            video.load();
            video.style.position = "absolute";
            video.style.top = "0px";
            video.style.zIndex = "-88888";
            video.style.left = "0px";
            video.height = 1;
            video.width = 1;
        };
        /**
         * @inheritDoc
         */
        VideoBox.prototype.play = function (startTime, loop) {
            var _this = this;
            if (loop === void 0) { loop = false; }
            if (this.loaded == false) {
                this.load(this.src);
                this.once(egret.Event.COMPLETE, function (e) { return _this.play(startTime, loop); }, this);
                return;
            }
            if (this.isPlayed)
                return;
            var video = this.video;
            if (startTime != undefined) {
                video.currentTime = +startTime || 0;
            }
            video.loop = !!loop;
            if (egret.Capabilities.isMobile) {
                video.style.zIndex = "-88888";
            }
            else {
                video.style.zIndex = "9999";
            }
            video.style.position = "absolute";
            video.style.top = "0px";
            video.style.left = "0px";
            video.height = video.videoHeight;
            video.width = video.videoWidth;
            if (egret.Capabilities.os != "Windows PC" && egret.Capabilities.os != "Mac OS") {
                window.setTimeout(function () {
                    video.width = 0;
                }, 1000);
            }
            this.video.play();
            this.isPlayed = true;
            egret.startTick(this.markDirty, this);
        };
        /**
         * @private
         *
         */
        VideoBox.prototype.onVideoEnded = function () {
            this.pause();
            this.isPlayed = false;
            this.dispatchEventWith(egret.Event.ENDED);
        };
        /**
         * @private
         *
         */
        VideoBox.prototype.onVideoError = function () {
            console.error("video errorCode:", this.video.error.code);
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
        };
        /**
         * @inheritDoc
         */
        VideoBox.prototype.close = function () {
            var _this = this;
            this.closed = true;
            this.video.removeEventListener("canplay", this.onVideoLoaded);
            this.video.removeEventListener("error", function () { return _this.onVideoError(); });
            this.video.removeEventListener("ended", function () { return _this.onVideoEnded(); });
            this.pause();
            this.isPlayed = false;
            egret.stopTick(this.markDirty, this);
            if (this.loaded == false && this.video)
                this.video.src = "";
            if (this.video && this.video.parentElement) {
                this.video.parentElement.removeChild(this.video);
                this.video = null;
            }
            this.loaded = false;
        };
        /**
         * @inheritDoc
         */
        VideoBox.prototype.pause = function () {
            if (this.isPlayed) {
                this.video.pause();
                this.isPlayed = false;
                egret.stopTick(this.markDirty, this);
            }
        };
        Object.defineProperty(VideoBox.prototype, "volume", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (!this.video)
                    return 1;
                return this.video.volume;
            },
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (!this.video)
                    return;
                this.video.volume = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoBox.prototype, "position", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (!this.video)
                    return 0;
                return this.video.currentTime;
            },
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (!this.video)
                    return;
                this.video.currentTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoBox.prototype, "fullscreen", {
            /**
             * @inheritDoc
             */
            get: function () {
                return this._fullscreen;
            },
            /**
             * @inheritDoc
             */
            set: function (value) {
                if (egret.Capabilities.isMobile) {
                    return;
                }
                this._fullscreen = !!value;
                if (this.video && this.video.paused == false) {
                    //this.checkFullScreen(this._fullscreen);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoBox.prototype, "bitmapData", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (!this.video || !this.loaded)
                    return null;
                if (!this._bitmapData) {
                    this.video.width = this.video.videoWidth;
                    this.video.height = this.video.videoHeight;
                    this._bitmapData = new egret.BitmapData(this.video);
                    this._bitmapData.$deleteSource = false;
                }
                return this._bitmapData;
            },
            enumerable: true,
            configurable: true
        });
        VideoBox.prototype.loadPoster = function () {
            var _this = this;
            var poster = this.poster;
            if (!poster)
                return;
            var imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, function (e) {
                //let posterData = <HTMLImageElement><any>imageLoader.data;
                _this.posterData = imageLoader.data;
                _this.$renderDirty = true;
                _this.posterData.width = _this.getPlayWidth();
                _this.posterData.height = _this.getPlayHeight();
            }, this);
            imageLoader.load(poster);
        };
        /**
         * @private
         */
        VideoBox.prototype.$measureContentBounds = function (bounds) {
            var bitmapData = this.bitmapData;
            var posterData = this.posterData;
            if (bitmapData) {
                bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
            }
            else if (posterData) {
                bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
            }
            else {
                bounds.setEmpty();
            }
        };
        VideoBox.prototype.getPlayWidth = function () {
            if (!isNaN(this.widthSet)) {
                return this.widthSet;
            }
            if (this.bitmapData) {
                return this.bitmapData.width;
            }
            if (this.posterData) {
                return this.posterData.width;
            }
            return NaN;
        };
        VideoBox.prototype.getPlayHeight = function () {
            if (!isNaN(this.heightSet)) {
                return this.heightSet;
            }
            if (this.bitmapData) {
                return this.bitmapData.height;
            }
            if (this.posterData) {
                return this.posterData.height;
            }
            return NaN;
        };
        /**
         * @private
         */
        VideoBox.prototype.$updateRenderNode = function () {
            var node = this.$renderNode;
            var bitmapData = this.bitmapData;
            var posterData = this.posterData;
            var width = this.getPlayWidth();
            var height = this.getPlayHeight();
            if ((!this.isPlayed || egret.Capabilities.isMobile) && posterData) {
                node.image = posterData;
                node.imageWidth = width;
                node.imageHeight = height;
                node.drawImage(0, 0, posterData.width, posterData.height, 0, 0, width, height);
            }
            else if (this.isPlayed && bitmapData) {
                node.image = bitmapData;
                node.imageWidth = bitmapData.width;
                node.imageHeight = bitmapData.height;
                egret.WebGLUtils.deleteWebGLTexture(bitmapData.webGLTexture);
                bitmapData.webGLTexture = null;
                node.drawImage(0, 0, bitmapData.width, bitmapData.height, 0, 0, width, height);
            }
        };
        VideoBox.prototype.markDirty = function () {
            this.$renderDirty = true;
            return true;
        };
        /**
         * @private
         * 设置显示高度
         */
        VideoBox.prototype.$setHeight = function (value) {
            this.heightSet = value;
            if (this.paused) {
                var self_1 = this;
                this.$renderDirty = true;
                window.setTimeout(function () {
                    self_1.$renderDirty = false;
                }, 200);
            }
            _super.prototype.$setHeight.call(this, value);
        };
        /**
         * @private
         * 设置显示宽度
         */
        VideoBox.prototype.$setWidth = function (value) {
            this.widthSet = value;
            if (this.paused) {
                var self_2 = this;
                this.$renderDirty = true;
                window.setTimeout(function () {
                    self_2.$renderDirty = false;
                }, 200);
            }
            _super.prototype.$setWidth.call(this, value);
        };
        Object.defineProperty(VideoBox.prototype, "paused", {
            get: function () {
                if (this.video) {
                    return this.video.paused;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VideoBox.prototype, "length", {
            /**
             * @inheritDoc
             */
            get: function () {
                if (this.video) {
                    return this.video.duration;
                }
                throw new Error("Video not loaded!");
            },
            enumerable: true,
            configurable: true
        });
        return VideoBox;
    }(egret.DisplayObject));
    codeBase.VideoBox = VideoBox;
    __reflect(VideoBox.prototype, "codeBase.VideoBox");
})(codeBase || (codeBase = {}));
