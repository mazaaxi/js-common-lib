declare namespace StorageUserConfig {
    const RootName = "users";
}
declare namespace StorageArticleConfig {
    const RootName = "articles";
    const AssetsName = "assets";
    const IndexFileName = "index.md";
    const DraftFileName = "index.draft.md";
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
