module codeBase{
	export class BaseScene extends BaseGroup {
		protected isClear: boolean = false;
		protected modulePath: string;
		protected skeletonPath: string;
		protected videopath: string;
		public stage:egret.Stage;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
		}

		protected init() {
			let s = this;
			s.stage = curStage();
			s.modulePath = "";//UIControl.getInstance().curUIIDPath;
			s.skeletonPath = s.modulePath + "/skeleton/";
			s.videopath = "video/" + s.modulePath + "/";
			s.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.hide, s);
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