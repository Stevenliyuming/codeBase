module codeBase{
	//游戏状态枚举类型
	export enum GameState { Start, Playing, Pause, Finished };

	export class GameUtil {
		private static instance: GameUtil
		public stageW: number;
		public stageH: number;
		public stageCenterW: number;
		public stageCenterH: number;

		public remoteResUrl: string = "http://106.52.184.124/TabAndFly_wxgame_remote";

		public _GameState: GameState = GameState.Playing;

		public musicVolume: number = 1;
		public effectVolume: number = 1;

		public stage: egret.Stage;
		public  canvas: HTMLCanvasElement;
		
		private canvasEventListenerArr: any[] = [];
		private documentEventListenerArr: any[] = [];
		/**注册鼠标移动监听 */
		private mouseMoveListenerArr:any[] = [];
		private registerMouseMove:boolean = false;

		private modulePath:string = "";

		public static keyCodes = {
			space: 32,/**空格 */
			up: 38,/**上 */
			down: 40,/**下 */
			right: 39,/**右 */
			left: 37/**左 */
		};

		private constructor() {
		}

		public static get Instance(): GameUtil {
			if (GameUtil.instance == null) {
				GameUtil.instance = new GameUtil();
			}
			return GameUtil.instance;
		}

		public Init(): void {
			let s = this;
			if (!s.canvas) {
				s.canvas = <HTMLCanvasElement>document.getElementsByTagName("CANVAS")[0];
			}
			s.stage = egret.MainContext.instance.stage;
			mouse.enable(s.stage);

			s.stageW = s.stage.stageWidth;
			s.stageH = s.stage.stageHeight;
			s.stageCenterW = s.stage.stageWidth * 0.5;
			s.stageCenterH = s.stage.stageHeight * 0.5;
			//console.log("stageWidth:" +s.stageW + "     stageHeight:" + s.stageH);

			s.registerMouseMove = false;
			s.modulePath = "";//UIControl.getInstance().curUIIDPath;
		}

		/**
		url	需被使用的自定义光标的URL
		注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
		default	默认光标（通常是一个箭头）
		auto	默认。浏览器设置的光标。
		crosshair	光标呈现为十字线。
		pointer	光标呈现为指示链接的指针（一只手）
		move	此光标指示某对象可被移动。
		e-resize	此光标指示矩形框的边缘可被向右（东）移动。
		ne-resize	此光标指示矩形框的边缘可被向上及向右移动（北/东）。
		nw-resize	此光标指示矩形框的边缘可被向上及向左移动（北/西）。
		n-resize	此光标指示矩形框的边缘可被向上（北）移动。
		se-resize	此光标指示矩形框的边缘可被向下及向右移动（南/东）。
		sw-resize	此光标指示矩形框的边缘可被向下及向左移动（南/西）。
		s-resize	此光标指示矩形框的边缘可被向下移动（北/西）。
		w-resize	此光标指示矩形框的边缘可被向左移动（西）。
		text	此光标指示文本。
		wait	此光标指示程序正忙（通常是一只表或沙漏）。
		help	此光标指示可用的帮助（通常是一个问号或一个气球）。 
		*/
		public setCursor(value) {
			let s = this;
			s.canvas.style.cursor = value;
		}

		/**
		 * 添加Canvas事件监听
		 * 例如 canvas.addEventListener('mousemove',(evt: MouseEvent)=>{});
		 */
		public addCanvasEventListener(type: string, fun: Function, funObj: any) {
			let s = this;
			let bindFun = fun.bind(funObj);
			s.canvas.addEventListener(type, bindFun);
			s.canvasEventListenerArr.push({ eventType: type, fun: bindFun, originFun: fun, funObj: funObj });
		}

		public removeCanvasEventListener(type: string, fun: Function, funObj: any) {
			let s = this;
			for (let i = s.canvasEventListenerArr.length - 1; i >= 0; --i) {
				let obj = s.canvasEventListenerArr[i];
				if (obj.type == type && obj.originFun == fun && obj.funObj == funObj) {
					s.canvas.removeEventListener(obj.eventType, obj.fun);
					s.canvasEventListenerArr.splice(i, 1);
				}
			}
		}

		private clearCanvasEventListener() {
			let s = this;
			let num = s.canvasEventListenerArr.length;
			for (let i = 0; i < num; ++i) {
				let obj = s.canvasEventListenerArr[i];
				s.canvas.removeEventListener(obj.eventType, obj.fun);
			}
			s.canvasEventListenerArr.length = 0;
		}

		/**
		 * 添加document文档事件监听
		   例如：
		   document.addEventListener("keydown", (event:KeyboardEvent)=>{});
		   document.addEventListener("keyup", (event:KeyboardEvent)=>{});
		 */
		public addDocumentEventListener(type: string, fun: Function, funObj: any) {
			let s = this;
			let bindFun = fun.bind(funObj);
			document.addEventListener(type, bindFun);
			s.documentEventListenerArr.push({ eventType: type, fun: bindFun, originFun: fun, funObj: funObj });
		}

		public removeDocumentEventListener(type: string, fun: Function, funObj: any) {
			let s = this;
			for (let i = s.documentEventListenerArr.length - 1; i >= 0; --i) {
				let obj = s.documentEventListenerArr[i];
				if (obj.type == type && obj.originFun == fun && obj.funObj == funObj) {
					document.removeEventListener(obj.eventType, obj.fun);
					s.documentEventListenerArr.splice(i, 1);
				}
			}
		}

		private clearDocumentEventListener() {
			let s = this;
			let num = s.documentEventListenerArr.length;
			for (let i = 0; i < num; ++i) {
				let obj = s.documentEventListenerArr[i];
				document.removeEventListener(obj.eventType, obj.fun);
			}
			s.documentEventListenerArr.length = 0;
		}

		/**
		 * target:添加移动监听的对象 IPad下不使用该参数
		 * moveCallFun:返回px,py两个舞台全局坐标 兼容PC和移动端跟随鼠标移动的需求
		 */
		public addMouseMoveListener(moveCallFun:Function, funObj:any, _target:egret.DisplayObject=null) {
			let s = this;
			for(let i=0; i<s.mouseMoveListenerArr.length; ++i) {
				if(s.mouseMoveListenerArr[i].callFun == moveCallFun && s.mouseMoveListenerArr[i].funObj == funObj) {
					return;
				}
			}
			if(!s.registerMouseMove) {
				s.registerMouseMove = true;
				if (!isMobile()) {
					s.onMove = s.onMove.bind(s);
					s.canvas.addEventListener('mousemove', s.onMove);
				}  else {
					s.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouchMove, s);
				}
			}
			s.mouseMoveListenerArr.push({ callFun:moveCallFun, funObj:funObj, target:_target });
		}

		private clearMouseMoveListener() {
			let s = this;
			if (s.registerMouseMove) {
				s.registerMouseMove = false;
				if (!isMobile()) {
					s.canvas.removeEventListener('mousemove', s.onMove);
				} else {
					s.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouchMove, s);
				}
			}
			s.mouseMoveListenerArr.length = 0;
		}

		private onMove(evt: MouseEvent): void {
			let s = this;
			// console.log(evt.x + "===" + evt.y);
			s.doMove(evt.x, evt.y);
		}

		public onTouchMove(ev:egret.TouchEvent) {
			//console.log("onTouchMove");
			let s = this;
			s.doMove(ev.stageX, ev.stageY);
		}

		private doMove(px:number, py:number) {
			let s = this;
			let num = s.mouseMoveListenerArr.length;
			for(let i=0; i<num; ++i) {
				(<Function>s.mouseMoveListenerArr[i].callFun).call(s.mouseMoveListenerArr[i].funObj, [px, py, s.mouseMoveListenerArr[i].target]);
			}
		}

		/**
		 * 添加键盘点击事件监听 如果不是在PC端 会自动显示虚拟键盘 需要指定虚拟键盘的类型：type 键盘类型，0：同时显示，1：空格键盘，2：方向键盘
		 */
		public addKeyBoardListener(onkeydown: Function, onkeydownFunObj: any, onkeyup: Function, onkeyupFunObj: any, pr: any = null, x: number = 0, y: number = 0, type: number = 0) {
			let s = this;
			let virtualKeyBoardSprite:BaseGroup;
			//移动端显示虚拟键盘
			if (isMobile()) 
			{
				// let virtualKeyBoard = ui1Lib.VirtualKeyboard.getInstance();
				// virtualKeyBoardSprite = new GYLite.GYSprite;
				// if (pr) {
				// 	pr.addChild(virtualKeyBoardSprite);
				// }
				// virtualKeyBoardSprite.x = x;
				// virtualKeyBoardSprite.y = y;
				// virtualKeyBoard.show(type, null, null, 0, 0, virtualKeyBoardSprite);
				// virtualKeyBoard.setTouchBeginCall(onkeydown, onkeydownFunObj);
				// s.addDocumentEventListener("keyup", onkeyup, onkeyupFunObj);
			}
			else 
			{
				s.addDocumentEventListener("keydown", onkeydown, onkeydownFunObj);
				s.addDocumentEventListener("keyup", onkeyup, onkeyupFunObj);
			}
			return virtualKeyBoardSprite;
		}

		//设置显示对象呈现鼠标按钮模式
		public setTargetMouseMode(_target: egret.DisplayObject, _value: boolean) {
			mouse.setButtonMode(_target, _value);
		}

		public setTargetScale(target: egret.DisplayObject, scaleFactor: number, _time: number = 100) {
			//egret.Tween.removeTweens(target);
			egret.Tween.get(target).to({ scaleX: scaleFactor, scaleY: scaleFactor }, _time);
		}

		public onMouseOver(e: egret.TouchEvent): void {
			//console.log("mouse over " + e.target.name + "  " + e.bubbles);
			GameUtil.Instance.setTargetScale(e.currentTarget, 1.1);
		}

		public onMouseOut(e: egret.TouchEvent): void {
			//console.log("mouse out " + e.target.name + "  " + e.bubbles);
			GameUtil.Instance.setTargetScale(e.currentTarget, 1.0);
		}

		public onMouseOverWithFilter(e: egret.TouchEvent): void {
			//console.log("mouse over " + e.target.name + "  " + e.bubbles);
			FilterUtil.getInstance.setGlowFilter(e.currentTarget, 0xffdf6f);
		}

		public onMouseOutClearFilter(e: egret.TouchEvent): void {
			//console.log("mouse out " + e.target.name + "  " + e.bubbles);
			FilterUtil.getInstance.cleanFilter(e.currentTarget);
		}

		public getTargetPoint(target: any): egret.Point {
			let pos: egret.Point = new egret.Point(target.x, target.y);
			return pos;
		}

		private questionNumberImage: egret.Bitmap;
		public showQuestionNumber(args) {
			let questionNum = args[1];
			let container = args[0];
			if (this.questionNumberImage) {
				this.questionNumberImage.texture = RES.getRes(`question_json.question-${questionNum}`);
			} else {
				this.questionNumberImage = new egret.Bitmap();
				this.questionNumberImage.texture = RES.getRes(`question_json.question-${questionNum}`);
				this.questionNumberImage.anchorOffsetX = 125;
				this.questionNumberImage.anchorOffsetY = 60;
				//console.log(this._mainLayer);
				container.addChild(this.questionNumberImage);
				//LayerManager.getInstance().fixListen(this.questionNumberImage, 0, 0, 0, 0);
			}
			// this.questionNumberImage.x = this.stageCenterW;
			// this.questionNumberImage.y = -200;
			// this.questionNumberImage.scaleY = 1.2;
			// egret.Tween.removeTweens(this.questionNumberImage);
			// egret.Tween.get(this.questionNumberImage)
			// 	.to({ y: this.stageCenterH, scaleY: 0.8 }, 500)
			// 	.to({ scaleY: 1.1 }, 250)
			// 	.to({ scaleY: 1.0 }, 250)
			// 	.wait(1000)
			// 	.to({ y: -200 }, 500)
			// 	.call(()=>{
			// 		this._mainLayer.removeChild(this.questionNumberImage);
			// 		this.questionNumberImage = null;
			// 	}, this);
			this.questionNumberImage.x = container.width / 2;
			this.questionNumberImage.y = container.height / 2;
			this.questionNumberImage.scaleX = 0;
			this.questionNumberImage.scaleY = 0;
			egret.Tween.removeTweens(this.questionNumberImage);
			egret.Tween.get(this.questionNumberImage)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 250)
				.to({ scaleX: 1.2, scaleY: 1.2 }, 250)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 250)
				.to({ scaleX: 1.2, scaleY: 1.2 }, 250)
				.to({ scaleX: 1.5, scaleY: 1.5 }, 250)
				.to({ scaleX: 1.2, scaleY: 1.2 }, 250)
				.wait(100)
				.call(() => {
					container.removeChild(this.questionNumberImage);
					this.questionNumberImage = null;
				}, this);
		}

		/**
		 * 0 正确 1 错误
		 */
		public shakeObject(target: any, type: number) {
			if (type == 0) {
				egret.Tween.get(target)
					.to({ rotation: 8 }, 100).to({ rotation: -8 }, 200)
					.to({ rotation: 8 }, 200).to({ rotation: -8 }, 200)
					.to({ rotation: 8 }, 200).to({ rotation: 0 }, 100);
			} else if (type == 1) {
				let posx: number = target.x;
				egret.Tween.get(target)
					.to({ x: posx + 30 }, 150).to({ x: posx }, 150)
					.to({ x: posx + 30 }, 150).to({ x: posx }, 150)
					.to({ x: posx + 30 }, 150).to({ x: posx }, 150)
			}
		}

		/**
		 * 0 显示打勾 1显示打叉
		 */
		public showRightOrWrong(container: any, type: number, pos: egret.Point, bigImg: boolean = false) {
			let resultImage: egret.Bitmap = new egret.Bitmap;
			let s = this;
			if (type == 0) {
				if (!bigImg) {
					resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/rightAndWrong.right");// Main.instance.getRes("right", s.modulePath + "/img/commonRes/rightAndWrong.png");
				} else {
					resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/right_wrong_big.right_big");//Main.instance.getRes("right_big", s.modulePath + "/img/commonRes/right_wrong_big.png");
				}
				//播放语音
				//SoundManager.Instance.PlayEffectByName("rightBeep");
			} else if (type == 1) {
				if (!bigImg) {
					resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/rightAndWrong.wrong");//Main.instance.getRes("wrong", s.modulePath + "/img/commonRes/rightAndWrong.png");
				} else {
					resultImage.texture = RES.getRes(s.modulePath + "/img/commonRes/right_wrong_big.wrong_big");//Main.instance.getRes("wrong_big", s.modulePath + "/img/commonRes/right_wrong_big.png");
				}
				//播放语音
				//SoundManager.Instance.PlayEffectByName("wrongBeep");
			}
			container.addChild(resultImage);
			resultImage.anchorOffsetX = resultImage.width / 2;
			resultImage.anchorOffsetY = resultImage.height / 2;
			resultImage.x = pos.x;
			resultImage.y = pos.y;
			egret.Tween.get(resultImage).wait(1500).to({ scaleX: 0, scaleY: 0 }, 200).call(() => {
				container.removeChild(resultImage);
			}, container);
		}

		//设置显示对象和舞台的边距
		public setScreenAuto(target): void {
			target.left = 0;
			target.right = 0;
			target.top = 0;
			target.bottom = 0;
		}

		/**
		 * 操作指示 0原位置旋转 1斜方向移动
		 */
		public showHandTip(pr: egret.DisplayObjectContainer, px: number, py: number, _tweenType: number, _loop: boolean = false) {
			let s = this;
			let hand: egret.Bitmap = new egret.Bitmap;
			hand.texture = RES.getRes("comRes_1_json.hand");
			hand.touchEnabled = false;
			pr.addChild(hand);
			hand.x = px;
			hand.y = py;
			s.showHandTipAction(hand, _tweenType, _loop);
			return hand;
		}
		
		/**
		 * _tweenType: 0原位置旋转 1斜方向移动
		 */
		public showHandTipAction(hand: any, _tweenType: number, _loop: boolean = false) {
			if (_tweenType == 0) {
				egret.Tween.get(hand, { loop: _loop })
					.to({ rotation: -15 }, 500)
					.to({ rotation: 0 }, 500)
					.to({ rotation: -15 }, 500)
					.to({ rotation: 0 }, 500).wait(500);
			} else if (_tweenType == 1) {
				egret.Tween.get(hand, { loop: _loop })
					.to({ x: hand.x - 10, y: hand.y - 10 }, 1000)
					.wait(200)
					.to({ x: hand.x, y: hand.y }, 1000);
			}
		}

		public removeTargetTweenAction(target: any) {
			if (target) {
				egret.Tween.removeTweens(target);
			}
		}

		/**
		 * 对象深拷贝
		 * */ 
		public deepCopyObj(obj) {
			var result = Array.isArray(obj) ? [] : {};
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object' && obj[key] !== null) {
						result[key] = this.deepCopyObj(obj[key]);
					} else {
						result[key] = obj[key];
					}
				}
			}
			return result;
		}

		/**
		 * 数组去重
		 */
		public uniqueArr(arg:any[]) {
			let s = this;
			//当前元素如果在原始数组中的下标等于当前遍历的下标 则返回该元素
			let newArr = arg.filter((value, index, arr)=>{
				return arr.indexOf(value, 0) === index?true:false;
			}, s); 
			return newArr;
		}

		// /**
		//  * 测试文本宽度
		//  */
		// private sharedCanvas: HTMLCanvasElement;
		// private sharedContext: CanvasRenderingContext2D;
		// public measureTextWith(text:string, fontSize:number = 10) {
		// 	let s = this;
		// 	if(!s.sharedCanvas) {
		// 		s.sharedCanvas = egret.sys.createCanvas()
		// 		s.sharedContext = s.sharedCanvas.getContext("2d");
		// 	}
		// 	let width = egret.sys.measureTextWith(s.sharedContext, text);
		// 	return fontSize * width / 10;
		// }
		
		/**
		 * 测量文本在指定样式下的宽度。
		 * @param text 要测量的文本内容。
		 * @param fontFamily 字体名称
		 * @param fontSize 字体大小
		 * @param bold 是否粗体
		 * @param italic 是否斜体
		 */
    	public measureText(text:string, fontFamily:string, fontSize:number, bold:boolean, italic:boolean) {
			return egret.sys.measureText(text, fontFamily, fontSize, bold, italic);
		}

		/**
		 * 把字符串转换成hash值
		 */
		public static convertStringToHashCode(str: string): number {
            if (str.length === 0) {
                return 0;
            }
            let hash = 0;
            for (let i = 0, length = str.length; i < length; ++i) {
                const chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

		/**
		 * 设置游戏分辨率
		 */
		public setDesignSize(width:number, height:number) {
			let s = this;
			s.stage.setContentSize(width, height);
		}

		/**
		 * 设置节点渲染标识 让节点重新绘制
		 */
		public renderNode(target:egret.DisplayObject) {
			if(target) {
				target.$renderDirty = true;
			}
		}

		public splitMatrix(matrix:string) {
			//matrix  为一个matrix(a,b,c,d,e,f)
			let alls = matrix.replace(/[^0-9\-,]/g, '')
			//进行拆分获取确切的某个值
			let arr = alls.split(',');
			// let a = arr[0];
			// let b = arr[1];
			// let c = arr[2];
			// let d = arr[3];
			// console.log(arr);
			return arr;
		}

		/*
		* 解析matrix矩阵，0°-360°，返回旋转角度
		* 当a=b||-a=b,0<=deg<=180
		* 当-a+b=180,180<=deg<=270
		* 当a+b=180,270<=deg<=360
		*
		* 当0<=deg<=180,deg=d;
		* 当180<deg<=270,deg=180+c;
		* 当270<deg<=360,deg=360-(c||d);
		* */
		public getMatrixRotation(a, b, c, d, e, f) {
			var aa = Math.round(180 * Math.asin(a) / Math.PI);
			var bb = Math.round(180 * Math.acos(b) / Math.PI);
			var cc = Math.round(180 * Math.asin(c) / Math.PI);
			var dd = Math.round(180 * Math.acos(d) / Math.PI);
			var deg = 0;
			if (aa == bb || -aa == bb) {
				deg = dd;
			} else if (-aa + bb == 180) {
				deg = 180 + cc;
			} else if (aa + bb == 180) {
				deg = 360 - cc || 360 - dd;
			}
			return deg >= 360 ? 0 : deg;
			//return (aa+','+bb+','+cc+','+dd);
		}

		public dispose() {
			let s = this;
			s.clearCanvasEventListener();
			s.clearDocumentEventListener();
			if (isMobile()) {
				//ui1Lib.VirtualKeyboard.getInstance().hide();
			}
			s.clearMouseMoveListener();
			GameUtil.instance = null;
		}
	}
}