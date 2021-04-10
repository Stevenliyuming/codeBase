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
     * 文本显示域
     */
    var TextArea = (function (_super) {
        __extends(TextArea, _super);
        function TextArea() {
            var _this = _super.call(this) || this;
            _this._text = ""; //文本内容
            _this._initFlow = null;
            _this._htmlTextParser = null;
            _this._textField = null;
            _this._fontSize = codeBase.Style.fontSize; //字体大小
            _this._color = codeBase.Style.LABEL_TEXT; //字体颜色
            _this._fontName = codeBase.Style.fontName; //字体名称
            _this._hAlign = egret.HorizontalAlign.LEFT;
            _this._vAlign = egret.VerticalAlign.TOP;
            _this._bold = false;
            _this._italic = false;
            _this._lineSpacing = 0; //行间距
            _this._stroke = 0;
            _this._strokeColor = 0x003350;
            _this._html = false;
            _this._editable = false; //可编辑状态
            _this._maxChars = 0; //输入最大字符
            _this._restrict = null; //限制输入
            _this._inputType = null; //键盘输入类型
            _this._followForce = false; //当追加数据时,不论当前视图位置,直接追踪
            _this._follow = TextArea.FOLLOW_NONE; //当追加数据时,自动追踪,none,top,bottom
            _this.isAddScollListener = false;
            _this._link = null;
            _this._paddingLeft = 0;
            _this._paddingRight = 0;
            _this._paddingTop = 0;
            _this._paddingBottom = 0;
            /**
             * 鼠标按下
             * @param event
             */
            _this._isTouchBegin = false;
            _this._touchPoint = null;
            _this.moveDelta = 0;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        TextArea.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //this.setSize(Style.SLIDER_WIDTH, Style.SLIDER_WIDTH);
            this._textField = new codeBase.TextField();
            this._textField.multiline = true;
            this._textField.addEventListener(codeBase.BasicUIEvent.CHANGE, this.onTextChange, this);
            this.addChild(this._textField);
            this.touchChildren = false;
        };
        TextArea.prototype.initData = function () {
            _super.prototype.initData.call(this);
        };
        /**
         * 文本滚动设置
         */
        TextArea.prototype.onSetScrollText = function (scroll) {
            if (scroll && !this.isAddScollListener) {
                this.isAddScollListener = true;
                this.touchNonePixel = true;
                this.touchEnabled = true;
                //滚动监听
                this.addEventListener(codeBase.BasicUIEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.addEventListener(codeBase.BasicUIEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(codeBase.BasicUIEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.addEventListener(codeBase.BasicUIEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.addEventListener(codeBase.BasicUIEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCancel, this);
                //console.log("onSetScrollText true");
            }
            else if (!scroll && this.isAddScollListener) {
                this.isAddScollListener = false;
                this.touchNonePixel = false;
                this.touchEnabled = false;
                //滚动监听
                this.removeEventListener(codeBase.BasicUIEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.removeEventListener(codeBase.BasicUIEvent.TOUCH_END, this.onTouchEnd, this);
                this.removeEventListener(codeBase.BasicUIEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.removeEventListener(codeBase.BasicUIEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.removeEventListener(codeBase.BasicUIEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCancel, this);
                //console.log("onSetScrollText false");
            }
        };
        TextArea.prototype.onTouchBegin = function (event) {
            //console.log("onTouchBegin numline=" + this._textField.numLines + ", scollv=" + this._textField.scrollV);
            this._isTouchBegin = true;
            this.moveDelta = 0;
            if (this._touchPoint == null)
                this._touchPoint = new codeBase.Point();
            this._touchPoint.x = event.stageX;
            this._touchPoint.y = event.stageY;
        };
        TextArea.prototype.onTouchEnd = function (event) {
            this._isTouchBegin = false;
        };
        TextArea.prototype.onTouchMove = function (event) {
            if (this._isTouchBegin) {
                //console.log("move");
                this.moveDelta += Math.abs(event.stageY - this._touchPoint.y);
                if (this.moveDelta >= this._fontSize) {
                    this.moveDelta -= this._fontSize;
                    if (event.stageY - this._touchPoint.y > 0) {
                        //console.log("down")
                        if (this._textField.scrollV > 1) {
                            this._textField.scrollV = this._textField.scrollV - 1;
                        }
                    }
                    else {
                        //console.log("up")
                        if (this._textField.scrollV < this._textField.numLines - 1) {
                            this._textField.scrollV = this._textField.scrollV + 1;
                        }
                    }
                }
                this._touchPoint.x = event.stageX;
                this._touchPoint.y = event.stageY;
            }
        };
        TextArea.prototype.onTouchCancel = function (event) {
            this._isTouchBegin = false;
        };
        /**
         * 文本变化监听
         */
        TextArea.prototype.onTextChange = function (event) {
            this._text = this._textField.text;
        };
        Object.defineProperty(TextArea.prototype, "paddingLeft", {
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
        Object.defineProperty(TextArea.prototype, "paddingRight", {
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
        Object.defineProperty(TextArea.prototype, "paddingTop", {
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
        Object.defineProperty(TextArea.prototype, "paddingBottom", {
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
        Object.defineProperty(TextArea.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._text;
            },
            /**
             * 设置文本内容
             * @param value
             */
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
         * 追加文本内容
         * @param value
         */
        TextArea.prototype.append = function (value) {
            var oldLines = this._textField.numLines;
            var oldscrollV = this._textField.scrollV;
            if (this._html) {
                if (this._htmlTextParser == null)
                    this._htmlTextParser = new egret.HtmlTextParser();
                var textFlows = this._htmlTextParser.parser(value);
                if (this._follow == TextArea.FOLLOW_TOP) {
                    textFlows.reverse();
                    for (var i = 0; i < textFlows.length; i++) {
                        this._textField.textFlow.unshift(textFlows[i]);
                    }
                    this._textField.textFlow = this._textField.textFlow;
                    this.draw();
                }
                else {
                    for (var i = 0; i < textFlows.length; i++) {
                        this._textField.appendElement(textFlows[i]);
                    }
                    //console.log("textHeight=" + this._textField.textHeight + ", height=" + this.height);
                    if (this._textField.textHeight > this.height) {
                        this.onSetScrollText(true);
                    }
                    else {
                        this.onSetScrollText(false);
                    }
                }
            }
            else {
                if (this._follow == TextArea.FOLLOW_TOP) {
                    this._text = value + this._text;
                    this.draw();
                }
                else {
                    // this._text += value;
                    this._textField.appendText(value);
                    //console.log("textHeight=" + this._textField.textHeight + ", height=" + this.height);
                    if (this._textField.textHeight > this.height) {
                        this.onSetScrollText(true);
                    }
                    else {
                        this.onSetScrollText(false);
                    }
                }
            }
            if (this._follow != TextArea.FOLLOW_NONE) {
                if (this._follow == TextArea.FOLLOW_TOP) {
                    if (oldLines == 1 || this._followForce) {
                        this.scrollTo(1);
                    }
                }
                else {
                    if (oldLines == oldscrollV || this._followForce) {
                        this.scrollTo(this._textField.numLines);
                    }
                }
            }
        };
        /**
         * 滚动到指定行位置
         * @param value
         */
        TextArea.prototype.scrollTo = function (value) {
            if (this._textField)
                this._textField.scrollV = value;
        };
        /**
         * 文本内容显示对象
         */
        TextArea.prototype.getTextField = function () {
            return this._textField;
        };
        TextArea.prototype.draw = function () {
            _super.prototype.draw.call(this);
            var s = this;
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
            if (s._html) {
                if (s._initFlow)
                    s._textField.textFlow = s._initFlow;
                s._initFlow = null;
            }
            else {
                s._textField.text = s._text;
            }
            if (s._editable) {
                s.touchChildren = true;
                s._textField.type = egret.TextFieldType.INPUT;
            }
            else {
                s.touchChildren = false;
                s._textField.type = egret.TextFieldType.DYNAMIC;
            }
            s._textField.maxChars = s._maxChars;
            if (codeBase.StringUtil.isUsage(s._restrict))
                s._textField.restrict = s._restrict;
            if (codeBase.StringUtil.isUsage(s._inputType))
                s._textField.inputType = s._inputType;
            s._textField.lineSpacing = s._lineSpacing;
            s._textField.stroke = s._stroke;
            s._textField.strokeColor = s._strokeColor;
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
            s._textField.textAlign = s._hAlign;
            s._textField.verticalAlign = s._vAlign;
            //console.log("textHeight=" + this._textField.textHeight + ", height=" + this.height);
            if (s._textField.textHeight > s.height) {
                s.onSetScrollText(true);
            }
            else {
                s.onSetScrollText(false);
            }
        };
        Object.defineProperty(TextArea.prototype, "italic", {
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
        Object.defineProperty(TextArea.prototype, "bold", {
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
        Object.defineProperty(TextArea.prototype, "fontName", {
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
        Object.defineProperty(TextArea.prototype, "fontSize", {
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
        Object.defineProperty(TextArea.prototype, "color", {
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
        Object.defineProperty(TextArea.prototype, "lineSpacing", {
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
        Object.defineProperty(TextArea.prototype, "stroke", {
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
        Object.defineProperty(TextArea.prototype, "strokeColor", {
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
        Object.defineProperty(TextArea.prototype, "hAlign", {
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
        Object.defineProperty(TextArea.prototype, "vAlign", {
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
        Object.defineProperty(TextArea.prototype, "followForce", {
            get: function () {
                return this._followForce;
            },
            /**
             * 当follow打开的时候,可以无视视图位置,append数据之后直接滚动到底部
             * @param value
             */
            set: function (value) {
                this._followForce = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "follow", {
            get: function () {
                return this._follow;
            },
            /**
             * append数据的时候,保持底部触底
             * @param value
             */
            set: function (value) {
                this._follow = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "html", {
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
                    if (this._html) {
                        this.touchChildren = true;
                    }
                    else {
                        this.touchChildren = false;
                    }
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "editable", {
            get: function () {
                return this._editable;
            },
            /**
             * 是否可编辑
             * @param value
             */
            set: function (value) {
                if (this._editable != value) {
                    this._editable = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "maxChars", {
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
        Object.defineProperty(TextArea.prototype, "restrict", {
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
        Object.defineProperty(TextArea.prototype, "inputType", {
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
        TextArea.FOLLOW_NONE = "none";
        TextArea.FOLLOW_TOP = "top";
        TextArea.FOLLOW_BOTTOM = "bottom";
        return TextArea;
    }(codeBase.Group));
    codeBase.TextArea = TextArea;
    __reflect(TextArea.prototype, "codeBase.TextArea");
})(codeBase || (codeBase = {}));
