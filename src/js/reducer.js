import { merge } from 'ramda';

const initialState = {
    message: '',
    examples: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case 'DO_SOMETHING':
            return merge(state, {
                message: 'hello'
            });
    }
    return state;
}
