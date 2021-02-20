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
     * 白鹭视频播放类封装 移动端可以播放全屏和非全屏视频
     */
    var EgretVideo = (function (_super) {
        __extends(EgretVideo, _super);
        function EgretVideo(_videoUrl, autoPlay, _width, _height) {
            if (autoPlay === void 0) { autoPlay = true; }
            var _this = _super.call(this) || this;
            _this.videoWidth = 580;
            _this.videoHeight = 444;
            _this.videoURL = "";
            _this.autoPlay = true;
            var s = _this;
            if (!EgretVideo.rewrite) {
                EgretVideo.rewrite = true;
                s.rewriteFunction();
            }
            s.videoURL = _videoUrl;
            s.autoPlay = autoPlay;
            s.videoWidth = _width || 580;
            s.videoHeight = _height || 444;
            return _this;
        }
        //重写白鹭视频播放函数：在移动端可以不全屏播放
        EgretVideo.prototype.rewriteFunction = function () {
            egret.Video.prototype.checkFullScreen = function (playFullScreen) {
                var video = this.video;
                if (playFullScreen) {
                    if (video.parentElement == null) {
                        video.removeAttribute("webkit-playsinline");
                        document.body.appendChild(video);
                    }
                    egret.stopTick(this.markDirty, this);
                    this.goFullscreen();
                }
                else {
                    if (video.parentElement != null) {
                        video.parentElement.removeChild(video);
                    }
                    video.setAttribute("webkit-playsinline", "true");
                    this.setFullScreenMonitor(false);
                    egret.startTick(this.markDirty, this);
                    // if (egret.Capabilities.isMobile) {
                    // 	this.video.currentTime = 0;
                    // 	this.onVideoEnded();
                    // 	return;
                    // }
                }
                this.videoPlay();
            };
            Object.defineProperty(egret.Video.prototype, "fullscreen", {
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
                    // if (egret.Capabilities.isMobile) {
                    // 	return;
                    // }
                    this._fullscreen = !!value;
                    if (this.video && this.video.paused == false) {
                        this.checkFullScreen(this._fullscreen);
                    }
                },
                enumerable: true,
                configurable: true
            });
        };
        /**
         * 显示视频
         */
        EgretVideo.prototype.show = function (pr, px, py, callFun, funObj, _loop) {
            if (callFun === void 0) { callFun = null; }
            if (funObj === void 0) { funObj = null; }
            if (_loop === void 0) { _loop = false; }
            var s = this;
            s._egretVideo = new egret.Video();
            s._egretVideo.width = s.videoWidth;
            s._egretVideo.height = s.videoHeight;
            s._egretVideo.fullscreen = false;
            s.calllFun = callFun;
            s.funObj = funObj;
            //this._video.poster = this._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
            s.addChild(s._egretVideo);
            s._egretVideo.x = 0;
            s._egretVideo.y = 0;
            s.width = s.videoWidth;
            s.height = s.videoHeight;
            s._loop = _loop;
            pr.addChild(s);
            s.x = px;
            s.y = py;
            s.loadVideo(s.videoURL, s._loop);
        };
        EgretVideo.prototype.hide = function () {
            var s = this;
            if (s.parent) {
                s.parent.removeChild(s);
                s.dispose();
            }
        };
        EgretVideo.prototype.loadVideo = function (_videoUrl, _loop) {
            if (_loop === void 0) { _loop = false; }
            var s = this;
            s._loop = _loop;
            s._pauseTime = 0;
            //解决跨域播放
            //_videoUrl = "https://oss.iandcode.com/s/platform/interactive/common/interactiveTemplate/mainScratch/" + _videoUrl;
            // if(_videoUrl.indexOf("http") != 0)
            // {
            // 	if(URLConf.videoRoot.indexOf("http") > -1)
            // 	{
            // 		_videoUrl = URLConf.videoRoot + _videoUrl.replace("./", "");
            // 	}					
            // }
            s.videoURL = _videoUrl;
            var urlLoader = new egret.URLLoader;
            urlLoader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            var urlreq = new egret.URLRequest();
            urlreq.url = s.videoURL;
            urlLoader.load(urlreq);
            urlLoader.addEventListener(egret.Event.COMPLETE, s.urlLoaderComplete, s);
        };
        EgretVideo.prototype.urlLoaderComplete = function (event) {
            var s = this;
            //console.log(event.target.data);
            var _file = new File([event.target.data], "");
            if (s.obj_url) {
                URL.revokeObjectURL(s.obj_url);
                s.obj_url = null;
            }
            s.obj_url = window.URL.createObjectURL(_file);
            //console.log(obj_url);
            s._egretVideo.load(s.obj_url);
            s._egretVideo.addEventListener(egret.Event.COMPLETE, s.loadCompleted, s);
        };
        EgretVideo.prototype.loadCompleted = function (e) {
            //console.log("video加载完成");
            var s = this;
            s._egretVideo.removeEventListener(egret.Event.COMPLETE, s.loadCompleted, s);
            if (s.autoPlay) {
                s.playVideo(s._loop, s._pauseTime);
            }
        };
        /**
         * _loop:是否循环播放
         * position:播放开始位置
         */
        EgretVideo.prototype.playVideo = function (_loop, position) {
            if (position === void 0) { position = 0; }
            var s = this;
            if (s._egretVideo) {
                s._egretVideo.play(position, _loop);
                s._egretVideo.addEventListener(egret.Event.ENDED, s.onComplete, s);
            }
        };
        //播放完成
        EgretVideo.prototype.onComplete = function (e) {
            //console.log("Video播放结束");
            var s = this;
            s._egretVideo.removeEventListener(egret.Event.ENDED, s.onComplete, s);
            if (s.calllFun && s.funObj) {
                s.calllFun.call(s.funObj);
            }
        };
        //暂停
        EgretVideo.prototype.pauseVideo = function () {
            var s = this;
            s._pauseTime = s._egretVideo.position;
            s._egretVideo.pause();
        };
        //停止
        EgretVideo.prototype.stopVideo = function () {
            var s = this;
            s._pauseTime = 0;
            s._egretVideo.pause();
            s._egretVideo.removeEventListener(egret.Event.ENDED, s.onComplete, s);
        };
        //清理视频资源
        EgretVideo.prototype.dispose = function () {
            var s = this;
            if (s._egretVideo) {
                s._egretVideo.close();
            }
            if (s.obj_url) {
                URL.revokeObjectURL(s.obj_url);
                s.obj_url = null;
            }
        };
        //切换视频播放
        EgretVideo.prototype.switchVideo = function (videoUrl, _loop) {
            if (_loop === void 0) { _loop = false; }
            var s = this;
            s.stopVideo();
            s.loadVideo(videoUrl, _loop);
        };
        /**
         * 设置视频位置和宽高
         */
        EgretVideo.prototype.setTransform = function (px, py, width, height) {
            var s = this;
            s.x = px;
            s.y = py;
            s.width = width;
            s.height = height;
            s._egretVideo.x = 0;
            s._egretVideo.y = 0;
            s._egretVideo.width = width;
            s._egretVideo.height = height;
        };
        /**重写白鹭视频类方法，实现移动端可以非全屏播放 */
        EgretVideo.rewrite = false;
        return EgretVideo;
    }(egret.Sprite));
    codeBase.EgretVideo = EgretVideo;
    __reflect(EgretVideo.prototype, "codeBase.EgretVideo");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=EgretVideo.js.map