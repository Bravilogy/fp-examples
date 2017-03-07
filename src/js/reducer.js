import { merge } from 'ramda';

const initialState = {
    message: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_MESSAGE':
            return merge(state, { message: action.message });
        default:
            return state;
    }
}
