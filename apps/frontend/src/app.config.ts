export default {
  pages: [
    'pages/index/index',
    'pages/tickets/tickets',
    'pages/message/message',
    'pages/login/login',
    'pages/register/register',
    'pages/detail/detail',
    'pages/user/user'
  ],
  tabBar: {
    list: [{
      // 'iconPath': 'resource/latest.png',
      // 'selectedIconPath': 'resource/lastest_on.png',
      pagePath: 'pages/index/index',
      text: '首页'
    }, {
      // 'iconPath': 'resource/hotest.png',
      // 'selectedIconPath': 'resource/hotest_on.png',
      pagePath: 'pages/tickets/tickets',
      text: '监控'
    }, {
      // 'iconPath': 'resource/node.png',
      // 'selectedIconPath': 'resource/node_on.png',
      pagePath: 'pages/message/message',
      text: '消息'
    }, {
      // 'iconPath': 'resource/node.png',
      // 'selectedIconPath': 'resource/node_on.png',
      pagePath: 'pages/user/user',
      text: '我的'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
