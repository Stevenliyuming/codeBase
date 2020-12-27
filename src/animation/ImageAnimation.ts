module codeBase{
	export class ImageData {
		public framekey: string = "";
		public frameNames: string[] = [];
		public frameTextures: egret.Texture[] = [];

		public constructor(key: string, spriteNames: string[]) {
			let s = this;
			s.framekey = key;
			s.frameNames = [...spriteNames];
			s.init();
		}

		private init() {
			let s = this;
			let num = s.frameNames.length;
			for (let i = 0; i < num; ++i) {
				s.frameTextures[i] = RES.getRes(s.frameNames[i]);
			}
		}

		private setFrameData(key: string, spriteNames: string[]) {
			let s = this;
			s.framekey = key;
			s.frameNames = [...spriteNames];
		}
	}

	export class AnimationData {
		public fun: Function;
		public funObj: any;
		public completeFun:Function;
		public completeFunObj:any;
		public frameListener:Function[] = [];
		public frameListenerObj:any[] = [];
		public frameIndex:number[] = [];
	}

	export class ImageAnimation extends egret.Sprite {
		public ImageSource: egret.Bitmap;
		private mCurFrame: number = 0;
		private mDelta: number = 0;
		private mFrameDelta: number = 0;

		public FPS: number = 5;
		public SpriteFrames: Array<ImageData> = new Array<ImageData>();
		public IsPlaying: boolean = false;
		public Foward: boolean = true;
		public AutoPlay: boolean = false;
		public Loop: number = 1;
		public loopCounter:number = 0;

		private static mLastTime: number = 0;
		private static mCurrentTime: number = 0;
		private static mGapTime: number = 0;

		//当前动画数据
		private currentAnimationData: ImageData = null;
		private FrameCount: number = 0;
		private defaultAnimationKey: string = "";
		private animationRun: AnimationData;

		private ax: number = 0.5;
		private ay: number = 0.5;
		private color: number = -1;

		private static _init: boolean = false;
		private static animationRunData: AnimationData[] = [];
		private static _stage:egret.Stage;

		/**
		 * key 动画名称
		 * frameName 帧图片命名前缀，例如pic1.png是第一帧，则frameName为pic
		 * frameNum 帧数
		 * sheetName 图集名称
		 * frameStartIndex 从第几帧开始
		 */
		public constructor(key:string, frameName:string, frameNum:number, sheetName:string, frameStartIndex:number = 0) {
			super();
			let s = this;
			//添加默认动画数据
			s.AddAnimation(key, frameName, frameNum, sheetName, frameStartIndex);
			//默认帧动画key
			s.defaultAnimationKey = key;
			s.currentAnimationData = s.SpriteFrames[0];
			s.initImage();
			s.addEventListener(egret.Event.ADDED_TO_STAGE, s.AddToStage, s);
		}

		private AddToStage(e) {
			let s = this;
			if (!ImageAnimation._init) {
				ImageAnimation._init = true;
				ImageAnimation.mLastTime = egret.getTimer();
				ImageAnimation._stage = s.stage;
				ImageAnimation._stage.addEventListener(egret.Event.ENTER_FRAME, ImageAnimation.frameUpdate, s);
			}
			s.removeEventListener(egret.Event.ADDED_TO_STAGE, s.AddToStage, s);
			//s.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.removeFromStage, s);

			s.animationRun = new AnimationData;
			s.animationRun.fun = s.animationUpdate;
			s.animationRun.funObj = s;
			ImageAnimation.animationRunData.push(s.animationRun);
		}

		private removeFromStage(e: egret.Event) {
			let s = this;
			let index = ImageAnimation.animationRunData.indexOf(s.animationRun);
			if (index != -1) {
				ImageAnimation.animationRunData.splice(index, 1);
			}
			s.removeEventListener(egret.Event.REMOVED_FROM_STAGE, s.removeFromStage, s);
		}

		private Init() {
			let s = this;
			s.mDelta = 0;
			s.mCurFrame = 0;
			s.IsPlaying = true;
			//每帧动画的时间间隔
			s.mFrameDelta = 1 / s.FPS;
			if(!s.Foward) {
				s.mCurFrame = s.FrameCount - 1;
			}
			s.ImageSource.texture = s.currentAnimationData.frameTextures[s.mCurFrame];
			s.initImage();
		}

		private initImage() {
			let s = this;
			if(!s.ImageSource) {
				s.ImageSource = new egret.Bitmap;
				s.addChild(s.ImageSource);
				s.setSprite(0);
			}
			s.ImageSource.anchorOffsetX = s.ImageSource.width * s.ax;
			s.ImageSource.anchorOffsetY = s.ImageSource.height * s.ay;
			s.width = s.ImageSource.width;
			s.height = s.ImageSource.height;
		}

		private animationUpdate(gapTime: number) {
			let s = this;
			if (!s.IsPlaying || !s.currentAnimationData || 0 == s.FrameCount) {
				return;
			}
			if (gapTime > 1) {
				gapTime = 0;
			}
			s.mDelta += gapTime;
			if (s.mDelta > s.mFrameDelta) {
				s.mDelta -= s.mFrameDelta;
				s.frameListener(s.mCurFrame);
				if (s.Foward) {
					s.mCurFrame++;
				}
				else {
					s.mCurFrame--;
				}

				if (s.mCurFrame >= s.FrameCount) {
					s.Loop -= 1;
					if(s.Loop == 0) {
						s.IsPlaying = false;
						s.completeListener();
						return;
					} else {
						s.mCurFrame = 0;
					}
				}
				else if (s.mCurFrame < 0) {
					s.Loop -= 1;
					if(s.Loop == 0) {
						s.IsPlaying = false;
						s.completeListener();
						return;
					} else {
						s.mCurFrame = s.FrameCount - 1;
					}
				}

				s.setSprite(s.mCurFrame);
			}
		}

		private static frameUpdate(e: egret.Event) {
			ImageAnimation.mCurrentTime = egret.getTimer();
			ImageAnimation.mGapTime = (ImageAnimation.mCurrentTime - ImageAnimation.mLastTime) / 1000;
			ImageAnimation.mLastTime = ImageAnimation.mCurrentTime;

			let num = ImageAnimation.animationRunData.length;
			for (let i = 0; i < num; ++i) {
				ImageAnimation.animationRunData[i].fun.call(ImageAnimation.animationRunData[i].funObj, ImageAnimation.mGapTime);
			}
		}

		//添加动画数据接口
		public AddAnimation(key: string, frameName: string, frameNum: number, sheetName: string, frameStartIndex: number = 0): ImageAnimation {
			if (frameNum == 0) {
				alert("动画帧数据为空");
				return;
			}
			if (key == "") {
				alert("动画键值为空");
				return;
			}
			let s = this;
			let isHaveKey = false;
			for (let i = 0; i < s.SpriteFrames.length; ++i) {
				if (s.SpriteFrames[i].framekey == key) {
					isHaveKey = true;
					break;
				}
			}

			//避免有相同key的动画
			if (!isHaveKey) {
				let frameNames: string[] = [];
				for (let i = 0; i < frameNum; ++i) {
					frameNames[i] = sheetName + "." + frameName + `${frameStartIndex + i}`;
				}
				let frameData = new ImageData(key, frameNames);
				s.SpriteFrames.push(frameData);
			}
			return s;
		}

		public show(pr:egret.DisplayObjectContainer, px:number, py:number) {
			let s = this;
			pr.addChild(s);
			s.x = px;
			s.y = py;
		}

		//播放指定key对应的动画
		public play(key: string, loop:number = 1, foward:boolean=true) {
			let s = this;
			//if(s.currentAnimationData.framekey == key) return;
			s.currentAnimationData = null;
			s.FrameCount = 0;
			s.Loop = loop;
			s.Foward = foward;
			for (let i = 0; i < s.SpriteFrames.length; ++i) {
				if (s.SpriteFrames[i].framekey == key) {
					s.currentAnimationData = s.SpriteFrames[i];
					s.FrameCount = s.currentAnimationData.frameNames.length;
					break;
				}
			}

			if (s.FrameCount == 0) {
				alert("不存在key对应的动画帧");
			}
			else {
				s.Init();
			}
		}

		public stop(isClear:boolean=false) {
			let s = this;
			if (s.currentAnimationData) {
				s.IsPlaying = false;
				s.setSprite(0);
				// if (this.color >= 0) {
				// 	this.color = -1;
				// 	GameConfig.Inst.clearColor(this.ImageSource);
				// }

				if(isClear) {
					s.clear();
				}
			}
		}

		//设置动画帧率
		public setFPS(fps: number) {
			this.FPS = fps;
			//每帧动画的时间间隔时间
			this.mFrameDelta = 1 / this.FPS;
		}

		private setSprite(spriteIndex: number) {
			let s = this;
			s.ImageSource.texture = s.currentAnimationData.frameTextures[spriteIndex];
			// if (this.color >= 0) {
			// 	GameConfig.Inst.setImageColor(s.ImageSource, this.color);
			// }
		}
		
		public clear() {
			let s = this;
			let index = ImageAnimation.animationRunData.indexOf(s.animationRun);
			if (index != -1) {
				ImageAnimation.animationRunData.splice(index, 1);
			}
		}

		public static dispose() {
			let s = this;
			if (ImageAnimation._init) {
				ImageAnimation._init = false;
				ImageAnimation._stage.removeEventListener(egret.Event.ENTER_FRAME, ImageAnimation.frameUpdate, s);
			}
			ImageAnimation.animationRunData.length = 0;
		}

		public setAnchorPoint(ax: number, ay: number) {
			let s = this;
			s.ax = ax;
			s.ay = ay;
			let posX = s.ImageSource.x;
			let posY = s.ImageSource.y;
			s.ImageSource.anchorOffsetX = s.ImageSource.width * s.ax;
			s.ImageSource.anchorOffsetY = s.ImageSource.height * s.ay;
			s.ImageSource.x = posX;
			s.ImageSource.y = posY;
		}

		public setColor(_color: number) {
			this.color = _color;
		}

		private frameListener(frameIndex:number) {
			let s = this;
			let num = s.animationRun.frameIndex.length;
			let i: number;
			for (i = 0; i < num; ++i) {
				if (s.animationRun.frameIndex[i] == frameIndex) {
					s.animationRun.frameListener[i].call(s.animationRun.frameListenerObj[i], s);
				}
			}
		}

		private completeListener() {
			let s = this;
			if(s.animationRun.completeFun) {
				let fun = s.animationRun.completeFun;
				let funObj = s.animationRun.completeFunObj;
				s.animationRun.completeFun = null;
				s.animationRun.completeFunObj = null;
				fun.call(funObj, s);
			}
		}

		public addCompleteListener(fun:Function, thisObj:any) {
			let s = this;
			s.animationRun.completeFun = fun;
			s.animationRun.completeFunObj = thisObj;
		}

		public addFrameListener(fun:Function, thisObj:any, frameIndex:number) {
			let s = this;
			let num = s.animationRun.frameIndex.length;
			let i:number;
			for(i=0; i<num; ++i) {
				if(s.animationRun.frameIndex[i] == frameIndex) {
					break;
				}
			}

			if(i == num) {
				s.animationRun.frameListener.push(fun);
				s.animationRun.frameListenerObj.push(thisObj);
				s.animationRun.frameIndex.push(frameIndex);
			}
		}
	}
}