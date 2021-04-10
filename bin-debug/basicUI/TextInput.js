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
     * 文本输入框
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            var _this = _super.call(this) || this;
            _this._textField = null;
            _this._text = "";
            _this._password = false;
            _this._fontName = codeBase.Style.fontName; //字体
            _this._fontSize = codeBase.Style.fontSize; //字体大小
            _this._fontColor = codeBase.Style.TEXTINPUT_COLOR; //字体颜色
            _this._hAlign = egret.HorizontalAlign.LEFT;
            _this._vAlign = egret.VerticalAlign.TOP;
            _this._bold = false;
            _this._italic = false;
            _this._lineSpacing = 10; //行间距
            _this._multiline = false; //多行显示
            _this._stroke = 0;
            _this._strokeColor = 0;
            _this._wordWrap = true; //自动换行
            _this._maxChars = 0; //输入最大字符
            _this._restrict = null; //限制输入
            _this._inputType = null; //键盘输入类型
            _this._paddingLeft = 0;
            _this._paddingRight = 0;
            _this._paddingTop = 0;
            _this._paddingBottom = 0;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        TextInput.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //this.setSize(Style.TEXTINPUT_WIDTH, Style.TEXTINPUT_HEIGHT);
            this.bgColor = codeBase.Style.INPUT_TEXT;
            this.clip = false;
            this.touchEnabled = true;
            this._textField = new codeBase.TextField();
            this._textField.width = this.width;
            this._textField.height = this.height;
            this._textField.displayAsPassword = false;
            this._textField.type = egret.TextFieldType.INPUT;
            this._textField.addEventListener(codeBase.BasicUIEvent.CHANGE, this.onTextChange, this);
            this._textField.touchEnabled = true;
            this.addChild(this._textField);
        };
        /**
         * 文字输入变化处理
         */
        TextInput.prototype.onTextChange = function (event) {
            this._text = this._textField.text;
            //console.log("TextInput Change text=" + this._text);
            //this.invalidate();
        };
        /**
         * 返回文字输入对象
         */
        TextInput.prototype.getTextField = function () {
            return this._textField;
        };
        /**
         * 绘制组件内容
         */
        TextInput.prototype.draw = function () {
            _super.prototype.draw.call(this);
            //console.log("TextInput draw=" + this._textField + ", text=" + this._textField.type);
            var s = this;
            if (!s._textField)
                return;
            if (s._fontName != null) {
                s._textField.fontFamily = s._fontName;
            }
            if (s._textField.width != s.width)
                s._textField.width = s.width;
            if (s._textField.height != s.height)
                s._textField.height = s.height;
            var newWidth = s._textField.width - s._paddingLeft - s._paddingRight;
            var newHeight = s._textField.height - s._paddingTop - s._paddingBottom;
            s._textField.width = newWidth;
            s._textField.height = newHeight;
            s._textField.x = s._paddingLeft;
            s._textField.y = s._paddingTop;
            if (s._fontColor >= 0)
                s._textField.textColor = s._fontColor;
            if (s._fontSize > 0)
                s._textField.size = s._fontSize;
            s._textField.textAlign = s._hAlign;
            s._textField.verticalAlign = s._vAlign;
            s._textField.bold = s._bold;
            s._textField.italic = s._italic;
            s._textField.multiline = s._multiline;
            s._textField.lineSpacing = s._lineSpacing;
            s._textField.stroke = s._stroke;
            s._textField.strokeColor = s._strokeColor;
            s._textField.displayAsPassword = s._password;
            s._textField.text = s._text;
            s._textField.wordWrap = s._wordWrap;
            s._textField.maxChars = s._maxChars;
            if (codeBase.StringUtil.isUsage(s._restrict))
                s._textField.restrict = s._restrict;
            if (codeBase.StringUtil.isUsage(s._inputType))
                s._textField.inputType = s._inputType;
        };
        Object.defineProperty(TextInput.prototype, "paddingLeft", {
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
        Object.defineProperty(TextInput.prototype, "paddingRight", {
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
        Object.defineProperty(TextInput.prototype, "paddingTop", {
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
        Object.defineProperty(TextInput.prototype, "paddingBottom", {
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
        Object.defineProperty(TextInput.prototype, "fontName", {
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
        Object.defineProperty(TextInput.prototype, "password", {
            get: function () {
                return this._password;
            },
            /**
             * 设置文本输入为密码输入,采用掩码显示输入的内容
             * @param value
             *
             */
            set: function (value) {
                if (this._password != value) {
                    this._password = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "fontSize", {
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
        Object.defineProperty(TextInput.prototype, "fontColor", {
            get: function () {
                return this._fontColor;
            },
            /**
             * 设置文本颜色
             * @param value
             *
             */
            set: function (value) {
                if (this._fontColor != value) {
                    this._fontColor = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "text", {
            get: function () {
                return this._text;
            },
            /**
             * 显示和设置文字
             */
            set: function (t) {
                if (this._text != t) {
                    this._text = t;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "lineSpacing", {
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
        Object.defineProperty(TextInput.prototype, "multiline", {
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
        Object.defineProperty(TextInput.prototype, "wordWrap", {
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
        Object.defineProperty(TextInput.prototype, "stroke", {
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
        Object.defineProperty(TextInput.prototype, "strokeColor", {
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
        Object.defineProperty(TextInput.prototype, "hAlign", {
            /**
             * 文字水平对齐方式
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
        Object.defineProperty(TextInput.prototype, "vAlign", {
            /**
             * 文字竖直对齐方式
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
        TextInput.prototype.setFocus = function () {
            if (this._textField) {
                this._textField.setFocus();
            }
        };
        Object.defineProperty(TextInput.prototype, "maxChars", {
            get: function () {
                return this._maxChars;
            },
            /**
             * 最大输入字符
             * @param value
             */
            set: function (value) {
                if (this._maxChars != value) {
                    this._maxChars = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "restrict", {
            get: function () {
                return this._restrict;
            },
            /**
             * 正则表达式,限制输入
             * @param value
             */
            set: function (value) {
                if (this._restrict != value) {
                    this._restrict = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "inputType", {
            get: function () {
                return this._inputType;
            },
            /**
             * 键盘类型
             * @param value
             */
            set: function (value) {
                if (this._inputType != value) {
                    this._inputType = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        return TextInput;
    }(codeBase.Group));
    codeBase.TextInput = TextInput;
    __reflect(TextInput.prototype, "codeBase.TextInput");
})(codeBase || (codeBase = {}));
