import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default class Spinner extends Component {
    render() {
        const { spinner } = Styles;
        const { isSpinning } = this.props;

        return createPortal(<div className = { spinner } />, portal);
    }
}
