import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import Composer from './../Composer';
import Post from './../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';

export default class Feed extends Component {
    state = {
        posts: [
            {
                id: 123,
                comment: 'Hi there',
                created: 1526825076849,
            },
            {
                id: 253,
                comment: 'Приветик ✋',
                created: 1526825076849,
            },
        ],
    }

    render() {
        const { feed } = Styles;
        const { posts } = this.state;
        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { feed }>
                <Spinner isSpinning />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
