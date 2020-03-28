const proxy = [
  {
    context: '/iManageApi/',
    target: 'https://worksite.glpi.com.br/api/',
    secure: false,
    logLevel: "debug",
    changeOrign: true,
    pathRewrite: {'^/iManageApi/' : ''}
  }
];

module.exports = proxy;