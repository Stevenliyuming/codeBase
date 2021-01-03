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
				SoundManager.instance.init();
			}
			return SoundManager.instance;
		}

		private init() {
			let s = this;
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
		}

		private frontBackChange(d: any): void {
			if (d == null) return;
			let s = this;
			if (d.data) {
				if (d.data.type == 1) {
					s.viewOut();
				}
				else if (d.data.type == 2) {
					s.viewIn();
				}
			}
		}

		private viewIn(): void {
			//SoundManager.instance.resume();
			this.resumeSound();
		}
		private viewOut(): void {
			//SoundManager.instance.pause();
			this.pauseSound();
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
		public PlaySoundByName(name: string, playTimes: number = 1, callBack: Function = null, thisObj: any = null, volume: number = 0, replay:boolean=false, stopAll:boolean=false) {
			let s = this;

			if(stopAll) {
				s.stopAllSound();
			}

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
				(<egret.SoundChannel>obj.soundChannel).addEventListener(egret.Event.SOUND_COMPLETE, s.playEnd, s);
			}
		}

		private playEnd(ev: egret.Event) {
			let s = this;
			let obj;
			let target = ev.target;
			let num = s.soundChannelArr.length;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				let channel = <egret.SoundChannel>obj.sound.originChannel;
				if (target == channel) {
					if (obj.callBack && obj.thisObj) {
						obj.callBack.call(obj.thisObj);
						channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
						obj.callBack = null;
						obj.thisObj = null;
					}
				}
			}
		}

		/**
		 * 停止当前播放的所有声音
		 */
		public stopAllSound() {
			let s = this;
			s.stopSoundByName();
		}

		/**
		 * 暂停声音
		 */
		public pauseSound() {
			let s = this;
			let num = s.soundChannelArr.length;
			let obj: any;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				let channel = <egret.SoundChannel>obj.soundChannel;
				if(channel && channel.position > 0) {
					if (obj.callBack && obj.thisObj && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
						channel.removeEventListener(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
					}
					obj.pause = true;
					obj.position = channel.position;
					channel.stop();
					channel = null;
				}
			}
		}

		/**
		 * 重新播放声音
		 */
		public resumeSound() {
			let s = this;
			let num = s.soundChannelArr.length;
			let obj: any;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				if(obj.pause) {
					obj.pause = false;
					obj.soundChannel = (<egret.Sound>obj.sound).play(obj.position, obj.playTimes);
					if (obj.callBack && obj.thisObj) {
						(<egret.SoundChannel>obj.soundChannel).once(egret.Event.SOUND_COMPLETE, obj.callBack, obj.thisObj);
					}
				}
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
		public stopSoundByName(name: string=null) {
			let s = this;
			let obj: any;
			let num = s.soundChannelArr.length;
			for (let i = 0; i < num; ++i) {
				obj = s.soundChannelArr[i];
				if(!name || obj.name == name) {
					let channel = <egret.SoundChannel>obj.soundChannel;
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