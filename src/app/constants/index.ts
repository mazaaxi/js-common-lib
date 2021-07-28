//========================================================================
//
//  Constants
//
//========================================================================

const APIVersion = '0.0.1'

type LangCode = 'ja' | 'en'

const LangCodes = ['ja', 'en'] as const

namespace StorageConfig {
  export namespace Users {
    export const Name = 'users'
    export namespace System {
      export const Name = 'system'
      export namespace Public {
        export const Name = 'public'
      }
    }
    export namespace Articles {
      export const Name = 'articles'
      export namespace Assets {
        export const Name = 'assets'
      }
    }
  }
}

namespace Entities {
  export namespace Users {
    export const Name = 'users'
  }
  export namespace StorageNodes {
    export const Name = 'storage-nodes'
  }
  export namespace ArticleTag {
    export const Name = 'article-tags'
  }
}

//========================================================================
//
//  Exports
//
//========================================================================

export { APIVersion, Entities, LangCode, LangCodes, StorageConfig }
