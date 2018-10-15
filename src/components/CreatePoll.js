import React, { Component } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { db } from '../firebase';


//  Estados Iniciais
const INITIAL_STATE = {
  pollName: '',
  pollOption1: '',
  pollOption2: '',
  pollOption3: '',
  open: false,
  error: null,
  polls: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreatePoll extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = (event) => {
    const {
      pollName,
      pollOption1,
      pollOption2,
      pollOption3
    } = this.state;

    const {onSetPolls } = this.props;
    const authUser = firebase.auth().currentUser;

    var postData = {
      author: authUser.email,
      uid: authUser.uid,
      pollName,
      pollOptions: {
        opt1: {
          name:pollOption1,
          selected: false
        },
        opt2: {
          name:pollOption2,
          selected: false
        },
        opt3: {
          name:pollOption3,
          selected: false
        },
        
      },
      poll_active: true
    };

    // Gera uma nova chave para uma nova enquete
    var newPollKey = firebase.database().ref().child('polls').push().key;

    //Escreve um novo dado de chave simultaneamente na lista de chave e da lista de enquete de usuário
    var updates = {};
    updates['/polls/' + newPollKey] = postData;
    updates['/user-polls/' + authUser.uid + '/' + newPollKey] = postData;
      
    // Cria uma Campanha no banco do Firebase
    db.doCreatePoll(updates)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        db.onceGetPolls().then(snapshot =>
          onSetPolls(snapshot.val())
        );
        this.handleClose()
        
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });        
    this.setState({ ...INITIAL_STATE });
    this.handleClose()

  }
  

  render() {
    
    const { classes, polls } = this.props;
    
    const {
      pollName,
      pollOption1,
      pollOption2,
    } = this.state;

    const isInvalid =
    pollName === '' ||
    pollOption1 === '' || 
    pollOption2 === '';

    return (
      <div>
        <Tooltip title="Criar Campanha">
          <Button onClick={this.handleClickOpen} variant="fab" color="secondary" aria-label="Add" className={classes.fab}>
              <AddIcon />
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Typography className={classes.title} gutterBottom color="textPrimary" variant="h6" align="center">Nova Campanha</Typography>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Nome da Campanha"
                type="Text"
                fullWidth
                onChange={event => this.setState(byPropKey('pollName', event.target.value))}
              />
            <TextField
                margin="dense"
                id="option1"
                label="Opção"
                type="text"
                fullWidth
                onChange={event => this.setState(byPropKey('pollOption1', event.target.value))}
              />  
            <TextField
                margin="dense"
                id="option2"
                label="Opção"
                type="text"
                fullWidth
                onChange={event => this.setState(byPropKey('pollOption2', event.target.value))}
              />  
            <TextField
                margin="dense"
                id="option3"
                label="Opção"
                type="text"
                fullWidth
                onChange={event => this.setState(byPropKey('pollOption3', event.target.value))}
              />                                             
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.onSubmit } disabled={isInvalid} color="primary">
                Criar
            </Button>  
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  title: {
    marginTop: theme.spacing.unit
  }
});

const mapStateToProps = (state) => ({
  polls: state.pollState.polls,
});

const mapDispatchToProps = (dispatch) => ({
  onSetPolls: (polls) => dispatch({ type: 'POLLS_SET', polls }),
});


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreatePoll);