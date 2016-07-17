import * as types from '../constants/actionTypes';

export function addUser(newUser) {
  return {type: types.ADD_USER, newUser: newUser};
}

export function setUsers(userList) {
  return {type: types.SET_USERS, userList: userList};
}
