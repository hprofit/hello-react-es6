import {ADD_USER, SET_USERS} from '../constants/actionTypes';

const rootReducer = function(initialState={}, action) {
  var reducer = [];
  reducer[ADD_USER]  = function () {
    var userList = initialState.userList || [];
    return Object.assign({}, initialState, {
      userList: [
        ...userList,
        action.newUser
      ]
    });
  }
  reducer[SET_USERS]  = function () {
    return Object.assign({}, initialState, {
      userList: action.userList
    });
  }
  if (reducer[action.type]) {
    return reducer[action.type]();
  } else {
    return {};
  }
}

export default rootReducer;
