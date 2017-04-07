/* global describe, it */
import chai from 'chai';
import { firstProp } from '../src/js/examples/firstDefinedProperty/example';

const expect = chai.expect;

describe('firstProp function', function () {
    it('is curried', function () {
        expect(firstProp(['hello'])).to.be.a('function');
    });

    it('gets the first defined / non null property based on a list of properties passed', function () {
        const user = {
            firstName: 'Freddy',
            lastName: 'Krueger',
            username: 'magic_pie'
        };

        const getName = firstProp(['firstName', 'lastName', 'username']);

        expect(getName(user)).to.equal('Freddy');
    })
});