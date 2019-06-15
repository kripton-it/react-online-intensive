import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import { socket } from '../../socket/init';

// Components
import { withProfile } from './../../HOC/with-profile';

@withProfile
export default class StatusBar extends Component {
    state = {
        isOnline: false,
    };

    componentDidMount() {
        socket.on('connect', () => {
            this.setState({
                isOnline: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                isOnline: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const { statusBar, status, online, offline } = Styles;
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { isOnline } = this.state;

        const statusStyle = cx(status, {
            [ online ]:  isOnline,
            [ offline ]: !isOnline,
        });

        const statusMessage = isOnline ? 'Online' : 'Offline';

        return (
            <section className = { statusBar }>
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                    <span />
                </div>
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
