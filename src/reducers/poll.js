const INITIAL_STATE = {
  polls: {},
};

const applySetPolls = (state, action) => ({
  ...state,
  polls: action.polls
});

function pollReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'POLLS_SET' : {
      return applySetPolls(state, action);
    }
    default : return state;
  }
}

export default pollReducer;