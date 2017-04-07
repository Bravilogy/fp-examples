/* global describe, it */
import chai from 'chai';
import { spread } from '../src/js/examples/spreadProp/code.js';

const expect = chai.expect;

describe('spread function', function () {
    const state = {
        home: {
            title: 'Home page',
            resources: []
        },
        dispatch: () => {}
    };

    it('is curried', function () {
        const curried = spread('home');
        expect(curried).to.be.a('function');
        expect(curried(state))
            .to.have.all.keys(['dispatch', 'title', 'resources']);
    });

    it('spreads a single property of an object', function () {
        expect(spread('home', state))
            .to.have.all.keys(['dispatch', 'title', 'resources']);
    });
});
