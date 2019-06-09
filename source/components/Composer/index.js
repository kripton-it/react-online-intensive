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
    }

    state = {
        comment: '',
    }

    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _submitComment(event) {
        event.preventDefault();

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
                            onSubmit = { this._submitComment }>
                            <textarea
                                placeholder = { `What's on your mind, ${currentUserFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
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
