module codeBase{
	//场景管理类
	export class SceneManager {
		private static _instance: SceneManager;
		//private _moduleBase: ModuleBase;
		public _stage: egret.Stage;
		public currentScene: any;
		//private _video: VideoWin;
		public gameScale: number = 1;
		public gameLayer:egret.Sprite;
		public designWidth: number = 1920;
		public designHeight: number = 1080;

		private constructor() {
		}

		public static get Instance(): SceneManager {
			if (!this._instance) {
				this._instance = new SceneManager();
			}
			return this._instance;
		}

		public Init() {
			let s = this;
			//s._moduleBase = moduleBase;
			s._stage = curStage();//s._moduleBase.stage;
			//this._stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
			//this._stage.orientation = egret.OrientationMode.AUTO;
			s.gameLayer = new egret.Sprite;
			s.gameLayer.width = 1920;
			s.gameLayer.height = 1080;
			s._stage.addChildAt(s.gameLayer, 0);
			s._stage.addEventListener(egret.Event.RESIZE, s.contentSizeChanged, s, false, 1000);
			s.contentSizeChanged();
		}

		public contentSizeChanged() {
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
			let s = this;
			let stageWidth: number = s._stage.stageWidth;
			let stageHeight: number = s._stage.stageHeight;
			let scaleX = stageWidth / s.designWidth;
			let scaleY = stageHeight / s.designHeight;
			if (scaleX < scaleY) {
				s.gameScale = scaleX;
			} else {
				s.gameScale = scaleY;
			}

			if(s.gameLayer) {
				s.gameLayer.width = 1920 ;
				s.gameLayer.height = 1080 ;
				s.gameLayer.scaleX = s.gameLayer.scaleY = s.gameScale;
				s.gameLayer.x = (stageWidth - s.gameLayer.width * s.gameScale ) / 2;
				s.gameLayer.y = (stageHeight - s.gameLayer.height * s.gameScale ) / 2;
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
		}

		// public get currentModule(): ModuleBase {
		// 	return this._moduleBase;
		// }

		public showScene(_scene: BaseScene) {
			let s = this;
			if (_scene) {
				_scene.width = 1920;
				_scene.height = 1080;
				_scene.horizontalCenter = 0;
				_scene.verticalCenter = 0;
				s.gameLayer.addChild(_scene);
				s.setCurrentScene(_scene);
			}
		}

		private setCurrentScene(scene: any) {
			let s = this;
			if (s.currentScene) {
				//LayerManager.getInstance().fixListen(s.currentScene, NaN, NaN, NaN, NaN);
				s.gameLayer.removeChild(s.currentScene);
				s.currentScene = null;
			}
			s.currentScene = scene;
			//LayerManager.getInstance().fixListen(s.currentScene, 0, 0, 0, 0);
		}

		public removeScene(scene:BaseScene) {
			let s = this;
			if(scene && scene.parent == s.gameLayer) {
				s.gameLayer.removeChild(scene);
				if(scene === s.currentScene) {
					s.currentScene = null;
				}
			}
		}

		public dispose() {
			let s = this;
			let num = s.gameLayer.numChildren;
			while(num > 0) {
				let child = s.gameLayer.getChildAt(0);
				if(child instanceof BaseScene) {
					//LayerManager.getInstance().fixListen(child, NaN, NaN, NaN, NaN);
				}
				s.gameLayer.removeChild(child);
				num -= 1;
			}
			if(s.gameLayer) {
				s._stage.removeChild(s.gameLayer);
				s.gameLayer = null;
			}
			s.currentScene = null;
			s._stage.removeEventListener(egret.Event.RESIZE, s.contentSizeChanged, s);
		}
	}

}