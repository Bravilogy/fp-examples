/* global describe, it */
import chai from 'chai';
import { spread } from '../src/js/examples/spreadProp/example';

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
        expect(spread('home')).to.be.a('function');
    });

    it('spreads a single property of an object', function () {
        expect(spread('home', state))
            .to.have.all.keys(['dispatch', 'title', 'resources']);
    });
});
