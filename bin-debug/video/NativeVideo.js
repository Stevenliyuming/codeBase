var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * html原生视频播放封装类
     */
    var NativeVideo = (function () {
        function NativeVideo() {
            this.videoWidth = 0;
            this.videoHeight = 0;
            this.validVideo = false;
        }
        /**
         * x 视频在canvas中的left位置
         * y 视频在canvas中的top位置
         * w 视频宽
         * h 视频高
         * url 视频地址
         * relyObj 视频坐标在白鹭渲染框架内的依赖项
         * offsetPoint 视频位置偏移坐标
         */
        NativeVideo.prototype.show = function (x, y, w, h, videourl, relyObj, offsetPoint) {
            if (relyObj === void 0) { relyObj = null; }
            if (offsetPoint === void 0) { offsetPoint = null; }
            var s = this;
            s.stage = egret.MainContext.instance.stage;
            s.canvas = document.body.getElementsByTagName("canvas")[0];
            s.videoWidth = w;
            s.videoHeight = h;
            s.videoURL = videourl;
            s.px = x;
            s.py = y;
            s.relyDisplayObject = relyObj;
            s.offsetPoint = offsetPoint;
            s.validVideo = false;
            egret.setTimeout(function () {
                s.createVideo(x, y, w, h, videourl);
                s.stage.addEventListener(egret.Event.RESIZE, s.resetVideo, s);
                s.resetVideo();
            }, s, 50);
        };
        /**
         * 设置播放结束回调
         */
        NativeVideo.prototype.setFinishCallBack = function (fun, funObj) {
            var s = this;
            s.finishFun = fun;
            s.finishFunObj = funObj;
        };
        /**
         * 关闭播放
         */
        NativeVideo.prototype.closeVideo = function () {
            var s = this;
            s.hide();
            if (s.finishFun && s.finishFunObj) {
                s.finishFun.call(s.finishFunObj);
            }
        };
        /**播放结束 */
        NativeVideo.prototype.playFinish = function () {
            var s = this;
            s.closeVideo();
        };
        NativeVideo.prototype.createVideo = function (x, y, w, h, videourl) {
            var s = this;
            var video = document.createElement("video");
            document.body.appendChild(video);
            s.video = video;
            //URLLoader加载视频资源
            var urlLoader = new egret.URLLoader;
            urlLoader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            var urlreq = new egret.URLRequest();
            urlreq.url = videourl;
            urlLoader.load(urlreq);
            urlLoader.addEventListener(egret.Event.COMPLETE, s.onLoadDataComplete, s);
        };
        NativeVideo.prototype.onLoadDataComplete = function (event) {
            var s = this;
            //console.log(event.target.data);
            var _file = new File([event.target.data], "");
            if (s.obj_url) {
                URL.revokeObjectURL(s.obj_url);
                s.obj_url = null;
            }
            s.obj_url = window.URL.createObjectURL(_file);
            //console.log(s.obj_url);	
            var video = s.video;
            video.src = s.obj_url;
            video.setAttribute("autoplay", "autoplay");
            video.setAttribute("webkit-playsinline", "true");
            video.setAttribute("muted", "false");
            video.setAttribute("crossorigin", "anonymous");
            s.playVideo = s.playVideo.bind(s);
            video.addEventListener("canplay", s.playVideo);
            s.playFinish = s.playFinish.bind(s);
            video.addEventListener("ended", s.playFinish);
            video.controls = false;
            video.style.position = "absolute";
            video.style.zIndex = "100000";
            video.style.pointerEvents = "none";
            //video.style.objectFit = "contain";
            //URL.revokeObjectURL(obj_url);
        };
        NativeVideo.prototype.playVideo = function () {
            var s = this;
            if (s.video) {
                s.video.play();
            }
        };
        NativeVideo.prototype.resetVideo = function () {
            var s = this;
            //if(!s.validVideo) return;
            egret.setTimeout(function () {
                var video = s.video;
                //计算缩放比例
                var csf = 1 / egret.sys.DisplayList.$canvasScaleFactor;
                var scaleFactorX = s.canvas.width * csf / codeBase.SceneManager.instance.designWidth;
                var scaleFactorY = s.canvas.height * csf / codeBase.SceneManager.instance.designHeight;
                //console.log(s._canvas.width + "=======" + s._canvas.height);
                //计算视频宽高
                var videoScale = 1;
                if (scaleFactorX < scaleFactorY) {
                    videoScale = scaleFactorX;
                }
                else {
                    videoScale = scaleFactorY;
                }
                var w = s.videoWidth * videoScale;
                var h = s.videoHeight * videoScale;
                video.style.width = w + "px";
                video.style.height = h + "px";
                //video.width = w;
                //video.height = h;
                //console.log("Width:" + w + "   " + "Height:" + h);
                //计算视频位置
                var vx = s.px;
                var vy = s.py;
                if (s.relyDisplayObject && s.relyDisplayObject.parent) {
                    var pos = s.relyDisplayObject.parent.localToGlobal(s.relyDisplayObject.x, s.relyDisplayObject.y);
                    if (s.offsetPoint) {
                        pos.x += s.offsetPoint.x * codeBase.SceneManager.instance.gameScale;
                        pos.y += s.offsetPoint.y * codeBase.SceneManager.instance.gameScale;
                    }
                    //console.log(pos);
                    vx = pos.x; // * scaleFactorX;//egret.sys.DisplayList.$canvasScaleX;
                    vy = pos.y; // * scaleFactorY;//egret.sys.DisplayList.$canvasScaleY;
                }
                else {
                    vx = vx * scaleFactorX;
                    vy = vy * scaleFactorY;
                }
                //console.log(egret.sys.DisplayList.$canvasScaleX + ">>>>>>" + egret.sys.DisplayList.$canvasScaleY);
                // video.style.left = vx + "px";
                // video.style.top = vy + "px";
                //console.log(vx + "---" + vy);
                // let transformKey = egret.web.getPrefixStyleName("transform");
                // this.StageDelegateDiv.style[transformKey] = this.canvas.style[transformKey];
                // this.StageDelegateDiv.style[egret.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
                var matrix = codeBase.GameUtil.Instance.splitMatrix(s.canvas.style.transform);
                var angle = codeBase.GameUtil.Instance.getMatrixRotation(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
                video.style.transform = "rotate(" + ("" + angle) + "deg)";
                // console.log(angle);
                // console.log(s._canvas.style.transform);
                if (angle == 90) {
                    video.style.left = (s.canvas.height - vy - h + (h - w >> 1)) + "px";
                    video.style.top = (vx + (w - h >> 1)) + "px";
                }
                else {
                    // vx = s._canvas.width / 2;
                    // vy = s._canvas.height / 2;
                    video.style.left = vx + "px";
                    video.style.top = vy + "px";
                }
            }, s, 50);
        };
        NativeVideo.prototype.hide = function () {
            var s = this;
            if (s.obj_url) {
                URL.revokeObjectURL(s.obj_url);
                s.obj_url = null;
            }
            if (s.video) {
                s.video.removeEventListener("canplay", s.playVideo);
                s.video.removeEventListener("ended", s.playFinish);
                if (s.video.parentNode) {
                    s.video.parentNode.removeChild(s.video);
                }
            }
            s.validVideo = false;
        };
        return NativeVideo;
    }());
    codeBase.NativeVideo = NativeVideo;
    __reflect(NativeVideo.prototype, "codeBase.NativeVideo");
})(codeBase || (codeBase = {}));
