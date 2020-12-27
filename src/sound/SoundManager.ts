module codeBase{
	/**
	 * 声音播放逻辑：加载原始音频字节流、解析（WebAudioSound），创建原生Audio(HtmlSound)、播放。
	 */
	export class SoundManager {
		private static instance: SoundManager;
		private soundRootUrl: string = GameUtil.Instance.remoteResUrl + "/resource/assets/Sound/";
		private pauseTime: number = 0;
		private soundChannelArr: any[] = [];

		public musicVolume: number = 1;
		public effectVolume: number = 1;
		public titleVolume: number = 0.5;

		private modulePath: string;

		private constructor() {
		}

		public static get Instance(): SoundManager {
			if (!SoundManager.instance) {
				SoundManager.instance = new SoundManager();
				SoundManager.instance.modulePath = "";//UIControl.getInstance().curUIIDPath;
			}
			return SoundManager.instance;
		}

		/**播放正确0和错误1音效 */
		public playRightWrongSound(type: number = 0) {
			if (type == 0)
				this.PlaySoundByName("rightBeep");
			else
				this.PlaySoundByName("wrongBeep");
		}

		/**播放点击音效 */
		public playClickSound() {
			this.PlaySoundByName("click");
		}

		/**播放声音 
		 * 
		 * name 声音名称不带后缀 默认mp3格式
		 * playTimes 播放次数 小于等于0循环播放
		 * replay 是否重新开始播放
		*/
		public PlaySoundByName(name: string, playTimes: number = 1, callBack: Function = null, thisObj: any = null, volume: number = 0, replay:boolean=false) {
			let s = this;
			let num = s.soundChannelArr.length;
			let obj: any;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				if (obj.name === name) {
					break;
				}
				obj = null;
			}

			if (obj == null) {
				let sound = <egret.Sound>RES.getRes(s.modulePath + "/sound/" + name + ".mp3"); //Main.instance.getRes(s.modulePath + "/sound/" + name + ".mp3");
				let soundChannel = sound.play(0, playTimes);
				obj = { name: name, sound: sound, soundChannel: soundChannel, callBack: callBack, thisObj: thisObj };
				s.soundChannelArr.push(obj);
			} else {
				if ((<egret.SoundChannel>obj.soundChannel).position == 0) {
					obj.soundChannel = (<egret.Sound>obj.sound).play(0, playTimes);
				} else {
					if(replay) {
						(<egret.SoundChannel>obj.soundChannel).stop();
						obj.soundChannel = (<egret.Sound>obj.sound).play(0, playTimes);
					}
					return;
				}
			}
			if (volume == 0) {
				obj.soundChannel.volume = s.effectVolume;
			} else {
				obj.soundChannel.volume = volume;
			}

			if (callBack && thisObj) {
				obj.callBack = callBack;
				obj.thisObj = thisObj;
				(<egret.SoundChannel>obj.soundChannel).once(egret.Event.SOUND_COMPLETE, callBack, thisObj);
			}
		}

		/** 播放多个短暂的相同音效可以使用此接口
		 * 
		 * 播放多个同一个声音时，Audio类型的声音在白鹭底层有缓存播放过的声音Audio，再次播放的时候会先从缓存中拿取一个Audio播放;WebAudioSound会保留解析过的音频字节流，再次播放的时候不需要解析,两种
		 * 类型的声音播放都会重新生成一个新的channel
		*/
		public PlaySoundOnce(name: string, playTimes: number = 1, volume: number = 0) {
			let s = this;
			let sound = <egret.Sound>RES.getRes(s.modulePath + "/sound/" + name + ".mp3");//Main.instance.getRes(s.modulePath + "/sound/" + name + ".mp3");
			let channel = sound.play(0, playTimes);
			if (volume == 0) {
				channel.volume = s.effectVolume;
			} else {
				channel.volume = volume;
			}
			return channel;
		}

		/**停止播放音效 */
		public stopSoundByName(name: string) {
			let s = this;
			let num = s.soundChannelArr.length;
			let obj: any;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				if (obj.name == name) {
					let channel = <egret.SoundChannel>obj.soundChannel;
					channel.stop();
				}
			}
		}

		/**停止播放音效，销毁所有音效数据 */
		public dispose() {
			let s = this;
			let num = s.soundChannelArr.length;
			let obj: any;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				let channel = <egret.SoundChannel>obj.soundChannel;
				if (obj.callBack && obj.thisObj && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
					channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
				}
				channel.stop();
				//使用Audio类型的声音时会销毁所有声音缓存
				(<egret.Sound>obj.sound).close();
			}
			s.soundChannelArr.length = 0;
		}
	}
}