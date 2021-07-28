"use strict";
//========================================================================
//
//  Constants
//
//========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConfig = exports.LangCodes = exports.Entities = exports.APIVersion = void 0;
const APIVersion = '0.0.1';
exports.APIVersion = APIVersion;
const LangCodes = ['ja', 'en'];
exports.LangCodes = LangCodes;
var StorageConfig;
(function (StorageConfig) {
    let Users;
    (function (Users) {
        Users.Name = 'users';
        let System;
        (function (System) {
            System.Name = 'system';
            let Public;
            (function (Public) {
                Public.Name = 'public';
            })(Public = System.Public || (System.Public = {}));
        })(System = Users.System || (Users.System = {}));
        let Articles;
        (function (Articles) {
            Articles.Name = 'articles';
            let Assets;
            (function (Assets) {
                Assets.Name = 'assets';
            })(Assets = Articles.Assets || (Articles.Assets = {}));
        })(Articles = Users.Articles || (Users.Articles = {}));
    })(Users = StorageConfig.Users || (StorageConfig.Users = {}));
})(StorageConfig || (StorageConfig = {}));
exports.StorageConfig = StorageConfig;
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
    let ArticleTag;
    (function (ArticleTag) {
        ArticleTag.Name = 'article-tags';
    })(ArticleTag = Entities.ArticleTag || (Entities.ArticleTag = {}));
})(Entities || (Entities = {}));
exports.Entities = Entities;
//# sourceMappingURL=index.js.map