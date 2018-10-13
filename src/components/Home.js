import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PollModal from './CreatePoll'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';




import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null,
      users: null,
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    const { onSetUsers,onSetPolls } = this.props;
    
    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
    db.onceGetPolls().then(snapshot =>
      // this.setState({polls: snapshot.val()})
      onSetPolls(snapshot.val())
    );
    
  }

  render() {
    // const polls = this.state.polls
    const { users, polls } = this.props;
    return (
      <div>
        <h1>Home</h1>
        {/* <p>The Home Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> } */}
        {/* <GetPolls /> */}
        {!!polls && Object.keys(polls).map(key => {
            return (
              <List key={key}>
                <ListItem>Author: {polls[key].author}</ListItem>
                <ListItem>Nome da Campanha: {polls[key].pollName}</ListItem>
                <ListItem>Op1: {polls[key].pollOptions.pollOption1}</ListItem>
                <ListItem>Op2: {polls[key].pollOptions.pollOption2}</ListItem>
                <ListItem>Op3: {polls[key].pollOptions.pollOption3}</ListItem>
              </List>
            )
          }
          )}
        <PollModal />
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const mapStateToProps = (state) => ({
  users: state.userState.users,
  polls: state.pollState.polls,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  onSetPolls: (polls) => dispatch({ type: 'POLLS_SET', polls }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withStyles(styles),
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);