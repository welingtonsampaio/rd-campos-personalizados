import { Request } from 'utils';
import $ from 'jquery';

// ------------------------------------------------------------------------------------------------------------
// Store Name
// ------------------------------------------------------------------------------------------------------------
export const STORE_NAME = 'auth';

// ------------------------------------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------------------------------------
export const AUTH_LOAD   = 'AUTH_LOAD';
export const AUTH_LOADED = 'AUTH_LOADED';
export const AUTH_SET    = 'AUTH_SET';
export const AUTH_SET_ME = 'AUTH_SET_ME';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';


// ------------------------------------------------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------------------------------------------------

export const request = (username, password, remember_me) => {
  return (dispatch, getState) => {
    let r = new Request();
    return r.setUrl(`/api/users/sign_in`)
      .setMethod('POST')
      .setData({
        email: username,
        password: password

      })
      .do()
      .then(json => {
        dispatch(set(json));
        return json;
      });
  }
};


export const load = data => {
  return {
    type: AUTH_LOAD
  };
};


export const set = (data)=> {
  return {
    type: AUTH_SET,
    payload: data
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const actions = {
  set,
  request,
  logout,
};

// ------------------------------------------------------------------------------------------------------------
// Action Handlers
// ------------------------------------------------------------------------------------------------------------
const ACTION_HANDLERS = {
  [AUTH_SET]: (state, action) => {
    if (!action.payload) return state;

    let auth = {
      logged: true,
      ...action.payload
    };

    return Object.assign({}, state, auth);
  },

  [AUTH_LOAD]: (state, action) => Object.assign({}, state, {loading: true}),
  [AUTH_LOADED]: (state, action) => Object.assign({}, state, {loading: false}),

  [AUTH_LOGOUT]: (state, action) => {
    $.auth.signOut();
    return Object.assign({}, initialState);
  },
}

// ------------------------------------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------------------------------------
// const initialState = {
//   id: 1060,
//   name: 'Welington Sampaio',
//   token: 'asdfghjkwertyui2345678',
//   logged: true,
// }
const initialState = {
  logged: false,
  user: {}
};

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
