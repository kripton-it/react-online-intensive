// Core
import React from 'react';
import { mount } from 'enzyme';
// import { mount, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

// configure({ adapter: new Adapter() });

const props = {
    createPost: jest.fn(),
};

const comment = 'Hello, World!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

describe('component <Composer>:', () => {
    test('should have 1 <section> element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 <form> element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 <textarea> element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 <img> element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have 1 <input> element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
        result.setState({
            comment: '',
        });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('createPost method should be invoked once after form submission', () => {
        // expect(props.createPost.mock.calls.length).toBe(1);
        // expect(props.createPost).toHaveBeenCalled();
        expect(props.createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form submission', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });
});
