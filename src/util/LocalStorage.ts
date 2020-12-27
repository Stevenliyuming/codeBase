module codeBase{
	/**
	 * 本地数据存储
	 */
	export class LocalStorage {
		public constructor() {
		}
		// 储存数据需要key和value，都必须是字符串
		public static setLocalData(key: string, value: string): void {
			egret.localStorage.setItem(key, value);
		}

		// 读取数据
		public static getLocalData(key: string): string {
			return egret.localStorage.getItem(key);
		}

		// 删除数据
		public static deleteLocalData(key: string): void {
			egret.localStorage.removeItem(key);
		}

		// 将所有数据清空
		public static clearLocalData(): void {
			egret.localStorage.clear();
		}
	}
}