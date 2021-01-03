module codeBase{
	/**
	 * html原生视频播放封装类
	 */
	export class NativeVideo {
		private stage: egret.Stage;
		private canvas: HTMLCanvasElement;
		private videoWidth: number = 0;
		private videoHeight: number = 0;
		private videoURL: string;
		private obj_url:string;
		private video: HTMLVideoElement;
		private px: number;
		private py: number;
		private relyDisplayObject: egret.DisplayObject;
		private offsetPoint: egret.Point;
		private validVideo:boolean = false;
		private finishFun:Function;
		private finishFunObj:any;

		public constructor() {
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
		public show(x: number, y: number, w: number, h: number, videourl: string, relyObj: egret.DisplayObject = null, offsetPoint: egret.Point = null) {
			let s = this;
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
			egret.setTimeout(() => {
				s.createVideo(x, y, w, h, videourl);
				s.stage.addEventListener(egret.Event.RESIZE, s.resetVideo, s);
				s.resetVideo();
			}, s, 50);
		}

		/**
		 * 设置播放结束回调
		 */
		public setFinishCallBack(fun:Function, funObj:any) {
			let s = this;
			s.finishFun = fun;
			s.finishFunObj = funObj;
		}

		/**
		 * 关闭播放
		 */
		public closeVideo() {
			let s = this;
			s.hide();
			if(s.finishFun && s.finishFunObj) {
				s.finishFun.call(s.finishFunObj);
			}
		}

		/**播放结束 */
		private playFinish() {
			let s = this;
			s.closeVideo();
		}

		private createVideo(x: number, y: number, w: number, h: number, videourl: string) {
			let s = this;
			var video:any = document.createElement("video");
			document.body.appendChild(video);
			s.video = video;
			//URLLoader加载视频资源
			let urlLoader: egret.URLLoader = new egret.URLLoader;
			urlLoader.dataFormat = egret.URLLoaderDataFormat.BINARY;
			var urlreq: egret.URLRequest = new egret.URLRequest();
			urlreq.url = videourl;
			urlLoader.load(urlreq);
			urlLoader.addEventListener(egret.Event.COMPLETE, s.onLoadDataComplete, s);
		}

		private onLoadDataComplete(event: egret.Event): void {
			let s = this;
			//console.log(event.target.data);
			let _file = new File([event.target.data], "");
			if(s.obj_url) {
				URL.revokeObjectURL(s.obj_url);
				s.obj_url = null;
			}
			s.obj_url = window.URL.createObjectURL(_file);
			//console.log(s.obj_url);	
			var video:any = s.video;
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
		}

		private playVideo() {
			let s = this;
			if(s.video) {
				s.video.play();
			}
		}

		private resetVideo() {
			let s = this;
			//if(!s.validVideo) return;
			egret.setTimeout(()=>{
				let video: HTMLVideoElement = s.video;
				//计算缩放比例
				let csf = 1 / egret.sys.DisplayList.$canvasScaleFactor;
				let scaleFactorX = s.canvas.width * csf / SceneManager.instance.designWidth;
				let scaleFactorY = s.canvas.height * csf / SceneManager.instance.designHeight;
				//console.log(s._canvas.width + "=======" + s._canvas.height);
				//计算视频宽高
				let videoScale = 1;
				if(scaleFactorX < scaleFactorY) {
					videoScale = scaleFactorX;
				} else {
					videoScale = scaleFactorY;
				}
				let w = s.videoWidth * videoScale;
				let h = s.videoHeight * videoScale;
				video.style.width = w + "px";
				video.style.height = h + "px";
				//video.width = w;
				//video.height = h;
				//console.log("Width:" + w + "   " + "Height:" + h);
				//计算视频位置
				let vx = s.px;
				let vy = s.py;
				if (s.relyDisplayObject && s.relyDisplayObject.parent) {
					let pos = s.relyDisplayObject.parent.localToGlobal(s.relyDisplayObject.x, s.relyDisplayObject.y);
					if (s.offsetPoint) {
						pos.x += s.offsetPoint.x * SceneManager.instance.gameScale;
						pos.y += s.offsetPoint.y * SceneManager.instance.gameScale;
					}
					//console.log(pos);
					vx = pos.x;// * scaleFactorX;//egret.sys.DisplayList.$canvasScaleX;
					vy = pos.y;// * scaleFactorY;//egret.sys.DisplayList.$canvasScaleY;
				} else {
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

				let matrix = GameUtil.Instance.splitMatrix(s.canvas.style.transform);
				let angle = GameUtil.Instance.getMatrixRotation(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
				video.style.transform = "rotate(" + `${angle}` + "deg)";
				// console.log(angle);
				// console.log(s._canvas.style.transform);
				if (angle == 90) {
					video.style.left = (s.canvas.height - vy - h + (h - w >> 1)) + "px";
					video.style.top = (vx + (w - h >> 1)) + "px";
				} else {
					// vx = s._canvas.width / 2;
					// vy = s._canvas.height / 2;
					video.style.left = vx + "px";
					video.style.top = vy + "px";
				}
			}, s, 50);
		}

		private hide() {
			let s = this;
			if(s.obj_url) {
				URL.revokeObjectURL(s.obj_url);
				s.obj_url = null;
			}
			if(s.video) {
				s.video.removeEventListener("canplay", s.playVideo);
				s.video.removeEventListener("ended", s.playFinish);
				if(s.video.parentNode) {
					s.video.parentNode.removeChild(s.video);
				}
			}
			s.validVideo = false;
		}
	}
	
}
