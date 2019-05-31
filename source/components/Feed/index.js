import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Composer from "./../Composer";
import Post from "./../Post";
import StatusBar from "../StatusBar";

export default class Feed extends Component {
  render() {
    const { avatar, currentUserFirstName } = this.props;
    const { feed } = Styles;
    return (
      <section className={feed}>
        <StatusBar />
        <Composer avatar={avatar} currentUserFirstName={currentUserFirstName} />
        <Post {...this.props} />
      </section>
    );
  }
}
