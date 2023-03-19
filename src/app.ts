import { Component } from "react";
import "./app.scss";

class App extends Component {
  componentDidMount() { }

  componentDidShow() {
    alert("this is a test");
  }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
