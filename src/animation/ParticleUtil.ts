module codeBase{
	export class ParticleUtil {
		public constructor() {
		}

		/**
		 * 播放粒子特效
		 */
		public static showParticleEffect(pr: egret.DisplayObjectContainer, px: number, py: number, textureData: any, jsonData: any) {
			//创建星星特效 GravityParticleSystem
			let effect: particle.GravityParticleSystem = new particle.GravityParticleSystem(textureData, jsonData)
			//启动粒子库
			effect.start();
			effect.emitterX = px;
			effect.emitterY = py;
			pr.addChild(effect);
			return effect;
		}
	}
}