import React, { Component } from "react";
import moment from "moment";

//Instruments
import Styles from "./styles.m.css";

export default class Post extends Component {
  render() {
    const { post } = Styles;
    const { avatar, currentUserFirstName, currentUserLastName } = this.props;

    const currentUserFullName = `${currentUserFirstName} ${currentUserLastName}`;

    return (
      <section className={post}>
        <img src={avatar} />
        <a href="#">{currentUserFullName}</a>
        <time>{moment().format("MMMM D h:mm:ss a")}</time>
        <p>Howdy!</p>
      </section>
    );
  }
}
