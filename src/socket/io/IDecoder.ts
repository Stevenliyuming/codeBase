module codeBase{
	export interface IDecoder {
        decode(bytePacket:egret.ByteArray):Packet;
    }
}