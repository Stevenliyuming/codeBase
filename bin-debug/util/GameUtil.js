var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    //游戏状态枚举类型
    var GameState;
    (function (GameState) {
        GameState[GameState["Start"] = 0] = "Start";
        GameState[GameState["Playing"] = 1] = "Playing";
        GameState[GameState["Pause"] = 2] = "Pause";
        GameState[GameState["Finished"] = 3] = "Finished";
    })(GameState = codeBase.GameState || (codeBase.GameState = {}));
    ;
    var GameUtil = (function () {
        function GameUtil() {
            this.remoteResUrl = "http://106.52.184.124/TabAndFly_wxgame_remote";
            this._GameState = GameState.Playing;
            this.musicVolume = 1;
            this.effectVolume = 1;
            this.canvasEventListenerArr = [];
            this.documentEventListenerArr = [];
            /**注册鼠标移动监听 */
            this.mouseMoveListenerArr = [];
            this.registerMouseMove = false;
            this.modulePath = "";
        }
        Object.defineProperty(GameUtil, "Instance", {
            get: function () {
                if (GameUtil.instance == null) {
                    GameUtil.instance = new GameUtil();
                }
                return GameUtil.instance;
            },
            enumerable: true,
            configurable: true
        });
        GameUtil.prototype.Init = function () {
            var s = this;
            if (!s.canvas) {
                s.canvas = document.getElementsByTagName("CANVAS")[0];
            }
            s.stage = egret.MainContext.instance.stage;
            mouse.enable(s.stage);
            s.registerMouseMove = false;
            s.modulePath = ""; //UIControl.getInstance().curUIIDPath;
        };
        /**
        url	需被使用的自定义光标的URL
        注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
        default	默认光标（通常是一个箭头）
        auto	默认。浏览器设置的光标。
        crosshair	光标呈现为十字线。
        pointer	光标呈现为指示链接的指针（一只手）
        move	此光标指示某对象可被移动。
        e-resize	此光标指示矩形框的边缘可被向右（东）移动。
        ne-resize	此光标指示矩形框的边缘可被向上及向右移动（北/东）。
        nw-resize	此光标指示矩形框的边缘可被向上及向左移动（北/西）。
        n-resize	此光标指示矩形框的边缘可被向上（北）移动。
        se-resize	此光标指示矩形框的边缘可被向下及向右移动（南/东）。
        sw-resize	此光标指示矩形框的边缘可被向下及向左移动（南/西）。
        s-resize	此光标指示矩形框的边缘可被向下移动（北/西）。
        w-resize	此光标指示矩形框的边缘可被向左移动（西）。
        text	此光标指示文本。
        wait	此光标指示程序正忙（通常是一只表或沙漏）。
        help	此光标指示可用的帮助（通常是一个问号或一个气球）。
        */
        GameUtil.prototype.setCursor = function (value) {
            var s = this;
            s.canvas.style.cursor = value;
        };
        /**
         * 添加Canvas事件监听
         * 例如 canvas.addEventListener('mousemove',(evt: MouseEvent)=>{});
         */
        GameUtil.prototype.addCanvasEventListener = function (type, fun, funObj) {
            var s = this;
            var bindFun = fun.bind(funObj);
            s.canvas.addEventListener(type, bindFun);
            s.canvasEventListenerArr.push({ eventType: type, fun: bindFun, originFun: fun, funObj: funObj });
        };
        GameUtil.prototype.removeCanvasEventListener = function (type, fun, funObj) {
            var s = this;
            for (var i = s.canvasEventListenerArr.length - 1; i >= 0; --i) {
                var obj = s.canvasEventListenerArr[i];
                if (obj.type == type && obj.originFun == fun && obj.funObj == funObj) {
                    s.canvas.removeEventListener(obj.eventType, obj.fun);
                    s.canvasEventListenerArr.splice(i, 1);
                }
            }
        };
        GameUtil.prototype.clearCanvasEventListener = function () {
            var s = this;
            var num = s.canvasEventListenerArr.length;
            for (var i = 0; i < num; ++i) {
                var obj = s.canvasEventListenerArr[i];
                s.canvas.removeEventListener(obj.eventType, obj.fun);
            }
            s.canvasEventListenerArr.length = 0;
        };
        /**
         * 添加document文档事件监听
           例如：
           document.addEventListener("keydown", (event:KeyboardEvent)=>{});
           document.addEventListener("keyup", (event:KeyboardEvent)=>{});
         */
        GameUtil.prototype.addDocumentEventListener = function (type, fun, funObj) {
            var s = this;
            var bindFun = fun.bind(funObj);
            document.addEventListener(type, bindFun);
            s.documentEventListenerArr.push({ eventType: type, fun: bindFun, originFun: fun, funObj: funObj });
        };
        GameUtil.prototype.removeDocumentEventListener = function (type, fun, funObj) {
            var s = this;
            for (var i = s.documentEventListenerArr.length - 1; i >= 0; --i) {
                var obj = s.documentEventListenerArr[i];
                if (obj.type == type && obj.originFun == fun && obj.funObj == funObj) {
                    document.removeEventListener(obj.eventType, obj.fun);
                    s.documentEventListenerArr.splice(i, 1);
                }
            }
        };
        GameUtil.prototype.clearDocumentEventListener = function () {
            var s = this;
            var num = s.documentEventListenerArr.length;
            for (var i = 0; i < num; ++i) {
                var obj = s.documentEventListenerArr[i];
                document.removeEventListener(obj.eventType, obj.fun);
            }
            s.documentEventListenerArr.length = 0;
        };
        /**
         * moveCallFun:返回px,py两个舞台全局坐标 兼容PC和移动端跟随鼠标移动的需求
         * )target:添加移动监听的对象 IPad下不使用该参数
         */
        GameUtil.prototype.addMouseMoveListener = function (moveCallFun, funObj, _target) {
            if (_target === void 0) { _target = null; }
            var s = this;
            for (var i = 0; i < s.mouseMoveListenerArr.length; ++i) {
                if (s.mouseMoveListenerArr[i].callFun == moveCallFun && s.mouseMoveListenerArr[i].funObj == funObj) {
                    return;
                }
            }
            if (!s.registerMouseMove) {
                s.registerMouseMove = true;
                if (!codeBase.isMobile()) {
                    s.onMove = s.onMove.bind(s);
                    //s.canvas.addEventListener('mousemove', s.onMove);
                    s.addCanvasEventListener("mousemove", s.onMove, s);
                }
                else {
                    s.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouchMove, s);
                }
            }
            s.mouseMoveListenerArr.push({ callFun: moveCallFun, funObj: funObj, target: _target });
        };
        GameUtil.prototype.clearMouseMoveListener = function () {
            var s = this;
            if (s.registerMouseMove) {
                s.registerMouseMove = false;
                if (!codeBase.isMobile()) {
                    //s.canvas.removeEventListener('mousemove', s.onMove);
                    s.removeCanvasEventListener("mousemove", s.onMove, s);
                }
                else {
                    s.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouchMove, s);
                }
            }
            s.mouseMoveListenerArr.length = 0;
        };
        GameUtil.prototype.onMove = function (evt) {
            var s = this;
            // console.log(evt.x + "===" + evt.y);
            s.doMove(evt.x, evt.y);
        };
        GameUtil.prototype.onTouchMove = function (ev) {
            //console.log("onTouchMove");
            var s = this;
            s.doMove(ev.stageX, ev.stageY);
        };
        GameUtil.prototype.doMove = function (px, py) {
            var s = this;
            var num = s.mouseMoveListenerArr.length;
            for (var i = 0; i < num; ++i) {
                s.mouseMoveListenerArr[i].callFun.call(s.mouseMoveListenerArr[i].funObj, [px, py, s.mouseMoveListenerArr[i].target]);
            }
        };
        /**
         * 添加键盘点击事件监听 如果不是在PC端 会自动显示虚拟键盘 需要指定虚拟键盘的类型：type 键盘类型，0：同时显示，1：空格键盘，2：方向键盘
         */
        GameUtil.prototype.addKeyBoardListener = function (onkeydown, onkeydownFunObj, onkeyup, onkeyupFunObj, pr, x, y, type) {
            if (pr === void 0) { pr = null; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (type === void 0) { type = 0; }
            var s = this;
            var virtualKeyBoardSprite;
            //移动端显示虚拟键盘
            if (codeBase.isMobile()) {
                // let virtualKeyBoard = ui1Lib.VirtualKeyboard.getInstance();
                // virtualKeyBoardSprite = new GYLite.GYSprite;
                // if (pr) {
                // 	pr.addChild(virtualKeyBoardSprite);
                // }
                // virtualKeyBoardSprite.x = x;
                // virtualKeyBoardSprite.y = y;
                // virtualKeyBoard.show(type, null, null, 0, 0, virtualKeyBoardSprite);
                // virtualKeyBoard.setTouchBeginCall(onkeydown, onkeydownFunObj);
                // s.addDocumentEventListener("keyup", onkeyup, onkeyupFunObj);
            }
            else {
                s.addDocumentEventListener("keydown", onkeydown, onkeydownFunObj);
                s.addDocumentEventListener("keyup", onkeyup, onkeyupFunObj);
            }
            return virtualKeyBoardSprite;
        };
        //设置显示对象呈现鼠标按钮模式
        GameUtil.prototype.setTargetMouseMode = function (_target, _value) {
            mouse.setButtonMode(_target, _value);
        };
        GameUtil.prototype.setTargetScale = function (target, scaleFactor, _time) {
            if (_time === void 0) { _time = 100; }
            //egret.Tween.removeTweens(target);
            egret.Tween.get(target).to({ scaleX: scaleFactor, scaleY: scaleFactor }, _time);
        };
        GameUtil.prototype.onMouseOver = function (e) {
            //console.log("mouse over " + e.target.name + "  " + e.bubbles);
            GameUtil.Instance.setTargetScale(e.currentTarget, 1.1);
        };
        GameUtil.prototype.onMouseOut = function (e) {
            //console.log("mouse out " + e.target.name + "  " + e.bubbles);
            GameUtil.Instance.setTargetScale(e.currentTarget, 1.0);
        };
        GameUtil.prototype.onMouseOverWithFilter = function (e) {
            //console.log("mouse over " + e.target.name + "  " + e.bubbles);
            codeBase.FilterUtil.getInstance.setGlowFilter(e.currentTarget, 0xffdf6f);
        };
        GameUtil.prototype.onMouseOutClearFilter = function (e) {
            //console.log("mouse out " + e.target.name + "  " + e.bubbles);
            codeBase.FilterUtil.getInstance.cleanFilter(e.currentTarget);
        };
        GameUtil.prototype.getTargetPoint = function (target) {
            var pos = new egret.Point(target.x, target.y);
            return pos;
        };
        GameUtil.prototype.showQuestionNumber = function (args) {
            var _this = this;
            var questionNum = args[1];
            var container = args[0];
            if (this.questionNumberImage) {
                this.questionNumberImage.texture = RES.getRes("question_json.question-" + questionNum);
            }
            else {
                this.questionNumberImage = new egret.Bitmap();
                this.questionNumberImage.texture = RES.getRes("question_json.question-" + questionNum);
                this.questionNumberImage.anchorOffsetX = 125;
                this.questionNumberImage.anchorOffsetY = 60;
                //console.log(this._mainLayer);
                container.addChild(this.questionNumberImage);
                //LayerManager.getInstance().fixListen(this.questionNumberImage, 0, 0, 0, 0);
            }
            // this.questionNumberImage.x = this.stageCenterW;
            // this.questionNumberImage.y = -200;
            // this.questionNumberImage.scaleY = 1.2;
            // egret.Tween.removeTweens(this.questionNumberImage);
            // egret.Tween.get(this.questionNumberImage)
            // 	.to({ y: this.stageCenterH, scaleY: 0.8 }, 500)
            // 	.to({ scaleY: 1.1 }, 250)
            // 	.to({ scaleY: 1.0 }, 250)
            // 	.wait(1000)
            // 	.to({ y: -200 }, 500)
            // 	.call(()=>{
            // 		this._mainLayer.removeChild(this.questionNumberImage);
            // 		this.questionNumberImage = null;
            // 	}, this);
            this.questionNumberImage.x = container.width / 2;
            this.questionNumberImage.y = container.height / 2;
            this.questionNumberImage.scaleX = 0;
            this.questionNumberImage.scaleY = 0;
            egret.Tween.removeTweens(this.questionNumberImage);
            egret.Tween.get(this.questionNumberImage)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 250)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 250)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 250)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 250)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 250)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 250)
                .wait(100)
                .call(function () {
                container.removeChild(_this.questionNumberImage);
                _this.questionNumberImage = null;
            }, this);
        };
        /**
         * 0 正确 1 错误
         */
        GameUtil.prototype.shakeObject = function (target, type) {
            if (type == 0) {
                egret.Tween.get(target)
                    .to({ rotation: 8 }, 100).to({ rotation: -8 }, 200)
                    .to({ rotation: 8 }, 200).to({ rotation: -8 }, 200)
                    .to({ rotation: 8 }, 200).to({ rotation: 0 }, 100);
            }
            else if (type == 1) {
                var posx = target.x;
                egret.Tween.get(target)
                    .to({ x: posx + 30 }, 150).to({ x: posx }, 150)
                    .to({ x: posx + 30 }, 150).to({ x: posx }, 150)
                    .to({ x: posx + 30 }, 150).to({ x: posx }, 150);
            }
        };
        /**
         * 0 显示打勾 1显示打叉
         */
        GameUtil.prototype.showRightOrWrong = function (container, type, pos, bigImg) {
            if (bigImg === void 0) { bigImg = false; }
            var resultImage = new egret.Bitmap;
            var s = this;
            if (type == 0) {
                if (!bigImg) {
                    resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/rightAndWrong.right"); // Main.instance.getRes("right", s.modulePath + "/img/commonRes/rightAndWrong.png");
                }
                else {
                    resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/right_wrong_big.right_big"); //Main.instance.getRes("right_big", s.modulePath + "/img/commonRes/right_wrong_big.png");
                }
                //播放语音
                //SoundManager.Instance.PlayEffectByName("rightBeep");
            }
            else if (type == 1) {
                if (!bigImg) {
                    resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/rightAndWrong.wrong"); //Main.instance.getRes("wrong", s.modulePath + "/img/commonRes/rightAndWrong.png");
                }
                else {
                    resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/right_wrong_big.wrong_big"); //Main.instance.getRes("wrong_big", s.modulePath + "/img/commonRes/right_wrong_big.png");
                }
                //播放语音
                //SoundManager.Instance.PlayEffectByName("wrongBeep");
            }
            container.addChild(resultImage);
            resultImage.anchorOffsetX = resultImage.width / 2;
            resultImage.anchorOffsetY = resultImage.height / 2;
            resultImage.x = pos.x;
            resultImage.y = pos.y;
            egret.Tween.get(resultImage).wait(1500).to({ scaleX: 0, scaleY: 0 }, 200).call(function () {
                container.removeChild(resultImage);
            }, container);
        };
        //设置显示对象和舞台的边距
        GameUtil.prototype.setScreenAuto = function (target) {
            target.left = 0;
            target.right = 0;
            target.top = 0;
            target.bottom = 0;
        };
        /**
         * 操作指示 0原位置旋转 1斜方向移动
         */
        GameUtil.prototype.showHandTip = function (pr, px, py, _tweenType, _loop) {
            if (_loop === void 0) { _loop = false; }
            var s = this;
            var hand = new egret.Bitmap;
            hand.texture = RES.getRes("comRes_1_json.hand");
            hand.touchEnabled = false;
            pr.addChild(hand);
            hand.x = px;
            hand.y = py;
            s.showHandTipAction(hand, _tweenType, _loop);
            return hand;
        };
        /**
         * _tweenType: 0原位置旋转 1斜方向移动
         */
        GameUtil.prototype.showHandTipAction = function (hand, _tweenType, _loop) {
            if (_loop === void 0) { _loop = false; }
            if (_tweenType == 0) {
                egret.Tween.get(hand, { loop: _loop })
                    .to({ rotation: -15 }, 500)
                    .to({ rotation: 0 }, 500)
                    .to({ rotation: -15 }, 500)
                    .to({ rotation: 0 }, 500).wait(500);
            }
            else if (_tweenType == 1) {
                egret.Tween.get(hand, { loop: _loop })
                    .to({ x: hand.x - 10, y: hand.y - 10 }, 1000)
                    .wait(200)
                    .to({ x: hand.x, y: hand.y }, 1000);
            }
        };
        GameUtil.prototype.removeTargetTweenAction = function (target) {
            if (target) {
                egret.Tween.removeTweens(target);
            }
        };
        /**
         * 对象深拷贝
         * */
        GameUtil.prototype.deepCopyObj = function (obj) {
            var result = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        result[key] = this.deepCopyObj(obj[key]);
                    }
                    else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        };
        /**
         * 数组去重
         */
        GameUtil.prototype.uniqueArr = function (arg) {
            var s = this;
            //当前元素如果在原始数组中的下标等于当前遍历的下标 则返回该元素
            var newArr = arg.filter(function (value, index, arr) {
                return arr.indexOf(value, 0) === index ? true : false;
            }, s);
            return newArr;
        };
        /**
         * 数组顺序打乱
         */
        GameUtil.prototype.washArr = function (arr, count) {
            if (arr === void 0) { arr = []; }
            if (count === void 0) { count = 100; }
            var num1, num2, num3;
            while (count) {
                count -= 1;
                num1 = codeBase.MathUtil.random(0, 2);
                num2 = codeBase.MathUtil.random(0, 2);
                if (num1 != num2) {
                    num3 = arr[num1];
                    arr[num1] = arr[num2];
                    arr[num2] = num3;
                }
            }
            return arr;
        };
        // /**
        //  * 测试文本宽度
        //  */
        // private sharedCanvas: HTMLCanvasElement;
        // private sharedContext: CanvasRenderingContext2D;
        // public measureTextWith(text:string, fontSize:number = 10) {
        // 	let s = this;
        // 	if(!s.sharedCanvas) {
        // 		s.sharedCanvas = egret.sys.createCanvas()
        // 		s.sharedContext = s.sharedCanvas.getContext("2d");
        // 	}
        // 	let width = egret.sys.measureTextWith(s.sharedContext, text);
        // 	return fontSize * width / 10;
        // }
        /**
         * 测量文本在指定样式下的宽度。
         * @param text 要测量的文本内容。
         * @param fontFamily 字体名称
         * @param fontSize 字体大小
         * @param bold 是否粗体
         * @param italic 是否斜体
         */
        GameUtil.prototype.measureText = function (text, fontFamily, fontSize, bold, italic) {
            return egret.sys.measureText(text, fontFamily, fontSize, bold, italic);
        };
        /**
         * 把字符串转换成hash值
         */
        GameUtil.convertStringToHashCode = function (str) {
            if (str.length === 0) {
                return 0;
            }
            var hash = 0;
            for (var i = 0, length_1 = str.length; i < length_1; ++i) {
                var chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
        /**
         * 设置游戏分辨率
         */
        GameUtil.prototype.setDesignSize = function (width, height) {
            var s = this;
            s.stage.setContentSize(width, height);
        };
        /**
         * 设置节点渲染标识 让节点重新绘制
         */
        GameUtil.prototype.renderNode = function (target) {
            if (target) {
                target.$renderDirty = true;
            }
        };
        GameUtil.prototype.splitMatrix = function (matrix) {
            //matrix  为一个matrix(a,b,c,d,e,f)
            var alls = matrix.replace(/[^0-9\-,]/g, '');
            //进行拆分获取确切的某个值
            var arr = alls.split(',');
            // let a = arr[0];
            // let b = arr[1];
            // let c = arr[2];
            // let d = arr[3];
            // console.log(arr);
            return arr;
        };
        /*
        * 解析matrix矩阵，0°-360°，返回旋转角度
        * 当a=b||-a=b,0<=deg<=180
        * 当-a+b=180,180<=deg<=270
        * 当a+b=180,270<=deg<=360
        *
        * 当0<=deg<=180,deg=d;
        * 当180<deg<=270,deg=180+c;
        * 当270<deg<=360,deg=360-(c||d);
        * */
        GameUtil.prototype.getMatrixRotation = function (a, b, c, d, e, f) {
            var aa = Math.round(180 * Math.asin(a) / Math.PI);
            var bb = Math.round(180 * Math.acos(b) / Math.PI);
            var cc = Math.round(180 * Math.asin(c) / Math.PI);
            var dd = Math.round(180 * Math.acos(d) / Math.PI);
            var deg = 0;
            if (aa == bb || -aa == bb) {
                deg = dd;
            }
            else if (-aa + bb == 180) {
                deg = 180 + cc;
            }
            else if (aa + bb == 180) {
                deg = 360 - cc || 360 - dd;
            }
            return deg >= 360 ? 0 : deg;
            //return (aa+','+bb+','+cc+','+dd);
        };
        GameUtil.prototype.dispose = function () {
            var s = this;
            s.clearCanvasEventListener();
            s.clearDocumentEventListener();
            if (codeBase.isMobile()) {
                //ui1Lib.VirtualKeyboard.getInstance().hide();
            }
            s.clearMouseMoveListener();
            GameUtil.instance = null;
        };
        GameUtil.keyCodes = {
            space: 32,
            up: 38,
            down: 40,
            right: 39,
            left: 37 /**左 */
        };
        return GameUtil;
    }());
    codeBase.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "codeBase.GameUtil");
})(codeBase || (codeBase = {}));
