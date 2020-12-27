module codeBase{
	export class StorageMap {
    	private mapObj: Object = {};
		public constructor() {
		}

		public setValue(key:string, value:any) {
			let s = this;
			if(key != "") {
				s.mapObj[key] = value;
			} else {
				console.log("key键值不能为空字符串!");
			}
		}

		public getValue(key:string) {
			if(key != "") {
				return this.mapObj[key];
			}
			return null;
		}

		public dispose() {
			let s = this;
			let key:any;
			for(key in s.mapObj) {
				if(s.mapObj[key]) {
					delete s.mapObj[key];
					s.mapObj[key] = null;
				}
			}
			s.mapObj = {};
		}
	}
}