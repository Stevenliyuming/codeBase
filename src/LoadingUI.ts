module codeBase{
    export class LoadingUI extends BaseScene implements RES.PromiseTaskReporter {
        private textField: Label;
        public constructor() {
            super();
        }

        /**
		 * 初始化一些必要的逻辑数据
		 * 这个方法是在第一次加入stage的时候,做调用
		 */
		public initData(): void {
			super.initData();
            this.createView();
		}

        private createView(): void {
            this.textField = new Label();
            this.addChild(this.textField);
            this.textField.horizontalCenter = 0;
            this.textField.verticalCenter = 0;
            this.textField.width = 1920;
            this.textField.height = 100;
            this.textField.hAlign = egret.HorizontalAlign.CENTER;
            this.textField.autoSize = false;
            this.textField.showBg = true;
            this.textField.bgColor = TextColors.blue;
            this.textField.fontSize = 36;
            this.textField.text = "Loading...";
            MyEvent.sendEvent(EventType.LOADINGUI_FINISH);
        }

        public onProgress(current: number, total: number): void {
            this.textField.text = `Loading...${current}/${total}`;
        }
    }
}

