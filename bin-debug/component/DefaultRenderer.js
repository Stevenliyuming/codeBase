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
    var DefaultRenderer = (function (_super) {
        __extends(DefaultRenderer, _super);
        function DefaultRenderer() {
            var _this = _super.call(this) || this;
            /**
             * item render所在的list
             * @type {null}
             */
            _this.list = null;
            return _this;
        }
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        DefaultRenderer.prototype.initData = function () {
        };
        DefaultRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        DefaultRenderer.prototype.draw = function () {
            _super.prototype.draw.call(this);
        };
        Object.defineProperty(DefaultRenderer.prototype, "data", {
            get: function () {
                return this._data;
            },
            /**
             * 设置数据
             */
            set: function (value) {
                this._data = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 刷新
         */
        DefaultRenderer.prototype.refresh = function () {
            this.data = this._data;
        };
        Object.defineProperty(DefaultRenderer.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            /**
             * 设置选中
             */
            set: function (value) {
                this.setSelected(value);
            },
            enumerable: true,
            configurable: true
        });
        DefaultRenderer.prototype.setSelected = function (value) {
            if (this._selected != value) {
                this._selected = value;
                this.invalidate();
            }
        };
        /**
         * 做ui的销毁
         * 一般情况下,需要手动调用销毁
         */
        DefaultRenderer.prototype.destroy = function () {
        };
        /**
         * 首次材质下载完成会调用加载一次,刷新UI皮肤显示
         * 使用了框架的UI机制,单ui的资源下载完成会调用改方法刷新
         * 若view中有逻辑使用到ui的素材,应该在这里做素材的赋值
         */
        DefaultRenderer.prototype.validateNow = function () {
        };
        return DefaultRenderer;
    }(codeBase.Group));
    codeBase.DefaultRenderer = DefaultRenderer;
    __reflect(DefaultRenderer.prototype, "codeBase.DefaultRenderer");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=DefaultRenderer.js.map