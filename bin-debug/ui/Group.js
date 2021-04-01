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
     * 带有默认背景的容器
     * 可以设置裁剪区域
     */
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            var _this = _super.call(this) || this;
            /**
             * 是否显示背景
             */
            _this._showBg = false;
            /**
             * 默认背景的颜色
             */
            _this._bgColor = 0xCCCCCC;
            /**
             * 默认背景的显示对象
             */
            _this._bgImage = null;
            _this._bgTexture = null; //背景材质
            //默认背景的显示对象九宫拉伸的设定
            _this._scale9GridRect = null; //九宫拉伸的尺寸
            _this.scale9RectData = [];
            _this._fillMode = "scale"; //scale, repeat.
            /**
             * 默认背景是否带边框
             */
            _this._border = false;
            /**
             * 是否将子代剪切到视区的边界,
             * 默认为true,剪切.
             */
            _this._clip = true;
            //没有像素点时是否能触发事件
            _this._touchNonePixel = false;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        Group.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        Object.defineProperty(Group.prototype, "bgColor", {
            /**
             * 默认样式色块颜色值.
             */
            get: function () {
                return this._bgColor;
            },
            set: function (value) {
                if (this._bgColor != value && this._showBg) {
                    this._bgColor = value;
                    this._bgTexture = null;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "fillMode", {
            /**
             * Sets/gets the fillMode of the scale9Grid bitmap.(scale|repeat)
             */
            get: function () {
                return this._fillMode;
            },
            set: function (value) {
                if (this._fillMode != value) {
                    this._fillMode = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "showBg", {
            get: function () {
                return this._showBg;
            },
            /**
             * 设置默认背景是否显示
             */
            set: function (value) {
                if (this._showBg != value) {
                    this._showBg = value;
                    //console.log("!!!Group set showDefaultSkin=" + this._showDefaultSkin)
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "clip", {
            get: function () {
                return this._clip;
            },
            /**
             * 设置剪裁
             * @param value
             */
            set: function (value) {
                if (value != this._clip) {
                    this._clip = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新显示组件的各项属性,重新绘制显示
         */
        Group.prototype.draw = function () {
            //console.log("Group draw");
            var s = this;
            if (s.width == 0 || s.height == 0)
                return;
            _super.prototype.draw.call(this);
            //console.log("Group draw this._clip=" + this._clip + ", _showBg=" + this._showBg);
            if (s._clip) {
                var rect = codeBase.ObjectPool.getByClass(egret.Rectangle);
                if (s.scrollRect) {
                    codeBase.ObjectPool.recycleClass(s.scrollRect);
                    s.scrollRect = null;
                }
                rect.width = s.width;
                rect.height = s.height;
                rect.x = 0;
                rect.y = 0;
                s.scrollRect = rect;
            }
            else {
                s.scrollRect = null;
            }
            //console.log("Group draw this._showDefaultSkin=" + this._showDefaultSkin);
            if (s._showBg || (s._touchNonePixel && s.touchEnabled)) {
                s.addDefaultSkin();
                if (s._bgImage) {
                    s._bgImage.visible = true;
                    if (s._touchNonePixel && !s._showBg) {
                        s._bgImage.alpha = 0;
                    }
                    else {
                        s._bgImage.alpha = 1;
                    }
                }
            }
            else {
                if (s._bgImage) {
                    s._bgImage.visible = false;
                    if (s._bgImage.parent) {
                        s._bgImage.parent.removeChild(s._bgImage);
                    }
                }
            }
        };
        /**
         * 创建背景应用的quad 用于showdefaultskin显示
         */
        Group.prototype.addDefaultSkin = function () {
            //console.log("Group addDefaultSkin this.width=" + this.width + ", this.height=" + this.height)
            var s = this;
            if (s.width > 0 && s.height > 0) {
                if (s._bgImage == null) {
                    s._bgImage = new egret.Bitmap();
                }
                if (s._bgTexture == null) {
                    s._bgImage.fillMode = egret.BitmapFillMode.SCALE; //拉伸放大方式铺满
                    var shape = new egret.Shape();
                    shape.width = s.width;
                    shape.height = s.height;
                    shape.graphics.beginFill(s._bgColor, 1);
                    shape.graphics.drawRect(0, 0, s.width, s.height);
                    shape.graphics.endFill();
                    if (s._border) {
                        shape.graphics.lineStyle(1, 0x00ff00, 1);
                        shape.graphics.drawRect(0, 0, s.width, s.height);
                    }
                    var renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(shape);
                    s._bgTexture = renderTexture;
                    s._bgImage.texture = s._bgTexture;
                }
                else {
                    s._bgImage.texture = s._bgTexture;
                }
            }
            if (s._bgImage && (s._showBg || (s._touchNonePixel && s.touchEnabled))) {
                if (!s._bgImage.parent)
                    s.addChildAt(s._bgImage, 0);
                if (s.scale9RectData.length == 4) {
                    if (s._scale9GridRect == null)
                        s._scale9GridRect = s.scale9Rect();
                    s._scale9GridRect.x = s.scale9RectData[0];
                    s._scale9GridRect.y = s.scale9RectData[2];
                    s._scale9GridRect.width = s._bgImage.texture.$getTextureWidth() - (s.scale9RectData[0] + s.scale9RectData[1]);
                    s._scale9GridRect.height = s._bgImage.texture.$getTextureHeight() - (s.scale9RectData[2] + s.scale9RectData[3]);
                    s._bgImage.scale9Grid = s._scale9GridRect;
                }
                else {
                    s._bgImage.scale9Grid = null;
                }
                s._bgImage.width = s.width;
                s._bgImage.height = s.height;
                s._bgImage.fillMode = s._fillMode;
            }
        };
        Object.defineProperty(Group.prototype, "border", {
            get: function () {
                return this._border;
            },
            /**
             * 默认皮肤的边框显示
             * true, 显示边框;false,不显示边框.
             * @param value
             *
             */
            set: function (value) {
                if (this._border != value) {
                    this._border = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取背景图显示对象
         * @returns {egret.Bitmap}
         */
        Group.prototype.getDefaultSkin = function () {
            return this._bgImage;
        };
        Object.defineProperty(Group.prototype, "bgTexture", {
            get: function () {
                return this._bgTexture;
            },
            /**
             * 背景的默认材质
             * 会取代自动绘制的背景图
             * @param value
             */
            set: function (value) {
                if (this._bgTexture != value) {
                    this._bgTexture = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "touchNonePixel", {
            get: function () {
                return this._touchNonePixel;
            },
            /**
             * 无像素时是否能触发事件
             */
            set: function (value) {
                if (value != this._touchNonePixel) {
                    this._touchNonePixel = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * scale9Rectangle : [左边距,右边距,上边距,下边距]
         *
         */
        Group.prototype.scale9Grid = function (scale9RectData) {
            if (scale9RectData === void 0) { scale9RectData = []; }
            var s = this;
            if (scale9RectData.length == 4) {
                this.scale9RectData = scale9RectData.concat();
            }
            else {
                this.scale9RectData.length = 0;
            }
            this.invalidate();
        };
        Group.prototype.scale9Rect = function () {
            var rect = new egret.Rectangle();
            rect.x = 1;
            rect.y = 1;
            rect.width = 1;
            rect.height = 1;
            return rect;
        };
        return Group;
    }(codeBase.BaseGroup));
    codeBase.Group = Group;
    __reflect(Group.prototype, "codeBase.Group");
})(codeBase || (codeBase = {}));
