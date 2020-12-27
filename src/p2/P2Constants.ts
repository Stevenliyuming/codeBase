module codeBase{
    export module easyP2 {
        export class P2Constants {
            //刚体运动状况的几大类型
            public static bodyType_static: string = 'static';//静态刚体类型适用于场景上的固定物体
            public static bodyType_dynamic: string = 'dynamic';//动态刚体能够受到力的作用
            public static bodyType_kinamic: string = 'kinamic';//不受其他物体影响，但是仍然可以与其它物体发生物理互动

            public static bodyConnType_ranumber: string = 'bodyConnType_ranumber';//刚体连接类型为 约束
            public static bodyConnType_spring: string = 'bodyConnType_spring';//刚体连接类型为 弹性


            //刚体根据用途的几大类型,不是Body.type
            public static rigidBodyType_body: string = 'body';
            public static rigidBodyType_concave: string = 'concave';
            public static rigidBodyType_forceField: string = 'forceField';
            public static rigidBodyType_heightField: string = 'heightField';
            public static rigidBodyType_waterField: string = 'waterField';

            //形状的几大类型
            public static shapeType_box: string = 'shapeType_box';
            public static shapeType_circle: string = 'shapeType_circle';
            public static shapeType_capsule: string = 'shapeType_capsule';

            //约束几大类型
            public static constraintType_distance: string = 'distance';
            public static constraintType_gear: string = 'gear';
            public static constraintType_lock: string = 'lock';
            public static constraintType_prismatic: string = 'prismatic';
            public static constraintType_revolute: string = 'revolute';

            //弹性几大类型
            public static springType_liner: string = 'liner';
            public static springType_rotational: string = 'rotational';
        }
    }
}