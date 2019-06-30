// Core
import { sum } from './';

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('hello', 2)).toThrow();
    });

    test('sum function should return a sum of two arguments', () => {
        expect(sum(2, 2)).toBe(4);
        expect(sum(-5, 5)).toMatchSnapshot();
    });
});

