module codeBase{
	export class ListItem extends DisplayObjectContainer implements IListItemRenderer {
		protected icon:egret.Bitmap;
		public constructor() {
			super();
		}

		/**
		 * 要呈示或编辑的数据。
		 */
		data: any;
		/**
		 * 如果项呈示器可以将其自身显示为已选中，则为 true。
		 */
		selected: boolean;
		/**
		 * 项呈示器的数据提供程序中的项目索引。
		 */
		itemIndex: number;
		/**
		 * 渲染项初始化 
		*/
		init(data:any) {
			this.touchEnabled = true;
			this.icon = UICreator.createBitmap(data.res);
			this.addChild(this.icon);
		}

		setSelected(value:boolean) {
			if(this.selected == value) return;
			this.selected = value;
			if(this.selected) {
				this.icon.scaleX = this.scaleY = 1.2;
			} else {
				this.icon.scaleX = this.scaleY = 1;
			}
		}

		addEvent() {
		}
	}
}