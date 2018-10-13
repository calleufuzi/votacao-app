import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class GetPolls extends Component {

  getPolls = () => {
    
  }
  render () {
    return (
      <Fragment>
        <Typography>Polls</Typography>
      </Fragment>
    )
  }
}

const styles = theme => ({

});
export default withStyles(styles)(GetPolls);