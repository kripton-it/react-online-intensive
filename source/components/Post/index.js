import React, { Component } from "react";
import moment from "moment";

//Instruments
import Styles from "./styles.m.css";

// Components
import { Consumer } from "../../HOC";

export default class Post extends Component {
  render() {
    const { post } = Styles;

    return (
      <Consumer>
        {({ avatar, currentUserFirstName, currentUserLastName }) => {
          const currentUserFullName = `${currentUserFirstName} ${currentUserLastName}`;
          return (
            <section className={post}>
              <img src={avatar} />
              <a href="#">{currentUserFullName}</a>
              <time>{moment().format("MMMM D h:mm:ss a")}</time>
              <p>Howdy!</p>
            </section>
          );
        }}
      </Consumer>
    );
  }
}
