// Core
import React, { Component } from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

class Like extends Component {
    static propTypes = {
        likePost: func.isRequired,
        id:       string.isRequired,
        likes:    arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ),
    }

    constructor() {
        super();
        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyle = this._getLikeStyle.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    _getLikedByMe() {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return firstName === currentUserFirstName && lastName === currentUserLastName;
        });
    }

    _getLikeStyle() {
        const likedByMe = this._getLikedByMe();
        const { icon, liked } = Styles;

        return cx(icon, {
            [ liked ]: likedByMe,
        });
    }

    _likePost() {
        const { likePost, id } = this.props;
        likePost(id);
    }

    render() {
        const { like } = Styles;
        const likeStyle = this._getLikeStyle();

        /*console.log(this.props);
        console.log(likeStyle);*/

        return (
            <section className = { like }>
                <span
                    className = { likeStyle }
                    onClick = { this._likePost }>
                    Like
                </span>
            </section>
        );
    }
}

export default Like;
