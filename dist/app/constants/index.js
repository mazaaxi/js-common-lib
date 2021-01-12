"use strict";
//========================================================================
//
//  Constants
//
//========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
var StorageUserConfig;
(function (StorageUserConfig) {
    StorageUserConfig.RootName = 'users';
})(StorageUserConfig || (StorageUserConfig = {}));
exports.StorageUserConfig = StorageUserConfig;
var StorageArticleConfig;
(function (StorageArticleConfig) {
    StorageArticleConfig.RootName = 'articles';
    StorageArticleConfig.FileName = 'index.md';
    StorageArticleConfig.AssetsName = 'assets';
})(StorageArticleConfig || (StorageArticleConfig = {}));
exports.StorageArticleConfig = StorageArticleConfig;
var Entities;
(function (Entities) {
    let Users;
    (function (Users) {
        Users.Name = 'users';
    })(Users = Entities.Users || (Entities.Users = {}));
    let StorageNodes;
    (function (StorageNodes) {
        StorageNodes.Name = 'storage-nodes';
    })(StorageNodes = Entities.StorageNodes || (Entities.StorageNodes = {}));
})(Entities || (Entities = {}));
exports.Entities = Entities;
//# sourceMappingURL=index.js.map