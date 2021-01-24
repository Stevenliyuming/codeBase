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
                    SoundManager.instance.init();
                }
                return SoundManager.instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.init = function () {
            var s = this;
            // if (Browser.onMobile) {
            // 	MsgBase.getMsgHandle().regMsg(MsgBase.FRONT_BACK_CHANGE, s.frontBackChange, s);
            // }
            // else {
            // 	document.addEventListener("visibilitychange", function () {
            // 		if (document.visibilityState == "visible") {
            // 			s.viewIn();
            // 		}
            // 		if (document.visibilityState == "hidden") {
            // 			s.viewOut();
            // 		}
            // 	});
            // }
            document.addEventListener("visibilitychange", function () {
                if (document.visibilityState == "visible") {
                    s.viewIn();
                }
                if (document.visibilityState == "hidden") {
                    s.viewOut();
                }
            });
        };
        SoundManager.prototype.frontBackChange = function (d) {
            if (d == null)
                return;
            var s = this;
            if (d.data) {
                if (d.data.type == 1) {
                    s.viewOut();
                }
                else if (d.data.type == 2) {
                    s.viewIn();
                }
            }
        };
        SoundManager.prototype.viewIn = function () {
            //SoundManager.instance.resume();
            this.resumeSound();
        };
        SoundManager.prototype.viewOut = function () {
            //SoundManager.instance.pause();
            this.pauseSound();
        };
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
        SoundManager.prototype.PlaySoundByName = function (name, playTimes, callBack, thisObj, volume, replay, stopAll) {
            if (playTimes === void 0) { playTimes = 1; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (volume === void 0) { volume = 0; }
            if (replay === void 0) { replay = false; }
            if (stopAll === void 0) { stopAll = false; }
            var s = this;
            if (stopAll) {
                s.stopAllSound();
            }
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
                obj.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, s.playEnd, s);
            }
        };
        SoundManager.prototype.playEnd = function (ev) {
            var s = this;
            var obj;
            var target = ev.target;
            var num = s.soundChannelArr.length;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                var channel = obj.sound.originChannel;
                if (target == channel) {
                    if (obj.callBack && obj.thisObj) {
                        obj.callBack.call(obj.thisObj);
                        channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
                        obj.callBack = null;
                        obj.thisObj = null;
                    }
                }
            }
        };
        /**
         * 停止当前播放的所有声音
         */
        SoundManager.prototype.stopAllSound = function () {
            var s = this;
            s.stopSoundByName();
        };
        /**
         * 暂停声音
         */
        SoundManager.prototype.pauseSound = function () {
            var s = this;
            var num = s.soundChannelArr.length;
            var obj;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                var channel = obj.soundChannel;
                if (channel && channel.position > 0) {
                    if (obj.callBack && obj.thisObj && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                        channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
                    }
                    obj.pause = true;
                    obj.position = channel.position;
                    channel.stop();
                    channel = null;
                }
            }
        };
        /**
         * 重新播放声音
         */
        SoundManager.prototype.resumeSound = function () {
            var s = this;
            var num = s.soundChannelArr.length;
            var obj;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                if (obj.pause) {
                    obj.pause = false;
                    obj.soundChannel = obj.sound.play(obj.position, obj.playTimes);
                    if (obj.callBack && obj.thisObj) {
                        obj.soundChannel.once(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
                    }
                }
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
            if (name === void 0) { name = null; }
            var s = this;
            var obj;
            var num = s.soundChannelArr.length;
            for (var i = 0; i < num; ++i) {
                obj = s.soundChannelArr[i];
                if (!name || obj.name == name) {
                    var channel = obj.soundChannel;
                    if (obj.callBack && obj.thisObj && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                        //obj.callBack.call(obj.thisObj);
                        channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
                        obj.callBack = null;
                        obj.thisObj = null;
                    }
                    channel.stop();
                    channel.position = 0;
                }
                // else if (obj.name == name) {
                // 	let channel = <egret.SoundChannel>obj.soundChannel;
                // 	channel.stop();
                // }
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
//# sourceMappingURL=SoundManager.js.map