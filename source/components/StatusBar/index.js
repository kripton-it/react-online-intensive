import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from './../../HOC/with-profile';

@withProfile
export default class StatusBar extends Component {
    render() {
        const { statusBar } = Styles;
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { statusBar }>
                <button>
                    <img
                        alt = 'Avatar'
                        src = { avatar }
                    />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}
