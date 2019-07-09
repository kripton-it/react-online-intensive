import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { socket } from '../../socket/init';

// Components
import { withProfile } from './../../HOC/with-profile';

@withProfile
@withRouter
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

    handleClick = () => {
        this.props.toggleLogin();
        this.props.history.goBack();
    };

    render() {
        const { statusBar, status, online, offline } = Styles;
        const { avatar, currentUserFirstName, isLoggedIn, toggleLogin } = this.props;
        const { isOnline } = this.state;

        const statusStyle = cx(status, {
            [ online ]:  isOnline,
            [ offline ]: !isOnline,
        });

        const statusMessage = isOnline ? 'Online' : 'Offline';

        const statusBadge = (
            <div className = { statusStyle }>
                <div>{ statusMessage }</div>
                <span />
            </div>
        );

        const profileLink = (
            <Link to = '/profile'>
                <img
                    alt = 'Avatar'
                    src = { avatar }
                />
                <span>{currentUserFirstName}</span>
            </Link>
        );

        const feedLink = <Link to = '/feed'>Feed</Link>;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter } >
                <section className = { statusBar }>
                    { isLoggedIn ? statusBadge : null }
                    { isLoggedIn ? profileLink : null }
                    { isLoggedIn ? feedLink : null }
                    <Link to = '/public'>
                        Public
                    </Link>
                    <Link to = '/private'>
                        Private
                    </Link>
                    <button onClick = { this.handleClick }>
                        {isLoggedIn ? 'Выйти' : 'Войти'}
                    </button>
                </section>
            </Transition>
        );
    }
}
