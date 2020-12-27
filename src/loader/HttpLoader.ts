module codeBase{
	interface ActiveXObject {
		new (s: string): any;
	}
	declare var ActiveXObject: ActiveXObject;

	// type ExtraData = {
	// 	callFun: Function,
	// 	funObj: any
	// }

	export class HttpLoader {
		public timeout: number = 0;
		private _responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text";
		constructor() {
			this.responseType = "text";
			this.withCredentials = false;
			this.timeout = 3000;
		}

		/**
		 * @private
		 * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
		 */
		public get responseType(): "" | "arraybuffer" | "blob" | "document" | "json" | "text" {
			return this._responseType;
		}

		public set responseType(value: "" | "arraybuffer" | "blob" | "document" | "json" | "text") {
			this._responseType = value;
		}

		/**
		 * @private
		 * 本次请求返回的数据，数据类型根据responseType设置的值确定。
		 */
		public get response(): any {
			if (!this._xhr) {
				return null;
			}

			if (this._xhr.response != undefined) {
				return this._xhr.response;
			}

			if (this._responseType == "text") {
				return this._xhr.responseText;
			}

			if (this._responseType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
				let w: any = window;
				return w.convertResponseBodyToText(this._xhr["responseBody"]);
			}

			if (this._responseType == "document") {
				return this._xhr.responseXML;
			}

			/*if (this._xhr.responseXML) {
				return this._xhr.responseXML;
			}
			if (this._xhr.responseText != undefined) {
				return this._xhr.responseText;
			}*/
			return null;
		}

		/**
		 * @private
		 */
		private _withCredentials: boolean;
		/**
		 * @private
		 */
		private _xhr: XMLHttpRequest;

		public _url: string = "";
		private _method: string = "";
		public loadInfo: ResourceItem.LoadInfo;

		/**
		 * @private
		 * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
		 */
		public get withCredentials(): boolean {
			return this._withCredentials;
		}

		public set withCredentials(value: boolean) {
			this._withCredentials = value;
		}

		/**
		 * @private
		 *
		 * @returns
		 */
		private getXHR(): any {
			if (window["XMLHttpRequest"]) {
				return new window["XMLHttpRequest"]();
			} else {
				return new ActiveXObject("MSXML2.XMLHTTP");
			}
		}

		/**
		 * @private
		 * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
		 * @param url 该请求所要访问的URL该请求所要访问的URL
		 * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
		 */
		public open(url: string, method: string = "GET"): void {
			this._url = url;
			this._method = method;
			if (this._xhr) {
				this._xhr.abort();
				this._xhr = null;
			}
			let xhr = this.getXHR();//new XMLHttpRequest();
			if (window["XMLHttpRequest"]) {
				xhr.addEventListener("load", this.onload.bind(this));
				xhr.addEventListener("error", this.onerror.bind(this));
			} else {
				xhr.onreadystatechange = this.onReadyStateChange.bind(this);
			}
			//xhr.onprogress = this.updateProgress.bind(this);
			xhr.ontimeout = this.onTimeout.bind(this)
			xhr.open(this._method, this._url, true);
			this._xhr = xhr;
		}

		/**
		 * @private
		 * 发送请求.
		 * @param data 需要发送的数据
		 */
		public send(data?: any): void {
			if (this._responseType != null) {
				this._xhr.responseType = this._responseType;
			}
			if (this._withCredentials != null) {
				this._xhr.withCredentials = this._withCredentials;
			}
			if (this._headerObj) {
				for (let key in this._headerObj) {
					this._xhr.setRequestHeader(key, this._headerObj[key]);
				}
			}
			this._xhr.timeout = this.timeout;
			this._xhr.send(data);
		}

		/**
		 * @private
		 * 如果请求已经被发送,则立刻中止请求.
		 */
		public abort(): void {
			if (this._xhr) {
				this._xhr.abort();
			}
		}

		/**
		 * @private
		 * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
		 */
		public getAllResponseHeaders(): string {
			if (!this._xhr) {
				return null;
			}
			let result = this._xhr.getAllResponseHeaders();
			return result ? result : "";
		}

		private _headerObj: any;

		public get headerObj() {
			return this.headerObj;
		}

		public set headerObj(value) {
			this._headerObj = value;
		}

		/**
		 * @private
		 * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
		 * @param header 将要被赋值的请求头名称.
		 * @param value 给指定的请求头赋的值.
		 */
		public setRequestHeader(header: string, value: string): void {
			if (!this._headerObj) {
				this._headerObj = {};
			}
			this._headerObj[header] = value;
		}

		/**
		 * @private
		 * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
		 * @param header 要返回的响应头名称
		 */
		public getResponseHeader(header: string): string {
			if (!this._xhr) {
				return null;
			}
			let result = this._xhr.getResponseHeader(header);
			return result ? result : "";
		}

		/**
		 * 设置结束回调
		 */
		private callBack: Function;
		private funObj: any;
		//public extraData: ExtraData;
		public setCallBackFun(callBack: Function, funObj: any) {
			let s = this;
			s.callBack = callBack;
			s.funObj = funObj;
			//s.extraData = extraData;
		}

		/**
		 * 执行结束回调
		 */
		private loadFinishCall() {
			let s = this;
			if (s.callBack) {
				s.callBack.call(s.funObj, s);
				s.callBack = null;
			}
		}

		/**
		 * @private
		 */
		private onTimeout(): void {
			console.log("请求超时：" + this._url);
			//this.dispatchEventWith(IOErrorEvent.IO_ERROR);
			this.loadFinishCall();
		}

		/**
		 * @private
		 */
		private onReadyStateChange(): void {
			let xhr = this._xhr;
			if (xhr.readyState == 4) {// 4 = "loaded"
				let ioError = (xhr.status >= 400 || xhr.status == 0);
				let url = this._url;
				let self = this;
				window.setTimeout(function (): void {
					self.loadFinishCall();
					if (ioError) {//请求错误
						console.log("请求错误：" + url);
					}
				}, 0)
			}
		}

		/**
		 * @private
		 */
		private updateProgress(event): void {
			if (event.lengthComputable) {
				//ProgressEvent.dispatchProgressEvent(this, ProgressEvent.PROGRESS, event.loaded, event.total);
			}
		}


		/**
		 * @private
		 */
		private onload(): void {
			let self = this;
			let xhr = this._xhr;
			let url = this._url;
			let ioError = (xhr.status >= 400);
			window.setTimeout(function (): void {
				self.loadFinishCall();
				if (ioError) {//请求错误
					console.log("请求错误：" + url);
				}
			}, 0);
		}

		/**
		 * @private
		 */
		private onerror(): void {
			let url = this._url;
			let self = this;
			window.setTimeout(function (): void {
				self.loadFinishCall();
				console.log("请求错误：" + url);
			}, 0);
		}
	}
}


