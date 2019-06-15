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

    _getCross = () => {
        const { cross } = Styles;

        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const isCurrent = currentUserFirstName === firstName && currentUserLastName === lastName;

        const deleteCross = (
            <span
                className = { cross }
                onClick = { this._handlePostDelete }
            />
        );

        return isCurrent ? deleteCross : null;
    }

    render() {
        const { post } = Styles;

        const {
            id,
            comment,
            created,
            likes,
            likePost,
            avatar,
            firstName,
            lastName,
        } = this.props;

        const fullName = `${ firstName } ${ lastName }`;

        const cross = this._getCross();

        return (
            <section className = { post }>
                { cross }
                <img src = { avatar } />
                <a href = '#'>{ fullName }</a>
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
