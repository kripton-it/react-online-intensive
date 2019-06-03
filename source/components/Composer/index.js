import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from '../../HOC';

export default class Composer extends Component {
    render() {
        const { composer } = Styles;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
                    <section className = { composer }>
                        <img
                            alt = 'Avatar'
                            src = { avatar }
                        />
                        <form action = ''>
                            <textarea
                                placeholder = { `What's on your mind, ${currentUserFirstName}?` }
                            />
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
