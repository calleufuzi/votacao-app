import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        token: null,
        secret: null
      };
    }
    // 391660714-J4U6WyGp1p4CUlIoxy1RQRFBy43gfXIOvDBJQ6bJ
    // SignIn.js:78 grUlcaSxusZ5ZypyQcXT1h9GvDoXqYOMyxNJqf8AdfjnA
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;