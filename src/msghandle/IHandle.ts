module codeBase{
    export interface IHandle {
        receivePacket(packet:any):void;
        receiveEvent(event:MyEvent):void;
    }
}