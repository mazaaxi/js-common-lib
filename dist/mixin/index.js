"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixinBuilder = exports.mix = void 0;
function mix(superclass) {
    return new MixinBuilder(superclass);
}
exports.mix = mix;
class MixinBuilder {
    constructor(superclass) {
        this.superclass = superclass;
    }
    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}
exports.MixinBuilder = MixinBuilder;
//# sourceMappingURL=index.js.map