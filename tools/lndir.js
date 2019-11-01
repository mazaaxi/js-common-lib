#!/usr/bin/env node

const chokidar = require('chokidar')
const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')

function removeEndsSlash(path) {
  path = path.replace(/\/$/, '')
  return path
}

/**
 * `srcDir`ベースのパスを`outDir`ベースへ変換します。
 * 例: xxx/src/docs/memo.txt → yyy/sources/docs/memo.txt
 * @param srcDir 例: xxx/src
 * @param outDir 例: yyy/sources
 * @param srcFilePath xxx/src/docs/memo.txt
 */
function toOutFilePath(srcDir, outDir, srcFilePath) {
  const srcReg = new RegExp(`/?(${srcDir})/`)
  return srcFilePath.replace(srcReg, (match, $1, offset) => {
    return match.replace($1, outDir)
  })
}

/**
 * `srcDir`のディレクトリ構造を`outDir`に作成し、
 * `srcDir`配下にある全てのファイルのハードまたはシンボリックリンクを`outDir`へ作成します。
 * @param srcDir
 * @param outDir
 * @param watch
 * @param symbolic
 */
function setup(srcDir, outDir, watch, symbolic) {
  srcDir = removeEndsSlash(path.resolve(process.cwd(), srcDir))
  outDir = removeEndsSlash(path.resolve(process.cwd(), outDir))
  console.log(`srcDir: ${srcDir}\noutDir: ${outDir}`)

  if (!watch) {
    // "outDir"を一旦削除
    fs.removeSync(outDir)
    // "srcDir"配下の全ファイル一覧を取得
    const srcFilePaths = glob.sync(`${srcDir}/**/*`, { nodir: true })
    for (const srcFilePath of srcFilePaths) {
      // "srcDir"ベースのパスを"outDir"ベースへ置き換え
      const outFilePath = toOutFilePath(srcDir, outDir, srcFilePath)
      // "srcDir"配下にあるファイルのシンボリックリンクを"outDir"へ作成
      if (symbolic) {
        fs.ensureSymlinkSync(srcFilePath, outFilePath)
      } else {
        fs.ensureLink(srcFilePath, outFilePath)
      }
    }
  } else {
    chokidar
      .watch(srcDir, { persistent: true })
      .on('add', srcFilePath => {
        // console.log(`add: ${srcFilePath}`)
        const outFilePath = toOutFilePath(srcDir, outDir, srcFilePath)
        if (symbolic) {
          fs.ensureSymlinkSync(srcFilePath, outFilePath)
        } else {
          fs.ensureLink(srcFilePath, outFilePath)
        }
      })
      .on('unlink', srcFilePath => {
        // console.log(`unlink: ${srcFilePath}`)
        const outFilePath = toOutFilePath(srcDir, outDir, srcFilePath)
        fs.removeSync(outFilePath)
      })
  }
}

const argv = require('yargs')
  .usage('Usage: $0 [srcDir] [outDir]')
  .demandCommand(2)
  .options({
    watch: {
      description: 'watch for changes',
      boolean: true,
      alias: 'w',
    },
    symbolic: {
      description: 'default is hard link, or symbolic links if the -s (--symbolic) option is specified',
      boolean: true,
      alias: 's',
      default: false,
    },
  }).argv

const srcDir = argv._[0]
const outDir = argv._[1]
const watch = argv.watch
const symbolic = argv.symbolic

setup(srcDir, outDir, watch, symbolic)
