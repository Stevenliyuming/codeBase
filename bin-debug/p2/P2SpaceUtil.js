var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var easyP2;
    (function (easyP2) {
        var P2Space = (function () {
            function P2Space() {
            }
            P2Space.checkIfCanJump = function (world, body) {
                var result = false;
                for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
                    var c = world.narrowphase.contactEquations[i];
                    if (c.bodyA === body || c.bodyB === body) {
                        var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                        if (c.bodyA === body)
                            d *= -1;
                        if (d > 0.5)
                            result = true;
                    }
                }
                return result;
            };
            /**
             * 更新刚体的皮肤显示
             */
            P2Space.updateBodySkin = function (body) {
                if (body.displays == null || body.displays.length == 0) {
                    return;
                }
                var skinDisp;
                if (body['concavePath']) {
                    skinDisp = body.displays[0]; //concave只是用唯一皮肤来做显示
                    //使用body数据来更新concave皮肤--------------------------------------------------------------------
                    skinDisp.x = this.convertP2ValueToEgret(body.position[0]); //把物理世界的位置转换到显示世界的位置，赋值
                    skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]); //把物理世界的位置转换到显示世界的位置，赋值
                    skinDisp.rotation = this.convertP2BodyAngleToEgret(body); //把物理世界刚体角度转换为显示世界角度，赋值
                }
                else if (body.shapes && body.shapes[0] instanceof p2.Heightfield) {
                    //heightField刚体因为body.y在创建时候，固定是0,这里就不能用来同步皮肤
                    //heightField皮肤应该使用编辑器中设定的位置，而且地形固定的，运行时不需要更新
                    //注意: heightField刚体类型的皮肤处理,在添加到显示列表时候一次性设置位置，之后就不需要更新了(DemoBase.readAmpeSceneVO方法中)
                }
                else {
                    for (var i = 0; i < body.displays.length; i++) {
                        skinDisp = body.displays[i]; //取得shape对应的皮肤
                        if (skinDisp) {
                            //使用shape数据来更新皮肤-------------------------------------------------------------------------------------------
                            var skinWorldPos = [0, 0]; //shapeSkin在p2World中的坐标
                            body.toWorldFrame(skinWorldPos, body.shapes[i].position); //从Body局部转世界
                            skinDisp.x = this.convertP2ValueToEgret(skinWorldPos[0]); //转化为egret坐标，赋给skin
                            skinDisp.y = this.convertP2Y_To_EgretY(skinWorldPos[1]); //转化为egret坐标，赋给skin
                            skinDisp.rotation = 360 - (body.angle + body.shapes[i].angle) * 180 / Math.PI; //
                        }
                    }
                }
            };
            /**
             * 物理世界的长度标量到显示世界的转换
             * 适合如 x,width,height的转换，y值不适合
             */
            P2Space.convertP2ValueToEgret = function (value) {
                return value * this.factor;
            };
            /**
             * 显示世界物理世界的长度标量到物理世界的转换
             * 适合如 x,width,height的转换，y值不适合
             */
            P2Space.convertEgretValueToP2 = function (value) {
                return value / this.factor;
            };
            /**
             * 把egretY值转换到p2Y值，仅适合y转换
             */
            P2Space.convertEgretY_To_P2Y = function (egretY) {
                return (this.worldRect.height - egretY) / this.factor;
            };
            /**
             * 把p2y值转换到egretY值，仅适合y转换
             */
            P2Space.convertP2Y_To_EgretY = function (p2Y) {
                return this.worldRect.height - p2Y * this.factor;
            };
            /**
             * 把给定egret坐标转换为p2坐标
             */
            P2Space.convertEgretPosToP2 = function (xEgret, yEgret) {
                return [xEgret / this.factor, (this.worldRect.height - yEgret) / this.factor];
            };
            /**
             * 获得p2Body的egret显示坐标
             */
            P2Space.convertBodyPosToEgret = function (body) {
                var xP2 = body.position[0];
                var yP2 = body.position[1];
                return [xP2 * this.factor, this.worldRect.height - yP2 * this.factor];
            };
            /**
             * 获得p2Body的egret显示旋转角度
             */
            P2Space.convertP2BodyAngleToEgret = function (body) {
                var result;
                result = 360 - body.angle * 180 / Math.PI;
                return result;
            };
            /**
             * 把egret deg角度转换为p2 rad角度
             */
            P2Space.convertEgretAngleToP2 = function (angle) {
                var result;
                result = (360 - angle) * Math.PI / 180;
                return result;
            };
            /**
             * 计算concave局部空间的rect,是转换到Egret系统rect
             * @param concaveBody
             */
            P2Space.getConcaveEgretRect = function (concaveBody) {
                var p2Rect = P2Space.getConcaveP2Rect(concaveBody); //获得p2系统，局部坐标系rect
                var yMirroredRect = P2Space.getYAxisMirroredRect(p2Rect); //在y轴上镜像
                yMirroredRect.left = yMirroredRect.left * this.factor; //rect系数转换
                yMirroredRect.top = yMirroredRect.top * this.factor; //...
                yMirroredRect.width = yMirroredRect.width * this.factor; //...
                yMirroredRect.height = yMirroredRect.height * this.factor; //...
                return yMirroredRect;
            };
            /**
             * 计算Concave局部空间的rect,是p2系统的rect
             * @param concaveBody
             */
            P2Space.getConcaveP2Rect = function (concaveBody) {
                var result;
                var pathPts = concaveBody["concavePath"]; //凹多边形路径
                result = P2Space.getRectFromPathPts(pathPts);
                return result;
            };
            /**
             * 从多边形路径点列表获得边界框
             * 当只有路径点列表数据时候，可以方便的获得这个多边形在自己局部坐标系的Bounds
             * 可以用来获取p2系统的rect
             * 也可以用来获取egret系统的rect
             * @param pathPts [[x,y],[x,y],...]
             */
            P2Space.getRectFromPathPts = function (pathPts) {
                var result = new egret.Rectangle();
                var len = pathPts.length; //路径长度
                var currPt; //当前路径顶点
                for (var i = 0; i < len; i++) {
                    currPt = pathPts[i]; //获得当前点
                    if (currPt[0] < result.left) {
                        result.left = currPt[0];
                    }
                    if (currPt[0] > result.right) {
                        result.right = currPt[0];
                    }
                    if (currPt[1] < result.top) {
                        result.top = currPt[1];
                    }
                    if (currPt[1] > result.bottom) {
                        result.bottom = currPt[1];
                    }
                }
                return result;
            };
            /**
             * 获得Rect y轴镜像版本
             * 用处在于 p2局部空间rect 和 egret局部空间rect 互相转换
             * 注意：这里并没有执行factor系数转换
             * @param p2Rect
             */
            P2Space.getYAxisMirroredRect = function (originalRect) {
                var result = new egret.Rectangle();
                result.left = originalRect.left;
                result.right = originalRect.right;
                result.bottom = -originalRect.top;
                result.top = -originalRect.bottom;
                return result;
            };
            /**
             * 初始化
             */
            P2Space.initSpace = function (factor, rectWorld) {
                this.factor = factor;
                this.worldRect = rectWorld;
            };
            /**
             * 在物理世界创建一个矩形刚体，显示cube矢量图形
             */
            P2Space.addOneBox = function (p2World, ctn, px, py, pw, ph, pAngle, type, skin) {
                if (skin === void 0) { skin = null; }
                //在物理世界中的位置
                var p2x = easyP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
                var p2y = easyP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
                var p2Wid = easyP2.P2Space.convertEgretValueToP2(pw);
                var p2Hei = easyP2.P2Space.convertEgretValueToP2(ph);
                var p2Angle = easyP2.P2Space.convertEgretAngleToP2(pAngle);
                var bodyShape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
                var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape); //给刚体添加p2.Shape
                p2World.addBody(body);
                var display = [];
                if (skin) {
                    for (var i = 0; i < skin.length; ++i) {
                        skin[i].anchorOffsetX = skin[i].width / 2;
                        skin[i].anchorOffsetY = skin[i].height / 2;
                    }
                    //绑定刚体和显示皮肤
                    body.displays = skin;
                }
                else {
                    display[0] = easyP2.DispUtil.createBox(pw, ph);
                    //绑定刚体和显示皮肤
                    body.displays = display;
                }
                //把皮肤添加到显示世界                                              
                for (var i = 0; i < body.displays.length; ++i) {
                    ctn.addChild(body.displays[i]);
                }
                return body;
            };
            /**
             * 在物理世界创建一个capsule刚体，显示capsule矢量图形
             * @param p2World
             * @param ctn
             * @param px
             * @param py
             * @param pw
             * @param ph
             * @param pAngle
             * @param type
             */
            P2Space.addOneCapsule = function (p2World, ctn, px, py, pLen, pRadius, pAngle, type) {
                //在物理世界中的位置
                var p2x = easyP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
                var p2y = easyP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
                var p2Len = easyP2.P2Space.convertEgretValueToP2(pLen);
                var p2Radius = easyP2.P2Space.convertEgretValueToP2(pRadius);
                var p2Angle = easyP2.P2Space.convertEgretAngleToP2(pAngle);
                var display;
                var bodyShape = new p2.Capsule({ length: p2Len, radius: p2Radius }); //new p2.Box({ width: p2Wid,height: p2Hei }); 
                var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape); //给刚体添加p2.Shape
                p2World.addBody(body);
                display = easyP2.DispUtil.createCapsule(pLen, pRadius);
                //绑定刚体和显示皮肤
                body.displays = [display];
                ctn.addChild(display); //把皮肤添加到显示世界
                return body;
            };
            /**
            * 在物理世界创建一个圆形刚体，显示circle矢量图形
            */
            P2Space.addOneBall = function (p2World, ctn, px, py, pr, pAngle, type, skin) {
                if (skin === void 0) { skin = []; }
                //在物理世界中的位置
                var p2x = easyP2.P2Space.convertEgretValueToP2(px); //显示位置变换到物理世界位置
                var p2y = easyP2.P2Space.convertEgretY_To_P2Y(py); //显示位置变换到物理世界位置
                var p2R = easyP2.P2Space.convertEgretValueToP2(pr);
                var p2Angle = easyP2.P2Space.convertEgretAngleToP2(pAngle);
                var bodyShape = new p2.Circle({ radius: p2R }); //new p2.Circle(p2R)
                var body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape); //给刚体添加p2.Shape
                p2World.addBody(body);
                var display = [];
                if (skin) {
                    for (var i = 0; i < skin.length; ++i) {
                        skin[i].anchorOffsetX = skin[i].width / 2;
                        skin[i].anchorOffsetY = skin[i].height / 2;
                    }
                    //绑定刚体和显示皮肤
                    body.displays = skin;
                }
                else {
                    display[0] = easyP2.DispUtil.createBall(pr);
                    //绑定刚体和显示皮肤
                    body.displays = display;
                }
                //把皮肤添加到显示世界                                              
                for (var i = 0; i < body.displays.length; ++i) {
                    ctn.addChild(body.displays[i]);
                }
                return body;
            };
            /**
             * 更新p2World的刚体皮肤显示
             */
            P2Space.updateWorldBodiesSkin = function (p2World) {
                var stageHeight = egret.MainContext.instance.stage.stageHeight; //显示世界 stageHeight
                var len = p2World.bodies.length;
                for (var i = 0; i < len; i++) {
                    var temBody = p2World.bodies[i];
                    easyP2.P2Space.updateBodySkin(temBody);
                    if (temBody.displays == null || temBody.displays.length == 0) {
                        continue;
                    }
                    for (var j = 0; j < temBody.displays.length; j++) {
                        var dispSkin = temBody.displays[j];
                        if (temBody.sleepState == p2.Body.SLEEPING) {
                            dispSkin.alpha = 0.5;
                        }
                        else {
                            dispSkin.alpha = 1;
                        }
                    } //end for
                } //end for
            };
            P2Space.yAxis = p2.vec2.fromValues(0, 1); //p2 y轴
            return P2Space;
        }());
        easyP2.P2Space = P2Space;
        __reflect(P2Space.prototype, "codeBase.easyP2.P2Space");
    })(easyP2 = codeBase.easyP2 || (codeBase.easyP2 = {}));
})(codeBase || (codeBase = {}));
//# sourceMappingURL=P2SpaceUtil.js.map