import { Component, PropsWithChildren, ReactNode } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import React from 'react'

export default class Index extends Component<PropsWithChildren<ReactNode>> {
  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
