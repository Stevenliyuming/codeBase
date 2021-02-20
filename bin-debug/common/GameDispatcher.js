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
    // export class EventType {
    // 	public static CLOSE_VIDEO: string = "CLOSE_VIDEO";
    // }
    //谁发送 谁监听
    var GameDispatcher = (function (_super) {
        __extends(GameDispatcher, _super);
        function GameDispatcher() {
            return _super.call(this) || this;
        }
        GameDispatcher.getInstance = function () {
            if (GameDispatcher.instance == null) {
                GameDispatcher.instance = new GameDispatcher();
            }
            return GameDispatcher.instance;
        };
        GameDispatcher.prototype.addEventListener = function (eventName, func, thisObj, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 1; }
            _super.prototype.addEventListener.call(this, eventName, func, thisObj, useCapture, priority);
        };
        GameDispatcher.prototype.removeEventListener = function (eventName, func, thisObj, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            _super.prototype.removeEventListener.call(this, eventName, func, thisObj, useCapture);
        };
        GameDispatcher.prototype.hasEventListener = function (eventName) {
            return _super.prototype.hasEventListener.call(this, eventName);
        };
        GameDispatcher.prototype.once = function (eventName, func, thisObj, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            _super.prototype.once.call(this, eventName, func, thisObj, useCapture);
        };
        GameDispatcher.prototype.dispatchEvent = function (event) {
            var t1 = egret.getTimer();
            var result = _super.prototype.dispatchEvent.call(this, event);
            var gap = egret.getTimer() - t1;
            if (gap > 5) {
                //console.log(StringUtil.substitute("send Evt gap = {1} name = {0}", event.type, gap));
            }
            return result;
        };
        GameDispatcher.prototype.willTrigger = function (eventName) {
            return _super.prototype.willTrigger.call(this, eventName);
        };
        return GameDispatcher;
    }(egret.EventDispatcher));
    codeBase.GameDispatcher = GameDispatcher;
    __reflect(GameDispatcher.prototype, "codeBase.GameDispatcher");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=GameDispatcher.js.map