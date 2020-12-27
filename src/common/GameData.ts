module codeBase{

	export type StudentData = {
		name:string;
		sex:string;
		age:number;
		address:string;
	};

	export class GameData {
		private static _instance:GameData;

		public targetIndexList:number[] = [];
		public rabbitStatus:number[] = [];

		private constructor() {
		}

		public static get Instance(): GameData {
			if (GameData._instance == null) {
				GameData._instance = new GameData();
			}

			return GameData._instance;
		}
	}
}