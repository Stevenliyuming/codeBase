module codeBase{
	/**
	 * 白鹭视频播放类封装 移动端可以播放全屏和非全屏视频
	 */
	export class EgretVideo extends egret.Sprite {
		private videoWidth:number = 580;
		private videoHeight:number = 444;
		private videoURL:string = "";
		private obj_url:string;
		private autoPlay:boolean = true;
		public _egretVideo: egret.Video;
		private _loop: boolean;
		private _pauseTime: number;
		private _videoScreenCapture: egret.Bitmap;
		private _videoTexture: egret.Texture;
		private calllFun:Function;
		private funObj:any;
		/**重写白鹭视频类方法，实现移动端可以非全屏播放 */
		private static rewrite:boolean = false;

		public constructor(_videoUrl: string, autoPlay:boolean=true, _width?:number, _height?:number) {
			super();
			let s = this;
			if(!EgretVideo.rewrite) {
				EgretVideo.rewrite = true;
				s.rewriteFunction();
			}
			s.videoURL = _videoUrl;
			s.autoPlay = autoPlay;
			s.videoWidth = _width || 580;
			s.videoHeight = _height || 444;
		}

		//重写白鹭视频播放函数：在移动端可以不全屏播放
		private rewriteFunction() {
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
		}

		/**
		 * 显示视频
		 */
		public show(pr:egret.DisplayObjectContainer, px:number, py:number, callFun:Function=null, funObj:any=null, _loop:boolean = false) {
			let s = this;
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
		}

		public hide() {
			let s = this;
			if(s.parent) {
				s.parent.removeChild(s);
				s.dispose();
			}
		}

		private loadVideo(_videoUrl: string, _loop: boolean=false): void {
			let s = this;
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
			let urlLoader: egret.URLLoader = new egret.URLLoader;
			urlLoader.dataFormat = egret.URLLoaderDataFormat.BINARY;
			var urlreq: egret.URLRequest = new egret.URLRequest();
			urlreq.url = s.videoURL;
			urlLoader.load(urlreq);
			urlLoader.addEventListener(egret.Event.COMPLETE, s.urlLoaderComplete, s);
		}

		private urlLoaderComplete(event: egret.Event): void {
			let s = this;
			//console.log(event.target.data);
			let _file = new File([event.target.data], "");
			if(s.obj_url) {
				URL.revokeObjectURL(s.obj_url);
				s.obj_url = null;
			}
			s.obj_url = window.URL.createObjectURL(_file);
			//console.log(obj_url);
			s._egretVideo.load(s.obj_url);
			s._egretVideo.addEventListener(egret.Event.COMPLETE, s.loadCompleted, s);
		}

		private loadCompleted(e: egret.Event) {
			//console.log("video加载完成");
			let s = this;
			s._egretVideo.removeEventListener(egret.Event.COMPLETE, s.loadCompleted, s);
			if(s.autoPlay) {
				s.playVideo(s._loop, s._pauseTime);
			}
		}

		/**
		 * _loop:是否循环播放
		 * position:播放开始位置
		 */
		public playVideo(_loop: boolean, position:number=0): void {
			let s = this;
			if(s._egretVideo) {
				s._egretVideo.play(position, _loop);
				s._egretVideo.addEventListener(egret.Event.ENDED, s.onComplete, s);
			}
		}

		//播放完成
		private onComplete(e: egret.Event): void {
			//console.log("Video播放结束");
			let s = this;
			s._egretVideo.removeEventListener(egret.Event.ENDED, s.onComplete, s);
			if(s.calllFun && s.funObj) {
				s.calllFun.call(s.funObj);
			}
		}

		//暂停
		public pauseVideo(): void {
			let s = this;
			s._pauseTime = s._egretVideo.position;
			s._egretVideo.pause();
		}

		//停止
		public stopVideo(): void {
			let s = this;
			s._pauseTime = 0;
			s._egretVideo.pause();
			s._egretVideo.removeEventListener(egret.Event.ENDED, s.onComplete, s);
		}

		//清理视频资源
		private dispose() {
			let s = this;
			if(s._egretVideo) {
				s._egretVideo.close();
			}
			if(s.obj_url) {
				URL.revokeObjectURL(s.obj_url);
				s.obj_url = null;
			}
		}

		//切换视频播放
		public switchVideo(videoUrl: string, _loop: boolean = false) {
			let s = this;
			s.stopVideo();
			s.loadVideo(videoUrl, _loop);
		}

		/**
		 * 设置视频位置和宽高
		 */
		public setTransform(px:number, py:number, width:number, height:number) {
			let s = this;
			s.x = px;
			s.y = py;
			s.width = width;
			s.height = height;
			s._egretVideo.x = 0;
			s._egretVideo.y = 0;
			s._egretVideo.width = width;
			s._egretVideo.height = height;
		}
	}
}