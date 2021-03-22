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
    /** Stores a slot's current pose. Slots organize attachments for {@link Skeleton#drawOrder} purposes and provide a place to store
     * state for an attachment. State cannot be stored in an attachment itself because attachments are stateless and may be shared
     * across multiple skeletons. */
    var Slot = (function () {
        function Slot(data, bone) {
            /** Values to deform the slot's attachment. For an unweighted mesh, the entries are local positions for each vertex. For a
             * weighted mesh, the entries are an offset for each vertex which will be added to the mesh's local vertex positions.
             *
             * See {@link VertexAttachment#computeWorldVertices()} and {@link DeformTimeline}. */
            this.deform = new Array();
            if (data == null)
                throw new Error("data cannot be null.");
            if (bone == null)
                throw new Error("bone cannot be null.");
            this.data = data;
            this.bone = bone;
            this.color = new spine.Color();
            this.darkColor = data.darkColor == null ? null : new spine.Color();
            this.setToSetupPose();
        }
        /** The skeleton this slot belongs to. */
        Slot.prototype.getSkeleton = function () {
            return this.bone.skeleton;
        };
        /** The current attachment for the slot, or null if the slot has no attachment. */
        Slot.prototype.getAttachment = function () {
            return this.attachment;
        };
        /** Sets the slot's attachment and, if the attachment changed, resets {@link #attachmentTime} and clears {@link #deform}.
         * @param attachment May be null. */
        Slot.prototype.setAttachment = function (attachment) {
            if (this.attachment == attachment)
                return;
            this.attachment = attachment;
            this.attachmentTime = this.bone.skeleton.time;
            this.deform.length = 0;
        };
        Slot.prototype.setAttachmentTime = function (time) {
            this.attachmentTime = this.bone.skeleton.time - time;
        };
        /** The time that has elapsed since the last time the attachment was set or cleared. Relies on Skeleton
         * {@link Skeleton#time}. */
        Slot.prototype.getAttachmentTime = function () {
            return this.bone.skeleton.time - this.attachmentTime;
        };
        /** Sets this slot to the setup pose. */
        Slot.prototype.setToSetupPose = function () {
            this.color.setFromColor(this.data.color);
            if (this.darkColor != null)
                this.darkColor.setFromColor(this.data.darkColor);
            if (this.data.attachmentName == null)
                this.attachment = null;
            else {
                this.attachment = null;
                this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
            }
        };
        return Slot;
    }());
    spine.Slot = Slot;
    __reflect(Slot.prototype, "spine.Slot");
})(spine || (spine = {}));
