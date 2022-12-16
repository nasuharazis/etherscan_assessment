import { 
    SEARCH,
    SEARCH_DATA,
    RESULT,
    RESULT_DATA,
    
} from '../../action/types';

const INITIAL_STATE = {
    search: null,
    resultData: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH:
            return {...state, ...INITIAL_STATE, search: null};
        case SEARCH_DATA:
            return {...state, ...INITIAL_STATE, search: action.payload};
        case RESULT:
            return {...state, ...INITIAL_STATE, resultData: null};
        case RESULT_DATA:
            return {...state, ...INITIAL_STATE, resultData: action.payload};
        default:
            return state;
    }
};
