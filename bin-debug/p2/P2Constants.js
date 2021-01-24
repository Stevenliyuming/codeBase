var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var easyP2;
    (function (easyP2) {
        var P2Constants = (function () {
            function P2Constants() {
            }
            //刚体运动状况的几大类型
            P2Constants.bodyType_static = 'static'; //静态刚体类型适用于场景上的固定物体
            P2Constants.bodyType_dynamic = 'dynamic'; //动态刚体能够受到力的作用
            P2Constants.bodyType_kinamic = 'kinamic'; //不受其他物体影响，但是仍然可以与其它物体发生物理互动
            P2Constants.bodyConnType_ranumber = 'bodyConnType_ranumber'; //刚体连接类型为 约束
            P2Constants.bodyConnType_spring = 'bodyConnType_spring'; //刚体连接类型为 弹性
            //刚体根据用途的几大类型,不是Body.type
            P2Constants.rigidBodyType_body = 'body';
            P2Constants.rigidBodyType_concave = 'concave';
            P2Constants.rigidBodyType_forceField = 'forceField';
            P2Constants.rigidBodyType_heightField = 'heightField';
            P2Constants.rigidBodyType_waterField = 'waterField';
            //形状的几大类型
            P2Constants.shapeType_box = 'shapeType_box';
            P2Constants.shapeType_circle = 'shapeType_circle';
            P2Constants.shapeType_capsule = 'shapeType_capsule';
            //约束几大类型
            P2Constants.constraintType_distance = 'distance';
            P2Constants.constraintType_gear = 'gear';
            P2Constants.constraintType_lock = 'lock';
            P2Constants.constraintType_prismatic = 'prismatic';
            P2Constants.constraintType_revolute = 'revolute';
            //弹性几大类型
            P2Constants.springType_liner = 'liner';
            P2Constants.springType_rotational = 'rotational';
            return P2Constants;
        }());
        easyP2.P2Constants = P2Constants;
        __reflect(P2Constants.prototype, "codeBase.easyP2.P2Constants");
    })(easyP2 = codeBase.easyP2 || (codeBase.easyP2 = {}));
})(codeBase || (codeBase = {}));
//# sourceMappingURL=P2Constants.js.map