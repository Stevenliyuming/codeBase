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
    var Loader = (function (_super) {
        __extends(Loader, _super);
        // public loadInfo:ResourceItem.LoadInfo;
        // protected requestList:HttpLoader[] = [];
        // protected waitList:HttpLoader[] = [];
        // protected maxRequest:number = 5;
        function Loader() {
            return _super.call(this) || this;
        }
        Loader.getInstance = function () {
            if (!Loader.instance)
                Loader.instance = new Loader;
            return Loader.instance;
        };
        Loader.prototype.load = function (url, data, loadInfo, method, responseType, withCredentials, headerObj) {
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            if (responseType === void 0) { responseType = null; }
            if (withCredentials === void 0) { withCredentials = false; }
            if (headerObj === void 0) { headerObj = null; }
            var s = this;
            var obj = headerObj ? headerObj : {};
            var params = data ? s.formatParams(data) : null;
            var _url = url;
            if (method.toLowerCase() === "get") {
                if (params) {
                    if (url.lastIndexOf("?") != (url.length - 1))
                        _url += "?";
                    _url += params;
                    params = null;
                }
            }
            else {
                obj["Content-type"] = "application/x-www-form-urlencoded";
            }
            var httpLoader = new codeBase.HttpLoader;
            httpLoader.setCallBackFun(s.loadFinishCall, s);
            loadInfo.loader = httpLoader;
            httpLoader.loadInfo = loadInfo;
            httpLoader.open(_url, method);
            httpLoader.withCredentials = withCredentials;
            httpLoader.responseType = responseType;
            httpLoader.headerObj = obj;
            httpLoader.send(params);
            return httpLoader;
        };
        /**
         * 格式化参数
         */
        Loader.prototype.formatParams = function (params) {
            if (!params)
                return null;
            return Object
                .keys(params)
                .map(function (key) {
                return key + "=" + params[key];
            })
                .join("&");
        };
        /**
         * 每个请求完成(包括异常)的回调，
         * target参数 返回请求本身
         */
        Loader.prototype.loadFinishCall = function (target) {
            var s = this;
            if (target.loadInfo && target.loadInfo.callBack) {
                target.loadInfo.callBack.call(target.loadInfo.funObj, target.loadInfo);
            }
            // if(target.extraData && target.extraData.callFun) {
            // 	target.extraData.callFun.call(target.extraData.funObj, target);
            // }
            //console.log(target.response);
        };
        return Loader;
    }(egret.EventDispatcher));
    codeBase.Loader = Loader;
    __reflect(Loader.prototype, "codeBase.Loader");
})(codeBase || (codeBase = {}));
