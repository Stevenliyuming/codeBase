module codeBase {
	export class BasicLayout extends BaseGroup {
		private dataEvent: Object = new Object;
		public constructor() {
			super();
			this.init();
		}

		/**加载到舞台之前调用 */
		protected init(): void {
		}

		/**
		 * 初始化一些必要的逻辑数据
		 * 这个方法是在第一次加入stage的时候,做调用
		 */
		public initData(): void {
		}

		/**
		 * 初始化主场景的组件
		 * 子类覆写该方法,添加UI逻辑
		 */
		public createChildren(): void {
		}

		/**分发事件*/
		public dispEvent(type: string, data: Object = null, dataType: Object = null): void {
			if (this.dataEvent) {
				var fun: Function = this.dataEvent[type] as Function;
				if (fun != null) {
					var layoutEvent: LayoutEvent = new LayoutEvent;
					layoutEvent.currentTarget = this;
					layoutEvent.data = data;
					layoutEvent.type = type;
					layoutEvent.dataType = dataType;
					if (fun["this"]) {
						(<Function>fun).apply(fun["this"], [layoutEvent]);
					} else {
						fun(layoutEvent)
					}
				}
			}
		}

		/**帧听事件*/
		public addEvent(type: string, listener: Function, thisObj: any = null): void {
			let s = this;
			if (s.dataEvent && s.dataEvent[type] == null) {
				listener["this"] = thisObj
				s.dataEvent[type] = listener;
			}
		}

		/**删除事件*/
		public removeEvent(type: string, listener: Function): void {
			let s = this;
			if (s.dataEvent && s.dataEvent[type]) {
				delete s.dataEvent[type];
			}
		}

		/**把自己从父级删除*/
		public removeFromParent(value: boolean = false): void {
			let s = this;
			let _parent = this.parent;
			if (value) s.dispose();
			if (_parent && _parent.contains(s)) _parent.removeChild(s);
			_parent = null;
		}

		/**删除所有的*/
		public removeChildAll(dispose: boolean = false): void {
			while (this.numChildren > 0) {
				this.removeChildIndex(0, dispose);
			}
		}

		/**删除index层的*/
		public removeChildIndex(index: number, dispose: boolean): void {
			let s = this;
			if (index >= 0 || index < s.numChildren) {
				let basicContent:any = s.getChildAt(index);
				if (basicContent instanceof BasicLayout) {
					basicContent.removeFromParent(dispose);
				} else {
					let display: DisplayObject = this.getChildAt(index) as DisplayObject;
					if (display.parent) display.parent.removeChild(display);
				}
			}
		}

		/**销毁*/
		public dispose(): void {
			let s = this;
			s.removeChildAll(true);
			s.dataEvent = null;
		}
	}
}