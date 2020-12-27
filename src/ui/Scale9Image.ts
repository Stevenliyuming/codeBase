module codeBase{
	/**九宫格*/
	export class Scale9Image extends Bitmap {
		public constructor(name: string, alias:string=null, rect: Rectangle = null) {
			super();
			if (name != null) {
				this.texture = RES.getRes(name);
				if(this.texture) {
					this.scale9Grid = rect || new Rectangle(8, 8, 2, 2);
				} else {
					if(name.indexOf("http") == 0) {
						this.loadImage(name);
					} else {
						egret.error("找不到资源：" + name);
					}
				} 
			}
		}

		/**实时加载图片资源 */
		public loadImage(url: string): void {
			if (url != null && url != "") {
				var imageLoader: egret.ImageLoader = new egret.ImageLoader();
				egret.ImageLoader.crossOrigin = "anonymous" //用于跨域加载
				imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
				imageLoader.load(url);
			}
		}

		private loadCompleteHandler(event: egret.Event): void {
			var imageLoader = <egret.ImageLoader>event.currentTarget;
			let texture = new egret.Texture();
			texture._setBitmapData(imageLoader.data);
			this.texture = texture;
		}
	}
}