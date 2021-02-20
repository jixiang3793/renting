import React, { Component } from 'react'
import { WebView } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro';

class Detail extends Component {

  $instance = getCurrentInstance()

  componentDidMount () {
    // 获取路由参数
    console.log(this.$instance.router)
  }
  render () {
    console.log("render this ...",this);
    return (
      <WebView src={this.$instance.router?.params.url || ''} />
    )
  }
}
export default Detail
