var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    // type ExtraData = {
    // 	callFun: Function,
    // 	funObj: any
    // }
    var HttpLoader = (function () {
        function HttpLoader() {
            this.timeout = 0;
            this._url = "";
            this._method = "";
            this.responseType = "text";
            this.withCredentials = false;
            this.timeout = 3000;
        }
        Object.defineProperty(HttpLoader.prototype, "responseType", {
            /**
             * @private
             * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
             */
            get: function () {
                return this._responseType;
            },
            set: function (value) {
                this._responseType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpLoader.prototype, "response", {
            /**
             * @private
             * 本次请求返回的数据，数据类型根据responseType设置的值确定。
             */
            get: function () {
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
                    var w = window;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HttpLoader.prototype, "withCredentials", {
            /**
             * @private
             * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
             */
            get: function () {
                return this._withCredentials;
            },
            set: function (value) {
                this._withCredentials = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        HttpLoader.prototype.getXHR = function () {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            }
            else {
                return new ActiveXObject("MSXML2.XMLHTTP");
            }
        };
        /**
         * @private
         * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
         */
        HttpLoader.prototype.open = function (url, method) {
            if (method === void 0) { method = "GET"; }
            this._url = url;
            this._method = method;
            if (this._xhr) {
                this._xhr.abort();
                this._xhr = null;
            }
            var xhr = this.getXHR(); //new XMLHttpRequest();
            if (window["XMLHttpRequest"]) {
                xhr.addEventListener("load", this.onload.bind(this));
                xhr.addEventListener("error", this.onerror.bind(this));
            }
            else {
                xhr.onreadystatechange = this.onReadyStateChange.bind(this);
            }
            //xhr.onprogress = this.updateProgress.bind(this);
            xhr.ontimeout = this.onTimeout.bind(this);
            xhr.open(this._method, this._url, true);
            this._xhr = xhr;
        };
        /**
         * @private
         * 发送请求.
         * @param data 需要发送的数据
         */
        HttpLoader.prototype.send = function (data) {
            if (this._responseType != null) {
                this._xhr.responseType = this._responseType;
            }
            if (this._withCredentials != null) {
                this._xhr.withCredentials = this._withCredentials;
            }
            if (this._headerObj) {
                for (var key in this._headerObj) {
                    this._xhr.setRequestHeader(key, this._headerObj[key]);
                }
            }
            this._xhr.timeout = this.timeout;
            this._xhr.send(data);
        };
        /**
         * @private
         * 如果请求已经被发送,则立刻中止请求.
         */
        HttpLoader.prototype.abort = function () {
            if (this._xhr) {
                this._xhr.abort();
            }
        };
        /**
         * @private
         * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
         */
        HttpLoader.prototype.getAllResponseHeaders = function () {
            if (!this._xhr) {
                return null;
            }
            var result = this._xhr.getAllResponseHeaders();
            return result ? result : "";
        };
        Object.defineProperty(HttpLoader.prototype, "headerObj", {
            get: function () {
                return this.headerObj;
            },
            set: function (value) {
                this._headerObj = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
         * @param header 将要被赋值的请求头名称.
         * @param value 给指定的请求头赋的值.
         */
        HttpLoader.prototype.setRequestHeader = function (header, value) {
            if (!this._headerObj) {
                this._headerObj = {};
            }
            this._headerObj[header] = value;
        };
        /**
         * @private
         * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
         * @param header 要返回的响应头名称
         */
        HttpLoader.prototype.getResponseHeader = function (header) {
            if (!this._xhr) {
                return null;
            }
            var result = this._xhr.getResponseHeader(header);
            return result ? result : "";
        };
        //public extraData: ExtraData;
        HttpLoader.prototype.setCallBackFun = function (callBack, funObj) {
            var s = this;
            s.callBack = callBack;
            s.funObj = funObj;
            //s.extraData = extraData;
        };
        /**
         * 执行结束回调
         */
        HttpLoader.prototype.loadFinishCall = function () {
            var s = this;
            if (s.callBack) {
                s.callBack.call(s.funObj, s);
                s.callBack = null;
            }
        };
        /**
         * @private
         */
        HttpLoader.prototype.onTimeout = function () {
            console.log("请求超时：" + this._url);
            //this.dispatchEventWith(IOErrorEvent.IO_ERROR);
            this.loadFinishCall();
        };
        /**
         * @private
         */
        HttpLoader.prototype.onReadyStateChange = function () {
            var xhr = this._xhr;
            if (xhr.readyState == 4) {
                var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
                var url_1 = this._url;
                var self_1 = this;
                window.setTimeout(function () {
                    self_1.loadFinishCall();
                    if (ioError_1) {
                        console.log("请求错误：" + url_1);
                    }
                }, 0);
            }
        };
        /**
         * @private
         */
        HttpLoader.prototype.updateProgress = function (event) {
            if (event.lengthComputable) {
                //ProgressEvent.dispatchProgressEvent(this, ProgressEvent.PROGRESS, event.loaded, event.total);
            }
        };
        /**
         * @private
         */
        HttpLoader.prototype.onload = function () {
            var self = this;
            var xhr = this._xhr;
            var url = this._url;
            var ioError = (xhr.status >= 400);
            window.setTimeout(function () {
                self.loadFinishCall();
                if (ioError) {
                    console.log("请求错误：" + url);
                }
            }, 0);
        };
        /**
         * @private
         */
        HttpLoader.prototype.onerror = function () {
            var url = this._url;
            var self = this;
            window.setTimeout(function () {
                self.loadFinishCall();
                console.log("请求错误：" + url);
            }, 0);
        };
        return HttpLoader;
    }());
    codeBase.HttpLoader = HttpLoader;
    __reflect(HttpLoader.prototype, "codeBase.HttpLoader");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=HttpLoader.js.map