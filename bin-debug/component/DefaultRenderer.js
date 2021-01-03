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
        function DefaultRenderer(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this, drawDelay) || this;
            /**
             * 对应的ui展现
             */
            _this._ui = null;
            /**
             * ui资源已准备好
             * @type {boolean}
             * @private
             */
            _this._uiResReady = false;
            /**
             * item render所在的list
             * @type {null}
             */
            _this.list = null;
            return _this;
        }
        DefaultRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setSize(100, 65);
        };
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        DefaultRenderer.prototype.initData = function () {
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
         * 获取ui层的显示对象
         * @returns {egret.Sprite}
         */
        DefaultRenderer.prototype.getUI = function () {
            return this._ui;
        };
        /**
         * 设置ui层的显示对象
         * @param myui
         */
        DefaultRenderer.prototype.setUI = function (myui) {
            this._ui = myui;
            //console.log("!!!view set ui!! 000 this._ui=" + egret.getQualifiedClassName(this._ui));
            if (this._ui) {
                this.addChild(this._ui);
                this.setSize(this._ui.width, this._ui.height);
                //console.log("!!!view set ui!! 1111 this._ui=" + egret.getQualifiedClassName(this._ui));
            }
            this.showBg = false;
        };
        /**
         * 做ui的销毁
         * 一般情况下,需要手动调用销毁
         */
        DefaultRenderer.prototype.destroy = function () {
            if (this._ui) {
                //if (this._ui.hasOwnProperty("destroy"))this._ui.destroy();
                this._ui = null;
            }
        };
        /**
         * 首次材质下载完成会调用加载一次,刷新UI皮肤显示
         * 使用了框架的UI机制,单ui的资源下载完成会调用改方法刷新
         * 若view中有逻辑使用到ui的素材,应该在这里做素材的赋值
         */
        DefaultRenderer.prototype.validateNow = function () {
            //console.log("clz=" + egret.getQualifiedClassName(this)  + ", validateNow!!")
            if (this._ui && this._ui["validateNow"])
                this._ui["validateNow"]();
            this.drawDelay = false;
            if (this._ui)
                this._ui.drawDelay = false;
        };
        return DefaultRenderer;
    }(codeBase.Group));
    codeBase.DefaultRenderer = DefaultRenderer;
    __reflect(DefaultRenderer.prototype, "codeBase.DefaultRenderer");
})(codeBase || (codeBase = {}));
