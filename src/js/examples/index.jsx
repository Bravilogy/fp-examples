import EncodeUrl from 'examples/encodeUrl';
import SpreadProp from 'examples/spreadProp';
import ChainOfEvents from 'examples/chainOfEvents';
import JoinAddressProps from 'examples/joinAddressProps';
import FirstDefinedProperty from 'examples/firstDefinedProperty';

export default [
    /* Example components */
    {
        title: 'First Defined Property',
        path: 'first-defined-property',
        component: FirstDefinedProperty,
    },
    {
        title: 'Join Address Props',
        path: 'join-address-properties',
        component: JoinAddressProps,
    },
    {
        title: 'Encode URL',
        path: 'encode-url',
        component: EncodeUrl,
    },
    {
        title: 'Spread Property',
        path: 'spread-property',
        component: SpreadProp,
    },
    {
        title: 'Chain of Events',
        path: 'chain-of-events',
        component: ChainOfEvents,
    }
];