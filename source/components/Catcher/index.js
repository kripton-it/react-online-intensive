// Core
import React, { Component } from 'react';

// Instruments
import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    }

    state = {
        error: false,
    }

    componentDidCatch(error, stack) {
        console.log('ERROR: ', error);
        console.log('STACKTRACE: ', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render() {
        const { error } = this.state;
        const { catcher } = Styles;

        return error ? (
            <section className = { catcher }>An error occured</section>
        ) : this.props.children;
    }
}
