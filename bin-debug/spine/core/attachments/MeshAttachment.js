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
    /** An attachment that displays a textured mesh. A mesh has hull vertices and internal vertices within the hull. Holes are not
     * supported. Each vertex has UVs (texture coordinates) and triangles are used to map an image on to the mesh.
     *
     * See [Mesh attachments](http://esotericsoftware.com/spine-meshes) in the Spine User Guide. */
    var MeshAttachment = (function (_super) {
        __extends(MeshAttachment, _super);
        function MeshAttachment(name) {
            var _this = _super.call(this, name) || this;
            /** The color to tint the mesh. */
            _this.color = new spine.Color(1, 1, 1, 1);
            _this.tempColor = new spine.Color(0, 0, 0, 0);
            return _this;
        }
        /** Calculates {@link #uvs} using {@link #regionUVs} and the {@link #region}. Must be called after changing the region UVs or
         * region. */
        MeshAttachment.prototype.updateUVs = function () {
            var regionUVs = this.regionUVs;
            if (this.uvs == null || this.uvs.length != regionUVs.length)
                this.uvs = spine.Utils.newFloatArray(regionUVs.length);
            var uvs = this.uvs;
            var n = this.uvs.length;
            var u = this.region.u, v = this.region.v, width = 0, height = 0;
            if (this.region instanceof spine.TextureAtlasRegion) {
                var region = this.region;
                var textureWidth = region.texture.getImage().width, textureHeight = region.texture.getImage().height;
                switch (region.degrees) {
                    case 90:
                        u -= (region.originalHeight - region.offsetY - region.height) / textureWidth;
                        v -= (region.originalWidth - region.offsetX - region.width) / textureHeight;
                        width = region.originalHeight / textureWidth;
                        height = region.originalWidth / textureHeight;
                        for (var i = 0; i < n; i += 2) {
                            uvs[i] = u + regionUVs[i + 1] * width;
                            uvs[i + 1] = v + (1 - regionUVs[i]) * height;
                        }
                        return;
                    case 180:
                        u -= (region.originalWidth - region.offsetX - region.width) / textureWidth;
                        v -= region.offsetY / textureHeight;
                        width = region.originalWidth / textureWidth;
                        height = region.originalHeight / textureHeight;
                        for (var i = 0; i < n; i += 2) {
                            uvs[i] = u + (1 - regionUVs[i]) * width;
                            uvs[i + 1] = v + (1 - regionUVs[i + 1]) * height;
                        }
                        return;
                    case 270:
                        u -= region.offsetY / textureWidth;
                        v -= region.offsetX / textureHeight;
                        width = region.originalHeight / textureWidth;
                        height = region.originalWidth / textureHeight;
                        for (var i = 0; i < n; i += 2) {
                            uvs[i] = u + (1 - regionUVs[i + 1]) * width;
                            uvs[i + 1] = v + regionUVs[i] * height;
                        }
                        return;
                }
                u -= region.offsetX / textureWidth;
                v -= (region.originalHeight - region.offsetY - region.height) / textureHeight;
                width = region.originalWidth / textureWidth;
                height = region.originalHeight / textureHeight;
            }
            else if (this.region == null) {
                u = v = 0;
                width = height = 1;
            }
            else {
                width = this.region.u2 - u;
                height = this.region.v2 - v;
            }
            for (var i = 0; i < n; i += 2) {
                uvs[i] = u + regionUVs[i] * width;
                uvs[i + 1] = v + regionUVs[i + 1] * height;
            }
        };
        /** The parent mesh if this is a linked mesh, else null. A linked mesh shares the {@link #bones}, {@link #vertices},
         * {@link #regionUVs}, {@link #triangles}, {@link #hullLength}, {@link #edges}, {@link #width}, and {@link #height} with the
         * parent mesh, but may have a different {@link #name} or {@link #path} (and therefore a different texture). */
        MeshAttachment.prototype.getParentMesh = function () {
            return this.parentMesh;
        };
        /** @param parentMesh May be null. */
        MeshAttachment.prototype.setParentMesh = function (parentMesh) {
            this.parentMesh = parentMesh;
            if (parentMesh != null) {
                this.bones = parentMesh.bones;
                this.vertices = parentMesh.vertices;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
                this.regionUVs = parentMesh.regionUVs;
                this.triangles = parentMesh.triangles;
                this.hullLength = parentMesh.hullLength;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
            }
        };
        MeshAttachment.prototype.copy = function () {
            if (this.parentMesh != null)
                return this.newLinkedMesh();
            var copy = new MeshAttachment(this.name);
            copy.region = this.region;
            copy.path = this.path;
            copy.color.setFromColor(this.color);
            this.copyTo(copy);
            copy.regionUVs = new Array(this.regionUVs.length);
            spine.Utils.arrayCopy(this.regionUVs, 0, copy.regionUVs, 0, this.regionUVs.length);
            copy.uvs = new Array(this.uvs.length);
            spine.Utils.arrayCopy(this.uvs, 0, copy.uvs, 0, this.uvs.length);
            copy.triangles = new Array(this.triangles.length);
            spine.Utils.arrayCopy(this.triangles, 0, copy.triangles, 0, this.triangles.length);
            copy.hullLength = this.hullLength;
            // Nonessential.
            if (this.edges != null) {
                copy.edges = new Array(this.edges.length);
                spine.Utils.arrayCopy(this.edges, 0, copy.edges, 0, this.edges.length);
            }
            copy.width = this.width;
            copy.height = this.height;
            return copy;
        };
        /** Returns a new mesh with the {@link #parentMesh} set to this mesh's parent mesh, if any, else to this mesh. **/
        MeshAttachment.prototype.newLinkedMesh = function () {
            var copy = new MeshAttachment(this.name);
            copy.region = this.region;
            copy.path = this.path;
            copy.color.setFromColor(this.color);
            copy.deformAttachment = this.deformAttachment;
            copy.setParentMesh(this.parentMesh != null ? this.parentMesh : this);
            copy.updateUVs();
            return copy;
        };
        return MeshAttachment;
    }(spine.VertexAttachment));
    spine.MeshAttachment = MeshAttachment;
    __reflect(MeshAttachment.prototype, "spine.MeshAttachment");
})(spine || (spine = {}));
