import React from 'react';
import Button from '@material-ui/core/Button';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';



import { auth } from '../firebase';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const SignOutButton = (props) => {
  const { classes } = props;
  return (
    <Button
      type="button"
      onClick={auth.doSignOut}
      fullWidth
      color='primary'
      style={styles.button}
      className={classes.button}
    >
    <ExitIcon className={classes.leftIcon}/>
      Deslogar
    </Button>
  )
}

export default withStyles(styles)(SignOutButton);