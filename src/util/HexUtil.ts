module codeBase {
    export class HexUtil {
        public static dump(bytes: egret.ByteArray): string {
            var pos: number = bytes.position;
            var s: string = "";
            var a: string = "";
            bytes.position = 0;
            for (var i: number = 0; i < bytes.length; i++) {
                if (i % 16 == 0)
                    s += ("0000" + i.toString(16)).substr(-4, 4) + " ";
                if (i % 8 == 0)
                    s += " ";
                var v: number = bytes.readByte();
                s += ("0" + v.toString(16)).substr(-2, 2) + " ";
                a += (v < 32 || v > 126) ? "." : String.fromCharCode(v);
                if ((((i + 1) % 16) == 0) || (i == (bytes.length - 1))) {
                    s += " |" + a + "|\r\n";
                    a = "";
                }
            }
            bytes.position = pos;
            return s;
        }
    }
}