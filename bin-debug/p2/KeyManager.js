var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var easyP2;
    (function (easyP2) {
        var KeyManager = (function () {
            function KeyManager() {
            }
            KeyManager.init = function () {
                var rfThis = this;
                this.dictKeyDn = {};
                document.onkeydown = function (evt) {
                    rfThis.onkeydown(evt);
                };
                document.onkeyup = function (evt) {
                    rfThis.onkeyup(evt);
                };
            };
            KeyManager.isDown = function (keycode) {
                return this.dictKeyDn[keycode] && this.dictKeyDn[keycode] == true;
            };
            KeyManager.onkeydown = function (evt) {
                var keycode = window.event ? evt.keyCode : evt.which;
                this.dictKeyDn[keycode] = true;
                //console.log("onkeydown code:"+keycode);
            };
            KeyManager.onkeyup = function (evt) {
                var keycode = window.event ? evt.keyCode : evt.which;
                this.dictKeyDn[keycode] = false;
            };
            KeyManager.Shift_L = 16;
            KeyManager.Ctrl_L = 17;
            KeyManager.Alt_L = 18;
            KeyManager.UP = 38;
            KeyManager.DOWN = 40;
            KeyManager.LEFT = 37;
            KeyManager.RIGHT = 39;
            KeyManager.W = 87;
            KeyManager.S = 83;
            KeyManager.A = 65;
            KeyManager.D = 68;
            KeyManager.SPACE = 32;
            return KeyManager;
        }());
        easyP2.KeyManager = KeyManager;
        __reflect(KeyManager.prototype, "codeBase.easyP2.KeyManager");
    })(easyP2 = codeBase.easyP2 || (codeBase.easyP2 = {}));
})(codeBase || (codeBase = {}));
