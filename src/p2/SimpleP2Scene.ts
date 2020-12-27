module codeBase{
    export module easyP2 {
        export class SimpleP2Scene {
            //物理世界
            public world: p2.World;

            //物理世界转换系数
            public factor: number = 50;

            //stage ref
            public stage: egret.Stage;

            //disp container
            public dispCtn: egret.DisplayObjectContainer;

            //dummyBody来实现约束到世界
            public dummyBody: p2.Body;


            public constructor(pStage: egret.Stage, pDispCtn: egret.DisplayObjectContainer) {
                this.stage = pStage;//ref of stage
                this.dispCtn = pDispCtn;//ref of disp container

                //初始化P2Space
                easyP2.P2Space.initSpace(this.factor, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));

                //创建world
                this.world = new p2.World();
                this.world.gravity = [0, -20];
                //set p2.world.sleepMode
                //this.world.sleepMode = p2.World.BODY_SLEEPING;

                egret.Ticker.getInstance().register(this.p2RunStep, this);//register update step of p2.wolrd  

                //dummyBody来实现约束到世界
                this.dummyBody = new p2.Body();
                this.world.addBody(this.dummyBody);

                //接触事件的监听
                this.world.on("beginContact", this.onBeginContact, this);//监听接触开始
                //this.world.on("endContact",this.onEndContact,this);//监听接触结束
            }

            //update step
            protected p2RunStep(dt) {
                if (dt < 10) {
                    return;
                }
                if (dt > 1000) {
                    return;
                }

                this.world.step(dt / 1000);//p2.World.step                                 
                easyP2.P2Space.updateWorldBodiesSkin(this.world);//更新p2World内所有刚体皮肤显示
            }

            /**
             * creage ground
             */
            public createGround(): void {
                //创建plane
                var planeShape: p2.Plane = new p2.Plane();
                var planeBody: p2.Body = new p2.Body();
                planeBody.type = p2.Body.STATIC;
                planeBody.addShape(planeShape);
                planeBody.displays = [];
                this.world.addBody(planeBody);
            }

            protected onBeginContact(event): void {
                var bodyA: p2.Body = event.bodyA;
                var bodyB: p2.Body = event.bodyB;
                console.log(bodyA.id);
                console.log(bodyB.id);
            }
            
            protected onEndContact(event): void {
                var bodyA: p2.Body = event.bodyA;
                var bodyB: p2.Body = event.bodyB;
            }
        }
    }
}
