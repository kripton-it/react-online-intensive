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
        this._showLikers = this._showLikers.bind(this);
        this._hideLikers = this._hideLikers.bind(this);
        this._getLikersList = this._getLikersList.bind(this);
        this._getLikesDescription = this._getLikesDescription.bind(this);
    }

    state = {
        showLikers: false,
    }

    _showLikers() {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers() {
        this.setState({
            showLikers: false,
        });
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

    _getLikersList() {
        const { showLikers } = this.state;
        if (!showLikers) {
            return null;
        }

        const { likes } = this.props;
        if (likes.length === 0) {
            return null;
        }

        const likersListJSX = likes.map(({ firstName, lastName, id }) => {
            return <li key = { id }>{`${ firstName } ${ lastName }`}</li>;
        });

        return <ul>{likersListJSX}</ul>;
    }

    _getLikesDescription() {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        }
        
        if (likedByMe) {
            return `You and ${ likes.length - 1 } other${likes.length > 2 ? 's' : ''}`;
        }

        return likes.length;
    }

    render() {
        const { like } = Styles;
        const likeStyle = this._getLikeStyle();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { like }>
                <span
                    className = { likeStyle }
                    onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        { likesDescription }
                    </span>
                </div>
            </section>
        );
    }
}

export default Like;
