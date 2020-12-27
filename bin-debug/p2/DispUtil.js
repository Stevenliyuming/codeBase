var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var easyP2;
    (function (easyP2) {
        var DispUtil = (function () {
            function DispUtil() {
            }
            /**
             * 创建一个位图
             * 返回的图形锚点位于图形中心
             */
            DispUtil.createBitmapByName = function (name) {
                var result = new egret.Bitmap();
                var texture = RES.getRes(name);
                result.texture = texture;
                result.anchorOffsetX = result.width * 0.5;
                result.anchorOffsetY = result.height * 0.5;
                return result;
            };
            /**
            * 创建一个圆形
            * 返回的图形锚点位于图形中心
            */
            DispUtil.createBall = function (r) {
                var shape = new egret.Shape();
                shape.graphics.lineStyle(1, 0);
                shape.graphics.beginFill(0xfff000);
                shape.graphics.drawCircle(r, r, r);
                shape.graphics.moveTo(r, r);
                shape.graphics.lineTo(2 * r, r);
                shape.graphics.endFill();
                //将显示对象的锚点移到中心位置
                shape.anchorOffsetX = shape.width / 2;
                shape.anchorOffsetY = shape.height / 2;
                return shape;
            };
            /**
            * 创建一个方形
            * 返回的图形锚点位于图形中心
            */
            DispUtil.createBox = function (width, height) {
                console.log("createBox " + width + "," + height);
                var shape = new egret.Shape();
                shape.graphics.lineStyle(1, 0);
                shape.graphics.beginFill(0xfff000);
                shape.graphics.drawRect(0, 0, width, height);
                shape.graphics.endFill();
                //将显示对象的锚点移到中心位置
                shape.anchorOffsetX = shape.width / 2;
                shape.anchorOffsetY = shape.height / 2;
                return shape;
            };
            /**
             * 创建一个胶囊形
             * @param length
             * @param radius
             */
            DispUtil.createCapsule = function (length, radius) {
                console.log("createCapsule len:" + length + ",radius:" + radius);
                var result = new egret.Sprite();
                var shape = new egret.Shape();
                shape.graphics.lineStyle(1, 0);
                shape.graphics.beginFill(0xfff000);
                shape.graphics.drawCircle(0, radius, radius);
                shape.graphics.endFill();
                shape.graphics.beginFill(0xfff000);
                shape.graphics.drawCircle(length, radius, radius);
                shape.graphics.endFill();
                shape.graphics.beginFill(0xfff000);
                shape.graphics.drawRect(0, 0, length, radius * 2);
                shape.graphics.endFill();
                var shapeRect = shape.getBounds();
                shape.x = -shapeRect.x;
                shape.y = -shapeRect.y;
                result.addChild(shape);
                //将显示对象的锚点移到中心位置
                result.anchorOffsetX = result.width * .5;
                result.anchorOffsetY = result.height * .5;
                return result;
            };
            /**
             * 创建一个多边形的显示皮肤
             * 注意这里并没有指定anchorOffsetX,&anchorOffsetY,默认是0,0
             * polygon皮肤的anchorOffset需要在Body.fromPolygon之后计算出来
             * @param pathPts [[x,y],[x,y],...]
             */
            DispUtil.createPolygon = function (pathPts) {
                var result = new egret.Sprite();
                var shape = new egret.Shape();
                var i;
                shape.graphics.lineStyle(1, 0x0000ff);
                for (i = 0; i < pathPts.length; i++) {
                    var currPt = pathPts[i];
                    shape.graphics.moveTo(currPt[0], currPt[1]); //移动到当前点
                    var nextPt = pathPts[(i + 1) % pathPts.length];
                    shape.graphics.lineTo(nextPt[0], nextPt[1]); //绘制到下个点
                }
                //var shapeRect = DispUtil.getRectFromPathPts(pathPts);
                var shapeRect = shape.getBounds();
                shape.x = -shapeRect.x;
                shape.y = -shapeRect.y;
                result.addChild(shape);
                return result;
            };
            /**
             * 创建heightField皮肤
             * @param pathPts
             * 注意:heightField刚体类型的皮肤处理,在添加到显示列表时候一次性设置位置，之后就不需要更新了(DemoBase.readAmpeSceneVO方法中)
             */
            DispUtil.createHeightField = function (pathPts) {
                var result = new egret.Sprite();
                var shape = new egret.Shape();
                var i;
                shape.graphics.lineStyle(1, 0x0000ff);
                for (i = 0; i < pathPts.length - 1; i++) {
                    var currPt = pathPts[i];
                    shape.graphics.moveTo(currPt[0], currPt[1]); //移动到当前点
                    var nextPt = pathPts[(i + 1) % pathPts.length];
                    shape.graphics.lineTo(nextPt[0], nextPt[1]); //绘制到下个点
                }
                //var shapeRect = DispUtil.getRectFromPathPts(pathPts);
                var shapeRect = shape.getBounds();
                shape.x = -shapeRect.x;
                shape.y = -shapeRect.y;
                result.addChild(shape);
                result.anchorOffsetX = -shapeRect.x; //计算anchorOffset
                result.anchorOffsetY = -shapeRect.y; //..
                return result;
            };
            /**
             * 创建一个可以点击的文本，当作按钮用
             */
            DispUtil.createTouchTf = function (px, py, pwid, phei, text) {
                var tf = new egret.TextField();
                tf.width = pwid;
                tf.height = phei;
                tf.x = px;
                tf.y = py;
                tf.size = 16;
                tf.text = text;
                tf.touchEnabled = true;
                return tf;
            };
            return DispUtil;
        }());
        easyP2.DispUtil = DispUtil;
        __reflect(DispUtil.prototype, "codeBase.easyP2.DispUtil");
    })(easyP2 = codeBase.easyP2 || (codeBase.easyP2 = {}));
})(codeBase || (codeBase = {}));
