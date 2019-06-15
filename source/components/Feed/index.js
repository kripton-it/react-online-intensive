import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';

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
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);
            const currentUserFullName = `${currentUserFirstName} ${currentUserLastName}`;
            const metaFullName = `${meta.authorFirstName} ${meta.authorLastName}`;

            if (currentUserFullName !== metaFullName) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });
    }

    componentWillMount() {
        socket.removeListener('create');
    }

    _fetchPosts = async () => {
        this.setState({
            isPostFetching: true,
        });

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    }

    _createPost = async (comment) => {
        this.setState({
            isPostFetching: true,
        });

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    _likePost = async (id) => {
        this.setState({
            isPostFetching: true,
        });

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts:          posts.map((post) => post.id === id ? likedPost : post),
            isPostFetching: false,
        }));
    }

    _deletePost = async (id) => {
        this.setState({
            isPostFetching: true,
        });

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
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
