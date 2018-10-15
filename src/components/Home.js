import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PollModal from './CreatePoll'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'



import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null,
      users: null,
      show: false,
      value: ''
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    const { onSetUsers,onSetPolls } = this.props;
    
    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
    db.onceGetPolls().then(snapshot =>
      onSetPolls(snapshot.val())
    );
    
  }

  render() {
    const { users, polls } = this.props;
    return (
      <div>
        <h1>Home</h1>
        {/* <p>The Home Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> } */}
        {!!polls && Object.keys(polls).map(key => {
            return (
              <List key={key}>
                <ListItem>Author: {polls[key].author}</ListItem>
                <ListItem> 
                  {
                    <FormControl component="fieldset">
                      <FormLabel component="legend">{polls[key].pollName}</FormLabel>
                      <RadioGroup
                              aria-label={polls[key].pollOptions}
                              name={polls[key].pollName}
                              value={this.state.value}
                              onChange={this.handleChange}
                            >
                      { 
                        Object.keys(polls[key].pollOptions).map(k => {
                          console.log(polls[key].pollOptions[k].name)
                          return(                   
                              <FormControlLabel key={k} value={polls[key].pollOptions[k].name} control={<Radio />} label={polls[key].pollOptions[k].name} /> 
                            )
                        })     
                      }      
                        </RadioGroup>          
                    </FormControl>                    

                 }
                </ListItem>
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