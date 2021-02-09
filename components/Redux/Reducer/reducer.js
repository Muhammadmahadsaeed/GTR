import { combineReducers } from 'redux';
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const initialState = {
  user: null,
};
const user = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case REMOVE_USER: {
      return {...state, user: null};
    }

    default:
      return state;
  }
};
export default combineReducers({ user });

