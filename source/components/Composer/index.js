import React, { Component } from 'react';
import { func } from 'prop-types';

//Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from './../../HOC/with-profile';

export default class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
    }

    constructor() {
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
    }

    state = {
        comment: '',
    }

    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleFormSubmit(event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment() {
        const { comment } = this.state;
        if (!comment) {
            return;
        }

        const { createPost } = this.props;
        createPost(comment);

        this.setState({
            comment: '',
        });
    }

    _submitOnEnter(event) {
        const isEnterKeyPressed = event.key === 'Enter';
        if (isEnterKeyPressed) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { composer } = Styles;
        const { comment } = this.state;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
                    <section className = { composer }>
                        <img
                            alt = 'Avatar'
                            src = { avatar }
                        />
                        <form
                            action = ''
                            onSubmit = { this._handleFormSubmit }>
                            <textarea
                                placeholder = { `What's on your mind, ${currentUserFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._submitOnEnter }
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
