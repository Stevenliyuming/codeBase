var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    //场景管理类
    var SceneManager = (function () {
        function SceneManager() {
            this.gameScale = 1;
            /**
             * 设计分辨率
             */
            this.designWidth = 1920;
            this.designHeight = 1080;
            this.fixDisplayArr = [];
        }
        Object.defineProperty(SceneManager, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new SceneManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.Init = function () {
            var s = this;
            s._stage = codeBase.curStage();
            //s._stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            //s._stage.orientation = egret.OrientationMode.AUTO;
            s.gameLayer = new egret.Sprite;
            s.gameLayer.width = s.designWidth;
            s.gameLayer.height = s.designHeight;
            s._stage.addChildAt(s.gameLayer, 0);
            s._stage.addEventListener(egret.Event.RESIZE, s.contentSizeChanged, s, false, 1000);
            s.contentSizeChanged();
        };
        SceneManager.prototype.contentSizeChanged = function () {
            // let scale = 1920 / 1080 > this._moduleBase.stage.stageWidth / this._moduleBase.stage.stageHeight ? 1 : 0;
            // if (scale == 1) {
            // 	this._moduleBase.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            // 	//console.log("竖屏");
            // } else {
            // 	this._moduleBase.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            // 	//console.log("横屏");
            // }
            //console.log("stageWidth:" + this.stage.stageWidth + "     stageHeight:" + this.stage.stageHeight);
            //console.log("sceneWidth:" + SceneManager.Instance.currentScene.width + "     sceneHeight:" + SceneManager.Instance.currentScene.height);
            //console.log("sceneScaleX:" + SceneManager.Instance.currentScene.scaleX + "     sceneScaleY:" + SceneManager.Instance.currentScene.scaleY);
            //计算游戏画面等比例缩放系数
            var s = this;
            var stageWidth = s._stage.stageWidth;
            var stageHeight = s._stage.stageHeight;
            var scaleX = stageWidth / s.designWidth;
            var scaleY = stageHeight / s.designHeight;
            if (scaleX < scaleY) {
                s.gameScale = scaleX;
            }
            else {
                s.gameScale = scaleY;
            }
            if (s.gameLayer) {
                s.gameLayer.width = s.designWidth;
                s.gameLayer.height = s.designHeight;
                s.gameLayer.scaleX = s.gameLayer.scaleY = s.gameScale;
                s.gameLayer.x = (stageWidth - s.gameLayer.width * s.gameScale) / 2;
                s.gameLayer.y = (stageHeight - s.gameLayer.height * s.gameScale) / 2;
                // s.gameLayer.graphics.clear();
                // s.gameLayer.graphics.beginFill(0xff0000, 0.5);
                // s.gameLayer.graphics.drawRect(0, 0, s.gameLayer.width, s.gameLayer.height);
                // s.gameLayer.graphics.endFill();
            }
            //约束布局
            s.fixLayout();
        };
        /**
         * obj 需要布局约束的对象
         * left 相对左边距
         * right 右边距
         * top 上边距
         * bottom 下边距
         * relativeParent 约束布局的父级对象
         */
        SceneManager.prototype.fixListen = function (obj, left, right, top, bottom, relativeParent) {
            if (left === void 0) { left = NaN; }
            if (right === void 0) { right = NaN; }
            if (top === void 0) { top = NaN; }
            if (bottom === void 0) { bottom = NaN; }
            if (relativeParent === void 0) { relativeParent = null; }
            var s = this;
            var fixObj;
            var index = -1;
            for (var i = 0; i < s.fixDisplayArr.length; ++i) {
                if (s.fixDisplayArr[i].display == obj) {
                    index = i;
                    fixObj = s.fixDisplayArr[i];
                    break;
                }
            }
            if (left != left && right != right && top != top && bottom != bottom) {
                if (fixObj) {
                    s.fixDisplayArr.splice(index, 1);
                    codeBase.ObjectPool.recycleClass(fixObj);
                }
            }
            else {
                if (!fixObj) {
                    fixObj = codeBase.ObjectPool.getByClass(FixDisplay);
                    s.fixDisplayArr.push(fixObj);
                }
                fixObj.display = obj;
                fixObj.left = left;
                fixObj.right = right;
                fixObj.top = top;
                fixObj.bottom = bottom;
                fixObj.relativeParent = relativeParent;
            }
            s.fixLayout();
        };
        SceneManager.prototype.fixLayout = function () {
            var s = this;
            var num = s.fixDisplayArr.length;
            var fixObj;
            var parentWidth;
            var parentHeight;
            var thisWidth;
            var thisHeight;
            var relativeObj;
            var newX, newY;
            var localPos;
            var globalPos;
            for (var i = 0; i < num; ++i) {
                fixObj = s.fixDisplayArr[i];
                relativeObj = fixObj.relativeParent ? fixObj.relativeParent : s._stage;
                parentWidth = relativeObj == s._stage ? s._stage.stageWidth : relativeObj.width;
                parentHeight = relativeObj == s._stage ? s._stage.stageHeight : relativeObj.height;
                thisWidth = fixObj.display.width;
                thisWidth = fixObj.display.height;
                //为了保证得到的宽高是数值型,这里进行了严格的检测
                if (isNaN(parentWidth) || parentHeight == undefined) {
                    parentWidth = 0;
                }
                if (isNaN(parentHeight) || parentHeight == undefined) {
                    parentHeight = 0;
                }
                if (isNaN(thisWidth) || thisWidth == undefined) {
                    thisWidth = 0;
                }
                if (isNaN(thisHeight) || thisHeight == undefined) {
                    thisWidth = 0;
                }
                // var widthChanged: boolean = false;//宽度有改变
                // var heightChanged: boolean = false;//高度有改变
                if (!isNaN(fixObj.left) && isNaN(fixObj.right)) {
                    //fixObj.display.x = fixObj.left;
                    globalPos = relativeObj.localToGlobal(fixObj.left, 0);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newX = localPos.x;
                }
                else if (!isNaN(fixObj.right) && isNaN(fixObj.left)) {
                    //fixObj.display.x = parentWidth - fixObj.right - thisWidth;
                    globalPos = relativeObj.localToGlobal(parentWidth - fixObj.right, 0);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newX = localPos.x;
                }
                else if (!isNaN(fixObj.left) && !isNaN(fixObj.right)) {
                    //fixObj.display.x = fixObj.left;
                    globalPos = relativeObj.localToGlobal(fixObj.left, 0);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newX = localPos.x;
                    globalPos = relativeObj.localToGlobal(parentWidth - fixObj.right, 0);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    thisWidth = localPos.x - newX;
                }
                if (!isNaN(fixObj.top) && isNaN(fixObj.bottom)) {
                    //fixObj.display.y = fixObj.top;
                    globalPos = relativeObj.localToGlobal(0, fixObj.top);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newY = localPos.y;
                }
                else if (!isNaN(fixObj.bottom) && isNaN(fixObj.top)) {
                    //fixObj.display.y = parentHeight - fixObj.bottom - thisHeight;
                    globalPos = relativeObj.localToGlobal(0, parentHeight - fixObj.bottom);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newY = localPos.y;
                }
                else if (!isNaN(fixObj.top) && !isNaN(fixObj.bottom)) {
                    //fixObj.display.y = fixObj.top;
                    globalPos = relativeObj.localToGlobal(0, fixObj.top);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    newY = localPos.y;
                    globalPos = relativeObj.localToGlobal(0, parentHeight - fixObj.bottom);
                    localPos = fixObj.display.parent.globalToLocal(globalPos.x, globalPos.y);
                    thisHeight = localPos.y - newY;
                }
                fixObj.display.x = newX;
                fixObj.display.y = newY;
                if (fixObj.display.width != thisWidth) {
                    fixObj.display.width = thisWidth;
                }
                if (fixObj.display.height != thisHeight) {
                    fixObj.display.height = thisHeight;
                }
            }
        };
        SceneManager.prototype.showScene = function (_scene) {
            var s = this;
            if (_scene) {
                s.gameLayer.addChild(_scene);
                s.setCurrentScene(_scene);
            }
        };
        SceneManager.prototype.setCurrentScene = function (scene) {
            var s = this;
            if (s.currentScene) {
                s.removeScene(s.currentScene);
                s.fixListen(s.currentScene, NaN, NaN, NaN, NaN);
            }
            s.currentScene = scene;
            s.fixListen(s.currentScene, 0, 0, 0, 0);
        };
        SceneManager.prototype.removeScene = function (scene) {
            var s = this;
            if (scene && scene.parent == s.gameLayer) {
                s.gameLayer.removeChild(scene);
                scene = null;
            }
        };
        SceneManager.prototype.dispose = function () {
            var s = this;
            var num = s.gameLayer.numChildren;
            while (num > 0) {
                var child = s.gameLayer.getChildAt(0);
                if (child instanceof codeBase.BaseScene) {
                    s.removeScene(child);
                }
                else {
                    s.gameLayer.removeChild(child);
                }
                num -= 1;
            }
            if (s.gameLayer && s.gameLayer.parent == s._stage) {
                s._stage.removeChild(s.gameLayer);
                s.gameLayer = null;
            }
            s.currentScene = null;
            s._stage.removeEventListener(egret.Event.RESIZE, s.contentSizeChanged, s);
        };
        return SceneManager;
    }());
    codeBase.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "codeBase.SceneManager");
    /**
     * 约束布局对象类
     */
    var FixDisplay = (function () {
        function FixDisplay() {
        }
        return FixDisplay;
    }());
    __reflect(FixDisplay.prototype, "FixDisplay");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=SceneManager.js.map