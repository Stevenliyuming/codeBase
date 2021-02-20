var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MyEventDispatcher = (function () {
        function MyEventDispatcher() {
        }
        MyEventDispatcher.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
        };
        MyEventDispatcher.prototype.once = function (type, listener, thisObject, useCapture, priority) {
        };
        MyEventDispatcher.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
        };
        MyEventDispatcher.prototype.hasEventListener = function (type) {
            return false;
        };
        MyEventDispatcher.prototype.dispatchEvent = function (event) {
            return true;
        };
        MyEventDispatcher.prototype.willTrigger = function (type) {
            return false;
        };
        Object.defineProperty(MyEventDispatcher.prototype, "hashCode", {
            get: function () {
                return this.$hashCode;
            },
            enumerable: true,
            configurable: true
        });
        return MyEventDispatcher;
    }());
    codeBase.MyEventDispatcher = MyEventDispatcher;
    __reflect(MyEventDispatcher.prototype, "codeBase.MyEventDispatcher", ["egret.IEventDispatcher"]);
})(codeBase || (codeBase = {}));
