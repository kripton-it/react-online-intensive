import React, { Component } from "react";

//Instruments
import Styles from "./styles.m.css";

export default class Composer extends Component {
  render() {
    const { composer } = Styles;
    const { avatar, currentUserFirstName } = this.props;
    return (
      <section className={composer}>
        <img src={avatar} alt="Avatar" />
        <form action="">
          <textarea
            placeholder={`What's on your mind, ${currentUserFirstName}?`}
          />
          <input type="submit" value="Post" />
        </form>
      </section>
    );
  }
}
