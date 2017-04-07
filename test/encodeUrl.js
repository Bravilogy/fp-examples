/* global describe, it */
import chai from 'chai';
import { encodeUrl } from '../src/js/examples/encodeUrl/example';

const expect = chai.expect;

describe('encodeUrl function', function () {
    it('encode parameters passed as an object and concatenates the result with the URL passed to it', function () {
        const URL = 'http://example.com';
        const params = {
            id: 1,
            topic: 'Javascript',
            chapter: 'Functional & Awesome'
        };

        expect(encodeUrl(URL, params))
            .to.equal('http://example.com?id=1&topic=Javascript&chapter=Functional%20%26%20Awesome')
    })
});