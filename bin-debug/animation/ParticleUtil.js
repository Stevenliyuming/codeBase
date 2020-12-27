var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var ParticleUtil = (function () {
        function ParticleUtil() {
        }
        /**
         * 播放粒子特效
         */
        ParticleUtil.showParticleEffect = function (pr, px, py, textureData, jsonData) {
            //创建星星特效 GravityParticleSystem
            var effect = new particle.GravityParticleSystem(textureData, jsonData);
            //启动粒子库
            effect.start();
            effect.emitterX = px;
            effect.emitterY = py;
            pr.addChild(effect);
            return effect;
        };
        return ParticleUtil;
    }());
    codeBase.ParticleUtil = ParticleUtil;
    __reflect(ParticleUtil.prototype, "codeBase.ParticleUtil");
})(codeBase || (codeBase = {}));
