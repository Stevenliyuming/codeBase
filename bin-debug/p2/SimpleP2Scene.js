var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var easyP2;
    (function (easyP2) {
        var SimpleP2Scene = (function () {
            function SimpleP2Scene(pStage, pDispCtn) {
                //物理世界转换系数
                this.factor = 50;
                this.stage = pStage; //ref of stage
                this.dispCtn = pDispCtn; //ref of disp container
                //初始化P2Space
                easyP2.P2Space.initSpace(this.factor, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
                //创建world
                this.world = new p2.World();
                this.world.gravity = [0, -20];
                //set p2.world.sleepMode
                //this.world.sleepMode = p2.World.BODY_SLEEPING;
                egret.Ticker.getInstance().register(this.p2RunStep, this); //register update step of p2.wolrd  
                //dummyBody来实现约束到世界
                this.dummyBody = new p2.Body();
                this.world.addBody(this.dummyBody);
                //接触事件的监听
                this.world.on("beginContact", this.onBeginContact, this); //监听接触开始
                //this.world.on("endContact",this.onEndContact,this);//监听接触结束
            }
            //update step
            SimpleP2Scene.prototype.p2RunStep = function (dt) {
                if (dt < 10) {
                    return;
                }
                if (dt > 1000) {
                    return;
                }
                this.world.step(dt / 1000); //p2.World.step                                 
                easyP2.P2Space.updateWorldBodiesSkin(this.world); //更新p2World内所有刚体皮肤显示
            };
            /**
             * creage ground
             */
            SimpleP2Scene.prototype.createGround = function () {
                //创建plane
                var planeShape = new p2.Plane();
                var planeBody = new p2.Body();
                planeBody.type = p2.Body.STATIC;
                planeBody.addShape(planeShape);
                planeBody.displays = [];
                this.world.addBody(planeBody);
            };
            SimpleP2Scene.prototype.onBeginContact = function (event) {
                var bodyA = event.bodyA;
                var bodyB = event.bodyB;
                console.log(bodyA.id);
                console.log(bodyB.id);
            };
            SimpleP2Scene.prototype.onEndContact = function (event) {
                var bodyA = event.bodyA;
                var bodyB = event.bodyB;
            };
            return SimpleP2Scene;
        }());
        easyP2.SimpleP2Scene = SimpleP2Scene;
        __reflect(SimpleP2Scene.prototype, "codeBase.easyP2.SimpleP2Scene");
    })(easyP2 = codeBase.easyP2 || (codeBase.easyP2 = {}));
})(codeBase || (codeBase = {}));
