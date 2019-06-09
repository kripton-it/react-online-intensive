import React, { Component } from 'react';
import { array, string, number, func } from 'prop-types';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from './../../HOC/with-profile';
import Like from '../Like';

export default class Post extends Component {
    static propTypes = {
        id:       string.isRequired,
        comment:  string.isRequired,
        created:  number.isRequired,
        likePost: func.isRequired,
        likes:    array.isRequired,
    }

    render() {
        const { post } = Styles;
        const { id, comment, created, likes, likePost } = this.props;

        return (
            <Consumer>
                {(context) => {
                    const { avatar, currentUserFirstName, currentUserLastName } = context;
                    const currentUserFullName = `${ currentUserFirstName } ${ currentUserLastName }`;

                    return (
                        <section className = { post }>
                            <img src = { avatar } />
                            <a href = '#'>{ currentUserFullName }</a>
                            <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                            <p>{ comment }</p>
                            <Like
                                id = { id }
                                likePost = { likePost }
                                likes = { likes }
                                { ...context }
                            />
                        </section>
                    );
                }}
            </Consumer>
        );
    }
}
