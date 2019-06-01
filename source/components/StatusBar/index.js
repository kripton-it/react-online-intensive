import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import { Consumer } from "../../HOC";

export default class StatusBar extends Component {
  render() {
    const { statusBar } = Styles;
    return (
      <Consumer>
        {({ avatar, currentUserFirstName, currentUserLastName }) => (
          <section className={statusBar}>
            <button>
              <img alt="Avatar" src={avatar} />
              <span>{currentUserFirstName}</span>
              &nbsp;
              <span>{currentUserLastName}</span>
            </button>
          </section>
        )}
      </Consumer>
    );
  }
}
