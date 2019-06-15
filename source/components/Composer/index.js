import React, { Component } from 'react';
import { func } from 'prop-types';

//Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from './../../HOC/with-profile';

@withProfile
export default class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
    }

    state = {
        comment: '',
    }

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment = () => {
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

    _submitOnEnter = (event) => {
        const isEnterKeyPressed = event.key === 'Enter';
        if (isEnterKeyPressed) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { composer } = Styles;
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
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
        );
    }
}

// export default withProfile(Composer);
// декоратор @withProfile в 10-й строке - полная альтернатива
