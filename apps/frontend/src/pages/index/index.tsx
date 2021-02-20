import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtSearchBar,AtTabs, AtTabsPane, AtList, AtListItem, AtButton } from 'taro-ui'
import { View, Picker } from '@tarojs/components'


import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

class Index extends Component {

  state = {
    location: '',
    search: '',
    current: 0,
    areas: [],
    selectorChecked: '',
    list: []
  }

  componentWillUnmount () { }

  async componentDidShow () {
    // Taro.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     console.log(latitude,longitude,speed,accuracy)
    //   }
    // })
    // const loc = {
    //   lat: '31.18831',
    //   lng: '121.43676'
    // };
    // const params: any = {
    //   url: `/geocoder/v2/?location=${Object.values(loc).join(',')}&output=json&ak=WEc8RlPXzSifaq9RHxE1WW7lRKgbid6Y`,
    //   method: 'GET'
    // }
    // const res = await Taro.request(params)
    const res = JSON.parse('{"status":0,"result":{"location":{"lng":121.43675999999994,"lat":31.18830986117494},"formatted_address":"上海市徐汇区中山西路2281号","business":"徐家汇,田林,万体馆","addressComponent":{"country":"中国","country_code":0,"country_code_iso":"CHN","country_code_iso2":"CN","province":"上海市","city":"上海市","city_level":2,"district":"徐汇区","town":"","town_code":"","adcode":"310104","street":"中山西路","street_number":"2281号","direction":"附近","distance":"18"},"pois":[],"roads":[],"poiRegions":[{"direction_desc":"内","name":"徐汇晶典大厦","tag":"房地产;写字楼","uid":"38d2c46d3d0939b0b3077d62","distance":"0"}],"sematic_description":"徐汇晶典大厦内","cityCode":289}}');
    // const areas = res.result.business || res.result.addressComponent.district
    const areas = ''
    const params: any = {
      url: `/api/public/spiderdataitems`,
      data: {
        pageNo: 1,
        pageSize: 10,
        areas
      },
      method: 'GET'
    }
    const result = await Taro.request(params)
    console.log("result ...",result)
    this.setState({
      list: result.data.result.data
    })
    //
    // this.setState({
    //   location: res.business
    // });
  }

  search() {

  }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const tabList = [{ title: '租房' }, { title: '找工作' }, { title: '二手房' }]
    const range = [[],[],[],[]]
    const listitemdom = this.state.list?this.state.list.map((it:any) => (
      <AtListItem
      key={it.id}
      title={it.title}
      note={it.describe}
      extraText='详细信息'
      arrow='right'
      thumb={it.images}
      onClick={() => {
        Taro.navigateTo({ url: `/pages/detail/detail?url=${it.url}` })
      }}
    />
    )):null;
    return (
      <View className='index'>
        <AtSearchBar
        value={this.state.search}
        onChange={(value) => {
          this.setState({
            search: value
          })
        }}
      />
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View >
          <Picker mode='multiSelector' value={this.state.areas} range={range} onChange={(value) => {
            this.setState({
              selectorChecked: value
            })
          }}>
                <AtList>
                  <AtListItem
                    title='地区'
                    extraText={this.state.selectorChecked}
                  />
                </AtList>
              </Picker>
              <AtButton className="btn-margin-816" type='primary' onClick={() => {
                this.search()
              }}>查询</AtButton>
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
        <AtList>
          {listitemdom}
        </AtList>
      </View>
    )
  }
}

export default Index

