import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Form, Input, Select, Container, Segment, Button, Message, Image, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Contactus } from '../../api/mail/Contactus';


class Contact extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { name: '', subject: '', issueType: '', content: '', email: '',
      error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signin submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { name, subject, issueType, content, email } = this.state;
    if (this.state.name === '') {
      this.setState({ name: 'customer' });
    } else if (this.state.subject === '') {
      this.setState({ error: 'Subject cannot be empty' });
    } else if (this.state.issueType === '') {
      this.setState({ error: 'Please select the issue type' });
    } else if (this.state.content === '') {
      this.setState({ error: 'Content cannot be empty' });
    } else if (!/^([a-z0-9_-]+)@hawaii.edu$/.test(this.state.email)) {
      this.setState({ error: 'Please correctly enter your email address as xxx@hawaii.edu' });
    } else {
      Contactus.insert({ name, subject, issueType, content, email });
      this.setState({ error: '', redirectToReferer: true });
      swal('Thank you!', 'We will contact you soon', 'success');
    }
  };

  render() {
    const typeOptions = [
      { key: 'b', text: 'Bug', value: 'Bug' },
      { key: 'a', text: 'Advise', value: 'Advise' },
      { key: 'o', text: 'Other', value: 'other' },
    ];
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Image centered size='tiny' src={'/images/manoalist-circle.png'}/>
          <Header as='h2' textAlign='center'>Contact Us</Header>
          <Segment>
        <Form onSubmit={this.submit}>
          <Form.Group widths='equal'>
            <Form.Input
                label='Name'
                name='name'
                type='name'
                placeholder='Name'
                onChange={this.handleChange}
            />
            <Form.Input required
                label='Subject'
                name='subject'
                type='subject'
                placeholder='Subject'
                onChange={this.handleChange}
            />
            <Form.Field required
                control={Select}
                options={typeOptions}
                label={{ children: 'Type', htmlFor: 'form-select-control-type' }}
                name='issueType'
                placeholder='Issue Type'
                search
                searchInput={{ id: 'form-select-control-issueType' }}
                onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea required
              label='Content'
              name='content'
              type='content'
              placeholder='Describe your opinion...'
              onChange={this.handleChange}
          />
          <Form.Field required
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              name='email'
              placeholder='xxx@hawaii.edu'
              onChange={this.handleChange}
          />
          <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Confirm'
              label='Submit'
          />
        </Form>
            {this.state.error === '' ? (
                ''
            ) : (
                <Message
                    error
                    header="Submission was not successful"
                    content={this.state.error}
                />
            )}
          </Segment>
        </Container>
    );
  }
}
Contact.propTypes = {
  location: PropTypes.object,
};
export default withTracker(() => {
  // Get access to Contactus documents.
  const subscription = Meteor.subscribe('Contactus');
  return {
    ready: subscription.ready(),
  };
})(Contact);
