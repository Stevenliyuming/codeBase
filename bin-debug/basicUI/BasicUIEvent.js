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
     * UI组件变化事件分发和侦听处理类
     */
    var BasicUIEvent = (function (_super) {
        __extends(BasicUIEvent, _super);
        function BasicUIEvent(type, data, currentTarget) {
            if (type === void 0) { type = ""; }
            if (data === void 0) { data = null; }
            if (currentTarget === void 0) { currentTarget = null; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.data = data;
            _this.currentTarget = currentTarget;
            return _this;
        }
        //mouse event
        BasicUIEvent.MOUSE_OVER = "event-over"; //移进
        BasicUIEvent.MOUSE_OUT = "event-out"; //移出
        BasicUIEvent.MOUSE_DOWN = "event-down"; //点下
        BasicUIEvent.MOUSE_MOVE = "event-move"; //移动
        BasicUIEvent.MOUSE_UP = "event-up"; //弹开
        BasicUIEvent.CLICK = "event-click"; //单击
        //other event
        BasicUIEvent.CHANGE = "change"; //更换
        BasicUIEvent.COMPLETE = "complete"; //完成
        BasicUIEvent.ERROR = "error"; //错误
        BasicUIEvent.RENDER_COMPLETE = "render complete"; //渲染完成
        BasicUIEvent.UPDATE = "update"; //更新
        BasicUIEvent.START = "start"; //开始
        BasicUIEvent.MOVE = "move"; //移动
        BasicUIEvent.OVER = "over"; //结束
        BasicUIEvent.PAUSE = "pause"; //暂停
        BasicUIEvent.STOP = "stop"; //停止
        BasicUIEvent.PLAY = "play"; //播放
        BasicUIEvent.OPEN = "open"; //开启
        BasicUIEvent.CLOSE = "close"; //关闭
        //egret event
        BasicUIEvent.ADDED_TO_STAGE = egret.Event.ADDED_TO_STAGE;
        BasicUIEvent.ENTER_FRAME = egret.Event.ENTER_FRAME;
        BasicUIEvent.TOUCH_BEGIN = egret.TouchEvent.TOUCH_BEGIN;
        BasicUIEvent.TOUCH_MOVE = egret.TouchEvent.TOUCH_MOVE;
        BasicUIEvent.TOUCH_END = egret.TouchEvent.TOUCH_END;
        BasicUIEvent.TOUCH_RELEASE_OUTSIDE = egret.TouchEvent.TOUCH_RELEASE_OUTSIDE;
        BasicUIEvent.TOUCH_CANCEL = egret.TouchEvent.TOUCH_CANCEL;
        return BasicUIEvent;
    }(egret.EventDispatcher));
    codeBase.BasicUIEvent = BasicUIEvent;
    __reflect(BasicUIEvent.prototype, "codeBase.BasicUIEvent");
})(codeBase || (codeBase = {}));
