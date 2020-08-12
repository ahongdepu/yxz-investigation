
// 自定义字段
const selfConfig = {
  contextPath: process.cwd(),
  static: './dist/public/static', // 静态资源路径存储路径
  staticPath: './src/resource/static', // 静态资源 来源Path
}

// vue-cli定义字段
module.exports = {
  port: 8999,
  outputDir: 'dist/public', // 输出的文件夹名
  indexPath: 'index.html', // index.html 的输出路径
  assetsDir: selfConfig.staticPath,

  ...selfConfig,
}