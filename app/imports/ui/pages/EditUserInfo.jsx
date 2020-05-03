import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { User, UserSchema } from '../../api/user/User';
import 'uniforms-bridge-simple-schema-2';

/** Renders the Page for editing a single document. */
class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferer: false,
    };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, description, image, mobileNumber, _id } = data;
    User.update(_id, { $set: { firstName, lastName, description, image, mobileNumber } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User Information updated successfully', 'success');
        this.setState({ redirectToReferer: true });
      }
});
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/profile'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={UserSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Grid stackable container>
                  <Grid.Row>
                    <Grid stackable columns={'equal'}>
                      <Grid.Column>
                        <TextField name='firstName'/>
                      </Grid.Column>
                      <Grid.Column>
                        <TextField name='lastName'/>
                      </Grid.Column>
                      <Grid.Column>
                        <NumField name='mobileNumber' decimal={false}/>
                      </Grid.Column>
                    </Grid>
                  </Grid.Row>
                  <Grid.Row>
                    <TextField name='image' iconLeft='image'/>
                  </Grid.Row>
                  <Grid.Row>
                    <LongTextField name='description'/>
                  </Grid.Row>
                  <Grid.Row>
                    <SubmitField/>
                  </Grid.Row>
                  <ErrorsField/>
                </Grid>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditUserInfo.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  return {
    doc: User.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditUserInfo);
