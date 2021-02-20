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
    var BasicLayout = (function (_super) {
        __extends(BasicLayout, _super);
        function BasicLayout() {
            var _this = _super.call(this) || this;
            _this.dataEvent = new Object;
            _this.init();
            return _this;
        }
        /**加载到舞台之前调用 */
        BasicLayout.prototype.init = function () {
        };
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        BasicLayout.prototype.initData = function () {
        };
        /**
         * 初始化主场景的组件
         * 子类覆写该方法,添加UI逻辑
         */
        BasicLayout.prototype.createChildren = function () {
        };
        /**分发事件*/
        BasicLayout.prototype.dispEvent = function (type, data, dataType) {
            if (data === void 0) { data = null; }
            if (dataType === void 0) { dataType = null; }
            if (this.dataEvent) {
                var fun = this.dataEvent[type];
                if (fun != null) {
                    var layoutEvent = new codeBase.LayoutEvent;
                    layoutEvent.currentTarget = this;
                    layoutEvent.data = data;
                    layoutEvent.type = type;
                    layoutEvent.dataType = dataType;
                    if (fun["this"]) {
                        fun.apply(fun["this"], [layoutEvent]);
                    }
                    else {
                        fun(layoutEvent);
                    }
                }
            }
        };
        /**帧听事件*/
        BasicLayout.prototype.addEvent = function (type, listener, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var s = this;
            if (s.dataEvent && s.dataEvent[type] == null) {
                listener["this"] = thisObj;
                s.dataEvent[type] = listener;
            }
        };
        /**删除事件*/
        BasicLayout.prototype.removeEvent = function (type, listener) {
            var s = this;
            if (s.dataEvent && s.dataEvent[type]) {
                delete s.dataEvent[type];
            }
        };
        /**把自己从父级删除*/
        BasicLayout.prototype.removeFromParent = function (value) {
            if (value === void 0) { value = false; }
            var s = this;
            var _parent = this.parent;
            if (value)
                s.dispose();
            if (_parent && _parent.contains(s))
                _parent.removeChild(s);
            _parent = null;
        };
        /**删除所有的*/
        BasicLayout.prototype.removeChildAll = function (dispose) {
            if (dispose === void 0) { dispose = false; }
            while (this.numChildren > 0) {
                this.removeChildIndex(0, dispose);
            }
        };
        /**删除index层的*/
        BasicLayout.prototype.removeChildIndex = function (index, dispose) {
            var s = this;
            if (index >= 0 || index < s.numChildren) {
                var basicContent = s.getChildAt(index);
                if (basicContent instanceof BasicLayout) {
                    basicContent.removeFromParent(dispose);
                }
                else {
                    var display = this.getChildAt(index);
                    if (display.parent)
                        display.parent.removeChild(display);
                }
            }
        };
        /**销毁*/
        BasicLayout.prototype.dispose = function () {
            var s = this;
            s.removeChildAll(true);
            s.dataEvent = null;
        };
        return BasicLayout;
    }(codeBase.BaseGroup));
    codeBase.BasicLayout = BasicLayout;
    __reflect(BasicLayout.prototype, "codeBase.BasicLayout");
})(codeBase || (codeBase = {}));
