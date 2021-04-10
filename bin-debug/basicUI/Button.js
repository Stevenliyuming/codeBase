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
     * 按钮
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super.call(this) || this;
            _this._verticalSplit = true; //默认材质采用竖直切割的方式产生不同状态下的texture
            _this._text = "";
            _this._label = null; //文本
            _this._texture = null; //按钮贴图
            _this._imgDisplay = null; //按钮位图
            _this._textureLabel = null; //文字图片
            _this._imgLabel = null; //显示文字图片的image
            _this._textureIcon = null; //图标
            _this._imgIcon = null; //显示图标用的image
            _this._initDisplayData = false; //是否初始化显示对象
            _this._selected = false; //选择时为ture
            _this.stateArray = [Button.STATUS_UP]; //正常的按钮,只有三态,第四态是禁用态,其他的态可以自己加入
            _this._currentState = Button.STATUS_UP; //当前态
            _this._textureDict = {}; //各材质的映射,在给予img之前,保存在这个映射中
            //文字偏移设定
            _this._labelMarginLeft = NaN;
            _this._labelMarginTop = NaN;
            //icon偏移设定
            _this._iconMarginLeft = NaN;
            _this._iconMarginTop = NaN;
            _this._autoSize = false;
            _this._labelColor = codeBase.Style.BUTTON_TEXT;
            _this._labelBold = false; //label加粗
            _this._labelItalic = false;
            _this._labelLineSpacing = 0; //行间距
            _this._labelMultiline = false; //多行显示
            _this._labelStroke = 0;
            _this._labelStrokeColor = 0x003350;
            _this._fontSize = 30;
            _this._fontName = null;
            _this._scale9GridEnable = false;
            _this._scale9GridRect = []; //九宫拉伸的尺寸
            _this._fillMode = codeBase.Style.SCALE; //scale, repeat, clip
            //像素级检测
            _this._testPixelEnable = false;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        Button.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var s = this;
            s.touchEnabled = true; //事件接收
            s.touchChildren = false;
            //按钮位图
            s._imgDisplay = new codeBase.Image;
            s.addChild(s._imgDisplay);
            s._imgDisplay.width = s.width;
            s._imgDisplay.height = s.height;
            s._imgDisplay.fillMode = s._fillMode;
            s._imgDisplay.touchEnabled = false;
            //文字显示
            s._label = new codeBase.Label();
            s._label.autoSize = true;
            s._label.clip = false;
            s._label.hAlign = egret.HorizontalAlign.CENTER;
            s._label.vAlign = egret.VerticalAlign.MIDDLE;
            s._label.showBg = false;
            s.addChild(s._label);
            s.addEventListener(codeBase.BasicUIEvent.TOUCH_BEGIN, s.onTouchEvent, s);
            //s.addEventListener(BasicUIEvent.TOUCH_MOVE, s.onTouchEvent, s);
            s.addEventListener(codeBase.BasicUIEvent.TOUCH_END, s.onTouchEvent, s);
            s.addEventListener(codeBase.BasicUIEvent.TOUCH_RELEASE_OUTSIDE, s.onTouchReleaseOutside, s);
            s.addEventListener(codeBase.BasicUIEvent.TOUCH_CANCEL, s.onTouchReleaseOutside, s);
        };
        Button.prototype.onTouchEvent = function (event) {
            var s = this;
            if (!s.enabled) {
                event.stopImmediatePropagation();
                return;
            }
            // if (GlobalSetting.STATS_BTN) {
            //     //统计按钮点击
            //     var stateutils = egret.getDefinitionByName("StatsUtil")
            //     if (stateutils) stateutils["trackEvent"]("btn", "touch", s.name, 0);
            // }
            //console.log("Button onTouchEvent=" + event.type);
            if (event.currentTarget == s) {
                //像素检测
                if (s._testPixelEnable && !s.testPixel32(event.localX, event.localY)) {
                    event.stopImmediatePropagation();
                    return;
                }
                if (event.type == codeBase.BasicUIEvent.TOUCH_BEGIN) {
                    s._currentState = Button.STATUS_DOWN;
                    s.onClick();
                    s.onPlaySound();
                }
                else if (event.type == codeBase.BasicUIEvent.TOUCH_END) {
                    s._currentState = Button.STATUS_UP;
                }
                else if (event.type == codeBase.BasicUIEvent.TOUCH_MOVE) {
                    s._currentState = Button.STATUS_OVER;
                }
                if (s.statesLength == 1 && s._currentState == Button.STATUS_DOWN) {
                    s.alpha = 0.8;
                }
                else {
                    s.alpha = 1;
                }
            }
            s.invalidate();
        };
        /**
         * 在外释放
         * @param event
         */
        Button.prototype.onTouchReleaseOutside = function (event) {
            this._currentState = Button.STATUS_UP;
            this.invalidate();
        };
        /**
         * 设置点击按钮回调
         */
        Button.prototype.setClick = function (fun, obj) {
            this.clickFun = fun;
            this.clickFunObj = obj;
        };
        Button.prototype.onClick = function () {
            if (this.clickFun && this.clickFunObj) {
                this.clickFun.call(this.clickFunObj, this);
            }
        };
        Object.defineProperty(Button.prototype, "currentState", {
            get: function () {
                return this._currentState;
            },
            set: function (value) {
                if (this._currentState != value) {
                    this._currentState = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            set: function (value) {
                if (this._texture != value) {
                    this._initDisplayData = false;
                    this._texture = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "fillMode", {
            get: function () {
                return this._fillMode;
            },
            /**
             * 设置填充模式
             * scale|repeat
             */
            set: function (value) {
                if (this._fillMode != value) {
                    this._fillMode = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 九宫设置的区域
         * @returns {Rectangle}
         */
        Button.prototype.scale9GridRect = function () {
            return this._scale9GridRect;
        };
        /**
         * 默认背景texture的九宫格拉伸设定
         * 只有showDefaultSkin并且设置了defaultSkinTexture,才有效
         * 默认绘制的背景是纯色的,所以不需要进行九宫拉伸设定
         * scale9Rectangle : [左边距,右边距,上边距,下边距]
         */
        Button.prototype.scale9Grid = function (scale9Rectangle) {
            if (scale9Rectangle === void 0) { scale9Rectangle = []; }
            if (scale9Rectangle.length == 4) {
                this._scale9GridRect.length = 0;
                this._scale9GridRect = scale9Rectangle.concat();
                // if (this._scale9GridRect == null) {
                //     this._scale9GridRect = new Rectangle;
                // }
                // let x = scale9Rectangle[0];
                // let y = scale9Rectangle[2];
                // let width = this.width - (scale9Rectangle[0] + scale9Rectangle[1]);
                // let height = this.height - (scale9Rectangle[2] + scale9Rectangle[3]);
                // this._scale9GridRect.x = x;
                // this._scale9GridRect.y = y;
                // this._scale9GridRect.width = width;
                // this._scale9GridRect.height = height;
            }
            else {
                this._scale9GridRect = null;
            }
            this.invalidate();
        };
        /**
         * 绘制
         */
        Button.prototype.draw = function () {
            //super.draw();
            //if (this._data)console.log("@@Button draw _text=" + this._text + ", selected=" + this.selected + ", data=" + this._data.id);
            //初始化显示对象和数据
            var s = this;
            if (!s._initDisplayData) {
                if (!s._texture) {
                    if (Button.DEFAULT_TEXTURE == null) {
                        s.initDefaultTexture();
                    }
                    s._texture = Button.DEFAULT_TEXTURE;
                }
                s.splitTextureSource(); //切割成态数对应的材质
            }
            if (s._imgDisplay == null)
                return;
            //只设置了一个状态的时候，第二态用第一态的资源
            if (s.statesLength == 1 && s._currentState == Button.STATUS_DOWN) {
                s._imgDisplay.texture = s._textureDict[Button.STATUS_UP];
            }
            else {
                s._imgDisplay.texture = s._textureDict[s._currentState];
            }
            //按钮图片九宫拉伸设置
            if (s._scale9GridRect.length == 4) {
                s._imgDisplay.scale9Grid(s._scale9GridRect);
            }
            else {
                s._imgDisplay.scale9Grid();
            }
            s._imgDisplay.fillMode = s._fillMode;
            s._imgDisplay.width = s.width;
            s._imgDisplay.height = s.height;
            // s._imgDisplay.anchorOffsetX = s._imgDisplay.width / 2;
            // s._imgDisplay.anchorOffsetY = s._imgDisplay.height / 2;
            // s._imgDisplay.x = s.width / 2;
            // s._imgDisplay.y = s.height / 2;
            //console.log("Button.draw 1111 this.width=" + this.width + ", this.height=" + this.height);
            //文字图片显示
            if (s._textureLabel != null) {
                if (s._imgLabel == null) {
                    s._imgLabel = new codeBase.Image;
                    s._imgLabel.touchEnabled = false;
                    s.addChild(s._imgLabel);
                }
                s._imgLabel.texture = s._textureLabel;
                if (!isNaN(s._labelMarginLeft)) {
                    s._imgLabel.x = s._labelMarginLeft;
                }
                else {
                    s._imgLabel.x = (s.width - s._imgLabel.width) / 2;
                }
                if (!isNaN(s._labelMarginTop)) {
                    s._imgLabel.y = s._labelMarginTop;
                }
                else {
                    s._imgLabel.y = (s.height - s._imgLabel.height) / 2;
                }
            }
            //图标显示
            if (s._textureIcon != null) {
                if (s._imgIcon == null) {
                    s._imgIcon = new codeBase.Image;
                    s._imgIcon.touchEnabled = false;
                    s.addChild(s._imgIcon);
                }
                s._imgIcon.texture = s._textureIcon;
                if (!isNaN(s._iconMarginLeft)) {
                    s._imgIcon.x = s._iconMarginLeft;
                }
                else {
                    s._imgIcon.x = (s.width - s._imgIcon.width) / 2;
                }
                if (!isNaN(s._iconMarginTop)) {
                    s._imgIcon.y = s._iconMarginTop;
                }
                else {
                    s._imgIcon.y = (s.height - s._imgIcon.height) / 2;
                }
            }
            //文字标签
            if (s._label) {
                if (!s._label.parent)
                    s.addChild(s._label);
                s._label.text = s._text;
                s._label.fontSize = s._fontSize;
                s._label.fontName = s._fontName;
                s._label.bold = s._labelBold;
                s._label.italic = s._labelItalic;
                s._label.lineSpacing = s._labelLineSpacing;
                s._label.multiline = s._labelMultiline;
                s._label.stroke = s._labelStroke;
                s._label.strokeColor = s._labelStrokeColor;
                s._label.onInvalidate(null); //立即生效,这样下面的数据才有效
                if (!isNaN(s._labelMarginLeft)) {
                    s._label.x = s._labelMarginLeft;
                }
                else {
                    s._label.x = (s.width - s._label.width) / 2;
                    //console.log("Button.draw 222 this.width=" +this.width + ", this._label.width=" + this._label.width);
                }
                if (!isNaN(s._labelMarginTop)) {
                    s._label.y = s._labelMarginTop;
                }
                else {
                    s._label.y = (s.height - s._label.height) / 2;
                }
            }
        };
        /**
         * 没有材质,绘制一个默认的材质背景
         */
        Button.prototype.initDefaultTexture = function () {
            if (Button.DEFAULT_TEXTURE == null) {
                this.setSize(codeBase.Style.BUTTON_DEFAULT_WIDTH, codeBase.Style.BUTTON_DEFAULT_HEIGHT);
                var shape = new codeBase.Shape();
                shape.width = this.width;
                shape.height = this.height;
                shape.graphics.beginFill(codeBase.Style.BUTTON_FACE);
                shape.graphics.drawRect(0, 0, this.width, this.height);
                shape.graphics.endFill();
                //boder
                shape.graphics.lineStyle(1, 0x000000);
                shape.graphics.drawRect(0, 0, this.width - 1, this.height - 1);
                var renderTexture = new codeBase.RenderTexture();
                renderTexture.drawToTexture(shape);
                Button.DEFAULT_TEXTURE = renderTexture;
            }
        };
        /**
         * 切割Texture材质集
         * @param value
         */
        Button.prototype.splitTextureSource = function () {
            if (this._texture) {
                //console.log("splitTextureSource texture.w=" + this._texture._sourceWidth + ", h=" + this._texture._sourceHeight + ", name=" + this.name)
                this._initDisplayData = true;
                var splitWidth = 0;
                var splitHeight = 0;
                var textureWidth = this._texture.textureWidth;
                var textureHeight = this._texture.textureHeight;
                if (this.stateArray.length == 1) {
                    splitWidth = textureWidth;
                    splitHeight = textureHeight;
                    this._textureDict[this.stateArray[0]] = this._texture;
                }
                else {
                    var i = 0;
                    var xOffset = 0; //this._texture._bitmapX;
                    var yOffset = 0; //this._texture._bitmapY;
                    if (this._verticalSplit) {
                        splitWidth = textureWidth;
                        splitHeight = textureHeight / this.statesLength;
                    }
                    else {
                        splitWidth = textureWidth / this.statesLength;
                        splitHeight = textureHeight;
                    }
                    var spriteSheet = new egret.SpriteSheet(this._texture);
                    for (i = 0; i < this.stateArray.length; i++) {
                        if (this._verticalSplit) {
                            this._textureDict[this.stateArray[i]] = spriteSheet.createTexture(this.name + Math.round(Math.random() * 999999) + "_" + this.stateArray[i], xOffset, yOffset + i * splitHeight, splitWidth, splitHeight);
                        }
                        else {
                            this._textureDict[this.stateArray[i]] = spriteSheet.createTexture(this.name + Math.round(Math.random() * 999999) + "_" + this.stateArray[i], xOffset + i * splitWidth, yOffset, splitWidth, splitHeight);
                        }
                    }
                }
                if (this._autoSize) {
                    this.width = splitWidth;
                    this.height = splitHeight;
                }
            }
        };
        Object.defineProperty(Button.prototype, "upSkin", {
            get: function () {
                return this._textureDict[Button.STATUS_UP];
            },
            /**
             * 设置按钮弹起态皮肤
             */
            set: function (value) {
                var s = this;
                if (!s.isStateExist(Button.STATUS_UP)) {
                    s.stateArray.push(Button.STATUS_UP);
                }
                s._textureDict[Button.STATUS_UP] = value;
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "overSkin", {
            get: function () {
                return this._textureDict[Button.STATUS_OVER];
            },
            /**
             * 设置按钮悬停态皮肤
             */
            set: function (value) {
                var s = this;
                if (!s.isStateExist(Button.STATUS_OVER)) {
                    s.stateArray.push(Button.STATUS_OVER);
                }
                s._textureDict[Button.STATUS_OVER] = value;
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "downSkin", {
            get: function () {
                return this._textureDict[Button.STATUS_DOWN];
            },
            /**
             * 设置按钮按下态皮肤
             */
            set: function (value) {
                var s = this;
                if (!s.isStateExist(Button.STATUS_DOWN)) {
                    s.stateArray.push(Button.STATUS_DOWN);
                }
                s._textureDict[Button.STATUS_DOWN] = value;
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "disableSkin", {
            get: function () {
                return this._textureDict[Button.STATUS_DISABLE];
            },
            /**
             * 设置按钮禁用态皮肤
             */
            set: function (value) {
                var s = this;
                if (!s.isStateExist(Button.STATUS_DISABLE)) {
                    s.stateArray.push(Button.STATUS_DISABLE);
                }
                s._textureDict[Button.STATUS_DISABLE] = value;
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param state
         * @return false,不存在;true,存在
         */
        Button.prototype.isStateExist = function (state) {
            if (this.stateArray.indexOf(state) != -1) {
                return true;
            }
            return false;
        };
        Object.defineProperty(Button.prototype, "label", {
            get: function () {
                return this._text;
            },
            /**
             * 设置按钮文本
             */
            set: function (value) {
                var s = this;
                s._text = value;
                if (s._label) {
                    s._label.text = s._text;
                }
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        // public set selected(value: boolean) {
        //     this._selected = value;
        //     this._currentState = (this._selected ? Button.STATE_DOWN : Button.STATE_UP);
        //     //if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
        //     if (this._selected && StringUtil.isUsage(this._toggleGroup)) {
        //         var myevent: MyEvent = MyEvent.getEvent(Button.TOGGLE_PREFIX + this._toggleGroup);
        //         myevent.addItem("caller", this);
        //         myevent.addItem("groupName", this._toggleGroup);
        //         myevent.send();
        //     }
        //     this.invalidate();
        // }
        // public get selected(): boolean {
        //     return this._selected;
        // }
        /**
         * 设置按钮可用状态皮肤
         * <p>[STATE_UP, STATE_DOWN, STATE_OVER, STATE_DISABLE]</p>
         */
        Button.prototype.setSkins = function (statusSkin) {
            if (statusSkin === void 0) { statusSkin = []; }
            var statusNum = statusSkin.length == 0 ? 1 : statusSkin.length;
            switch (statusNum) {
                case 1:
                    this.stateArray = [Button.STATUS_UP]; //设置只有一个状态的时候，第二态用第一态的资源
                    break;
                case 2:
                    this.stateArray = [Button.STATUS_UP, Button.STATUS_DOWN];
                    break;
                case 3:
                    this.stateArray = [Button.STATUS_UP, Button.STATUS_DOWN, Button.STATUS_OVER];
                    break;
                case 4:
                    this.stateArray = [Button.STATUS_UP, Button.STATUS_DOWN, Button.STATUS_OVER, Button.STATUS_DISABLE];
                    break;
            }
            //初始化按钮状态皮肤
            this._initDisplayData = false;
            if (statusSkin.length > 0) {
                this._initDisplayData = true;
                for (var i = 0; i < this.stateArray.length; ++i) {
                    if (statusSkin[i]) {
                        this._textureDict[this.stateArray[i]] = statusSkin[i];
                    }
                    else {
                        this._initDisplayData = false;
                        console.warn("指定的状态数和状态图片数不一致");
                        break;
                    }
                }
            }
            if (this._initDisplayData)
                this.setSize(statusSkin[0].textureWidth, statusSkin[0].textureHeight);
            this.invalidate();
        };
        Object.defineProperty(Button.prototype, "statesLength", {
            get: function () {
                return this.stateArray.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "imgLabel", {
            get: function () {
                return this._textureLabel;
            },
            /**
             * 设置图片标签贴图
             */
            set: function (value) {
                if (this._textureLabel != value) {
                    this._textureLabel = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "imgIcon", {
            get: function () {
                return this._textureIcon;
            },
            /**
             * 设置图标贴图
             */
            set: function (value) {
                if (this._textureIcon != value) {
                    this._textureIcon = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelColor", {
            get: function () {
                return this._labelColor;
            },
            /**
             * 设置文字文本的颜色
             */
            set: function (value) {
                if (this._labelColor != value) {
                    this._labelColor = value;
                    if (this._label)
                        this._label.color = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "fontName", {
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
        Object.defineProperty(Button.prototype, "fontSize", {
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
        Object.defineProperty(Button.prototype, "labelMarginLeft", {
            get: function () {
                return this._labelMarginLeft;
            },
            /**
            * 设置label显示左边距
            */
            set: function (value) {
                if (this._labelMarginLeft != value) {
                    this._labelMarginLeft = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelMarginTop", {
            get: function () {
                return this._labelMarginTop;
            },
            /**
            * 设置label显示顶部边距
            */
            set: function (value) {
                if (this._labelMarginTop != value) {
                    this._labelMarginTop = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "iconMarginLeft", {
            get: function () {
                return this._iconMarginLeft;
            },
            /**
            * 设置icon显示左边距
            */
            set: function (value) {
                if (this._iconMarginLeft != value) {
                    this._iconMarginLeft = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "iconMarginTop", {
            get: function () {
                return this._iconMarginTop;
            },
            /**
            * 设置icon显示顶部边距
            */
            set: function (value) {
                if (this._iconMarginTop != value) {
                    this._iconMarginTop = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "autoSize", {
            get: function () {
                return this._autoSize;
            },
            /**
             * 设置按钮是否按照材质的宽高设置大小
             * true:按照切割后的材质大小来设置按钮的宽和高
             * false:根据按钮本身的宽和高设置材质的宽高
             * @param value
             */
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            //this.autoSize = false;
        };
        /**
         * 初始化声音对象,并播放声音
         */
        Button.prototype.onPlaySound = function () {
            if (codeBase.StringUtil.isUsage(this._soundName)) {
                codeBase.Sound.play(this._soundName);
            }
        };
        Object.defineProperty(Button.prototype, "sound", {
            get: function () {
                return this._soundName;
            },
            /**
             * 设置播放的声音名称
             * @param value
             */
            set: function (value) {
                this._soundName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "drawDelay", {
            set: function (delay) {
                if (this._label)
                    this._label.drawDelay = delay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelBold", {
            get: function () {
                return this._labelBold;
            },
            /**
             * label 加粗
             * @param value
             */
            set: function (value) {
                if (this._labelBold != value) {
                    this._labelBold = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelItalic", {
            get: function () {
                return this._labelItalic;
            },
            /**
             * label 斜体
             * @param value
             */
            set: function (value) {
                if (this._labelItalic != value) {
                    this._labelItalic = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelLineSpacing", {
            get: function () {
                return this._labelLineSpacing;
            },
            /**
             * label 行间距
             * @param value
             */
            set: function (value) {
                if (this._labelLineSpacing != value) {
                    this._labelLineSpacing = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelMultiline", {
            get: function () {
                return this._labelMultiline;
            },
            /**
             * label 多行显示
             * @param value
             */
            set: function (value) {
                if (this._labelMultiline != value) {
                    this._labelMultiline = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelStroke", {
            get: function () {
                return this._labelStroke;
            },
            /**
             * label 描边厚度
             * @param value
             */
            set: function (value) {
                if (this._labelStroke != value) {
                    this._labelStroke = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "labelStrokeColor", {
            get: function () {
                return this._labelStrokeColor;
            },
            /**
             * label 描边颜色
             * @param value
             */
            set: function (value) {
                if (this._labelStrokeColor != value) {
                    this._labelStrokeColor = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "testPixelEnable", {
            get: function () {
                return this._testPixelEnable;
            },
            /**
             * 像素级检测
             * @param value
             */
            set: function (value) {
                this._testPixelEnable = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取xy位置的像素值,xy是舞台值
         * @param x 舞台坐标
         * @param y 舞台坐标
         */
        Button.prototype.getPixel32 = function (x, y) {
            var s = this;
            //底图
            var locolPoint = this.globalToLocal(x, y);
            var found;
            var datas = null;
            if (s._imgDisplay && s._imgDisplay.texture) {
                datas = s._imgDisplay.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    found = true;
                    return datas;
                }
            }
            //label
            if (s._imgLabel && s._imgLabel.texture) {
                datas = s._imgLabel.texture.getPixel32(x, y);
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    found = true;
                    return datas;
                }
            }
            //icon
            if (s._imgIcon && s._imgIcon.texture) {
                datas = s._imgIcon.texture.getPixel32(x, y);
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    found = true;
                    return datas;
                }
            }
            return [];
        };
        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        Button.prototype.testPixel32 = function (x, y) {
            var datas = this.getPixel32(x, y);
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    return true;
                }
            }
            return false;
        };
        Button.DEFAULT_TEXTURE = null; //默认材质
        Button.STATUS_UP = "status_up";
        Button.STATUS_DOWN = "status_down";
        Button.STATUS_OVER = "status_over";
        Button.STATUS_DISABLE = "status_disable";
        Button.STATUS_NORMAL = "status_normal";
        Button.STATUS_CHECKED = "status_checked";
        return Button;
    }(codeBase.BasicGroup));
    codeBase.Button = Button;
    __reflect(Button.prototype, "codeBase.Button");
})(codeBase || (codeBase = {}));
