module codeBase{
	export interface IEncoder {
        encoder(packet:Packet):egret.ByteArray;
    }
}