import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { db } from '../firebase';


class GetPolls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null,
    };
  }
  componentDidMount() {
    const { onSetPolls } = this.props;

    db.onceGetPolls().then(snapshot =>
      this.setState({polls: snapshot.val()})
      // onSetPolls(snapshot.val())
    );
  }

  render () {
    const polls = this.state.polls
    return (
      <Fragment>
        <Typography>Polls</Typography>
          {Object.keys(polls).map(key =>
            <div key={key}>{polls.key}</div>
          )}
      </Fragment>
    )
  }
}
const styles = theme => ({

});

const PollList = () => {
  const polls = this.state.polls
  return (
  <div>
    {Object.keys(polls).map(key =>
      <div key={key}>{polls[key].author}</div>
    )}
  </div>)
}
const mapStateToProps = (state) => ({
  polls: state.pollState.polls,
});

const mapDispatchToProps = (dispatch) => ({
  onSetPolls: (polls) => dispatch({ type: 'POLLS_SET', polls }),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(GetPolls);