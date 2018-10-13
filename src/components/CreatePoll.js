import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';



class CreatePoll extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title="Criar Campanha">
          <Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon />
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nova Campanha</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Escolha o nome da sua campanha em seguida adicione as enquetes! 
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nome da Campanha"
              type="Text"
              fullWidth
            />
           <TextField
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Criar
            </Button>
          </DialogActions>
        </Dialog>
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

export default withStyles(styles)(CreatePoll);