import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { add, minus, asyncAdd } from '../../actions/counter'

import './register.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Register {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Register extends Component {
  state = {
    password: '',
    name: '',
    email: '',
    token: ''
  }

  // config = {
  //   navigationBarTitleText: '话题'
  // }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (key,value) {
    this.setState({
      [key]:value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  async register() {
    const params: any = {
      url: '/api/public/users/register',
      data: this.state,
      method: 'POST'
    }
    const res = await Taro.request(params)
    console.log(res)
  }

  async sendCode() {
    const params: any = {
      url: '/api/public/users/getcode',
      data: {email: this.state.email},
      method: 'GET'
    }
    const res = await Taro.request(params)
    console.log(res)
  }

  render () {
    return (
      <View className='index'>
        <AtInput
        name='name'
        title='用户名'
        type='text'
        placeholder='用户名'
        value={this.state.name}
        onChange={(value) => {
          this.handleChange('name',value)
        }}
      />
      <AtInput
      name='email'
      title='邮箱'
      type='text'
      placeholder='邮箱'
      value={this.state.email}
      onChange={(value) => {
        this.handleChange('email',value)
      }}
    >
      <Text className="send-code" onClick={() => {
        this.sendCode()
      }}>发送验证码</Text>
      </AtInput>
    <AtInput
    name='token'
    title='验证码'
    type='text'
    placeholder='验证码'
    value={this.state.token}
    onChange={(value) => {
      this.handleChange('token',value)
    }}
  />
  <AtInput
  name='password'
  title='密码'
  type='text'
  placeholder='密码'
  value={this.state.password}
  onChange={(value) => {
    this.handleChange('password',value)
  }}
/>
<AtButton type='primary' onClick={() => {
  this.register()
}}>注册</AtButton>
      </View>
    )
  }
}

export default Register

