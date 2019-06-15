import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments';
import { api } from '../../config/api';

// Components
import Catcher from './../../components/Catcher';
import { withProfile } from './../../HOC/with-profile';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';

@withProfile
export default class Feed extends Component {
    state = {
        posts:          [],
        isPostFetching: false,
    }

    componentDidMount() {
        this._fetchPosts();
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this._setPostsFetchingState(false);

        this.setState({
            posts,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);
        const post = {
            id:      getUniqueID(),
            /*created: moment.now() / 1000,*/
            created: moment.utc() / 1000,
            comment,
            likes:   [],
        };

        await delay(1500);
        this._setPostsFetchingState(false);

        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        await delay(1500);

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

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);

        await delay(1500);
        this._setPostsFetchingState(false);

        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id),
        }));
    }

    render() {
        const { feed } = Styles;
        const { posts, isPostFetching } = this.state;
        const postsJSX = posts.map((post) => (
            <Catcher>
                <Post
                    key = { post.id }
                    { ...post }
                    deletePost = { this._deletePost }
                    likePost = { this._likePost }
                    likes = { post.likes }
                />
            </Catcher>
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
