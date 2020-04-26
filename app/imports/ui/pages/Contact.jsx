import React from 'react';
import { Form, Input, TextArea, Select, Container, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Contactus } from '../../api/mail/Contactus';

class Contact extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', issueType: '', content: '', email: '' };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signin submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, issueType, opinion, email } = this.state;
    Contactus.insert({ firstName, lastName, issueType, opinion, email });
    swal('Success', 'We will contact you soon', 'success');
  };

  render() {
    const typeOptions = [
      { key: 'b', text: 'Bug', value: 'Bug' },
      { key: 'a', text: 'Advise', value: 'Advise' },
      { key: 'o', text: 'Other', value: 'other' },
    ];
    return (
        <Container>
          <Segment>
        <Form onSubmit={this.submit}>
          <Form.Group widths='equal'>
            <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                name='firstName'
                placeholder='First name'
                onChange={this.handleChange}
            />
            <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                name='lastName'
                placeholder='Last name'
                onChange={this.handleChange}
            />
            <Form.Field
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
          <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Opinion'
              name='content'
              placeholder='Describe your opinion...'
              onChange={this.handleChange}
          />
          <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              name='email'
              placeholder='joe@schmoe.com'
              error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
              }}
              onChange={this.handleChange}
          />
          <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Confirm'
              label='Submit'
          />
        </Form>
          </Segment>
        </Container>
    );
  }
}
export default Contact;
