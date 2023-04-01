/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-10 23:39:59
 * @Last Modified by: qiuz
 */

import React, { forwardRef } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import { TaroSafeAreaViewType } from "./type";

let SafeAreaView: any;
if (process.env.TARO_ENV === "rn") {
  SafeAreaView = require("react-native-safe-area-context").SafeAreaView;
}

const TaroSafeAreaView: TaroSafeAreaViewType | any = (props) => {
  {
    const { className = "", style = {}, edges = ["right", "bottom", "left"], innerRef } = props;

    if (process.env.TARO_ENV === "rn") {
      return (
        <SafeAreaView
          edges={edges}
          className={`safe-area-view ${className}`}
          style={style}
        >
          {props.children}
        </SafeAreaView>
      );
    }
    return (
      <View ref={innerRef} className={`safe-area-view ${className}`} style={{ ...(style as object) }}>
        {props.children}
      </View>
    );
  }
}

export default TaroSafeAreaView;
