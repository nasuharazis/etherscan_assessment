import { 
    apiGetSearch,
    apiGetResult,
} from "../api";
import {
    SEARCH_DATA,
    SEARCH,
    RESULT_DATA,
    RESULT,
} from "./types";

export const action_getSearch = (data) => {
    return (dispatch) => {
        apiGetSearch(data)
        .then(result => {
            dispatch({ type: SEARCH_DATA, payload: result });
            setTimeout(() => {
                dispatch({ type: SEARCH });
            }, 500);
        })
        .catch((error) =>{
            dispatch({ type: SEARCH_DATA, payload: error.errors ? error.errors : {message: error.message, status : 'error' } })
            setTimeout(() => {
                dispatch({ type: SEARCH });
            }, 500);
        })
    }
}

export const action_getResult = (data) => {
    return (dispatch) => {
        apiGetResult(data)
        .then(result => {
            dispatch({ type: RESULT_DATA, payload: result });
            setTimeout(() => {
                dispatch({ type: RESULT });
            }, 500);
        })
        .catch((error) =>{
            dispatch({ type: RESULT_DATA, payload: error.errors ? error.errors : {message: error.message, status : 'error' } })
            setTimeout(() => {
                dispatch({ type: RESULT });
            }, 500);
        })
    }
}