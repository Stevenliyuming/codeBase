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
        function Group(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this, drawDelay) || this;
            /**
             * 是否显示默认样式 ,
             * 默认为true,显示.
             */
            _this._showBg = true;
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
            _this._scale9GridEnable = false; //九宫拉伸生效
            _this._scale9GridRect = null; //九宫拉伸的尺寸
            //private _scaleEnable:Boolean = true;
            _this._fillMode = "scale"; //scale, repeat.
            /**
             * 默认背景是否带边框
             */
            _this._border = true;
            /**
             * 是否将子代剪切到视区的边界,
             * 默认为true,剪切.
             */
            _this._clip = false;
            _this._touchNonePixel = false; //没有像素点时是否能触发事件
            return _this;
        }
        /**
         * 初始化主场景的组件
         * 这个方法在对象new的时候就调用,因为有些ui必须在加入stage之前就准备好
         * 子类覆写该方法,添加UI逻辑
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
            //public set enabled(value:boolean) {
            //this._enabled = value;
            //    //this.touchEnabled = value;
            //    this.alpha = this.enabled ? 1.0 : 0.5;
            //}
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
            if (this.width == 0 || this.height == 0)
                return;
            _super.prototype.draw.call(this);
            //console.log("Group draw");
            //console.log("Group draw this._clip=" + this._clip + ", _showBg=" + this._showBg);
            if (this._clip) {
                var rect = codeBase.ObjectPool.getByClass(egret.Rectangle);
                if (this.scrollRect) {
                    codeBase.ObjectPool.recycleClass(this.scrollRect);
                    this.scrollRect = null;
                }
                rect.width = this.width;
                rect.height = this.height;
                rect.x = 0;
                rect.y = 0;
                this.scrollRect = rect;
            }
            else {
                this.scrollRect = null;
            }
            //console.log("Group draw this._showDefaultSkin=" + this._showDefaultSkin);
            if (this._showBg || (this._touchNonePixel && this.touchEnabled)) {
                this.addDefaultSkin();
                if (this._bgImage) {
                    this._bgImage.visible = true;
                    if (this._touchNonePixel && !this._showBg) {
                        this._bgImage.alpha = 0;
                    }
                    else {
                        this._bgImage.alpha = 1;
                    }
                }
            }
            else {
                if (this._bgImage) {
                    this._bgImage.visible = false;
                    if (this._bgImage.parent) {
                        this._bgImage.parent.removeChild(this._bgImage);
                    }
                }
            }
        };
        /**
         * 创建背景应用的quad 用于showdefaultskin显示
         */
        Group.prototype.addDefaultSkin = function () {
            //console.log("Group addDefaultSkin this.width=" + this.width + ", this.height=" + this.height)
            if (this.width > 0 && this.height > 0) {
                if (this._bgImage == null) {
                    this._bgImage = new egret.Bitmap();
                }
                if (this._bgTexture == null) {
                    this._bgImage.fillMode = egret.BitmapFillMode.SCALE; //拉伸放大方式铺满
                    var shape = new egret.Shape();
                    shape.width = this.width;
                    shape.height = this.height;
                    shape.graphics.beginFill(this._bgColor, 1);
                    shape.graphics.drawRect(0, 0, this.width, this.height);
                    shape.graphics.endFill();
                    if (this._border) {
                        shape.graphics.lineStyle(1, 0x00ff00, 1);
                        shape.graphics.drawRect(0, 0, this.width, this.height);
                    }
                    var renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(shape);
                    this._bgTexture = renderTexture;
                    this._bgImage.texture = this._bgTexture;
                }
                else {
                    this._bgImage.texture = this._bgTexture;
                    //TODO 是否要用背景图撑大整个group?
                }
            }
            if (this._bgImage && (this._showBg || (this._touchNonePixel && this.touchEnabled))) {
                if (!this._bgImage.parent)
                    this.addChildAt(this._bgImage, 0);
                if (this._scale9GridEnable) {
                    this._bgImage.scale9Grid = this._scale9GridRect;
                }
                this._bgImage.width = this.width;
                this._bgImage.height = this.height;
                this._bgImage.fillMode = this._fillMode;
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
        Object.defineProperty(Group.prototype, "scale9GridEnable", {
            /**
             * 默认背景texture的九宫格拉伸设定
             * 只有showDefaultSkin并且设置了defaultSkinTexture,才有效
             * 默认绘制的背景是纯色的,所以不需要进行九宫拉伸设定
             */
            get: function () {
                return this._scale9GridEnable;
            },
            set: function (value) {
                if (this._scale9GridEnable != value) {
                    this._scale9GridEnable = value;
                    if (this._scale9GridEnable && this._scale9GridRect == null) {
                        this._scale9GridRect = new egret.Rectangle();
                        this._scale9GridRect.x = 1;
                        this._scale9GridRect.y = 1;
                        this._scale9GridRect.width = 1;
                        this._scale9GridRect.height = 1;
                    }
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "scale9GridX", {
            get: function () {
                if (this._scale9GridRect)
                    return this._scale9GridRect.x;
                return 0;
            },
            /**
             * Sets the x of the bitmap's scale9Grid.
             */
            set: function (value) {
                if (this._scale9GridRect == null) {
                    this._scale9GridRect = new egret.Rectangle();
                    this._scale9GridRect.x = 1;
                    this._scale9GridRect.y = 1;
                    this._scale9GridRect.width = 1;
                    this._scale9GridRect.height = 1;
                }
                if (this._scale9GridRect.x != value) {
                    this._scale9GridRect.x = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "scale9GridY", {
            get: function () {
                if (this._scale9GridRect)
                    return this._scale9GridRect.y;
                return 0;
            },
            /**
             * Sets the y of the bitmap's scale9Grid.
             */
            set: function (value) {
                if (this._scale9GridRect == null) {
                    this._scale9GridRect = new egret.Rectangle();
                    this._scale9GridRect.x = 1;
                    this._scale9GridRect.y = 1;
                    this._scale9GridRect.width = 1;
                    this._scale9GridRect.height = 1;
                }
                if (this._scale9GridRect.y != value) {
                    this._scale9GridRect.y = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "scale9GridWidth", {
            get: function () {
                if (this._scale9GridRect)
                    return this._scale9GridRect.width;
                return 0;
            },
            /**
             * Sets the width of the bitmap's scale9Grid.
             */
            set: function (value) {
                if (this._scale9GridRect == null) {
                    this._scale9GridRect = new egret.Rectangle();
                    this._scale9GridRect.x = 1;
                    this._scale9GridRect.y = 1;
                    this._scale9GridRect.width = 1;
                    this._scale9GridRect.height = 1;
                }
                if (this._scale9GridRect.width != value) {
                    this._scale9GridRect.width = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "scale9GridHeight", {
            get: function () {
                if (this._scale9GridRect)
                    return this._scale9GridRect.height;
                return 0;
            },
            /**
             * Sets the height of the bitmap's scale9Grid.
             */
            set: function (value) {
                if (this._scale9GridRect == null) {
                    this._scale9GridRect = new egret.Rectangle();
                    this._scale9GridRect.x = 1;
                    this._scale9GridRect.y = 1;
                    this._scale9GridRect.width = 1;
                    this._scale9GridRect.height = 1;
                }
                if (this._scale9GridRect.height != value) {
                    this._scale9GridRect.height = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "scale9GridRect", {
            /**
             * 九宫设置的区域
             * @returns {egret.Rectangle}
             */
            get: function () {
                return this._scale9GridRect;
            },
            set: function (rect) {
                this._scale9GridRect = rect;
            },
            enumerable: true,
            configurable: true
        });
        return Group;
    }(codeBase.BaseGroup));
    codeBase.Group = Group;
    __reflect(Group.prototype, "codeBase.Group");
})(codeBase || (codeBase = {}));
