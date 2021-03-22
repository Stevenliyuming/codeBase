namespace spine {
	export class Map2<T, V> {
		private mapData = {};
		public constructor() {
		}

		public get(event: T): any {
			if (typeof event !== "string") {
				return null;
			}
			let key = <string>event;
			return this.mapData[key];
		}

		public set(event: T, value: V): any {
			if (typeof event !== "string") {
				return null;
			}
			let key = <string>event;
			let val = value;
			if (!this.mapData[key]) {
				this.mapData[key] = [];
			}
			this.mapData[key].push(val);
		}

		public delete(event: T) {
			if (typeof event !== "string") {
				return null;
			}
			let key = <string>event;
			if (this.mapData[key]) {
				this.mapData[key] = [];
				delete this.mapData[key];
			}
		}

		public clear() {
			for(let key in this.mapData) {
				if(this.mapData.hasOwnProperty[key]) {
					delete this.mapData[key]
				}
			}	
		}
	}
}
