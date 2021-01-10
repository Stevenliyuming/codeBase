var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var UICreator = (function () {
        function UICreator() {
        }
        /**
         * 创建图片显示对象
         * scale9Rect 图片的九宫格数据[左边距,右边距,上边距,下边距]
         */
        UICreator.createImage = function (pr, px, py, texture, scale9Rect) {
            if (px === void 0) { px = 0; }
            if (py === void 0) { py = 0; }
            if (texture === void 0) { texture = null; }
            if (scale9Rect === void 0) { scale9Rect = []; }
            var img = new codeBase.Image;
            if (pr) {
                pr.addChild(img);
                img.x = px;
                img.y = py;
            }
            img.texture = texture;
            img.scale9Grid(scale9Rect);
            return img;
        };
        /**
         * 创建位图数字
         * imageAlias 数字散图名称前缀
         * sheetAlias 数字图集名称
         */
        UICreator.createImageNumber = function (pr, px, py, imageAlias, sheetAlias, verticalAlign, horizontalAlign, defaultText) {
            if (sheetAlias === void 0) { sheetAlias = ""; }
            if (verticalAlign === void 0) { verticalAlign = "top"; }
            if (horizontalAlign === void 0) { horizontalAlign = "left"; }
            if (defaultText === void 0) { defaultText = null; }
            var imageNumber = new codeBase.ImageNumber;
            imageNumber.init(imageAlias, sheetAlias, verticalAlign, horizontalAlign);
            imageNumber.text = defaultText;
            if (pr) {
                imageNumber.show(pr, px, py);
            }
            return imageNumber;
        };
        /**
         * 创建普通按钮
         * statusSkin设置按钮可用状态皮肤
         * <p>[STATE_UP, STATE_DOWN, STATE_OVER, STATE_DISABLE]</p>
         */
        UICreator.createButton = function (statusSkin, clickFun, funObj, clickSound) {
            if (clickFun === void 0) { clickFun = null; }
            if (funObj === void 0) { funObj = null; }
            if (clickSound === void 0) { clickSound = null; }
            var button = new codeBase.Button;
            button.setStatus(statusSkin);
            button.setClickFunction(clickFun, funObj);
            button.sound = clickSound;
            return button;
        };
        /**
         * 创建可选按钮
         * statusSkin设置按钮可用状态皮肤
         * <p>[STATE_UP, STATE_DOWN, STATE_OVER, STATE_DISABLE]</p>
         */
        UICreator.createToggleButton = function (statusSkin, toggleGroupName, clickFun, funObj, clickSound) {
            if (clickFun === void 0) { clickFun = null; }
            if (funObj === void 0) { funObj = null; }
            if (clickSound === void 0) { clickSound = null; }
            var button = new codeBase.Button;
            button.setStatus(statusSkin);
            button.setClickFunction(clickFun, funObj);
            button.toggleGroup = toggleGroupName;
            button.sound = clickSound;
            return button;
        };
        /**
         * 创建文本标签
         */
        UICreator.createLabel = function (pr, px, py, fonsize, text) {
            if (fonsize === void 0) { fonsize = 26; }
            if (text === void 0) { text = ""; }
            var label = new codeBase.Label;
            if (pr) {
                pr.addChild(label);
                label.x = px;
                label.y = py;
            }
            label.fontSize = fonsize;
            label.text = text;
            label.showBg = false;
            label.autoSize = true;
            return label;
        };
        /**
         * 创建文本显示区域
         */
        UICreator.createTextArea = function (pr, px, py, width, height, text) {
            if (text === void 0) { text = ""; }
            var textArea = new codeBase.TextArea;
            if (pr) {
                pr.addChild(textArea);
                textArea.x = 200;
                textArea.y = 100;
            }
            textArea.width = 300;
            textArea.height = 300;
            textArea.showBg = true;
            textArea.text = text;
            return textArea;
        };
        /**
         * 创建文本输入框
         */
        UICreator.createTextInput = function (pr, px, py, width, height) {
            var textInput = new codeBase.TextInput;
            if (pr) {
                pr.addChild(textInput);
                textInput.x = px;
                textInput.y = py;
            }
            textInput.showBg = true;
            textInput.width = width;
            textInput.height = height;
            return textInput;
            // let textInput = new TextInput;
            // textInput.width = 300;
            // textInput.height = 100;
            // s.group_play.addChild(textInput);
            // textInput.x = 100;
            // textInput.y = 100;
            // textInput.showBg = true;
            // textInput.paddingLeft = 10;
            // textInput.paddingTop = 10;
            // textInput.paddingRight = 10;
            // textInput.paddingBottom = 20;
        };
        /**
         * 创建列表显示容器
         * itemRenderer 显示项对应的类
         * gap 显示项垂直方向间距
         * line 列表显示项的列数
         * lineGap 显示项列间距
         */
        UICreator.createList = function (pr, px, py, width, height, itemRenderer, listData, gap, line, lineGap, layout) {
            if (gap === void 0) { gap = 10; }
            if (line === void 0) { line = 1; }
            if (lineGap === void 0) { lineGap = 10; }
            if (layout === void 0) { layout = codeBase.Style.VERTICAL; }
            var list = new codeBase.List;
            if (pr) {
                pr.addChild(list);
                list.x = px;
                list.y = py;
            }
            list.width = width;
            list.height = height;
            list.itemRenderer = itemRenderer;
            list.gap = gap;
            list.line = line;
            list.lineGap = lineGap;
            list.data = listData;
            return list;
            // let listItemDataArr:any[] = [
            // 	{
            // 		res: "A_png"
            // 	},
            // 	{
            // 		res: "A点击_png"
            // 	}
            // ];
            // let listGroup = new List;
            // s.group_play.addChild(listGroup);
            // listGroup.x = 800;
            // listGroup.y = 0;
            // listGroup.width = 700;
            // listGroup.height = 600;
            // listGroup.itemRenderer = ListItemRenderer;
            // listGroup.gap = 100;
            // listGroup.line = 2;
            // listGroup.lineGap = 20;
            // //listGroup.layout = Style.HORIZONTAL;
            // listGroup.data = listItemDataArr;
            // listGroup.addEventListener(List.ITEM_SELECTED, (ev:egret.Event)=>{
            // 	console.log(ev.data);
            // }, s);
        };
        /**
         * 根据name关键字创建一个Bitmap对象
         */
        UICreator.createBitmap = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**
         * 获取xy位置的像素值,xy是舞台值
         * @param x
         * @param y
         */
        UICreator.getPixel32 = function (target, x, y) {
            if (target && target.texture) {
                var locolPoint = target.globalToLocal(x, y);
                return target.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            return [];
        };
        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        UICreator.testPixel32 = function (target, x, y) {
            var datas = this.getPixel32(target, x, y);
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    return true;
                }
            }
            return false;
        };
        return UICreator;
    }());
    codeBase.UICreator = UICreator;
    __reflect(UICreator.prototype, "codeBase.UICreator");
})(codeBase || (codeBase = {}));
