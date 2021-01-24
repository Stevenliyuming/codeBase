var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var WebSocket = (function () {
        function WebSocket() {
            //是否websocket
            this._isWebSocket = false;
            this.host = null;
            this.port = 0;
            this._webSocket = null;
            //public _socket:egret.Socket = null;
            //private _initListener:boolean = false;
            //public _gatewayStatus:boolean = false;
            this.rawByteArrayCache = new Array(); //row byte数据包
            this.packetByteArrayCache = new Array(); //packet byte数据包
            this.packetSendCache = new Array(); //packet 发送数据包
            //默认的解析类,外部可以在发送之前设置改变
            this.decodeClass = codeBase.DefaultDecoder;
            //默认的编码类,外部可以在发送之前设置改变
            this.encodeClass = codeBase.DefaultEncoder;
            //登陆包缓存,方便自动重新登陆,要主动设置
            this.loginPkt = null;
            //在自动连接的情况下,connet需要一定的时间来握手,这是等待握手成功的计数,发送延迟计数
            this.autoConnectDuration = 0;
            this._byteRawBuffer = null; //缓冲的bytebuffer
            this._byteWaitBuffer = null; //缓冲等待的bytebuffer
            this._byteWaitReadLength = false;
        }
        /**
         * 单例使用
         * @returns {MySocket}
         */
        WebSocket.getInstance = function () {
            if (WebSocket._instance == null) {
                WebSocket._instance = new codeBase.WebSocket();
            }
            return WebSocket._instance;
        };
        /**
         * 提交发送的协议到列表中,等待发送程序的处理
         * @param pkt
         */
        WebSocket.prototype.send = function (pkt) {
            if (pkt) {
                //校验断线的情况下,重连
                this.autoConnect();
                this.packetSendCache.push(pkt);
                codeBase.HeartBeat.addListener(this, this.checkPacketByteArray);
            }
        };
        WebSocket.prototype.autoConnect = function () {
            if (this.port > 0 && !this.isConnected() && this.loginPkt != null) {
                this.connect(this.host, this.port);
            }
        };
        /**
         * 自动重新连接
         */
        WebSocket.prototype.autoRelogin = function () {
            if (this.isConnected() && this.loginPkt != null) {
                //自动发送登录包
                this.packetSendCache.unshift(this.loginPkt);
                var encoder = codeBase.ObjectPool.getByClass(this.encodeClass);
                var outBytes = encoder.encoder(this.loginPkt);
                codeBase.ObjectPool.recycleClass(encoder);
                this._webSocket.writeBytes(outBytes, 0, outBytes.length);
                this._webSocket.flush();
                // Debug.log = HexUtil.dump(outBytes);
                outBytes.clear();
                codeBase.ObjectPool.recycleClass(outBytes);
                //设置发送延迟
                this.autoConnectDuration = 3 * 60;
            }
        };
        /**
         * 连接
         * @param host 服务器地址
         * @param port 服务器断开
         * @param websocket 是否websocket连接方式
         */
        WebSocket.prototype.connect = function (host, port, websocket) {
            if (websocket === void 0) { websocket = true; }
            this._isWebSocket = websocket;
            codeBase.Debug.log = "@连接　host＝" + host + ", port=" + port;
            this.host = host;
            this.port = port;
            if (this.port <= 0 || !codeBase.StringUtil.isUsage(this.host)) {
                codeBase.Debug.log = "[ERROR] port=" + this.port + ", host=" + this.host + ",不合法,无法连接!";
                return;
            }
            if (this._isWebSocket) {
                this.connetWebSockt();
            }
            else {
                this.connetSockt();
            }
        };
        /**
         * 初始化websocket
         */
        WebSocket.prototype.connetWebSockt = function () {
            this.closeWebSocketListener();
            this._webSocket = new egret.WebSocket();
            this._webSocket.type = egret.WebSocket.TYPE_BINARY;
            this._webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onEventWebSocketProgressSocketDataHandler, this);
            this._webSocket.addEventListener(egret.Event.CONNECT, this.onEventWebSocketConnectHandler, this);
            this._webSocket.addEventListener(egret.Event.CLOSE, this.onEventWebSocketCloseHandler, this);
            this._webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onEventWebSocketErrorHandler, this);
            this._webSocket.connect(this.host, this.port);
        };
        /**
         * 在服务器关闭连接时调度
         * @param event
         */
        WebSocket.prototype.onEventWebSocketCloseHandler = function (event) {
            codeBase.MyEvent.sendEvent(codeBase.EventType.SOCKET_DISCONNECT);
            //codeBase.MessageTips.showMessage("Socket close:" + event.type);
            codeBase.Debug.log = "Socket close:" + event.type;
            this.close();
        };
        /**
         * 在出现输入/输出错误并导致发送或加载操作失败时调度。
         * @param event
         */
        WebSocket.prototype.onEventWebSocketErrorHandler = function (event) {
            codeBase.MyEvent.sendEvent(codeBase.EventType.SOCKET_DISCONNECT_ERROR);
            //codeBase.MessageTips.showMessage("Socket error:" + event.type);
            codeBase.Debug.log = "Socket error:" + event.type;
        };
        /**
         * 关闭websocket
         */
        WebSocket.prototype.closeWebSocketListener = function () {
            if (this._webSocket) {
                this._webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onEventWebSocketProgressSocketDataHandler, this);
                this._webSocket.removeEventListener(egret.Event.CONNECT, this.onEventWebSocketConnectHandler, this);
                this._webSocket.removeEventListener(egret.Event.CLOSE, this.onEventWebSocketCloseHandler, this);
                this._webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onEventWebSocketErrorHandler, this);
                if (this._webSocket.connected)
                    this._webSocket.close();
                this._webSocket = null;
            }
        };
        /**
         * 初始化socket
         */
        WebSocket.prototype.connetSockt = function () {
        };
        /**
         * 连接成功
         * @param event
         */
        WebSocket.prototype.onEventWebSocketConnectHandler = function (event) {
            codeBase.Debug.log = "@@Socket连接完成!";
            var myevent = codeBase.MyEvent.getEvent(codeBase.EventType.SOCKET_CONNECT);
            myevent.addItem("host", this.host);
            myevent.addItem("port", this.port);
            myevent.send();
            this.autoRelogin();
        };
        WebSocket.prototype.onEventWebSocketProgressSocketDataHandler = function (event) {
            codeBase.Debug.log = "@@--" + egret.getTimer() + "@@接收---ProgressSocketData=" + event;
            this._byteRawBuffer = null;
            this._byteRawBuffer = new egret.ByteArray(); //ObjectPool.getByClass(egret.ByteArray);
            //this._byteRawBuffer.clear();
            this._byteRawBuffer.endian = WebSocket.ENDIAN;
            if (this._webSocket)
                this._webSocket.readBytes(this._byteRawBuffer);
            codeBase.Debug.log = "byte.len=" + this._byteRawBuffer.length;
            codeBase.Debug.log = codeBase.HexUtil.dump(this._byteRawBuffer);
            // Debug.log = this._webSocket.readUTF();
            this._byteRawBuffer.position = 0;
            this.rawByteArrayCache.push(this._byteRawBuffer);
            codeBase.HeartBeat.addListener(this, this.checkPacketByteArray);
        };
        /**
         * 查询是否连接
         * @returns {boolean}
         */
        WebSocket.prototype.isConnected = function () {
            //if (this._socket) return this._socket.connected;
            if (this._webSocket)
                return this._webSocket.connected;
            return false;
        };
        /**
         * 关闭连接
         */
        WebSocket.prototype.close = function () {
            if (this._isWebSocket) {
                if (this._webSocket) {
                    this.closeWebSocketListener();
                }
            }
        };
        WebSocket.prototype.splitRawByte = function () {
            var i = 0;
            var lengthCache = this.rawByteArrayCache.length;
            var waiteToSplit = null;
            for (i = 0; i < lengthCache; i++) {
                waiteToSplit = this.rawByteArrayCache.shift();
                while (waiteToSplit.bytesAvailable > 0) {
                    if (this._byteWaitBuffer == null || !this._byteWaitReadLength) {
                        if (this._byteWaitBuffer == null) {
                            this._byteWaitBuffer = new egret.ByteArray();
                            this._byteWaitBuffer.clear();
                            this._byteWaitBuffer.endian = WebSocket.ENDIAN;
                            if (waiteToSplit.bytesAvailable >= 2) {
                                //读取长度
                                waiteToSplit.readBytes(this._byteWaitBuffer, 0, 2);
                                this._byteWaitBuffer.position = 0;
                                this._byteWaitBuffer.length = this._byteWaitBuffer.readUnsignedShort() + codeBase.PacketFactory.headerClientLength;
                                this._byteWaitReadLength = true;
                                //Debug.log("@@接收---新包长度=" + _byteWaitBuffer.length);
                            }
                            else {
                                this._byteWaitReadLength = false;
                                waiteToSplit.readBytes(this._byteWaitBuffer, 0, waiteToSplit.bytesAvailable);
                                //源代码有问题，修改：包体长度字节还没读取到，先设置字节数组长度为当前字节长度
                                this._byteWaitBuffer.length = waiteToSplit.bytesAvailable;
                            }
                        }
                        else {
                            //在新包中继读取包体长度字节数据
                            if (this._byteWaitBuffer.length < 2 && waiteToSplit.bytesAvailable >= 1) {
                                this._byteWaitBuffer.position = this._byteWaitBuffer.length;
                                waiteToSplit.readBytes(this._byteWaitBuffer, this._byteWaitBuffer.position, 1);
                            }
                            if (this._byteWaitBuffer.length == 2) {
                                this._byteWaitBuffer.position = 0;
                                this._byteWaitBuffer.length = this._byteWaitBuffer.readUnsignedShort() + codeBase.PacketFactory.headerClientLength;
                                this._byteWaitReadLength = true;
                            }
                            // waiteToSplit.readBytes(this._byteWaitBuffer, 0, this._byteWaitBuffer.length - 2);
                            // this._byteWaitBuffer.position = 0;
                            // this._byteWaitBuffer.length = this._byteWaitBuffer.readUnsignedShort() + PacketFactory.headerClientLength;
                            // this._byteWaitReadLength = true;
                        }
                    }
                    else {
                        var length = (this._byteWaitBuffer.bytesAvailable > waiteToSplit.bytesAvailable ? waiteToSplit.bytesAvailable : this._byteWaitBuffer.bytesAvailable);
                        waiteToSplit.readBytes(this._byteWaitBuffer, this._byteWaitBuffer.position, length);
                        this._byteWaitBuffer.position += length;
                        if (this._byteWaitBuffer.length == this._byteWaitBuffer.position) {
                            this._byteWaitBuffer.position = 2;
                            codeBase.Debug.log = "--@@---收到数据包---长度=" + this._byteWaitBuffer.length;
                            codeBase.Debug.log = codeBase.HexUtil.dump(this._byteWaitBuffer);
                            this.packetByteArrayCache.push(this._byteWaitBuffer);
                            this._byteWaitBuffer = null;
                            this._byteWaitReadLength = false;
                        }
                    }
                }
                //清除数据
                waiteToSplit.clear();
                codeBase.ObjectPool.recycleClass(waiteToSplit);
            }
        };
        WebSocket.prototype.checkPacketByteArray = function () {
            if (this.autoConnectDuration > 0) {
                this.autoConnectDuration--;
            }
            if (this.isConnected() && this.autoConnectDuration == 0) {
                while (this.packetSendCache.length > 0) {
                    var packetSend = this.packetSendCache.shift();
                    var encoder = codeBase.ObjectPool.getByClass(this.encodeClass);
                    var outBytes = encoder.encoder(packetSend);
                    codeBase.ObjectPool.recycleClass(encoder);
                    if (this._isWebSocket) {
                        this._webSocket.writeBytes(outBytes, 0, outBytes.length);
                        this._webSocket.flush();
                    }
                    codeBase.Debug.log = "@@--" + egret.getTimer() + "--@@-发送数据 msgid=" + packetSend.header.messageId + ",长度=" + outBytes.length + "," + egret.getQualifiedClassName(packetSend);
                    codeBase.Debug.log = codeBase.HexUtil.dump(outBytes);
                    outBytes.clear();
                    codeBase.ObjectPool.recycleClass(outBytes);
                    codeBase.EventManager.releasePacket(packetSend);
                }
            }
            this.splitRawByte(); //切割数据包
            //解析缓存的数据并路由
            while (this.packetByteArrayCache.length > 0) {
                var byteData = this.packetByteArrayCache.shift();
                var deccoder = codeBase.ObjectPool.getByClass(this.decodeClass);
                var packet = deccoder.decode(byteData);
                byteData.clear();
                codeBase.ObjectPool.recycleClass(byteData);
                codeBase.ObjectPool.recycleClass(deccoder);
                codeBase.EventManager.dispactchPacket(packet);
            }
            if (this.packetByteArrayCache.length == 0 && this.packetSendCache.length == 0) {
                codeBase.HeartBeat.removeListener(this, this.checkPacketByteArray);
            }
        };
        //字节序
        WebSocket.ENDIAN = egret.Endian.BIG_ENDIAN;
        //待发送的协议缓存列表,设置这个的目的是为了解耦同步调用
        //private _packetSendCache:Array<Packet> = [];
        WebSocket._instance = null;
        return WebSocket;
    }());
    codeBase.WebSocket = WebSocket;
    __reflect(WebSocket.prototype, "codeBase.WebSocket");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=WebSocket.js.map