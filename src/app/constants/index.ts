//========================================================================
//
//  Constants
//
//========================================================================

namespace StorageUserConfig {
  export const RootName = 'users'
}

namespace StorageArticleConfig {
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

export { StorageUserConfig, StorageArticleConfig, Entities }
