module codeBase{
	export interface IListItemRenderer {
		/**
		 * 要呈示或编辑的数据。
		 */
		data: any;
		/**
		 * 如果项呈示器自身显示为已选中，则为 true。
		 */
		selected: boolean;
		/**
		 * 项呈示器的数据提供程序中的索引。
		 */
		itemIndex: number;
		/**
		 * 渲染项初始化 
		*/
		init(data:any);

		/**显示项被选中 */
		setSelected(value);

		/**
		 * 渲染项渲染 
		*/
		//render();
	}
}