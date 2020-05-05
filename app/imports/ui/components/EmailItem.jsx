import React from 'react';
import { Grid, Container, Icon, Button, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Contactus } from '../../api/mail/Contactus';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EmailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openContent: false,
    };
  }

  handleRead = () => {
    Contactus.update({ _id: this.props.email._id }, { $set: { beRead: true } });
    const temp = this.state.openContent;
    this.setState({ openContent: !temp });
  };

  handleDelete = () => {
    swal({
      title: 'Delete Email',
      text: 'You are going to delete this email',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Confirm',
      },
    }).then((value) => {
      if (value) Contactus.remove({ _id: this.props.email._id });
    });
  };

  render() {
    return (
        <div>
          <Segment style={{ width: '1314px' }} onClick={this.handleRead}>
            <Grid>
              <Grid.Column width={1}>{this.props.email.beRead ? <Icon size={'large'} name={'envelope open outline'}/>
                  : <Icon size={'large'} name={'envelope'}/>}
              </Grid.Column>
              <Grid.Column width={1}/>
              <Grid.Column width={1}>{this.props.email.issueType}</Grid.Column>
              <Grid.Column width={3}/>
              <Grid.Column width={4}>{this.props.email.subject}</Grid.Column>
              <Grid.Column width={1}/>
              <Grid.Column width={3}>{this.props.email.email}</Grid.Column>
              <Grid.Column width={1}>{this.props.email.createdAt.toLocaleDateString('en-US')}</Grid.Column>
              <Grid.Column floated={'right'}><Button size={'tiny'} icon={'close'}
                                                     onClick={this.handleDelete}/></Grid.Column>
            </Grid>
          </Segment>
          {this.state.openContent ? <Container>{this.props.email.content}<Divider/></Container> : ''}
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
EmailItem.propTypes = {
  email: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EmailItem);
