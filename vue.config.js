const fs = require('fs');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';
const config = isDev ? require('./config/dev') : require('./config/production');

// 复制 静态文件到 dist
const resourceStaticPath = path.join(__dirname, config.staticPath);
const copyFatherPath = path.join(config.contextPath, config.static);
const copyPath = copyFatherPath;
if (!fs.existsSync(copyFatherPath)) {
  fs.mkdirSync(copyFatherPath);
}

// console.log(config);

function copyFolder(from, to) {
  // 复制文件夹到指定目录
  let files = [];
  if (fs.existsSync(to)) {
    // 文件是否存在 如果不存在则创建
    files = fs.readdirSync(from);
    files.forEach((file) => {
      const targetPath = path.join(from, file);
      const toPath = path.join(to, file);
      if (fs.statSync(targetPath).isDirectory()) {
        // 复制文件夹
        copyFolder(targetPath, toPath);
      } else {
        // 拷贝文件
        fs.copyFileSync(targetPath, toPath);
      }
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }
}

function deleteFolder(p) {
  let files = [];
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isDirectory()) {
      files = fs.readdirSync(p);
      files.forEach((file) => {
        const curPath = path.join(p, file);
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(p);
    } else {
      fs.unlinkSync(p);
    }
  }
}

// deleteFolder(copyPath);
// copyFolder(resourceStaticPath, copyPath);
// console.log(resourceStaticPath, '哈哈哈哈哈', copyPath)

module.exports = {
  devServer: {
    port: config.port,
    open: true,
  },
  outputDir: config.outputDir,
  indexPath: config.indexPath,
  assetsDir: './static',

  chainWebpack: (conf) => {
    conf.plugin('html').tap((args) => {
      args[0].staticPath = config.assetsDir;
      return args;
    });
  },

  // pluginOptions: {
  //   title: '先行者',
  // },

  configureWebpack: (config) => {
    // config.plugins.forEach((val) => {
    //   if (val instanceof HtmlWebPackPlugin) {
    //     val.options.title = '先行者';
    //   }
    // });
    const HtmlWebPackPluginOptions = config.plugins.find(item => (item instanceof HtmlWebPackPlugin));
    HtmlWebPackPluginOptions.options.title = '先行者';
  },
};
