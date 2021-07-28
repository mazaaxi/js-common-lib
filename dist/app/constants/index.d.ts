declare const APIVersion = "0.0.1";
declare type LangCode = 'ja' | 'en';
declare const LangCodes: readonly ["ja", "en"];
declare namespace StorageConfig {
    namespace Users {
        const Name = "users";
        namespace System {
            const Name = "system";
            namespace Public {
                const Name = "public";
            }
        }
        namespace Articles {
            const Name = "articles";
            namespace Assets {
                const Name = "assets";
            }
        }
    }
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
export { APIVersion, Entities, LangCode, LangCodes, StorageConfig };
