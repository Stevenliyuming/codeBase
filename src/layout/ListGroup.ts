module codeBase {
	/**列表组件 */
	export class ListGroup extends LayoutComponent implements ILayout {
		protected contentView: BaseGroup;
		public scrollBar: ScrollBar;
		protected posStart: Point;
		protected alignType: string;
		protected itemInterval: number = 0;
		protected items: DisplayObject[] = [];

		/** 用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例，注意：该类必须实现 ListItemRenderer 接口 */
		public itemRenderer: any;
		/** 列表数据源 */
		public dataProvider: any;
		/**当前选中的Item呈视项 */
		protected itemSelected: any;
		/**是否自动执行被选项选中定义函数 */
		protected executeSelected: boolean;

		/**设置宽与高 */
		public constructor(w: number, h: number, type: string = Style.VERTICAL, interval: number = 10, itemList: DisplayObject[] = []) {
			super();
			let s = this;
			s.alignType = type;
			s.itemInterval = interval;
			s.contentView = new BaseGroup();
			s.scrollBar = new ScrollBar(w, h, s.contentView, type);
			s.addChild(s.scrollBar);
			s.width = w;
			s.height = h;
			s.initItem(itemList);
		}

		protected initItem(items: DisplayObject[]) {
			let s = this;
			items.forEach(element => {
				s.addItem(element);
			});
			s.layout(s.alignType, s.itemInterval);
		}

		public addItem(item: DisplayObject): void {
			let s = this;
			s.contentView.addChild(item);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
			item.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
			s.items.push(item);
		}

		public removeItem(item: DisplayObject): void {
			let s = this;
			if (s.contentView.contains(item)) {
				s.contentView.removeChild(item);
				item.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
				item.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
				if (item instanceof LayoutComponent && item["dispose"] && item["dispose"] instanceof Function) {
					item.dispose();
				}
				s.layout(s.alignType, s.itemInterval);
			}
		}

		public layout(type: string, interval: number): void {
			let s = this;
			if(type == Style.VERTICAL) {
				s.items.forEach((element, index) => {
					element.x = 0;
					element.y = 0 + index * (element.height + interval);
				});
			} else if(type == Style.HORIZONTAL) {
				s.items.forEach((element, index) => {
					element.x = 0 + index * (element.width + interval)
					element.y = 0;
				});
			}
		}

		/**设置可配置渲染列表
		 * renderer 渲染项实现,继承DisplayObjectContainer类，实现IListItemrenderer接口
		 * data 渲染数据
		 */
		public renderList(renderer: any, data: any[] = [], executeSelected: boolean = true) {
			let s = this;
			if (renderer && data) {
				s.clear();
				s.executeSelected = executeSelected;
				s.itemRenderer = renderer;
				s.dataProvider = data.concat();
				for (let i = 0; i < data.length; ++i) {
					let item: IListItemRenderer = new renderer;
					item.data = data[i];
					item.itemIndex = i;
					item.selected = false;
					item.init(data[i]);
					s.addItem(<DisplayObject>(<any>item));
				}
				s.layout(s.alignType, s.itemInterval);
			}
		}

		/**设置实例化渲染列表 */
		public setItemList(itemList: DisplayObject[] = []) {
			let s = this;
			s.clear();
			s.initItem(itemList);
		}

		/**如果需要给列表填充新的显示项 需要调用此方法清理列表 */
		protected clear() {
			let s = this;
			s.itemRenderer = null;
			if (s.dataProvider && s.dataProvider instanceof Array) {
				s.dataProvider.length = 0;
				s.dataProvider = null;
			}
			s.items.forEach(element => {
				s.removeItem(element);
			});
			s.items.length = 0;
		}

		/**设置是否可以鼠标滚动列表 */
		public setMouseWheelEnable(value: boolean) {
			let s = this;
			s.scrollBar.setMouseWheelEnable(value);
		}

		/***两点间的距离 */
		public twoDistance(a: any, b: any): number {
			var x: number = a.x - b.x;
			var y: number = a.y - b.y;
			return Math.sqrt(x * x + y * y);
		}

		protected onTouch(e: egret.TouchEvent): void {
			let s = this;
			if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
				s.posStart = new Point(e.stageX, e.stageY);
			} else {
				var posEnd: Point = new Point(e.stageX, e.stageY);
				if (s.posStart && s.twoDistance(s.posStart, posEnd) < 20) {
					s.onClick(e.currentTarget);
				}
				s.posStart = null;
			}
		}

		protected onClick(item: DisplayObject): void {
			let s = this;
			if (s.itemRenderer) {
				if (s.itemSelected && s.executeSelected) (<IListItemRenderer>s.itemSelected).setSelected(false);
				s.itemSelected = item;
				(<IListItemRenderer>s.itemSelected).setSelected(true);
			} else {
				s.itemSelected = item;
			}
			var param: Object = { item: item, index: s.items.indexOf(item) };
			s.dispEvent(LayoutEvent.CLICK, param)
		}
	}
}