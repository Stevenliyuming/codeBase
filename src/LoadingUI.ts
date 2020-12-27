module codeBase{
    export class LoadingUI extends BaseScene implements RES.PromiseTaskReporter {
        private textField: Label;
        public constructor() {
            super();
        }

        protected init() {
            super.init();
            this.createView();
        }

        private createView(): void {
            this.textField = new Label();
            this.addChild(this.textField);
            this.textField.horizontalCenter = 0;
            this.textField.verticalCenter = 0;
            this.textField.width = 480;
            this.textField.height = 100;
            this.textField.autoSize = true;
            this.textField.showBg = false;
        }

        public onProgress(current: number, total: number): void {
            this.textField.text = `Loading...${current}/${total}`;
        }
    }
}

