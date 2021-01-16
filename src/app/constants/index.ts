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
  export const AssetsName = 'assets'
  export const SrcMasterFileName = 'index.md'
  export const SrcDraftFileName = 'index.draft.md'
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
