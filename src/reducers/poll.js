import { POLLS_SET,POLL_VOTE } from '../actions/actionTypes'

const INITIAL_STATE = {
  polls: {},
};

const applySetPolls = (state, action) => ({
  ...state,
  polls: action.polls
});

const applyPollPush = (state, action) => ({
  ...state,
  polls: action.polls
});

function pollReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case POLLS_SET : {
      return applySetPolls(state, action);
    }
    case POLL_VOTE : {
      return applyPollPush(state, action);
    }
    default : return state;
  }
}

export default pollReducer;