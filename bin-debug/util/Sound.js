var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Sound = (function () {
        function Sound() {
        }
        /**
         * 播放声音
         * @param loops 0次循环,表示无限循环,同一个无限循环播放的声音不允许多次播放
         * @returns {string}
         */
        Sound.play = function (name, startTime, loops, completeFunc, thisObj) {
            if (startTime === void 0) { startTime = 0; }
            if (loops === void 0) { loops = 1; }
            if (completeFunc === void 0) { completeFunc = null; }
            if (thisObj === void 0) { thisObj = null; }
            //console.log("sound.play=" + name + ", valume.open=" + GlobalSetting.VOLUME_OPEN)
            if (codeBase.GlobalSetting.VOLUME_OPEN && codeBase.StringUtil.isUsage(name)) {
                if (loops == 0 && Sound._soundDict[name])
                    return Sound._soundDict[name];
                var sound = RES.getRes(name); //RES.getRes目前egret的声音是单例
                if (sound) {
                    var channel = sound.play(startTime, loops);
                    Sound._soundDict[name] = { channel: channel, loops: loops <= 0, num: loops, func: completeFunc, thisObj: thisObj };
                    channel.addEventListener(egret.Event.SOUND_COMPLETE, Sound.onSoundComplete, Sound);
                    if (completeFunc && thisObj) {
                        channel.addEventListener(egret.Event.SOUND_COMPLETE, completeFunc, thisObj);
                    }
                    return channel;
                }
            }
            return null;
        };
        /**
         * 设置声音
         * @param name
         * @param value
         */
        Sound.volume = function (name, value) {
            if (codeBase.StringUtil.isUsage(name) && Sound._soundDict[name]) {
                var channelConfig = Sound._soundDict[name];
                if (channelConfig.channel) {
                    channelConfig.channel.volume = value;
                }
            }
        };
        /**
         * 播放完毕
         * @param event
         */
        Sound.onSoundComplete = function (event) {
            //console.log("Sound onSoundComplete");
            var channel = event.currentTarget;
            var channelConfig = null;
            for (var key in Sound._soundDict) {
                channelConfig = Sound._soundDict[key];
                var myEvent = codeBase.MyEvent.getEvent(codeBase.EventType.SOUND_COMPLETE);
                myEvent.addItem("name", key);
                myEvent.send();
                if (channelConfig.channel == channel) {
                    if (!channelConfig.loops) {
                        channelConfig.num--;
                        if (channelConfig.num == 0 && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                            channel.removeEventListener(egret.Event.SOUND_COMPLETE, Sound.onSoundComplete, Sound);
                            delete Sound._soundDict[key];
                            if (channelConfig.func && channelConfig.thisObj) {
                                channel.removeEventListener(egret.Event.SOUND_COMPLETE, channelConfig.func, channelConfig.thisObj);
                            }
                            channelConfig.func = null;
                            channelConfig.thisObj = null;
                            channelConfig.channel = null;
                            delete Sound._soundDict[key];
                        }
                    }
                    break;
                }
            }
        };
        /**
         * 停止声音,对循环播放的声音有效
         * @param name
         */
        Sound.stop = function (name) {
            if (codeBase.StringUtil.isUsage(name) && Sound._soundDict[name]) {
                var channelConfig = Sound._soundDict[name];
                if (channelConfig.channel) {
                    if (channelConfig.channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                        channelConfig.channel.removeEventListener(egret.Event.SOUND_COMPLETE, Sound.onSoundComplete, Sound);
                        if (channelConfig.func && channelConfig.thisObj) {
                            channelConfig.channel.removeEventListener(egret.Event.SOUND_COMPLETE, channelConfig.func, channelConfig.thisObj);
                        }
                    }
                    channelConfig.channel.stop();
                    channelConfig.func = null;
                    channelConfig.thisObj = null;
                    channelConfig.channel = null;
                    var myEvent = codeBase.MyEvent.getEvent(codeBase.EventType.SOUND_STOP);
                    myEvent.addItem("name", name);
                    myEvent.send();
                    delete Sound._soundDict[name];
                }
            }
        };
        Sound._soundDict = {}; //循环播放的文件
        return Sound;
    }());
    codeBase.Sound = Sound;
    __reflect(Sound.prototype, "codeBase.Sound");
})(codeBase || (codeBase = {}));
