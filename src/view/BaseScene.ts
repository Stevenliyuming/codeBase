module codeBase{
	export class BaseScene extends BaseGroup {
		protected isClear: boolean = false;
		protected modulePath: string;
		protected skeletonPath: string;
		protected videopath: string;
		public stage:egret.Stage;
		public constructor() {
			super();
			//this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
		}

		/**
		 * 初始化一些必要的逻辑数据
		 * 这个方法是在第一次加入stage的时候,做调用
		 */
		public initData(): void {
			super.initData();
			let s = this;
			s.stage = curStage();
			s.modulePath = "";//UIControl.getInstance().curUIIDPath;
			s.skeletonPath = s.modulePath + "/skeleton/";
			s.videopath = "video/" + s.modulePath + "/";
		}

		public hide() {
			console.log("remove" + egret.getQualifiedClassName(this));
		}

		// protected createGroup(pr:any, width:number=1920, height:number=1080) {
		// 	let s = this;
		// 	let group = new BaseGroup;
		// 	s.addElement(group);
		// 	group.width = width;
		// 	group.height = height;
		// 	return group;
		// }
	}
}