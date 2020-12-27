var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    //场景管理类
    var SceneManager = (function () {
        function SceneManager() {
            //private _video: VideoWin;
            this.gameScale = 1;
            this.designWidth = 1920;
            this.designHeight = 1080;
        }
        Object.defineProperty(SceneManager, "Instance", {
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
            //s._moduleBase = moduleBase;
            s._stage = codeBase.curStage(); //s._moduleBase.stage;
            //this._stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            //this._stage.orientation = egret.OrientationMode.AUTO;
            s.gameLayer = new egret.Sprite;
            s.gameLayer.width = 1920;
            s.gameLayer.height = 1080;
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
                s.gameLayer.width = 1920;
                s.gameLayer.height = 1080;
                s.gameLayer.scaleX = s.gameLayer.scaleY = s.gameScale;
                s.gameLayer.x = (stageWidth - s.gameLayer.width * s.gameScale) / 2;
                s.gameLayer.y = (stageHeight - s.gameLayer.height * s.gameScale) / 2;
                // s.gameLayer.graphics.clear();
                // s.gameLayer.graphics.beginFill(0xff0000, 0.5);
                // s.gameLayer.graphics.drawRect(0, 0, s.gameLayer.width, s.gameLayer.height);
                // s.gameLayer.graphics.endFill();
            }
            // if (s.currentScene) {
            // 	let left_top = s.gameLayer.globalToLocal(0, 0);
            // 	let right_bottom = s.gameLayer.globalToLocal(stageWidth, stageHeight);
            // 	s.currentScene.width = right_bottom.x - left_top.x;
            // 	s.currentScene.height = right_bottom.y - left_top.y;
            // 	s.currentScene.x = left_top.x;
            // 	s.currentScene.y = left_top.y;
            // }
        };
        // public get currentModule(): ModuleBase {
        // 	return this._moduleBase;
        // }
        SceneManager.prototype.showScene = function (_scene) {
            var s = this;
            if (_scene) {
                _scene.width = 1920;
                _scene.height = 1080;
                _scene.horizontalCenter = 0;
                _scene.verticalCenter = 0;
                s.gameLayer.addChild(_scene);
                s.setCurrentScene(_scene);
            }
        };
        SceneManager.prototype.setCurrentScene = function (scene) {
            var s = this;
            if (s.currentScene) {
                //LayerManager.getInstance().fixListen(s.currentScene, NaN, NaN, NaN, NaN);
                s.gameLayer.removeChild(s.currentScene);
                s.currentScene = null;
            }
            s.currentScene = scene;
            //LayerManager.getInstance().fixListen(s.currentScene, 0, 0, 0, 0);
        };
        SceneManager.prototype.removeScene = function (scene) {
            var s = this;
            if (scene && scene.parent == s.gameLayer) {
                s.gameLayer.removeChild(scene);
                if (scene === s.currentScene) {
                    s.currentScene = null;
                }
            }
        };
        SceneManager.prototype.dispose = function () {
            var s = this;
            var num = s.gameLayer.numChildren;
            while (num > 0) {
                var child = s.gameLayer.getChildAt(0);
                if (child instanceof codeBase.BaseScene) {
                    //LayerManager.getInstance().fixListen(child, NaN, NaN, NaN, NaN);
                }
                s.gameLayer.removeChild(child);
                num -= 1;
            }
            if (s.gameLayer) {
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
})(codeBase || (codeBase = {}));
