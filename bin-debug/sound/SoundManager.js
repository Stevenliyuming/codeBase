var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 声音播放逻辑：加载原始音频字节流、解析（WebAudioSound），创建原生Audio(HtmlSound)、播放。
     */
    var SoundManager = (function () {
        function SoundManager() {
            this.soundRootUrl = codeBase.GameUtil.Instance.remoteResUrl + "/resource/assets/Sound/";
            this.pauseTime = 0;
            this.soundChannelArr = [];
            this.musicVolume = 1;
            this.effectVolume = 1;
            this.titleVolume = 0.5;
        }
        Object.defineProperty(SoundManager, "Instance", {
            get: function () {
                if (!SoundManager.instance) {
                    SoundManager.instance = new SoundManager();
                    SoundManager.instance.modulePath = ""; //UIControl.getInstance().curUIIDPath;
                }
                return SoundManager.instance;
            },
            enumerable: true,
            configurable: true
        });
        /**播放正确0和错误1音效 */
        SoundManager.prototype.playRightWrongSound = function (type) {
            if (type === void 0) { type = 0; }
            if (type == 0)
                this.PlaySoundByName("rightBeep");
            else
                this.PlaySoundByName("wrongBeep");
        };
        /**播放点击音效 */
        SoundManager.prototype.playClickSound = function () {
            this.PlaySoundByName("click");
        };
        /**播放声音
         *
         * name 声音名称不带后缀 默认mp3格式
         * playTimes 播放次数 小于等于0循环播放
         * replay 是否重新开始播放
        */
        SoundManager.prototype.PlaySoundByName = function (name, playTimes, callBack, thisObj, volume, replay) {
            if (playTimes === void 0) { playTimes = 1; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (volume === void 0) { volume = 0; }
            if (replay === void 0) { replay = false; }
            var s = this;
            var num = s.soundChannelArr.length;
            var obj;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                if (obj.name === name) {
                    break;
                }
                obj = null;
            }
            if (obj == null) {
                var sound = RES.getRes(s.modulePath + "/sound/" + name + ".mp3"); //Main.instance.getRes(s.modulePath + "/sound/" + name + ".mp3");
                var soundChannel = sound.play(0, playTimes);
                obj = { name: name, sound: sound, soundChannel: soundChannel, callBack: callBack, thisObj: thisObj };
                s.soundChannelArr.push(obj);
            }
            else {
                if (obj.soundChannel.position == 0) {
                    obj.soundChannel = obj.sound.play(0, playTimes);
                }
                else {
                    if (replay) {
                        obj.soundChannel.stop();
                        obj.soundChannel = obj.sound.play(0, playTimes);
                    }
                    return;
                }
            }
            if (volume == 0) {
                obj.soundChannel.volume = s.effectVolume;
            }
            else {
                obj.soundChannel.volume = volume;
            }
            if (callBack && thisObj) {
                obj.callBack = callBack;
                obj.thisObj = thisObj;
                obj.soundChannel.once(egret.Event.SOUND_COMPLETE, callBack, thisObj);
            }
        };
        /** 播放多个短暂的相同音效可以使用此接口
         *
         * 播放多个同一个声音时，Audio类型的声音在白鹭底层有缓存播放过的声音Audio，再次播放的时候会先从缓存中拿取一个Audio播放;WebAudioSound会保留解析过的音频字节流，再次播放的时候不需要解析,两种
         * 类型的声音播放都会重新生成一个新的channel
        */
        SoundManager.prototype.PlaySoundOnce = function (name, playTimes, volume) {
            if (playTimes === void 0) { playTimes = 1; }
            if (volume === void 0) { volume = 0; }
            var s = this;
            var sound = RES.getRes(s.modulePath + "/sound/" + name + ".mp3"); //Main.instance.getRes(s.modulePath + "/sound/" + name + ".mp3");
            var channel = sound.play(0, playTimes);
            if (volume == 0) {
                channel.volume = s.effectVolume;
            }
            else {
                channel.volume = volume;
            }
            return channel;
        };
        /**停止播放音效 */
        SoundManager.prototype.stopSoundByName = function (name) {
            var s = this;
            var num = s.soundChannelArr.length;
            var obj;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                if (obj.name == name) {
                    var channel = obj.soundChannel;
                    channel.stop();
                }
            }
        };
        /**停止播放音效，销毁所有音效数据 */
        SoundManager.prototype.dispose = function () {
            var s = this;
            var num = s.soundChannelArr.length;
            var obj;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                var channel = obj.soundChannel;
                if (obj.callBack && obj.thisObj && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                    channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
                }
                channel.stop();
                //使用Audio类型的声音时会销毁所有声音缓存
                obj.sound.close();
            }
            s.soundChannelArr.length = 0;
        };
        return SoundManager;
    }());
    codeBase.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "codeBase.SoundManager");
})(codeBase || (codeBase = {}));
