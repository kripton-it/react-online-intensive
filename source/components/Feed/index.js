import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments';

// Components
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    state = {
        posts: [
            {
                id:      '253',
                comment: 'Приветик ✋',
                created: 1526825076849,
                likes:   [],
            },
        ],
        isPostFetching: false,
    }

    _setPostsFetchingState(state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(5000);
        this._setPostsFetchingState(false);

        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

    async _likePost(id) {
        this._setPostsFetchingState(true);

        await delay(3000);

        this._setPostsFetchingState(false);

        const { currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;

        const newPosts = posts.map((post) => {
            if (post.id !== id) {
                return post;
            }

            return {
                ...post,
                likes: [
                    ...post.likes,
                    {
                        id:        getUniqueID(),
                        firstName: currentUserFirstName,
                        lastName:  currentUserLastName,
                    },
                ],
            };
        });

        this.setState({
            posts: newPosts,
        });
    }

    render() {
        const { feed } = Styles;
        const { posts, isPostFetching } = this.state;
        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
                likePost = { this._likePost }
                likes = { post.likes }
            />
        ));

        return (
            <section className = { feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar />
                <Composer createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
