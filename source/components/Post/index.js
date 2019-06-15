import React, { Component } from 'react';
import { array, string, number, func } from 'prop-types';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from './../../HOC/with-profile';
import Like from '../Like';

@withProfile
export default class Post extends Component {
    static propTypes = {
        id:         string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        likePost:   func.isRequired,
        likes:      array.isRequired,
        deletePost: func.isRequired,
    }

    _handlePostDelete = () => {
        const { deletePost, id } = this.props;
        deletePost(id);
    }

    render() {
        const { post, cross } = Styles;
        const { id, comment, created, likes, likePost, avatar, currentUserFirstName, currentUserLastName } = this.props;
        const currentUserFullName = `${ currentUserFirstName } ${ currentUserLastName }`;

        return (
            <section className = { post }>
                <span
                    className = { cross }
                    onClick = { this._handlePostDelete }
                />
                <img src = { avatar } />
                <a href = '#'>{ currentUserFullName }</a>
                <time>{moment.unix(created).format('MMMM D YYYY h:mm:ss a')}</time>
                <p>{ comment }</p>
                <Like
                    id = { id }
                    likePost = { likePost }
                    likes = { likes }
                />
            </section>
        );
    }
}
