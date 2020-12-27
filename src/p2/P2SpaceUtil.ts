module codeBase{
    export module easyP2 {
        export class P2Space {
            private static factor: number;
            private static worldRect: egret.Rectangle;
            private static yAxis = p2.vec2.fromValues(0, 1);//p2 y轴

            public static checkIfCanJump(world: p2.World, body: p2.Body): boolean {
                var result = false;
                for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
                    var c = world.narrowphase.contactEquations[i];
                    if (c.bodyA === body || c.bodyB === body) {
                        var d = p2.vec2.dot(c.normalA, this.yAxis); // Normal dot Y-axis
                        if (c.bodyA === body) d *= -1;
                        if (d > 0.5) result = true;
                    }
                }
                return result;
            }

            /**
             * 更新刚体的皮肤显示
             */
            public static updateBodySkin(body: p2.Body): void {
                if (body.displays == null || body.displays.length == 0) {
                    return;
                }
                var skinDisp: egret.DisplayObject;
                if (body['concavePath']) {//Concave需要特殊的同步方法
                    skinDisp = body.displays[0];//concave只是用唯一皮肤来做显示
                    //使用body数据来更新concave皮肤--------------------------------------------------------------------
                    skinDisp.x = this.convertP2ValueToEgret(body.position[0]);//把物理世界的位置转换到显示世界的位置，赋值
                    skinDisp.y = this.convertP2Y_To_EgretY(body.position[1]);//把物理世界的位置转换到显示世界的位置，赋值
                    skinDisp.rotation = this.convertP2BodyAngleToEgret(body);//把物理世界刚体角度转换为显示世界角度，赋值
                }
                else if (body.shapes && body.shapes[0] instanceof p2.Heightfield) {//heightField需要特殊的同步方法
                    //heightField刚体因为body.y在创建时候，固定是0,这里就不能用来同步皮肤
                    //heightField皮肤应该使用编辑器中设定的位置，而且地形固定的，运行时不需要更新
                    //注意: heightField刚体类型的皮肤处理,在添加到显示列表时候一次性设置位置，之后就不需要更新了(DemoBase.readAmpeSceneVO方法中)
                }
                else {//其他普通图形的同步
                    for (var i = 0; i < body.displays.length; i++) {
                        skinDisp = body.displays[i];//取得shape对应的皮肤
                        if (skinDisp) {
                            //使用shape数据来更新皮肤-------------------------------------------------------------------------------------------
                            var skinWorldPos = [0, 0];//shapeSkin在p2World中的坐标
                            body.toWorldFrame(skinWorldPos, body.shapes[i].position);//从Body局部转世界
                            skinDisp.x = this.convertP2ValueToEgret(skinWorldPos[0]);//转化为egret坐标，赋给skin
                            skinDisp.y = this.convertP2Y_To_EgretY(skinWorldPos[1]);//转化为egret坐标，赋给skin
                            skinDisp.rotation = 360 - (body.angle + body.shapes[i].angle) * 180 / Math.PI;//
                        }
                    }
                }
            }

            /**
             * 物理世界的长度标量到显示世界的转换
             * 适合如 x,width,height的转换，y值不适合
             */
            public static convertP2ValueToEgret(value: number): number {
                return value * this.factor;
            }

            /**
             * 显示世界物理世界的长度标量到物理世界的转换
             * 适合如 x,width,height的转换，y值不适合
             */
            public static convertEgretValueToP2(value: number): number {
                return value / this.factor;
            }

            /**
             * 把egretY值转换到p2Y值，仅适合y转换
             */
            public static convertEgretY_To_P2Y(egretY: number): number {
                return (this.worldRect.height - egretY) / this.factor;
            }

            /**
             * 把p2y值转换到egretY值，仅适合y转换
             */
            public static convertP2Y_To_EgretY(p2Y: number): number {
                return this.worldRect.height - p2Y * this.factor;
            }

            /**
             * 把给定egret坐标转换为p2坐标
             */
            public static convertEgretPosToP2(xEgret: number, yEgret: number): Array<number> {
                return [xEgret / this.factor, (this.worldRect.height - yEgret) / this.factor];
            }

            /**
             * 获得p2Body的egret显示坐标
             */
            public static convertBodyPosToEgret(body: p2.Body): Array<number> {
                var xP2: number = body.position[0];
                var yP2: number = body.position[1];

                return [xP2 * this.factor, this.worldRect.height - yP2 * this.factor];
            }

            /**
             * 获得p2Body的egret显示旋转角度
             */
            public static convertP2BodyAngleToEgret(body: p2.Body): number {
                var result: number;
                result = 360 - body.angle * 180 / Math.PI;
                return result;
            }

            /**
             * 把egret deg角度转换为p2 rad角度
             */
            public static convertEgretAngleToP2(angle: number): number {
                var result: number;
                result = (360 - angle) * Math.PI / 180;
                return result;
            }

            /**
             * 计算concave局部空间的rect,是转换到Egret系统rect
             * @param concaveBody
             */
            public static getConcaveEgretRect(concaveBody: p2.Body): egret.Rectangle {
                var p2Rect = P2Space.getConcaveP2Rect(concaveBody);//获得p2系统，局部坐标系rect
                var yMirroredRect = P2Space.getYAxisMirroredRect(p2Rect);//在y轴上镜像

                yMirroredRect.left = yMirroredRect.left * this.factor;//rect系数转换
                yMirroredRect.top = yMirroredRect.top * this.factor;//...
                yMirroredRect.width = yMirroredRect.width * this.factor;//...
                yMirroredRect.height = yMirroredRect.height * this.factor;//...

                return yMirroredRect;
            }

            /**
             * 计算Concave局部空间的rect,是p2系统的rect
             * @param concaveBody
             */
            public static getConcaveP2Rect(concaveBody: p2.Body): egret.Rectangle {
                var result: egret.Rectangle;

                var pathPts: any[] = concaveBody["concavePath"];//凹多边形路径
                result = P2Space.getRectFromPathPts(pathPts);

                return result;
            }

            /**
             * 从多边形路径点列表获得边界框
             * 当只有路径点列表数据时候，可以方便的获得这个多边形在自己局部坐标系的Bounds
             * 可以用来获取p2系统的rect
             * 也可以用来获取egret系统的rect
             * @param pathPts [[x,y],[x,y],...]
             */
            public static getRectFromPathPts(pathPts: any[]): egret.Rectangle {
                var result = new egret.Rectangle();

                var len: number = pathPts.length;//路径长度
                var currPt: number[];//当前路径顶点

                for (var i: number = 0; i < len; i++) {
                    currPt = pathPts[i];//获得当前点
                    if (currPt[0] < result.left) {//get minX
                        result.left = currPt[0];
                    }
                    if (currPt[0] > result.right) {//get maxX
                        result.right = currPt[0];
                    }
                    if (currPt[1] < result.top) {//get minY
                        result.top = currPt[1];
                    }
                    if (currPt[1] > result.bottom) {//get maxY
                        result.bottom = currPt[1];
                    }
                }
                return result;
            }

            /**
             * 获得Rect y轴镜像版本
             * 用处在于 p2局部空间rect 和 egret局部空间rect 互相转换
             * 注意：这里并没有执行factor系数转换
             * @param p2Rect
             */
            public static getYAxisMirroredRect(originalRect: egret.Rectangle): egret.Rectangle {
                var result = new egret.Rectangle();
                result.left = originalRect.left;
                result.right = originalRect.right;
                result.bottom = -originalRect.top;
                result.top = -originalRect.bottom;
                return result;
            }

            /**
             * 初始化
             */
            public static initSpace(factor: number, rectWorld: egret.Rectangle): void {
                this.factor = factor;
                this.worldRect = rectWorld;
            }

            /**
             * 在物理世界创建一个矩形刚体，显示cube矢量图形
             */
            public static addOneBox(p2World: p2.World, ctn: egret.DisplayObjectContainer, px: number, py: number, pw: number, ph: number, pAngle: number, type: number, skin: egret.DisplayObject[] = null): p2.Body {

                //在物理世界中的位置
                var p2x: number = easyP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
                var p2y: number = easyP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
                var p2Wid: number = easyP2.P2Space.convertEgretValueToP2(pw);
                var p2Hei: number = easyP2.P2Space.convertEgretValueToP2(ph);
                var p2Angle: number = easyP2.P2Space.convertEgretAngleToP2(pAngle);

                var bodyShape: p2.Shape = new p2.Box({ width: p2Wid, height: p2Hei }); //new p2.Rectangle(p2Wid, p2Hei);
                var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape);//给刚体添加p2.Shape
                p2World.addBody(body);

                var display: egret.DisplayObject[] = [];
                if (skin) {
                    for (let i = 0; i < skin.length; ++i) {
                        skin[i].anchorOffsetX = skin[i].width / 2;
                        skin[i].anchorOffsetY = skin[i].height / 2;
                    }
                    //绑定刚体和显示皮肤
                    body.displays = skin;
                } else {
                    display[0] = easyP2.DispUtil.createBox(pw, ph);
                    //绑定刚体和显示皮肤
                    body.displays = display;
                }

                //把皮肤添加到显示世界                                              
                for (let i = 0; i < body.displays.length; ++i) {
                    ctn.addChild(body.displays[i]);
                }

                return body;
            }

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
            public static addOneCapsule(p2World: p2.World, ctn: egret.DisplayObjectContainer, px: number, py: number, pLen: number, pRadius: number, pAngle: number, type: number): p2.Body {

                //在物理世界中的位置
                var p2x: number = easyP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
                var p2y: number = easyP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
                var p2Len: number = easyP2.P2Space.convertEgretValueToP2(pLen);
                var p2Radius: number = easyP2.P2Space.convertEgretValueToP2(pRadius);
                var p2Angle: number = easyP2.P2Space.convertEgretAngleToP2(pAngle);

                var display: egret.DisplayObject;

                var bodyShape: p2.Shape = new p2.Capsule({ length: p2Len, radius: p2Radius });//new p2.Box({ width: p2Wid,height: p2Hei }); 
                var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape);//给刚体添加p2.Shape
                p2World.addBody(body);

                display = easyP2.DispUtil.createCapsule(pLen, pRadius);

                //绑定刚体和显示皮肤
                body.displays = [display];
                ctn.addChild(display);//把皮肤添加到显示世界

                return body;
            }

            /**
            * 在物理世界创建一个圆形刚体，显示circle矢量图形
            */
            public static addOneBall(p2World: p2.World, ctn: egret.DisplayObjectContainer, px: number, py: number, pr: number, pAngle: number, type: number, skin: egret.Bitmap[] = []): p2.Body {

                //在物理世界中的位置
                var p2x: number = easyP2.P2Space.convertEgretValueToP2(px);//显示位置变换到物理世界位置
                var p2y: number = easyP2.P2Space.convertEgretY_To_P2Y(py);//显示位置变换到物理世界位置
                var p2R: number = easyP2.P2Space.convertEgretValueToP2(pr);

                var p2Angle: number = easyP2.P2Space.convertEgretAngleToP2(pAngle);

                var bodyShape: p2.Shape = new p2.Circle({ radius: p2R });//new p2.Circle(p2R)
                var body: p2.Body = new p2.Body({ mass: 1, position: [p2x, p2y], angle: p2Angle });
                body.type = type;
                body.addShape(bodyShape);//给刚体添加p2.Shape
                p2World.addBody(body);

                var display: egret.DisplayObject[] = [];
                if (skin) {
                    for (let i = 0; i < skin.length; ++i) {
                        skin[i].anchorOffsetX = skin[i].width / 2;
                        skin[i].anchorOffsetY = skin[i].height / 2;
                    }
                    //绑定刚体和显示皮肤
                    body.displays = skin;
                } else {
                    display[0] = easyP2.DispUtil.createBall(pr);
                    //绑定刚体和显示皮肤
                    body.displays = display;
                }

                //把皮肤添加到显示世界                                              
                for (let i = 0; i < body.displays.length; ++i) {
                    ctn.addChild(body.displays[i]);
                }

                return body;
            }

            /**
             * 更新p2World的刚体皮肤显示
             */
            public static updateWorldBodiesSkin(p2World: p2.World): void {
                var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//显示世界 stageHeight
                var len = p2World.bodies.length;

                for (var i: number = 0; i < len; i++) {//遍历所有的刚体
                    var temBody: p2.Body = p2World.bodies[i];
                    easyP2.P2Space.updateBodySkin(temBody);

                    if (temBody.displays == null || temBody.displays.length == 0) {
                        continue;
                    }
                    for (var j = 0; j < temBody.displays.length; j++) {
                        var dispSkin: egret.DisplayObject = temBody.displays[j];
                        if (temBody.sleepState == p2.Body.SLEEPING) {//设置是否睡眠状态显示
                            dispSkin.alpha = 0.5;
                        } else {
                            dispSkin.alpha = 1;
                        }
                    }//end for

                }//end for
            }
        }
    }
}