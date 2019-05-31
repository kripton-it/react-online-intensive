import React, { Component } from "react";

//Instruments
import avatar from "theme/assets/lisa";
import Styles from "./styles.m.css";

export default class Composer extends Component {
  render() {
    const { composer } = Styles;
    return (
      <section className={composer}>
        <img src={avatar} alt="Avatar" />
        <form action="">
          <textarea placeholder={`What's on your mind, Lisa?`} />
          <input type="submit" value="Post" />
        </form>
      </section>
    );
  }
}
