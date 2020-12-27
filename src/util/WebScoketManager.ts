module codeBase{
	// class WebScoketManager {
	// 	private messageListener: Array<any> = new Array<any>();
	// 	private onSocketOpenListener: any;
	// 	private socket: egret.WebSocket;

	// 	public constructor(type: string, ip: string, port: number) {
	// 		//设置数据格式为二进制，默认为字符串
	// 		this.initWebSocket(egret.WebSocket.TYPE_STRING, ip, port);
	// 	}

	// 	public initWebSocket(type: string, ip: string, port: number): void {

	// 		//创建 WebSocket 对象
	// 		this.socket = new egret.WebSocket();

	// 		//设置数据格式
	// 		this.socket.type = type;//egret.WebSocket.TYPE_BINARY;

	// 		//添加链接打开侦听，连接成功会调用此方法
	// 		this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

	// 		//添加收到数据侦听，收到数据会调用此方法
	// 		this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);

	// 		//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
	// 		this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);

	// 		//添加异常侦听，出现异常会调用此方法
	// 		this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);

	// 		//连接服务器
	// 		this.socket.connect(ip, port);
	// 	}

	// 	public sentStrigData(data: string): void {
	// 		if (!this.socket.connected)
	// 			return;

	// 		//发送数据
	// 		this.socket.writeUTF(data);
	// 	}

	// 	public sendByteData(byte: egret.ByteArray): void {
	// 		// //创建 ByteArray 对象
	// 		// var byte:egret.ByteArray = new egret.ByteArray();
	// 		// //写入字符串信息
	// 		// byte.writeUTF("Hello Egret WebSocket");
	// 		// //写入布尔值信息
	// 		// byte.writeBoolean(false);
	// 		// //写入int值信息
	// 		// byte.writeInt(123);

	// 		// byte.position = 0;

	// 		if (!this.socket.connected)
	// 			return;

	// 		//发送数据
	// 		this.socket.writeBytes(byte, 0, byte.bytesAvailable);
	// 	}

	// 	private onSocketOpen(): void {
	// 		this.trace("WebSocketOpen");
	// 		//this.sendByteData();

	// 		if (this.onSocketOpenListener) {
	// 			this.onSocketOpenListener.fun(this.onSocketOpenListener.thisObj);
	// 		}
	// 	}

	// 	private onSocketClose(): void {
	// 		this.trace("WebSocketClose");
	// 	}

	// 	private onSocketError(): void {
	// 		this.trace("WebSocketError");
	// 	}

	// 	public registryMessageListener(messageType: string, listener: Function, thisObject: any): void {
	// 		if (messageType == "onSocketOpen") {
	// 			this.onSocketOpenListener = { "thisObj": thisObject, "fun": listener };
	// 		}
	// 		else {
	// 			let mark: any = { "messageType": messageType, "fun": listener, "object": thisObject };
	// 			this.messageListener.push(mark);
	// 		}
	// 	}

	// 	private onReceiveMessage(e: egret.Event): void {

	// 		var msg: string;
	// 		if (this.socket.type === egret.WebSocket.TYPE_BINARY) {
	// 			//创建 ByteArray 对象
	// 			var byte: egret.ByteArray = new egret.ByteArray();
	// 			//读取数据
	// 			this.socket.readBytes(byte);
	// 			//读取字符串信息
	// 			msg = byte.readUTF();
	// 			//读取布尔值信息
	// 			var boo: boolean = byte.readBoolean();
	// 			//读取int值信息
	// 			var num: number = byte.readInt();

	// 			this.trace("收到数据:");
	// 			this.trace("readUTF : " + msg);
	// 			this.trace("readBoolean : " + boo.toString());
	// 			this.trace("readInt : " + num.toString());
	// 		}
	// 		else {
	// 			//读取字符串信息
	// 			msg = this.socket.readUTF();

	// 		}

	// 		//根据注册的消息处理函数处理数据
	// 		var data = JSON.parse(msg);
	// 		//this.trace(data["type"]);
	// 		let i = 0;
	// 		for (i; i < this.messageListener.length; ++i) {
	// 			if (this.messageListener[i].messageType == data["type"]) {
	// 				this.messageListener[i].fun(msg, this.messageListener[i].object);
	// 			}
	// 			//console.log(this.messageListener[i].messageType);
	// 		}
	// 	}

	// 	//返回ws连接状态
	// 	public webSocketStatus(): boolean {
	// 		return this.socket.connected;
	// 	}

	// 	private trace(msg: any): void {
	// 		// this.text = this.text + "\n" + msg;
	// 		// this.stateText.text = this.text;
	// 		// egret.log(msg);
	// 	}
	// }
}
