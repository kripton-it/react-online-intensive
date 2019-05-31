import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Composer from "./../Composer";
import Post from "./../Post";

export default class Feed extends Component {
  render() {
    const { feed } = Styles;
    return (
      <section className={feed}>
        <Composer />
        <Post />
      </section>
    );
  }
}
