/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-09 13:42:01
 * @Last Modified by: qiuz
 */

import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { Button, Textarea, View } from "@tarojs/components";
import { Configuration, OpenAIApi } from "openai";
import {
  KeyboardAwareScrollView,
  SafeAreaView,
  StatusBar
} from "@components";

import { setGlobalData, getStorageData } from "@utils";
import "./index.scss";
import ChatDialog, { Message } from "./chat-dailog";

export default class HouseLoanCompute extends Component<any, any> {
  loading: any;
  scroll: any;
  computeResult: any;
  isFirstChange: boolean = true;
  sendCMPRef: any;//chat list component ref
  LatestMessgePosition = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      msgList: [],//message list
      inputMsg: "",
      latest_top: 0,
      option: {
        username: 'JIkes',
        api_key: '',
        organization: 'org-Fm2hzsEGfaQ2TFTD9M7lywLs'
      },
      // 参数
      // eslint-disable-next-line react/no-unused-state
      params: {},
      // 安卓上 手动输入时 隐藏计算按钮
      btnOpacity: 1,
      // 安卓状态栏
      backgroundColor: "#fff"
    };
  }

  componentDidMount() {
    this.getData();
  }

  async componentDidShow() {
    // 计算聊天框高度，用于滚动到底部
    setTimeout(() => {
      this.sendCMPRef.$ref.current.measure((x, y, width, height, pageX, pageY) => {
        this.LatestMessgePosition = pageY;
        // console.log(`componentDidMount 聊天框位置信息: x=${x}, y=${y},width=${width},height=${height},pagex=${pageX},pageY=${pageY}`);
        this.scroll.scrollTo(
          {
            x: 0,
            y: pageY,
            animated: true
          }
        )
      })
    }, 100);

    // let api_key = await getStorageData("USER_API_TOKEN");
    // if (!api_key || api_key == '') {
    //   api_key = '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'
    // }

    // this.setState({ option: { api_key } });
  }


  /**
   * @description 请求配置
   */
  getData = async () => {
    let api_key = await getStorageData("USER_API_TOKEN");
    if (!api_key || api_key == '') {
      api_key = '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'
    }
    let msgList = await getStorageData("MESSAGE_HISTORY")
    if (msgList.length < 1) {
      msgList = [
        {
          user: "JIkes",
          text: "消息内容展示不出来，只有一个小条"
        },
        {
          user: "Robot",
          text: "msage2"
        }
        , {
          user: "JIkes",
          text: "ide报错 view 没有stytle"
        },
        {
          user: "Robot",
          text: `使用该组件时，您需要传递以下属性：
          - message: 此属性指定要在对话框中显示的消息文本
          - isUser: 此属性指定消息是来自用户（true）还是来自机器人（false）
          通过属性控制，聊天对话框将以不同的背景颜色和对齐方式呈现，这样您就可以轻松地在您的React Native应用程序中创建可定制的聊天UI了。`
        }, {
          user: "Robot",
          text: `使用该组件时，您需要传递以下属性：
          - message: 此属性指定要在对话框中显示的消息文本
          - isUser: 此属性指定消息是来自用户（true）还是来自机器人（false）
          通过属性控制，聊天对话框将以不同的背景颜色和对齐方式呈现，这样您就可以轻松地在您的React Native应用程序中创建可定制的聊天UI了。`
        },
        {
          user: "Robot",
          text: `使用该组件时，您需要传递以下属性：
          - message: 此属性指定要在对话框中显示的消息文本
          - isUser: 这样您就可以轻松地在您的React Native应用程序中创建可定制的聊天UI了。`
        },
        {
          user: "JIkes",
          text: "metrics api检测出现故障>=3次"
        },
        {
          user: "JIkes",
          text: "metrics api检测出现故障>=3次"
        },
        {
          user: "JIkes",
          text: "metrics api检测出现故障>=3次"
        },
        {
          user: "JIkes",
          text: "metrics api检测出现故障>=3次"
        },
        {
          user: "JIkes",
          text: "metrics api检测出现故障>=3次"
        },
      ]
    }

    this.setState({ option: { api_key }, msgList });
  };



  /**
   * input 值改变回调
   * @param data 配置项
   * @param value 输入的值
   * @param _index 当前配置项的索引
   */
  onInputChange = (event): void => {
    const { value } = event.detail;
    let newMsg = value;
    // if (value.length % 16 === 0 && value !== '') {
    //   console.log('input content> 16', value);
    //   newMsg += '\n';
    // }
    this.setState({
      inputMsg: newMsg
    },
    );
  };
  /**
   * 页面跳转
   * @param path 跳转路径
   */
  goPage = (path: string, data: object = {}) => () => {
    setGlobalData("COMPUTE_RESULT", data);
    Taro.navigateTo({
      url: `/pages/calculator/${path}/index`
    });
  };

  /**
   * 监听键盘出现事件
   * @param frames 键盘对象
   */
  onKeyboardDidShow = (frames: Record<string, any>) => {
    this.scroll.scrollToEnd();
  };

  /**
   * 监听键盘收起事件
   * @param frames 键盘对象
   */
  // onKeyboardDidHide = (_frames: Record<string, any>) => {

  // };


  // 在这里进行输入内容的埋点+校验
  checkParams = () => {
    const { inputMsg } = this.state;
    if (inputMsg.length < 1) {
      Taro.showToast({
        title: `发送内容不能为空`,
        icon: "none"
      });
      return false;
    }
    return true;
  };
  addMessageToShow = async (message: Message) => {
    const { msgList } = this.state
    msgList.push(message);
    // const msgHistorylist: [] = (await getStorageData("MESSAGE_HISTORY")) || [];
    // add message to cache 
    await Taro.setStorage({
      key: "MESSAGE_HISTORY",
      data: msgList
    });
    //update ui
    this.setState({
      inputMsg: "",//clear input
      msgList
    });


  }
  submit = async () => {
    const { option, inputMsg, } = this.state;
    const { username, api_key, organization } = option;

    if (this.loading) return;
    if (!this.checkParams()) return;
    Taro.showLoading({
      title: "发送中..."
    });

    //1 input message add to show list
    this.addMessageToShow({ user: username, text: inputMsg })

    //2 request open api
    const configuration = new Configuration({
      organization: organization,
      apiKey: api_key,
    });
    const openai = new OpenAIApi(configuration);
    // const response = await openai.listEngines();
    // Set up the request parameters
    const requestParams = {
      model: 'text-davinci-002',
      prompt: inputMsg,
      maxTokens: 2048,
      temperature: 0.5,
    };
    // Send the request to the API
    openai.createCompletion(requestParams).then(async response => {
      if (response.status != 200) {
        Taro.showToast({ title: "get api failed: " + response.data })
        return
      }
      const text = response.data.choices[0].text
      console.log(text);
      try {
        const backgroundColor = "#12B983";
        this.setState({
          backgroundColor
        });
        Taro.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor
        });
        IS_RN
          ? this.scroll.scrollTo({ x: 0, animation: true })
          : Taro.pageScrollTo({
            scrollTop: 0,
            duration: 300
          });
        this.addMessageToShow({ user: 'robot', text })
      } catch (e) {
        // console.log(e);
      }
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        Taro.hideLoading();
      }, 500);
      this.loading = false;
    });
    //滑动到底部
    this.sendCMPRef.$ref.current.measure((x, y, width, height, pageX, pageY) => {
      //todo
      console.log(`聊天框位置信息: x=${x}, y=${y},width=${width},height=${height},pagex=${pageX},pageY=${pageY}`);
      this.scroll.scrollTo(
        {
          x: 0,
          y: this.LatestMessgePosition,
          animated: true
        }
      )

    })
  };

  render() {
    const {
      backgroundColor,
    } = this.state;
    return (
      <SafeAreaView className='calculator' mode="margin" >
        <StatusBar backgroundColor={backgroundColor} barStyle='dark-content' />

        <KeyboardAwareScrollView
          innerRef={(ref: any) => {
            this.scroll = ref;
          }}
          onKeyboardDidShow={this.onKeyboardDidShow}
          // onKeyboardDidHide={this.onKeyboardDidHide}
          // resetScrollToCoords={{ x: -1, y: -1 }}
          enableOnAndroid={true}
        >
          <ChatDialog messages={this.state.msgList} currentUser='JIkes' ></ChatDialog>
          <View className='compute' ref={(c) => this.sendCMPRef = c} onLayout={e => {
            this.LatestMessgePosition = e.nativeEvent.layout.y
          }} >
            <Textarea
              type='text'
              // 针对小程序中底部fixed input被遮盖一部分 设置光标距离键盘距离
              // cursorSpacing={10}
              value={this.state.inputMsg}
              placeholder='请输入提问内容'
              placeholderClass='compute-placeholder'
              showConfirmBar={true}
              autoHeight
              cursorSpacing={0}
              className='compute-input'
              confirmType='send'
              maxlength={1000}
              // adjustPosition
              onInput={this.onInputChange}
              // focus
              style={{
                // @ts-ignore 针对安卓文字显示不全
                paddingVertical: 0
              }}
              // onBlur={this.downPayRateConfirm}
              holdKeyboard
            />
            <Button className='compute-send_msg' onClick={this.submit}>发送</Button>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
