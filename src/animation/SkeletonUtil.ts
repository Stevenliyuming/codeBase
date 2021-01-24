module codeBase{
	export class SkeletonUtil {
		private static inst:SkeletonUtil;
		private dragonBonesTime = NaN;
		private worldClock:dragonBones.WorldClock;
		private constructor() {
		}

		public static get Instance() {
			if(!SkeletonUtil.inst) {
				SkeletonUtil.inst = new SkeletonUtil;
				SkeletonUtil.inst.init();
			}
			return SkeletonUtil.inst;
		}

		protected init() {
			let s = this;
			s.worldClock = new dragonBones.WorldClock;
		}

		//创建影片剪辑帧动画
		public createMovieClipAnimation(mcData: string, mcTexture:egret.Texture, mcName:string): egret.MovieClip {
			var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
			var clip: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(mcName));
			return clip;
		}

		//初始骨骼动画数据
		public initDragonBonesData(skeName:string, filePath:string="") {
			let skejson:string = filePath + skeName + "_ske_json"; 
			let texjson:string = filePath + skeName + "_tex_json";
			let texpng:string =  filePath + skeName + "_tex_png";
			let skeData = RES.getRes(skejson);
			//console.log(skeData);
			let textureData = RES.getRes(texjson);
			//console.log(aniData);
			let textureAtlas: egret.Texture = RES.getRes(texpng);
			//console.log(anitexture);
			dragonBones.EgretFactory.factory.parseDragonBonesData(skeData, skeName);
			dragonBones.EgretFactory.factory.parseTextureAtlasData(textureData, textureAtlas, skeName);
		}

		/**创建骨骼动画骨架显示容器
		 * skeName 龙骨文件名
		 * armatureName 龙骨骨架名
		 * dragonBonesName 龙骨名
		 */
		public createSkeletonDisplay(filePath:string, skeName:string, armatureName: string, dragonBonesName): dragonBones.EgretArmatureDisplay {
			let s = this;
			let data1 = dragonBones.EgretFactory.factory.getDragonBonesData(skeName);
			let data2 = dragonBones.EgretFactory.factory.getTextureAtlasData(skeName);
			if(!data1 ||!data2) {
				s.initDragonBonesData(skeName, filePath);
			}
			//不需要世界时钟驱动
			let displayObj = dragonBones.EgretFactory.factory.buildArmatureDisplay(armatureName, dragonBonesName);
			//newDisplayObj.animation.play();
			return displayObj;
		}

		//创建骨骼动画骨架
		public createSkeletonArmature(filePath:string, skeName:string, armatureName: string, dragonBonesName: string): dragonBones.Armature {
			let s = this;
			let data1 = dragonBones.EgretFactory.factory.getDragonBonesData(skeName);
			let data2 = dragonBones.EgretFactory.factory.getTextureAtlasData(skeName);
			if(!data1 ||!data2) {
				s.initDragonBonesData(filePath, skeName);
			}
			//var factory = new dragonBones.EgretFactory();
			//需要世界时钟驱动
			let armature: dragonBones.Armature = dragonBones.EgretFactory.factory.buildArmature(armatureName, dragonBonesName);
			s.worldClock.clock.add(armature);
			//armature.animation.gotoAndPlay("");
			//let armatureDisplay = armature.display;
			//启动计时器更新世界时钟
			if (s.dragonBonesTime != s.dragonBonesTime) {
				s.dragonBonesTime = egret.getTimer();
				egret.startTick(s.onTicker, s);
			}
			return armature;
		}

		private onTicker(timeStamp: number) {
			let s = this;
			var now = timeStamp;
			var pass = now - s.dragonBonesTime;
			s.dragonBonesTime = now;
			s.worldClock.clock.advanceTime(pass / 1000);
			return false;
		}

		public dispose() {
			let s = this;
			if (s.dragonBonesTime == s.dragonBonesTime) {
				egret.stopTick(s.onTicker, s);
				s.dragonBonesTime = NaN;
			}
		}
	}
}