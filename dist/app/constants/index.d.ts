declare namespace StorageUserConfig {
    const RootName = "users";
}
declare namespace StorageArticleConfig {
    const RootName = "articles";
    const FileName = "index.md";
    const AssetsName = "assets";
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
