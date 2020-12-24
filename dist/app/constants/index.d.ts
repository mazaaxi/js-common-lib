declare namespace StorageUsersConfig {
    const RootName = "users";
}
declare namespace StorageArticlesConfig {
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
export { StorageUsersConfig, StorageArticlesConfig, Entities };
