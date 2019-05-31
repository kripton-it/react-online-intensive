import React, { Component } from "react";

// Components
import Composer from "./../Composer";
import Post from "./../Post";

export default class Feed extends Component {
  render() {
    return (
      <>
        <Composer />
        <Post />
      </>
    );
  }
}
