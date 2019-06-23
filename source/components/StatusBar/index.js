import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

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

    _animateStatusBarEnter = (target) => {
        fromTo(
            target,
            1,
            { opacity: 0 },
            { opacity: 1 },
        );
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
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter } >
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
            </Transition>
        );
    }
}
