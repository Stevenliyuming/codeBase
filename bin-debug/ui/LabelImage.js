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
     * 使用材质显示字符
     */
    var LabelImage = (function (_super) {
        __extends(LabelImage, _super);
        function LabelImage() {
            var _this = _super.call(this) || this;
            _this._text = ""; //文本内容
            _this._textureDict = {}; //切割好的材质,对应的材质映射表
            _this._texture = null;
            _this._shape = null;
            /**
             * 是否已初始化材质数据
             */
            _this._initDisplayData = false;
            /**
             * 设置材质对应的字符
             * 默认是
             */
            _this._chars = "0,1,2,3,4,5,6,7,8,9";
            /**
             * 切割符号指定
             * @type {string}
             * @private
             */
            _this._charSplit = ",";
            /**
             * 横向切割
             */
            _this._horizontalSplit = true;
            /**
             *切割间隔
             */
            _this._gapSplit = 0;
            //声音播放
            _this._soundName = null;
            _this._sound = null;
            //roling滚动设置
            _this._rollingEnable = false; //滚动开关
            _this._rollingZoomEnable = false; //滚动放大开关
            _this._rollingZoomValue = 1.5; //放大倍数
            _this._rollingZoomAlign = egret.HorizontalAlign.CENTER; //放大对齐方式
            _this._rollingEffect = null; //滚动对象
            _this._step = 0; //每次滚动增量的值
            //滚动回调的函数设置
            _this._callbackFunc = null;
            _this._callbackFuncThis = null;
            return _this;
        }
        /**
         * 初始化主场景的组件,加入场景时,主动调用一次
         * 子类覆写该方法,添加UI逻辑
         */
        LabelImage.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setSize(codeBase.Style.TEXTINPUT_WIDTH, codeBase.Style.TEXTINPUT_HEIGHT);
        };
        Object.defineProperty(LabelImage.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (this._text != value) {
                    if (this._rollingEnable) {
                        //滚动设置
                        if (this._rollingEffect == null) {
                            this._rollingEffect = new EffectNumberRolling(this);
                            this._rollingEffect.zoomEnable = this._rollingZoomEnable;
                            this._rollingEffect.zoomValue = this._rollingZoomValue;
                            this._rollingEffect.zoomAlign = this._rollingZoomAlign;
                            this._rollingEffect.callbackFunc = this._callbackFunc;
                            this._rollingEffect.callbackFuncThis = this._callbackFuncThis;
                        }
                        this._rollingEffect.clean(); //清除之前的滚动
                        this._rollingEffect.setText(value, this._step);
                    }
                    else {
                        if (this._rollingEffect)
                            this._rollingEffect.clean(value); //清除之前的滚动
                        this.setText(value);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 自己设置显示字符
         * @param str
         */
        LabelImage.prototype.setText = function (str) {
            this._text = "" + str;
            if (this._text == null)
                this._text = "";
            this.invalidate();
            this.onPlaySound();
        };
        Object.defineProperty(LabelImage.prototype, "texture", {
            get: function () {
                return this._texture;
            },
            /**
             * 设置材质
             * @param value
             */
            set: function (value) {
                if (this._texture != value) {
                    this._texture = value;
                    this._initDisplayData = false;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "chars", {
            get: function () {
                return this._chars;
            },
            /**
             * 设置材质对应的字符
             * @param value
             */
            set: function (value) {
                if (this._chars != value) {
                    this._chars = value;
                    this._initDisplayData = false;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "step", {
            get: function () {
                return this._step;
            },
            /**
             * 设置滚动的增量值
             * 这个值必须在滚动之前设置进入
             * 使用默认的滚动设置,设置为0即可
             * @param value
             */
            set: function (value) {
                if (this._step != value) {
                    this._step = value;
                    //this._initDisplayData = false;
                    //this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "horizontalSplit", {
            get: function () {
                return this._horizontalSplit;
            },
            /**
             * 材质切割的方向,默认水平切割
             * @param value
             */
            set: function (value) {
                if (this._horizontalSplit != value) {
                    this._horizontalSplit = value;
                    this._initDisplayData = false;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "gapSplit", {
            get: function () {
                return this._gapSplit;
            },
            /**
             * 材质切割的间隔
             * @param value
             */
            set: function (value) {
                if (this._gapSplit != value) {
                    this._gapSplit = value;
                    this._initDisplayData = false;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "charSplit", {
            get: function () {
                return this._charSplit;
            },
            /**
             * 切割符号,默认是,
             * @param value
             */
            set: function (value) {
                if (this._charSplit != value) {
                    this._charSplit = value;
                    this._initDisplayData = false;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Draws the visual ui of the component.
         */
        LabelImage.prototype.draw = function () {
            if (!this._initDisplayData) {
                this.splitTextureSource();
            }
            if (this._bgImage && this._bgImage.parent) {
                this._bgImage.parent.removeChild(this._bgImage);
            }
            //回收旧资源
            var bitmap = null;
            for (var i = this.numChildren - 1; i >= 0; i--) {
                bitmap = this.getChildAt(i);
                bitmap.texture = null;
                bitmap.parent.removeChild(bitmap);
                codeBase.ObjectPool.recycleClass(bitmap, "labelimg");
            }
            //根据字符显示材质内容
            var texture = null;
            if (codeBase.StringUtil.isUsage(this._text)) {
                for (var i = 0; i < this._text.length; i++) {
                    texture = this._textureDict[this._text.charAt(i)];
                    if (texture) {
                        bitmap = codeBase.ObjectPool.getByClass(egret.Bitmap, "labelimg");
                        this.addChild(bitmap);
                        bitmap.texture = texture;
                        bitmap.width = texture.textureWidth;
                        bitmap.height = texture.textureHeight;
                        bitmap.visible = true;
                        bitmap.alpha = 1;
                    }
                }
            }
            _super.prototype.draw.call(this);
        };
        LabelImage.prototype.splitTextureSource = function () {
            if (this._texture && codeBase.StringUtil.isUsage(this._chars)) {
                var charArr = codeBase.StringUtil.splitStrArr(this._chars, this._charSplit);
                if (charArr.length > 0) {
                    this._initDisplayData = true;
                    var spriteSheet = new egret.SpriteSheet(this._texture);
                    var splitWidth = 0;
                    var splitHeight = 0;
                    var textureWidth = this._texture.textureWidth;
                    var textureHeight = this._texture.textureHeight;
                    if (this._horizontalSplit) {
                        splitWidth = (textureWidth - charArr.length * this._gapSplit) / charArr.length;
                        splitHeight = textureHeight;
                    }
                    else {
                        splitWidth = textureWidth;
                        splitHeight = (textureHeight - charArr.length * this._gapSplit) / charArr.length;
                    }
                    //开始切割
                    for (var i = 0; i < charArr.length; i++) {
                        if (this._horizontalSplit) {
                            this._textureDict[charArr[i]] = spriteSheet.createTexture(this.name + Math.round(Math.random() * 999999) + "_" + charArr[i], i * splitWidth + i * this._gapSplit, 0, splitWidth, splitHeight);
                        }
                        else {
                            this._textureDict[charArr[i]] = spriteSheet.createTexture(this.name + Math.round(Math.random() * 999999) + "_" + charArr[i], 0, i * splitHeight + i * this._gapSplit, splitWidth, splitHeight);
                        }
                    }
                }
            }
        };
        /**
         * 初始化声音对象,并播放声音
         */
        LabelImage.prototype.onPlaySound = function () {
            if (this._sound == null && codeBase.StringUtil.isUsage(this._soundName)) {
                this._sound = RES.getRes(this._soundName);
            }
            if (this._sound) {
                this._sound.play();
            }
        };
        Object.defineProperty(LabelImage.prototype, "sound", {
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
        Object.defineProperty(LabelImage.prototype, "rollingEnable", {
            get: function () {
                return this._rollingEnable;
            },
            /**
             * 文字滚动设置
             * @param value
             */
            set: function (value) {
                this._rollingEnable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "rollingZoomEnable", {
            get: function () {
                return this._rollingZoomEnable;
            },
            /**
             * 文字滚动放大设置
             * @param value
             */
            set: function (value) {
                this._rollingZoomEnable = value;
                if (this._rollingEffect)
                    this._rollingEffect.zoomEnable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "rollingZoomValue", {
            get: function () {
                return this._rollingZoomValue;
            },
            /**
             * 设置文字滚动放大倍数,默认是1.5倍
             * @param value
             */
            set: function (value) {
                this._rollingZoomValue = value;
                if (this._rollingEffect)
                    this._rollingEffect.zoomValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LabelImage.prototype, "rollingZoomAlign", {
            get: function () {
                return this._rollingZoomAlign;
            },
            /**
             * 设置文字滚动的对齐方式
             * @param value
             */
            set: function (value) {
                this._rollingZoomAlign = value;
                if (this._rollingEffect)
                    this._rollingEffect.zoomAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置是否下一帧计算相对位置
         * 不需要对子元素,进行布局,所以覆写,减少消耗
         */
        LabelImage.prototype.onInvalidatePosition = function () {
            if (!this._hasInvalidatePosition) {
                this._hasInvalidatePosition = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.resetPosition, this);
            }
        };
        /**
         * 设置滚动结束的回调通知
         */
        LabelImage.prototype.setRollingEndFunc = function (thisObj, func) {
            this._callbackFunc = func;
            this._callbackFuncThis = thisObj;
            if (this._rollingEffect) {
                this._rollingEffect.callbackFunc = this._callbackFunc;
                this._rollingEffect.callbackFuncThis = this._callbackFuncThis;
            }
        };
        LabelImage.prototype.removeRollingEndFunc = function () {
            this._callbackFunc = null;
            this._callbackFuncThis = null;
            if (this._rollingEffect) {
                this._rollingEffect.callbackFunc = this._callbackFunc;
                this._rollingEffect.callbackFuncThis = this._callbackFuncThis;
            }
        };
        return LabelImage;
    }(codeBase.HGroup));
    codeBase.LabelImage = LabelImage;
    __reflect(LabelImage.prototype, "codeBase.LabelImage");
    /**
     * 控制数字滚动类
     */
    var EffectNumberRolling = (function () {
        function EffectNumberRolling(lableImg) {
            this.zoomEnable = false;
            this.zoomValue = 1;
            this.zoomAlign = egret.HorizontalAlign.CENTER;
            this._isZoom = false;
            this._zoomXOld = 1;
            this._zoomYOld = 1;
            this._xScale = 1;
            this._yScale = 1;
            this._xOld = 1;
            this._yOld = 1;
            this._labelImg = null;
            this._rollingText = []; //用于滚动的数组
            //滚动回调的函数设置
            this.callbackFunc = null;
            this.callbackFuncThis = null;
            this._labelImg = lableImg;
            this._xOld = this._labelImg.x;
            this._yOld = this._labelImg.y;
        }
        /**
         * 清除之前的滚动
         */
        EffectNumberRolling.prototype.clean = function (value) {
            if (value === void 0) { value = null; }
            if (this._rollingText.length > 0) {
                this._labelImg.setText(this._rollingText[this._rollingText.length - 1]);
                this._lastRollString = this._rollingText[this._rollingText.length - 1];
            }
            this._rollingText.length = 0;
            if (codeBase.StringUtil.isUsage(value)) {
                this._lastRollString = value;
            }
        };
        EffectNumberRolling.prototype.setText = function (str, step) {
            var _oldLabelText = this._labelImg.text;
            this._labelLength = parseInt(str);
            var _length = this._labelLength + "";
            //判断字符串是否是纯数字类型
            if (_length.length == str.length) {
                //如果滚动数组中有值，将最后一个值记录 作为第二次跳转的起始值
                if (this._rollingText.length > 0) {
                    this._labelImg.setText(this._rollingText[this._rollingText.length - 1]);
                    this._lastRollString = this._rollingText[this._rollingText.length - 1];
                }
                else {
                    this._lastRollString = _oldLabelText; //如果当前没有滚动，将labelImg当前值记录
                }
                this._rollingText.length = 0;
                var tempNum;
                var temp;
                var step1 = 0;
                if (step > 0) {
                    step1 = step;
                }
                else {
                    step1 = this.getStepValue(parseInt(this._lastRollString), parseInt(str));
                }
                tempNum = parseInt(this._lastRollString) + step1;
                temp = tempNum + "";
                this._rollingText.push(temp);
                if (step1 > 0) {
                    while (parseInt(this._rollingText[this._rollingText.length - 1]) < parseInt(str)) {
                        if (step1 + parseInt(this._rollingText[this._rollingText.length - 1]) < parseInt(str)) {
                            tempNum += step1;
                            temp = tempNum + "";
                        }
                        else {
                            tempNum = parseInt(str);
                            temp = tempNum + "";
                        }
                        this._rollingText.push(temp);
                    }
                }
                else if (step1 < 0) {
                    while (parseInt(this._rollingText[this._rollingText.length - 1]) > parseInt(str)) {
                        if (step1 + parseInt(this._rollingText[this._rollingText.length - 1]) > parseInt(str)) {
                            tempNum += step1;
                            temp = tempNum + "";
                        }
                        else {
                            tempNum = parseInt(str);
                            temp = tempNum + "";
                        }
                        this._rollingText.push(temp);
                    }
                }
                //做非匀速跳转启用
                //var step2:number = 0;
                //var limitNum:number = parseInt(str) - step1 * 2;
                //if(step1 > 0){
                //    while(parseInt(this._rollingText[this._rollingText.length - 1]) < limitNum){
                //        if(step1 + parseInt(this._rollingText[this._rollingText.length - 1] ) < limitNum){
                //            tempNum += step1;
                //            temp = tempNum + "";
                //        }
                //        else{
                //            tempNum = limitNum;
                //            temp = tempNum + "";
                //        }
                //        this._rollingText.push(temp);
                //    }
                //    while (parseInt(this._rollingText[this._rollingText.length - 1]) < parseInt(str)){
                //       if(step2 + parseInt(this._rollingText[this._rollingText.length - 1] ) < parseInt(str)){
                //           tempNum += step2;
                //           temp = tempNum + ""
                //       }
                //        else{
                //           tempNum = parseInt(str);
                //           temp = tempNum +"";
                //       }
                //        this._rollingText.push(temp);
                //    }
                //}
                //else if(step1 < 0){
                //    while(parseInt(this._rollingText[this._rollingText.length - 1]) > limitNum){
                //        if(step1 + parseInt(this._rollingText[this._rollingText.length - 1] ) > limitNum){
                //            tempNum += step1;
                //            temp = tempNum + "";
                //        }
                //        else{
                //            tempNum = limitNum;
                //            temp = tempNum + "";
                //        }
                //        this._rollingText.push(temp);
                //    }
                //    while (parseInt(this._rollingText[this._rollingText.length - 1]) > parseInt(str)){
                //        if(step2 + parseInt(this._rollingText[this._rollingText.length - 1] ) > parseInt(str)){
                //            tempNum += step2;
                //            temp = tempNum + ""
                //        }
                //        else{
                //            tempNum = parseInt(str);
                //            temp = tempNum +"";
                //        }
                //        this._rollingText.push(temp);
                //    }
                //}
            }
            if (this.zoomEnable && this.zoomValue != 1) {
                this._labelImg.scaleX = this.zoomValue;
                this._labelImg.scaleY = this.zoomValue;
                if (this.zoomValue > 1) {
                    this._xScale = this._xOld - this._labelImg.width * (this._labelImg.scaleX - 1);
                    this._yScale = this._yOld - this._labelImg.height * (this._labelImg.scaleX - 1);
                }
                else if (this.zoomValue < 1) {
                    this._xScale = this._xOld + this._labelImg.width * (this._labelImg.scaleX - 1);
                    this._yScale = this._yOld + this._labelImg.height * (this._labelImg.scaleX - 1);
                }
                if (this.zoomValue > 1) {
                    if (this.zoomAlign == "center") {
                        this._labelImg.x = this._xOld - this._labelImg.width * (this._labelImg.scaleX - 1) / 2;
                        this._labelImg.y = this._yOld - this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                    else if (this.zoomAlign == "left") {
                        this._labelImg.y = this._yOld - this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                    else if (this.zoomAlign == "right") {
                        this._labelImg.x = this._xOld - this._labelImg.width * (this._labelImg.scaleX - 1);
                        this._labelImg.y = this._yOld - this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                }
                else if (this.zoomValue < 1) {
                    if (this.zoomAlign == "center") {
                        this._labelImg.x = this._xOld + this._labelImg.width * (this._labelImg.scaleX - 1) / 2;
                        this._labelImg.y = this._yOld + this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                    else if (this.zoomAlign == "left") {
                        this._labelImg.y = this._yOld + this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                    else if (this.zoomAlign == "right") {
                        this._labelImg.x = this._xOld + this._labelImg.width * (this._labelImg.scaleX - 1);
                        this._labelImg.y = this._yOld + this._labelImg.height * (this._labelImg.scaleY - 1) / 2;
                    }
                }
                this._isZoom = true;
            }
            codeBase.HeartBeat.addListener(this, this.onChangeText, 3);
        };
        /**
         * 根据最大和最小值,计算出增量多少合适
         * @param min
         * @param max
         */
        EffectNumberRolling.prototype.getStepValue = function (num1, num2) {
            var tempStep = Math.abs(num1 - num2);
            var value = 1;
            if (tempStep < 30) {
                value = 1;
            }
            else if (tempStep < 60) {
                value = 2;
            }
            else if (tempStep < 100) {
                value = 3;
            }
            else if (tempStep < 200) {
                value = 5;
            }
            else if (tempStep < 400) {
                value = 10;
            }
            else if (tempStep < 800) {
                value = 20;
            }
            else if (tempStep < 1500) {
                value = 30;
            }
            else if (tempStep < 2500) {
                value = 40;
            }
            else if (tempStep < 3500) {
                value = 50;
            }
            else {
                value = Math.floor(Math.round(tempStep / 200) + 50);
            }
            if (num1 > num2) {
                value = -value;
            }
            console.log("step=" + value);
            return value;
        };
        EffectNumberRolling.prototype.onChangeText = function () {
            if (this._rollingText.length > 0) {
                this._labelImg.setText(this._rollingText.shift());
            }
            else {
                //结束rolling
                codeBase.HeartBeat.removeListener(this, this.onChangeText);
                if (this._isZoom) {
                    var paramObj = { scaleX: this._zoomXOld, scaleY: this._zoomYOld };
                    if (this._labelImg.anchorOffsetX == 0) {
                        paramObj["x"] = this._xOld;
                    }
                    if (this._labelImg.anchorOffsetY == 0) {
                        paramObj["y"] = this._yOld;
                    }
                    egret.Tween.get(this._labelImg).to(paramObj, 200);
                }
                this._isZoom = false;
                if (this.callbackFunc && this.callbackFuncThis) {
                    this.callbackFunc.call(this.callbackFuncThis);
                }
            }
        };
        return EffectNumberRolling;
    }());
    __reflect(EffectNumberRolling.prototype, "EffectNumberRolling");
})(codeBase || (codeBase = {}));
