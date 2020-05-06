import React from 'react';
import { Grid, Loader, Header, Segment, Image, Divider } from 'semantic-ui-react';
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
      image: 'no-change',
    };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, description, mobileNumber, _id } = data;
    let image;
    if (this.state.image === 'no-change') {
      image = this.props.doc.image;
    } else {
      image = this.state.image;
    }
    User.update(_id, { $set: { firstName, lastName, description, image, mobileNumber } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User Information updated successfully', 'success');
        this.setState({ redirectToReferer: true });
      }
});
  }

  onImageUpload = (event) => {
    const edit = this;
    event.preventDefault();
    const files = event.target.files;
    if (files) {
      /* global FileReader */
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const fileSize = files[0].size / 1000 / 1000;
        if (fileSize > 2) {
          swal('Error', 'This Image is too big, cannot exceed 2 MB', 'error');
        } else {
          edit.setState({ image: this.result });
        }
      });

      reader.readAsDataURL(files[0]);
    }
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/profile'}/>;
    }
    let dataImage = this.state.image;
    if (this.state.image === 'no-change') {
      dataImage = this.props.doc.image;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Your Profile</Header>
            <AutoForm schema={UserSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Grid stackable container>
                  <Grid.Row>
                    <Grid.Column width={3}><label htmlFor="file-input">
                      <div style={{ fontSize: '0.92857143em', fontWeight: 'bold' }}>
                        Photo <span style={{ color: '#DB2828' }}>*</span></div>
                      <Image
                          size={'huge'}
                          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
                          src={dataImage}
                      />
                      <div style={{ color: '#024731' }}>Choose Your Photo here</div>
                    </label>
                      <input type="file"
                             id="file-input"
                             name="picture"
                             accept=".jpg, .jpeg, .png"
                             style={{ display: 'none' }}
                             onChange={this.onImageUpload}/></Grid.Column>
                    <Grid.Column width={13}>
                      <Grid.Row>
                        <Grid stackable columns={'equal'}>
                          <Grid.Column>
                            <TextField name='firstName'/>
                          </Grid.Column>
                          <Grid.Column>
                            <TextField name='lastName'/>
                          </Grid.Column>
                        </Grid>
                      </Grid.Row>
                      <Divider hidden/>
                      <Grid.Row>
                        <NumField name='mobileNumber' decimal={false}/>
                      </Grid.Row>
                    </Grid.Column>
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
