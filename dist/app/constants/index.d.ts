declare const APIVersion = "0.0.1";
declare type LangCode = 'ja' | 'en';
declare const LangCodes: readonly ["ja", "en"];
declare namespace StorageUserConfig {
    const RootName = "users";
}
declare namespace StorageArticleConfig {
    const RootName = "articles";
    const AssetsName = "assets";
    const MasterSrcFileName = "master-src.md";
    const DraftSrcFileName = "draft-src.md";
}
declare namespace Entities {
    namespace Users {
        const Name = "users";
    }
    namespace StorageNodes {
        const Name = "storage-nodes";
    }
    namespace ArticleTag {
        const Name = "article-tags";
    }
}
export { APIVersion, Entities, LangCode, LangCodes, StorageArticleConfig, StorageUserConfig };
