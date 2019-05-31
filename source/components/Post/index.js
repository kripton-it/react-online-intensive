import React, { Component } from "react";
import moment from "moment";

//Instruments
import avatar from "theme/assets/lisa";
import Styles from "./styles.m.css";

export default class Post extends Component {
  render() {
    const { post } = Styles;

    return (
      <section className={post}>
        <img src={avatar} />
        <a href="#">Лиза Симпсон</a>
        <time>{moment().format("MMMM D h:mm:ss a")}</time>
        <p>Howdy!</p>
      </section>
    );
  }
}
