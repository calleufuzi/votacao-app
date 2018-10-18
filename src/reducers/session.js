import { AUTH_USER_SET } from '../actions/actionTypes'

const INITIAL_STATE = {
  authUser: null,
  token: null,
  secret: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
  token: action.token,
  secret: action.secret
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER_SET : {
      return applySetAuthUser(state, action);
    }
    default : return state;
  }
}

export default sessionReducer;