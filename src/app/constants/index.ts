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
  export const MasterSrcFileName = 'master.src.md'
  export const DraftSrcFileName = 'draft.src.md'
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
