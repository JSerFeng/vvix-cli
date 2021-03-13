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

  exists(tplDir, projectDir, copy)
}

var stat = fs.stat;

var copy = function (src: string, dst: string) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err: any, st) {
        if (err) {
          throw err;
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src);//创建读取流
          writable = fs.createWriteStream(_dst);//创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy);
        }
      });
    });
  });
}

var exists = function (src: string, dst: string, callback: Function) {
  //测试某个路径下文件是否存在
  if (fs.existsSync(src)) {
    callback(src, dst);
    fs.mkdir(dst, function () {//创建目录
      callback(src, dst)
    })
  }
}

program.parse(process.argv)