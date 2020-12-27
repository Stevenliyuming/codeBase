module codeBase{
	export class VideoBox extends egret.DisplayObject {//implements egret.Video {
		/**
		 * @inheritDoc
		 */
		public src: string;
		/**
		 * @inheritDoc
		 */
		public poster: string;
		/**
		 * @private
		 */
		private posterData: egret.BitmapData;
		/**
		 * @private
		 */
		private video: HTMLVideoElement;
		/**
		 * @private
		 */
		private loaded: boolean = false;
		/**
		 * @private
		 */
		private closed: boolean = false;
		/**
		 * @private
		 */
		private heightSet: number = NaN;
		/**
		 * @private
		 */
		private widthSet: number = NaN;
		/**
		 * @private
		 * pc上视频卡住的时候不能暂停
		 */
		private waiting: boolean = false;
		/**
		 * @private
		 * 用户是否设置了 pause
		 */
		private userPause: boolean = false;
		/**
		 * @private
		 * 用户是否设置了 play
		 */
		private userPlay: boolean = false;

		/**
		 * @inheritDoc
		 */
		constructor(url?: string) {
			super();
			this.$renderNode = new egret.sys.BitmapNode();
			this.src = url;
			this.once(egret.Event.ADDED_TO_STAGE, this.loadPoster, this);
			if (url) {
				this.load();
			}
		}

		/**
		 * @inheritDoc
		 */
		public load(url?: string) {
			url = url || this.src;
			this.src = url;
			if (DEBUG && !url) {
				egret.$error(3002);
			}
			if (this.video && this.video.src == url) {
				return;
			}
			let video: HTMLVideoElement;
			if (!this.video || egret.Capabilities.isMobile) {
				video = document.createElement("video");
				this.video = video;
				video.controls = null;
			} else {
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
			video.addEventListener("error", () => this.onVideoError());
			video.addEventListener("ended", () => this.onVideoEnded());
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
		}

		private isPlayed: boolean = false;

		/**
		 * @inheritDoc
		 */
		public play(startTime?: number, loop: boolean = false) {
			if (this.loaded == false) {
				this.load(this.src);
				this.once(egret.Event.COMPLETE, e => this.play(startTime, loop), this);
				return;
			}
			if (this.isPlayed) return;
			let video = this.video;
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
				window.setTimeout(function () {//为了解决视频返回挤压页面内容
					video.width = 0;
				}, 1000);
			}
			this.video.play();
			this.isPlayed = true;
			egret.startTick(this.markDirty, this);
		}

		/**
		 * @private
		 *
		 */
		private onVideoEnded() {
			this.pause();
			this.isPlayed = false;
			this.dispatchEventWith(egret.Event.ENDED);
		}

		/**
		 * @private
		 *
		 */
		private onVideoError() {
			console.error("video errorCode:", this.video.error.code);
			this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
		}

		/**
		 * @inheritDoc
		 */
		public close() {
			this.closed = true;
			this.video.removeEventListener("canplay", this.onVideoLoaded);
			this.video.removeEventListener("error", () => this.onVideoError());
			this.video.removeEventListener("ended", () => this.onVideoEnded());
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
		}


		/**
		 * @inheritDoc
		 */
		public pause() {
			if (this.isPlayed) {
				this.video.pause();
				this.isPlayed = false;
				egret.stopTick(this.markDirty, this);
			}
		}

		/**
		 * @inheritDoc
		 */
		public get volume(): number {
			if (!this.video)
				return 1;
			return this.video.volume;
		}

		/**
		 * @inheritDoc
		 */
		public set volume(value: number) {
			if (!this.video)
				return;
			this.video.volume = value;
		}

		/**
		 * @inheritDoc
		 */
		public get position(): number {
			if (!this.video)
				return 0;
			return this.video.currentTime;
		}

		/**
		 * @inheritDoc
		 */
		public set position(value: number) {
			if (!this.video)
				return;
			this.video.currentTime = value;
		}

		private _fullscreen = true;
		/**
		 * @inheritDoc
		 */
		public get fullscreen(): boolean {
			return this._fullscreen;
		}

		/**
		 * @inheritDoc
		 */
		public set fullscreen(value: boolean) {
			if (egret.Capabilities.isMobile) {
				return;
			}
			this._fullscreen = !!value;
			if (this.video && this.video.paused == false) {
				//this.checkFullScreen(this._fullscreen);
			}
		}

		private _bitmapData: egret.BitmapData;

		/**
		 * @inheritDoc
		 */
		public get bitmapData(): egret.BitmapData {
			if (!this.video || !this.loaded)
				return null;
			if (!this._bitmapData) {
				this.video.width = this.video.videoWidth;
				this.video.height = this.video.videoHeight;
				this._bitmapData = new egret.BitmapData(this.video);
				this._bitmapData.$deleteSource = false;
			}
			return this._bitmapData;
		}

		private loadPoster() {
			let poster = this.poster;
			if (!poster)
				return;
			let imageLoader = new egret.ImageLoader();
			imageLoader.once(egret.Event.COMPLETE, e => {
				//let posterData = <HTMLImageElement><any>imageLoader.data;
				this.posterData = imageLoader.data;
				this.$renderDirty = true;
				this.posterData.width = this.getPlayWidth();
				this.posterData.height = this.getPlayHeight();
			}, this);
			imageLoader.load(poster);
		}

		/**
		 * @private
		 *
		 */
		private onVideoLoaded = () => {
			this.video.removeEventListener("canplay", this.onVideoLoaded);
			let video = this.video;
			this.loaded = true;
			if (this.posterData) {
				this.posterData.width = this.getPlayWidth();
				this.posterData.height = this.getPlayHeight();
			}
			video.width = video.videoWidth;
			video.height = video.videoHeight;
			window.setTimeout(() => {
				this.dispatchEventWith(egret.Event.COMPLETE);
			}, 200);
		};

		/**
		 * @private
		 */
		$measureContentBounds(bounds: egret.Rectangle): void {
			let bitmapData = this.bitmapData;
			let posterData = this.posterData;
			if (bitmapData) {
				bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
			}
			else if (posterData) {
				bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
			}
			else {
				bounds.setEmpty();
			}
		}

		private getPlayWidth(): number {
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
		}

		private getPlayHeight(): number {
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
		}

		/**
		 * @private
		 */
		$updateRenderNode(): void {
			let node = <egret.sys.BitmapNode>this.$renderNode;
			let bitmapData = this.bitmapData;
			let posterData = this.posterData;
			let width = this.getPlayWidth();
			let height = this.getPlayHeight();
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
		}

		private markDirty(): boolean {
			this.$renderDirty = true;
			return true;
		}

		/**
		 * @private
		 * 设置显示高度
		 */
		$setHeight(value: number): void {
			this.heightSet = value;
			if (this.paused) { // 在暂停和播放结束后，修改视频大小时，没有重绘导致的bug
				const self = this;
				this.$renderDirty = true;
				window.setTimeout(function () {
					self.$renderDirty = false;
				}, 200);
			}
			super.$setHeight(value);
		}

		/**
		 * @private
		 * 设置显示宽度
		 */
		$setWidth(value: number): void {
			this.widthSet = value;
			if (this.paused) { // 在暂停和播放结束后，修改视频大小时，没有重绘导致的bug
				const self = this;
				this.$renderDirty = true;
				window.setTimeout(function () {
					self.$renderDirty = false;
				}, 200);
			}
			super.$setWidth(value);
		}

		public get paused(): boolean {
			if (this.video) {
				return this.video.paused;
			}
			return true;
		}
		/**
		 * @inheritDoc
		 */
		public get length(): number {
			if (this.video) {
				return this.video.duration;
			}
			throw new Error("Video not loaded!");
		}
	}
}
