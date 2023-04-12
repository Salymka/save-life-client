import {createStore} from 'redux'
import {lightTheme} from "../App";

export const setUser = "SET_USER";
export const exitUser = "EXIT_USER";
export const setTheme = "SET_THEME";

const defaultState = {
    user: null,
    theme: 'light__theme'
}
function reducer(state = defaultState, action) {
    switch (action.type) {
        case setUser:
            return {...state, user: action.user}
        case exitUser:
            return {...state, user: null}
        case setTheme:
            return {...state, theme: action.theme}
        default:
            return state
    }
}


const store = createStore(reducer)

export default store;