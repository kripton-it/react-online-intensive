import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

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
import Postman from '../Postman';

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

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);
            const currentUserFullName = `${currentUserFirstName} ${currentUserLastName}`;
            const authorFullName = `${meta.authorFirstName} ${meta.authorLastName}`;

            if (currentUserFullName !== authorFullName) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: updatedPost, meta } = JSON.parse(postJSON);
            const currentUserFullName = `${currentUserFirstName} ${currentUserLastName}`;
            const authorFullName = `${meta.authorFirstName} ${meta.authorLastName}`;

            if (currentUserFullName !== authorFullName) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === updatedPost.id ? updatedPost : post),
                }));
            }
        });
    }

    componentWillMount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
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

    _animateComposerEnter = (target) => {
        fromTo(
            target,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0, onComplete: () => console.log('completed') },
        );
    }

    render() {
        const { feed } = Styles;
        const { posts, isPostFetching } = this.state;
        const postsJSX = posts.map((post) => (
            <Catcher key = { post.id }>
                <Post
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
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter } >
                    <Composer createPost = { this._createPost } />
                </Transition>
                <Postman />
                { postsJSX }
            </section>
        );
    }
}
