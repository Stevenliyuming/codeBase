/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated January 1, 2020. Replaces all prior versions.
 *
 * Copyright (c) 2013-2020, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software
 * or otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THE SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var spine;
(function (spine) {
    /** Stores the setup pose for a {@link TransformConstraint}.
     *
     * See [Transform constraints](http://esotericsoftware.com/spine-transform-constraints) in the Spine User Guide. */
    var TransformConstraintData = (function (_super) {
        __extends(TransformConstraintData, _super);
        function TransformConstraintData(name) {
            var _this = _super.call(this, name, 0, false) || this;
            /** The bones that will be modified by this transform constraint. */
            _this.bones = new Array();
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained rotations. */
            _this.rotateMix = 0;
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained translations. */
            _this.translateMix = 0;
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained scales. */
            _this.scaleMix = 0;
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained shears. */
            _this.shearMix = 0;
            /** An offset added to the constrained bone rotation. */
            _this.offsetRotation = 0;
            /** An offset added to the constrained bone X translation. */
            _this.offsetX = 0;
            /** An offset added to the constrained bone Y translation. */
            _this.offsetY = 0;
            /** An offset added to the constrained bone scaleX. */
            _this.offsetScaleX = 0;
            /** An offset added to the constrained bone scaleY. */
            _this.offsetScaleY = 0;
            /** An offset added to the constrained bone shearY. */
            _this.offsetShearY = 0;
            _this.relative = false;
            _this.local = false;
            return _this;
        }
        return TransformConstraintData;
    }(spine.ConstraintData));
    spine.TransformConstraintData = TransformConstraintData;
    __reflect(TransformConstraintData.prototype, "spine.TransformConstraintData");
})(spine || (spine = {}));
