var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var HexUtil = (function () {
        function HexUtil() {
        }
        HexUtil.dump = function (bytes) {
            var pos = bytes.position;
            var s = "";
            var a = "";
            bytes.position = 0;
            for (var i = 0; i < bytes.length; i++) {
                if (i % 16 == 0)
                    s += ("0000" + i.toString(16)).substr(-4, 4) + " ";
                if (i % 8 == 0)
                    s += " ";
                var v = bytes.readByte();
                s += ("0" + v.toString(16)).substr(-2, 2) + " ";
                a += (v < 32 || v > 126) ? "." : String.fromCharCode(v);
                if ((((i + 1) % 16) == 0) || (i == (bytes.length - 1))) {
                    s += " |" + a + "|\r\n";
                    a = "";
                }
            }
            bytes.position = pos;
            return s;
        };
        return HexUtil;
    }());
    codeBase.HexUtil = HexUtil;
    __reflect(HexUtil.prototype, "codeBase.HexUtil");
})(codeBase || (codeBase = {}));
