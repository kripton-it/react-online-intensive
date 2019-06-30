// Core
import React from 'react';
import { mount } from 'enzyme';
// import { mount, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

// configure({ adapter: new Adapter() });

//Instruments
import avatar from '../../theme/assets/lisa.png';

const props = {
    createPost:           jest.fn(),
    currentUserFirstName: 'Lisa',
    avatar,
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
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

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
        // expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('createPost method should be invoked once after form submission', () => {
        result.setState({
            comment,
        });
        result.find('form').simulate('submit');
        // expect(props.createPost.mock.calls.length).toBe(1);
        // expect(props.createPost).toHaveBeenCalled();
        expect(props.createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form submission', () => {
        result.find('form').simulate('submit');
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('<img> element should have src attribute from props', () => {
        expect(result.find('img').prop('src')).toBe(avatar);
    });

    test('<textarea> element should have placeholder attribute from props', () => {
        expect(result.find('textarea').prop('placeholder')).toBe('What\'s on your mind, Lisa?');
    });

    test('_updateComment class method should be invoked after textarea change', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter class method should be invoked after key press in textarea', () => {
        result.find('textarea').simulate('keyPress');
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter class method should not invoke _submitComment method after not-Enter key press in textarea', () => {
        result.find('textarea').simulate('keyPress', {
            key: 'Escape',
        });
        expect(_submitCommentSpy).not.toHaveBeenCalled();
    });

    test('_submitOnEnter class method should invoke _submitComment method after Enter key press in textarea', () => {
        result.find('textarea').simulate('keyPress', {
            key: 'Enter',
        });
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and class method should not invoke createPost after form submission, if the comment is empty', () => {
        result.setState({
            comment: '',
        });
        result.find('form').simulate('submit');
        expect(props.createPost).not.toHaveBeenCalled();
    });
});

afterEach(() => jest.clearAllMocks());
