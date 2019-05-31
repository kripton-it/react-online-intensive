// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

//Instruments
import Feed from "./../../components/Feed";
import StatusBar from "./../../components/StatusBar";

@hot(module)
export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar />
        <Feed />
      </>
    );
  }
}
