import chokidar from 'chokidar'
import fs from 'fs-extra'
import path from 'path'
import { program } from 'commander'
import url from 'url'

//==========================================================================
//
//  Interfaces
//
//==========================================================================

const ProjectDirPath = url.fileURLToPath(new URL('..', import.meta.url))

//==========================================================================
//
//  Implementation
//
//==========================================================================

async function syncLibNodeModule() {
  // ライブラリプロジェクトをクローンしたディレクトリパス
  // ※アプリケーションプロジェクトと同レベルの階層にライブラリプロジェクトがクローンされている想定
  // 例: /Users/john/projects/js-common-lib
  const libProjectDir = path.resolve(ProjectDirPath, '../js-common-lib')

  // アプリケーションプロジェクトの`node_modules`にあるライブラリプロジェクトのディレクトリパス
  // 例: /Users/john/projects/my-app/node_modules/js-common-lib
  const libNodeModulesDir = path.resolve(ProjectDirPath, 'node_modules/js-common-lib')

  /**
   * ライブラリプロジェクトのパスを`node_modules`のパスに変換します。
   * 例: /Users/john/projects/js-common-lib/src/main.ts →
   *     /Users/john/projects/my-app/node_modules/js-common-lib/src/main.ts
   */
  const toNodeModuleFilePath = (repositoryFilePath: string) => {
    return repositoryFilePath.replace(libProjectDir, libNodeModulesDir)
  }

  /**
   * ライブラリプロジェクトのパスを相対パスに変換します。
   * 例: /Users/john/projects/js-common-lib/src/main.ts → src/main.ts
   */
  const toRelativeFilePath = (repositoryFilePath: string) => {
    return repositoryFilePath.replace(path.join(libProjectDir, '/'), '')
  }

  /**
   * 指定されたライブラリプロジェクトのファイルが`scripts`配下のファイルの場合、
   * そのファイルをアプリケーションプロジェクトの`scripts`配下に対してコピーまたは削除を行います。
   */
  const syncScripts = async (event: 'add' | 'change' | 'unlink', repositoryFilePath: string) => {
    // 指定されたファイルが`scripts`配下のものか判定
    const relativeFilePath = toRelativeFilePath(repositoryFilePath)
    const isScriptsFile = relativeFilePath.startsWith('scripts/')
    if (!isScriptsFile) return

    // コピー先ファイルパス、または削除対象ファイルパスを取得
    // 例: /Users/john/projects/my-app/scripts/base.mts
    const targetFilePath = path.join(ProjectDirPath, relativeFilePath)

    if (event === 'add' || event === 'change') {
      await fs.copy(repositoryFilePath, targetFilePath)
    } else if (event === 'unlink') {
      await fs.remove(targetFilePath)
    }
  }

  // `node_modules`のライブラリディレクトリを削除する
  fs.removeSync(libNodeModulesDir)

  // ライブラリプロジェクト内のファイル変更を監視
  const watcher = chokidar.watch(libProjectDir, {
    ignored: /\.git|\.idea|node_modules/,
    persistent: true,
  })

  watcher
    .on('add', (filePath, status) => {
      const toFilePath = toNodeModuleFilePath(filePath)
      fs.copy(filePath, toFilePath).then(() => {
        // eslint-disable-next-line no-console
        console.log('added   : ', toRelativeFilePath(filePath))
      })
      syncScripts('add', filePath)
    })
    .on('change', (filePath, status) => {
      const toFilePath = toNodeModuleFilePath(filePath)
      fs.copy(filePath, toFilePath).then(() => {
        // eslint-disable-next-line no-console
        console.log('changed : ', toRelativeFilePath(filePath))
      })
      syncScripts('change', filePath)
    })
    .on('unlink', filePath => {
      const toFilePath = toNodeModuleFilePath(filePath)
      if (!fs.pathExistsSync(toFilePath)) return
      fs.remove(toNodeModuleFilePath(filePath)).then(() => {
        // eslint-disable-next-line no-console
        console.log('removed : ', toRelativeFilePath(filePath))
      })
      syncScripts('unlink', filePath)
    })
}

//==========================================================================
//
//  Export
//
//==========================================================================

program
  .description(`Synchronize "node_modules/js-common-lib" with "js-common-lib" project directory.`)
  .action(async () => {
    await syncLibNodeModule()
  })

// eslint-disable-next-line no-undef
program.parseAsync(process.argv)
