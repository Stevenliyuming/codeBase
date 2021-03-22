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
    /** An {@link AttachmentLoader} that configures attachments using texture regions from an {@link TextureAtlas}.
     *
     * See [Loading skeleton data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the
     * Spine Runtimes Guide. */
    var AtlasAttachmentLoader = (function () {
        function AtlasAttachmentLoader(atlas) {
            this.atlas = atlas;
        }
        AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
            var region = this.atlas.findRegion(path);
            if (region == null)
                throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
            region.renderObject = region;
            var attachment = new spine.RegionAttachment(name);
            attachment.setRegion(region);
            return attachment;
        };
        AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path) {
            var region = this.atlas.findRegion(path);
            if (region == null)
                throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
            region.renderObject = region;
            var attachment = new spine.MeshAttachment(name);
            attachment.region = region;
            return attachment;
        };
        AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
            return new spine.BoundingBoxAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
            return new spine.PathAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newPointAttachment = function (skin, name) {
            return new spine.PointAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newClippingAttachment = function (skin, name) {
            return new spine.ClippingAttachment(name);
        };
        return AtlasAttachmentLoader;
    }());
    spine.AtlasAttachmentLoader = AtlasAttachmentLoader;
    __reflect(AtlasAttachmentLoader.prototype, "spine.AtlasAttachmentLoader", ["spine.AttachmentLoader"]);
})(spine || (spine = {}));
