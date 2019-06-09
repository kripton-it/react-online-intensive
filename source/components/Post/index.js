import React, { Component } from 'react';
import { string, number } from 'prop-types';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from './../../HOC/with-profile';

export default class Post extends Component {
    static propTypes = {
        comment: string.isRequired,
        created: number.isRequired,
    }

    render() {
        const { post } = Styles;
        const { comment, created } = this.props;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName, currentUserLastName }) => {
                    const currentUserFullName = `${ currentUserFirstName } ${ currentUserLastName }`;

                    return (
                        <section className = { post }>
                            <img src = { avatar } />
                            <a href = '#'>{ currentUserFullName }</a>
                            <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                            <p>{ comment }</p>
                        </section>
                    );
                }}
            </Consumer>
        );
    }
}
