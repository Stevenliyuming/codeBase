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
        function Label() {
            var _this = _super.call(this) || this;
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
            _this._wordWrap = false; //自动换行
            _this._stroke = 0;
            _this._strokeColor = 0x003350;
            _this._html = false;
            /**
             * 根据文字自动调整Label的尺寸
             */
            _this._autoSize = true;
            _this._paddingLeft = 0;
            _this._paddingRight = 0;
            _this._paddingTop = 0;
            _this._paddingBottom = 0;
            //if (!this._autoSize) this.setSize(Style.TEXTINPUT_WIDTH, Style.TEXTINPUT_HEIGHT);
            _this._textField = new egret.TextField();
            _this._textField.addEventListener(egret.Event.CHANGE, _this.onTextChange, _this);
            _this.addChild(_this._textField);
            _this.clip = false;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        Label.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        Label.prototype.initData = function () {
            _super.prototype.initData.call(this);
        };
        /**
         * Called when the text in the text field is manually changed.
         */
        Label.prototype.onTextChange = function (event) {
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
                var s = this;
                if (s._text != value) {
                    s._text = value;
                    if (s._html) {
                        if (s._text == null) {
                            s._text = "";
                            s._initFlow = [];
                        }
                        else {
                            if (s._htmlTextParser == null)
                                s._htmlTextParser = new egret.HtmlTextParser();
                            s._initFlow = s._htmlTextParser.parser(s._text);
                        }
                    }
                    else {
                        if (s._text == null) {
                            s._text = "";
                        }
                    }
                    s.draw();
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
        /**
         * Draws the visual ui of the component.
         */
        Label.prototype.draw = function () {
            var s = this;
            // super.draw();
            if (s._textField == null)
                return;
            //console.log("@@label draw text=" + this._text);
            if (s._fontName != null) {
                s._textField.fontFamily = s.fontName;
            }
            if (s._color >= 0)
                s._textField.textColor = s._color;
            if (s._fontSize > 0)
                s._textField.size = s._fontSize;
            s._textField.bold = s._bold;
            s._textField.italic = s._italic;
            s._textField.multiline = s._multiline;
            s._textField.lineSpacing = s._lineSpacing;
            s._textField.stroke = s._stroke;
            s._textField.strokeColor = s._strokeColor;
            s._textField.wordWrap = s._wordWrap;
            if (s._html) {
                if (s._initFlow)
                    s._textField.textFlow = s._initFlow;
                s._initFlow = null;
            }
            else {
                s._textField.text = s._text;
            }
            if (s._autoSize) {
                s.setSize(s._textField.measuredWidth, s._textField.measuredHeight);
            }
            else {
                s._textField.width = s.width;
                s._textField.height = s.height;
                var newWidth = s._textField.width - s._paddingLeft - s._paddingRight;
                var newHeight = s._textField.height - s._paddingTop - s._paddingBottom;
                s._textField.width = newWidth;
                s._textField.height = newHeight;
                s._textField.x = s._paddingLeft;
                s._textField.y = s._paddingTop;
            }
            s._textField.textAlign = s._hAlign;
            s._textField.verticalAlign = s._vAlign;
            _super.prototype.draw.call(this);
        };
        Object.defineProperty(Label.prototype, "paddingLeft", {
            get: function () {
                return this._paddingLeft;
            },
            /**
             * 文本区域左边距偏移
             */
            set: function (value) {
                if (this._paddingLeft != value) {
                    this._paddingLeft = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "paddingRight", {
            get: function () {
                return this._paddingRight;
            },
            /**
             * 文本区域右边距偏移
             */
            set: function (value) {
                if (this._paddingRight != value) {
                    this._paddingRight = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "paddingTop", {
            get: function () {
                return this._paddingTop;
            },
            /**
             * 文本区域顶部边距偏移
             */
            set: function (value) {
                if (this._paddingTop != value) {
                    this._paddingTop = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "paddingBottom", {
            get: function () {
                return this._paddingBottom;
            },
            /**
             * 文本区域底部边距偏移
             */
            set: function (value) {
                if (this._paddingBottom != value) {
                    this._paddingBottom = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "wordWrap", {
            /**
             * 设置自动换行
             */
            get: function () {
                return this._wordWrap;
            },
            set: function (value) {
                if (this._wordWrap != value) {
                    this._wordWrap = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
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
