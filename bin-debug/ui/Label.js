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
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this, drawDelay) || this;
            _this._text = ""; //文本内容
            _this._textField = null;
            _this._initFlow = null;
            _this._htmlTextParser = null;
            _this._fontSize = codeBase.Style.fontSize; //字体大小
            _this._color = codeBase.Style.LABEL_TEXT; //字体颜色
            _this._fontName = codeBase.Style.fontName; //字体名称
            _this._hAlign = egret.HorizontalAlign.LEFT;
            _this._vAlign = egret.VerticalAlign.MIDDLE;
            _this._bold = false;
            _this._italic = false;
            _this._lineSpacing = 0; //行间距
            _this._multiline = false; //多行显示
            _this._stroke = 0;
            _this._strokeColor = 0x003350;
            _this._html = false;
            _this._autoSize = false; //根据文字自动调整Label的尺寸
            _this._link = null;
            return _this;
        }
        Label.prototype.initData = function () {
            _super.prototype.initData.call(this);
        };
        /**
         * 初始化主场景的组件,加入场景时,主动调用一次
         * 子类覆写该方法,添加UI逻辑
         */
        Label.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (!this._autoSize)
                this.setSize(codeBase.Style.TEXTINPUT_WIDTH, codeBase.Style.TEXTINPUT_HEIGHT);
            this._textField = new egret.TextField();
            this._textField.addEventListener(egret.Event.CHANGE, this.onChangeHdl, this);
            this.addChild(this._textField);
            this.invalidate();
        };
        /**
         * Called when the text in the text field is manually changed.
         */
        Label.prototype.onChangeHdl = function (event) {
            this._text = this._textField.text;
        };
        Object.defineProperty(Label.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (this._text != value) {
                    this._text = value;
                    if (this._html) {
                        if (this._text == null) {
                            this._text = "";
                            this._initFlow = [];
                        }
                        else {
                            if (this._htmlTextParser == null)
                                this._htmlTextParser = new egret.HtmlTextParser();
                            this._initFlow = this._htmlTextParser.parser(this._text);
                        }
                    }
                    else {
                        if (this._text == null) {
                            this._text = "";
                        }
                    }
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 文本内容显示对象
         */
        Label.prototype.getTextField = function () {
            return this._textField;
        };
        ///////////////////////////////////
        // public methods
        ///////////////////////////////////
        /**
         * Draws the visual ui of the component.
         */
        Label.prototype.draw = function () {
            _super.prototype.draw.call(this);
            if (this._textField == null)
                return;
            //console.log("@@label draw text=" + this._text);
            if (this._fontName != null) {
                this._textField.fontFamily = this.fontName;
            }
            if (this._color >= 0)
                this._textField.textColor = this._color;
            if (this._fontSize > 0)
                this._textField.size = this._fontSize;
            this._textField.bold = this._bold;
            this._textField.italic = this._italic;
            this._textField.multiline = this._multiline;
            this._textField.lineSpacing = this._lineSpacing;
            this._textField.stroke = this._stroke;
            this._textField.strokeColor = this._strokeColor;
            if (this._html) {
                if (this._initFlow)
                    this._textField.textFlow = this._initFlow;
                this._initFlow = null;
            }
            else {
                this._textField.text = this._text;
            }
            if (this._autoSize) {
                this.height = this._textField.measuredHeight;
                this.width = this._textField.measuredWidth;
            }
            else {
                this._textField.width = this.width;
                //this._textField.height = this.height;
                if (this._vAlign == egret.VerticalAlign.MIDDLE) {
                    this._textField.y = (this.height - this._textField.height) / 2;
                }
                else if (this._vAlign == egret.VerticalAlign.BOTTOM) {
                    this._textField.y = this.height - this._textField.height;
                }
                else {
                    this._textField.y = 0;
                }
            }
            this._textField.textAlign = this._hAlign;
            this._textField.verticalAlign = this._vAlign;
        };
        Object.defineProperty(Label.prototype, "italic", {
            get: function () {
                return this._italic;
            },
            /**
             * 设置文本是否斜体
             * @param value
             *
             */
            set: function (value) {
                if (this._italic != value) {
                    this._italic = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "bold", {
            get: function () {
                return this._bold;
            },
            /**
             * 设置文本是否粗体
             * @param value
             *
             */
            set: function (value) {
                if (this._bold != value) {
                    this._bold = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "fontName", {
            get: function () {
                return this._fontName;
            },
            /**
             * 设置文本字体
             * @param value
             *
             */
            set: function (value) {
                if (this._fontName != value) {
                    this._fontName = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            /**
             * 设置文本字体大小
             * @param value
             *
             */
            set: function (value) {
                if (this._fontSize != value) {
                    this._fontSize = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "color", {
            get: function () {
                return this._color;
            },
            /**
             * 设置文本颜色
             * @param value
             *
             */
            set: function (value) {
                if (this._color != value) {
                    this._color = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "lineSpacing", {
            /**
             * 设置多行间距，外部设置一般为正数
             */
            get: function () {
                return this._lineSpacing;
            },
            set: function (value) {
                if (this._lineSpacing != value) {
                    this._lineSpacing = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "multiline", {
            /**
             * 设置多行间距，外部设置一般为正数
             */
            get: function () {
                return this._multiline;
            },
            set: function (value) {
                if (this._multiline != value) {
                    this._multiline = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "stroke", {
            /**
             * 文字描边
             */
            get: function () {
                return this._stroke;
            },
            set: function (value) {
                if (this._stroke != value) {
                    this._stroke = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "strokeColor", {
            /**
             * 文字描边颜色
             */
            get: function () {
                return this._strokeColor;
            },
            set: function (value) {
                if (this._strokeColor != value) {
                    this._strokeColor = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "autoSize", {
            /**
             * 是否自动计算文字的尺寸来设置label尺寸
             */
            get: function () {
                return this._autoSize;
            },
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "hAlign", {
            /**
     * 水平对齐设置
     * 默认egret.HorizontalAlign.LEFT;
     */
            get: function () {
                return this._hAlign;
            },
            set: function (value) {
                if (this._hAlign != value) {
                    this._hAlign = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "vAlign", {
            /**
             * 竖直对齐设置
             * 默认egret.VerticalAlign.MIDDLE;
             */
            get: function () {
                return this._vAlign;
            },
            set: function (value) {
                if (this._vAlign != value) {
                    this._vAlign = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "html", {
            get: function () {
                return this._html;
            },
            /**
             * html的文本
             * @param value
             */
            set: function (value) {
                if (this._html != value) {
                    this._html = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        return Label;
    }(codeBase.Group));
    codeBase.Label = Label;
    __reflect(Label.prototype, "codeBase.Label");
})(codeBase || (codeBase = {}));
