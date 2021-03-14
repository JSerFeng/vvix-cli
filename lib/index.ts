import { program } from 'commander'
import path from 'path'
import fs from 'fs'


program
  .command('create <proName>')
  .action((projectName: string) => {
    init(projectName)
  })


const init = async (projectName: string) => {
  const tplDir = path.resolve(__dirname, './tpl')
  const projectDir = path.resolve(process.cwd(), projectName)
  console.info("creating the app into " + projectDir)
  await exists(tplDir, projectDir, copy)
  console.info(`cd ${projectName}\nyarn&npm install`)
}

var stat = fs.stat;

var copy = async function (src: string, dst: string) {
  //读取目录
  return new Promise((resolve, reject) => {
    fs.readdir(src, function (err, paths) {
      if (err) {
        reject(err)
        throw err;
      }
      paths.forEach(function (path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        var readable;
        var writable;
        stat(_src, async function (err: any, st) {
          if (err) {
            reject(err)
            throw err;
          }

          if (st.isFile()) {
            readable = fs.createReadStream(_src);//创建读取流
            writable = fs.createWriteStream(_dst);//创建写入流
            readable.pipe(writable);
            writable.on('finish', resolve)
          } else if (st.isDirectory()) {
            await exists(_src, _dst, copy);
            resolve(undefined)
          }
        });
      });
    });
  })
}

var exists = function (src: string, dst: string, callback: Function) {
  return new Promise((resolve) => {
    //测试某个路径下文件是否存在
    if (fs.existsSync(src)) {
      callback(src, dst);
      fs.mkdir(dst, async function () {//创建目录
        await callback(src, dst)
        resolve(undefined)
      })
    }
  })
}

program.parse(process.argv)