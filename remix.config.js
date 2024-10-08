/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: [
    /^~/, // プロジェクト内のモジュールをバンドルに含める
  ],
  // 他の設定...
};
