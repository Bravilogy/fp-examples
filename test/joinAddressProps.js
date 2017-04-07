/* global describe, it */
import chai from 'chai';
import { joinAddressProps } from '../src/js/examples/joinAddressProps/example';

const expect = chai.expect;

describe('joinAddressProps function', function () {
    const elements = [
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'city',
        'county',
        'postcode'
    ];

    const address = {
        address_line_1: 'aline1',
        address_line_2: 'aline2',
        address_line_3: 'aline3',
        city: 'London',
        county: 'Functional',
        postcode: 'FN1 33T'
    };

    it('is curried', function () {
        expect(joinAddressProps(2, elements)).to.be.a('function');
    });

    it('creates a string of address by joining address elements', function () {
        expect(joinAddressProps(1, elements, address))
            .to.equal('aline1, aline2, aline3, London, Functional FN1 33T');

        expect(joinAddressProps(2, elements, address))
            .to.equal('aline1, aline2, aline3, London Functional FN1 33T');
    });
});
