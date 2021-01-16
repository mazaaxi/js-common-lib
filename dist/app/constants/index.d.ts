declare namespace StorageUserConfig {
    const RootName = "users";
}
declare namespace StorageArticleConfig {
    const RootName = "articles";
    const AssetsName = "assets";
    const SrcMasterFileName = "index.md";
    const SrcDraftFileName = "index.draft.md";
}
declare namespace Entities {
    namespace Users {
        const Name = "users";
    }
    namespace StorageNodes {
        const Name = "storage-nodes";
    }
}
export { StorageUserConfig, StorageArticleConfig, Entities };
