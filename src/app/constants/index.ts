//========================================================================
//
//  Constants
//
//========================================================================

namespace StorageAppConfig {
  export const RootName = 'app'
}

namespace StorageUsersConfig {
  export const RootName = 'users'
}

namespace StorageArticlesConfig {
  export const RootName = 'articles'
  export const FileName = 'index.md'
  export const AssetsName = 'assets'
}

namespace Entities {
  export namespace Users {
    export const Name = 'users'
  }
  export namespace StorageNodes {
    export const Name = 'storage-nodes'
  }
}

//========================================================================
//
//  Exports
//
//========================================================================

export { StorageAppConfig, StorageUsersConfig, StorageArticlesConfig, Entities }
