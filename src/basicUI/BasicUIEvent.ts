module codeBase {
	/**
	 * UI组件变化事件分发和侦听处理类
	 */
	export class BasicUIEvent extends egret.EventDispatcher {
		//mouse event
		public static readonly MOUSE_OVER: string = "event-over";//移进
		public static readonly MOUSE_OUT: string = "event-out";//移出
		public static readonly MOUSE_DOWN: string = "event-down";//点下
		public static readonly MOUSE_MOVE: string = "event-move";//移动
		public static readonly MOUSE_UP: string = "event-up";//弹开
		public static readonly CLICK: string = "event-click";//单击

		//other event
		public static readonly CHANGE: string = "change";//更换
		public static readonly COMPLETE: string = "complete";//完成
		public static readonly ERROR: string = "error";//错误
		public static readonly RENDER_COMPLETE: string = "render complete";//渲染完成
		public static readonly UPDATE: string = "update";//更新
		public static readonly START: string = "start";//开始
		public static readonly MOVE: string = "move";//移动
		public static readonly OVER: string = "over";//结束
		public static readonly PAUSE: string = "pause";//暂停
		public static readonly STOP: string = "stop";//停止
		public static readonly PLAY: string = "play";//播放
		public static readonly OPEN: string = "open";//开启
		public static readonly CLOSE: string = "close";//关闭

		public currentTarget: Object;
		public type: string;
		public data: Object;
		public constructor(type: string = "", data: Object = null, currentTarget: Object = null) {
			super();
			this.type = type;
			this.data = data;
			this.currentTarget = currentTarget;
		}
	}
}
