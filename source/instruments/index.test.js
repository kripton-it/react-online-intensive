// Core
import { sum, delay, getUniqueID } from './';

// jest.setTimeout(15000);
// дефолтный таймаут = 5000 мс
// изменить при необходимости тестирования асинхронных функций с большой задержкой

describe('sum:', () => {
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

describe('delay:', () => {
    test('delay function should be a function', () => {
        expect(delay).toBeInstanceOf(Function);
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    /*test('delay function should return a resolved promise', async () => {
        await expect(delay(15000)).resolves.toBe('A resolved promise 🚦');
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBe('A resolved promise 🚦');
    });*/
});

describe('getUniqueID:', () => {
    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as argument', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should return a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID()).toHaveLength(15);
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(10)).toHaveLength(10);
    });
});
