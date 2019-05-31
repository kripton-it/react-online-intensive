import React, { Component } from "react";

// Instruments
import avatar from "theme/assets/lisa";
import Styles from "./styles.m.css";

export default class StatusBar extends Component {
  render() {
    const { statusBar } = Styles;
    return (
      <section className={statusBar}>
        <button>
          <img alt="Avatar" src={avatar} />
          <span>Lisa</span>
          &nbsp;
          <span>Simpson</span>
        </button>
      </section>
    );
  }
}
