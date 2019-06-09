import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID } from '../../instruments';

// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            {
                id:      123,
                comment: 'Hi there',
                created: 1526825076849,
            },
            {
                id:      253,
                comment: 'Приветик ✋',
                created: 1526825076849,
            },
        ],
        isSpinning: true,
    }

    _createPost(comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

    render() {
        const { feed } = Styles;
        const { posts, isSpinning } = this.state;
        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
