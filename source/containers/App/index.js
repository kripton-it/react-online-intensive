// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

//Instruments
import avatar from "theme/assets/lisa";
import Feed from "./../../components/Feed";

const options = {
  currentUserFirstName: "Lisa",
  currentUserLastName: "Simpson",
  avatar: avatar
};

@hot(module)
export default class App extends Component {
  render() {
    return <Feed {...options} />;
  }
}
