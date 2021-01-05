module codeBase {
	export class DefaultRenderer extends Group {
		/**
		 * 对应的ui展现
		 */
		public _ui: BaseGroup = null;
		/**
		 * ui资源已准备好
		 * @type {boolean}
		 * @private
		 */
		public _uiResReady: boolean = false;

		public _selected: boolean;
		/**
		 * item render所在的list
		 * @type {null}
		 */
		public list: List = null;
		public dataIndex:number;

		public constructor(drawDelay: boolean = false) {
			super(drawDelay);
		}

		public createChildren(): void {
			super.createChildren();
			//this.setSize(100, 65);
		}

		/**
		 * 初始化一些必要的逻辑数据
		 * 这个方法是在第一次加入stage的时候,做调用
		 */
		public initData(): void {
		}

		public draw(): void {
			super.draw();
		}

		/**
		 * 设置数据
		 */
		public set data(value: any) {
			this._data = value;
			this.invalidate();
		}
		public get data(): any {
			return this._data;
		}

		/**
		 * 刷新
		 */
		public refresh(): void {
			this.data = this._data;
		}

		/**
		 * 设置选中
		 */
		public set selected(value: boolean) {
			this.setSelected(value);
		}
		public setSelected(value: boolean) {
			if (this._selected != value) {
				this._selected = value;
				this.invalidate();
			}
		}
		public get selected(): boolean {
			return this._selected;
		}

		/**
		 * 获取ui层的显示对象
		 * @returns {egret.Sprite}
		 */
		public getUI(): any {
			return this._ui;
		}
		/**
		 * 设置ui层的显示对象
		 * @param myui
		 */
		public setUI(myui: BaseGroup) {
			this._ui = myui;
			//console.log("!!!view set ui!! 000 this._ui=" + egret.getQualifiedClassName(this._ui));
			if (this._ui) {
				this.addChild(this._ui);
				this.setSize(this._ui.width, this._ui.height);
				//console.log("!!!view set ui!! 1111 this._ui=" + egret.getQualifiedClassName(this._ui));
			}
			this.showBg = false;
		}

		/**
		 * 做ui的销毁
		 * 一般情况下,需要手动调用销毁
		 */
		public destroy(): void {
			if (this._ui) {
				//if (this._ui.hasOwnProperty("destroy"))this._ui.destroy();
				this._ui = null;
			}
		}

		/**
		 * 首次材质下载完成会调用加载一次,刷新UI皮肤显示
		 * 使用了框架的UI机制,单ui的资源下载完成会调用改方法刷新
		 * 若view中有逻辑使用到ui的素材,应该在这里做素材的赋值
		 */
		public validateNow(): void {
			//console.log("clz=" + egret.getQualifiedClassName(this)  + ", validateNow!!")
			if (this._ui && this._ui["validateNow"]) this._ui["validateNow"]();
			this.drawDelay = false;
			if (this._ui) this._ui.drawDelay = false;
		}
	}
}