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
var spine;
(function (spine) {
    /** Stores the setup pose and all of the stateless data for a skeleton.
     *
     * See [Data objects](http://esotericsoftware.com/spine-runtime-architecture#Data-objects) in the Spine Runtimes
     * Guide. */
    var SkeletonData = (function () {
        function SkeletonData() {
            /** The skeleton's bones, sorted parent first. The root bone is always the first bone. */
            this.bones = new Array(); // Ordered parents first.
            /** The skeleton's slots. */
            this.slots = new Array(); // Setup pose draw order.
            this.skins = new Array();
            /** The skeleton's events. */
            this.events = new Array();
            /** The skeleton's animations. */
            this.animations = new Array();
            /** The skeleton's IK constraints. */
            this.ikConstraints = new Array();
            /** The skeleton's transform constraints. */
            this.transformConstraints = new Array();
            /** The skeleton's path constraints. */
            this.pathConstraints = new Array();
            // Nonessential
            /** The dopesheet FPS in Spine. Available only when nonessential data was exported. */
            this.fps = 0;
        }
        /** Finds a bone by comparing each bone's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findBone = function (boneName) {
            if (boneName == null)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                if (bone.name == boneName)
                    return bone;
            }
            return null;
        };
        SkeletonData.prototype.findBoneIndex = function (boneName) {
            if (boneName == null)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].name == boneName)
                    return i;
            return -1;
        };
        /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findSlot = function (slotName) {
            if (slotName == null)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                if (slot.name == slotName)
                    return slot;
            }
            return null;
        };
        SkeletonData.prototype.findSlotIndex = function (slotName) {
            if (slotName == null)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].name == slotName)
                    return i;
            return -1;
        };
        /** Finds a skin by comparing each skin's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findSkin = function (skinName) {
            if (skinName == null)
                throw new Error("skinName cannot be null.");
            var skins = this.skins;
            for (var i = 0, n = skins.length; i < n; i++) {
                var skin = skins[i];
                if (skin.name == skinName)
                    return skin;
            }
            return null;
        };
        /** Finds an event by comparing each events's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findEvent = function (eventDataName) {
            if (eventDataName == null)
                throw new Error("eventDataName cannot be null.");
            var events = this.events;
            for (var i = 0, n = events.length; i < n; i++) {
                var event_1 = events[i];
                if (event_1.name == eventDataName)
                    return event_1;
            }
            return null;
        };
        /** Finds an animation by comparing each animation's name. It is more efficient to cache the results of this method than to
         * call it multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findAnimation = function (animationName) {
            if (animationName == null)
                throw new Error("animationName cannot be null.");
            var animations = this.animations;
            for (var i = 0, n = animations.length; i < n; i++) {
                var animation = animations[i];
                if (animation.name == animationName)
                    return animation;
            }
            return null;
        };
        /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
         * than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findIkConstraint = function (constraintName) {
            if (constraintName == null)
                throw new Error("constraintName cannot be null.");
            var ikConstraints = this.ikConstraints;
            for (var i = 0, n = ikConstraints.length; i < n; i++) {
                var constraint = ikConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
         * this method than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findTransformConstraint = function (constraintName) {
            if (constraintName == null)
                throw new Error("constraintName cannot be null.");
            var transformConstraints = this.transformConstraints;
            for (var i = 0, n = transformConstraints.length; i < n; i++) {
                var constraint = transformConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
         * than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findPathConstraint = function (constraintName) {
            if (constraintName == null)
                throw new Error("constraintName cannot be null.");
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++) {
                var constraint = pathConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
            if (pathConstraintName == null)
                throw new Error("pathConstraintName cannot be null.");
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++)
                if (pathConstraints[i].name == pathConstraintName)
                    return i;
            return -1;
        };
        return SkeletonData;
    }());
    spine.SkeletonData = SkeletonData;
    __reflect(SkeletonData.prototype, "spine.SkeletonData");
})(spine || (spine = {}));
