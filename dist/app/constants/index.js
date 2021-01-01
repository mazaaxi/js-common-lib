"use strict";
//========================================================================
//
//  Constants
//
//========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
var StorageUsersConfig;
(function (StorageUsersConfig) {
    StorageUsersConfig.RootName = 'users';
})(StorageUsersConfig || (StorageUsersConfig = {}));
exports.StorageUsersConfig = StorageUsersConfig;
var StorageArticlesConfig;
(function (StorageArticlesConfig) {
    StorageArticlesConfig.RootName = 'articles';
    StorageArticlesConfig.FileName = 'index.md';
    StorageArticlesConfig.AssetsName = 'assets';
})(StorageArticlesConfig || (StorageArticlesConfig = {}));
exports.StorageArticlesConfig = StorageArticlesConfig;
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