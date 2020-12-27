var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Style = (function () {
        function Style() {
        }
        /**
         * Applies a preset style as a list of color values. Should be called before creating any components.
         */
        Style.setStyle = function (style) {
            switch (style) {
                case Style.DARK:
                    Style.BACKGROUND = 0x444444;
                    Style.BUTTON_FACE = 0x666666;
                    Style.BUTTON_DOWN = 0x222222;
                    Style.INPUT_TEXT = 0xBBBBBB;
                    Style.LABEL_TEXT = 0xCCCCCC;
                    Style.PANEL = 0x666666;
                    Style.PROGRESS_BAR = 0x666666;
                    Style.TEXT_BACKGROUND = 0x555555;
                    Style.LIST_DEFAULT = 0x444444;
                    Style.LIST_ALTERNATE = 0x393939;
                    Style.LIST_SELECTED = 0x666666;
                    Style.LIST_ROLLOVER = 0x777777;
                    break;
                case Style.LIGHT:
                default:
                    Style.BACKGROUND = 0xCCCCCC;
                    Style.BUTTON_FACE = 0xFFFFFF;
                    Style.BUTTON_DOWN = 0xEEEEEE;
                    Style.INPUT_TEXT = 0x333333;
                    Style.LABEL_TEXT = 0x666666;
                    Style.PANEL = 0xF3F3F3;
                    Style.PROGRESS_BAR = 0xFFFFFF;
                    Style.TEXT_BACKGROUND = 0xFFFFFF;
                    Style.LIST_DEFAULT = 0xFFFFFF;
                    Style.LIST_ALTERNATE = 0xF3F3F3;
                    Style.LIST_SELECTED = 0xCCCCCC;
                    Style.LIST_ROLLOVER = 0xDDDDDD;
                    break;
            }
        };
        Style.TEXT_BACKGROUND = 0xFFFFFF;
        Style.BACKGROUND = 0xCCCCCC;
        Style.BUTTON_FACE = 0xFFFFFF;
        Style.BUTTON_DOWN = 0xEEEEEE;
        Style.INPUT_TEXT = 0x333333;
        Style.LABEL_TEXT = 0x000000;
        Style.BUTTON_TEXT = 0x666666;
        Style.DROPSHADOW = 0x000000;
        Style.PANEL = 0xF3F3F3;
        Style.PROGRESS_BAR = 0xFFFFFF;
        Style.LIST_DEFAULT = 0xFFFFFF;
        Style.LIST_ALTERNATE = 0xF3F3F3;
        Style.LIST_SELECTED = 0xCCCCCC;
        Style.LIST_ROLLOVER = 0XDDDDDD;
        Style.BUTTON_DEFAULT_WIDTH = 100;
        Style.BUTTON_DEFAULT_HEIGHT = 32;
        Style.VIDEO_DEFAULT_WIDTH = 320;
        Style.VIDEO_DEFAULT_HEIGHT = 250;
        Style.embedFonts = false;
        Style.fontName = null;
        Style.fontSize = 16;
        /**
         * 是否允许文本加载默认滤镜.
         */
        Style.allowDefaultLabelFilter = true;
        Style.DARK = "dark";
        Style.LIGHT = "light";
        /**
         * 是否允许按钮禁用态时的颜色矩阵.
         */
        Style.allowColorFilterButtonEnabled = false;
        /**
         * 是否允许默认按钮点击自动冷却.(在按钮本身设置无冷却的情况下生效.)
         */
        Style.allowButtonDefaultCoolDown = false;
        /**
         * allowButtonDefaultCoolDown == true 情况下生效.
         */
        Style.defaultCoolDownFrames = 2;
        Style.TEXTINPUT_HEIGHT = 25;
        Style.TEXTINPUT_WIDTH = 100;
        Style.TEXTINPUT_COLOR = 0xffffff;
        Style.HORIZONTAL = "horizontal";
        Style.VERTICAL = "vertical";
        Style.SLIDER_WIDTH = 300;
        Style.SLIDER_HEIGHT = 17;
        Style.SCROLLBAR_WIDTH = 300;
        Style.SCROLLBAR_HEIGHT = 17;
        return Style;
    }());
    codeBase.Style = Style;
    __reflect(Style.prototype, "codeBase.Style");
})(codeBase || (codeBase = {}));
