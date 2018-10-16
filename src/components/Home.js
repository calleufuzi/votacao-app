import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PollModal from './CreatePoll'
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      users: null,
      show: false,
      value: '',
      selected: { },
    };
    this.onInputChange.bind(this)
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  handleChange = event => {
    this.setState({ 
      value: event.target.value
      });
  };

  onInputChange = ({ target }) => {
    let { polls } = this.props;
    const nexState = Object.keys(polls).map(poll => {
      if (polls[poll].pollName !== target.name) return poll;
      return {
        ...polls[poll],
        pollOptions: polls[poll].pollOptions.map(opt => {
          const checked = opt.name === target.value;
          return {
            ...opt,
            selected: checked
          }
        })
      }
    });
    polls =  [...nexState]
    console.log(polls)
  }
  

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
    let { polls,classes } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <Grid container spacing={16}> 
          {!!polls && Object.keys(polls).map(key => {
              return (
                  <Grid key={key} item>
                    <Card className={classes.cards}>
                      <CardContent>
                        <Typography>Author: {polls[key].author}</Typography>
                        {
                          <FormControl component="fieldset">
                            <FormLabel component="legend">{polls[key].pollName}</FormLabel>
                            { 
                              Object.keys(polls[key].pollOptions).map((obj,k) => {
                                return( 
                                  <div key={k}>
                                    <label>{polls[key].pollOptions[obj].name}</label>
                                    <input 
                                      type="radio"
                                      name={polls[key].pollName}
                                      value={polls[key].pollOptions[obj].name}
                                      checked={true}
                                      onChange={this.onInputChange}
                                    />
                                  </div>
                                )
                              })     
                            }  
                          </FormControl>    
                        }             
                      </CardContent>
                      <CardActions>
                        <Button fullWidth className={classes.button} color="primary" size="large">Votar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
              )
            }
            )}
        </Grid>    
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
  cards: {
    margin: theme.spacing.unit,
  }
});

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