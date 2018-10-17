import React, { Component } from 'react';
import { 
  Link,
  withRouter,
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Cria o usuario o banco do Firebase
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });        
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
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    const styles = {
      card: {
        minWidth: 320,
        display: 'flex',
        marginTop: 64,
        alignItems: 'center',
        flexDirection: 'column',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
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
                <PersonAddIcon fontSize="large" />
              </Avatar>            
            </div>      
            <Typography color="textPrimary" variant="h5" align="center">Criar Conta</Typography>
            <form onSubmit={this.onSubmit}>
            <TextField
                label="Nome Completo"
                value={username}
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                margin="normal"
                variant="outlined"
                type="text"
                name="Nome Completo"
                fullWidth
              /> 
            <TextField
                label="Endereço de email"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                margin="normal"
                variant="outlined"
                type="email"
                name="Endereço de email"
                autoComplete="email"
                fullWidth
              />   
            <TextField
                label="Senha"
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                margin="normal"
                variant="outlined"
                type="password"
                name="Senha 1"
                fullWidth
              />  
            <TextField
                label="Confirme a Senha"
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                margin="normal"
                variant="outlined"
                type="password"
                name="Senha 2"
                fullWidth
              />             
              <div style={styles.container}>
                <Link to={routes.LANDING}> <Button  type="submit" color="secondary" size="large">Cancelar</Button></Link>
                <Button  disabled={isInvalid} type="submit" color="primary" size="large">Criar Conta</Button>            
              </div>   
              { error && <Typography color="error" align="center">{error.message}</Typography> }         
            </form>                                         
          </CardContent>
        </Card>  
      </div>
    );
  }
}

const SignUpLink = () =>
  <Typography color="primary">
    Não possui uma conta?
    {' '}
    <Link to={routes.SIGN_UP}>Criar Conta</Link>
  </Typography>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};