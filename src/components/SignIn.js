import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';



import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    const styles = {
      card: {
        minWidth: 320,
        display: 'flex',
        marginTop: 64,
        alignItems: 'center',
        flexDirection: 'column',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width:'100%', 
        marginTop: 14
      },
      avatar: {
        margin: 10,
        width:60,
        height:60,
        backgroundColor: 'teal'
      },
      row:{
        display: 'flex',
        justifyContent: 'center',
      },
      form:{
        width: '100%',
        marginTop: 8
      }
    };
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardContent>
            <div style={styles.row}>
              <Avatar style={styles.avatar} >
                <PersonIcon fontSize="large" />
              </Avatar>            
            </div>
            <Typography color="textPrimary" variant="h5" align="center">Entrar</Typography>
            <form style={styles.form} onSubmit={this.onSubmit}>
              <TextField
                label="Email Adress"
                style={styles.textField}
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                margin="normal"
                variant="outlined"
                type="email"
                name="email"
                autoComplete="email"
                fullWidth
              />             
              <TextField
                label="Password"
                style={styles.textField}
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                margin="normal"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                fullWidth
              />             
              { error && <Typography>{error.message}</Typography> }
              <div style={styles.container}>
                <Button fullWidth disabled={isInvalid} type="submit" color="primary" size="large">Entrar</Button>
                <PasswordForgetLink />
              </div>
          </form>
          </CardContent>
          <CardActions>
            <div style={styles.container}>
              <SignUpLink />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};