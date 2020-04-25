import React from 'react';
import { Form, Input, TextArea, Button, Select, Container, Segment } from 'semantic-ui-react';


class Contact extends React.Component {
  render() {
    const genderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
      { key: 'o', text: 'Other', value: 'other' },
    ];

    return (
        <Container>
          <Segment>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
            />
            <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
            />
            <Form.Field
                control={Select}
                options={genderOptions}
                label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                placeholder='Gender'
                search
                searchInput={{ id: 'form-select-control-gender' }}
            />
          </Form.Group>
          <Form.Field
              id='form-textarea-control-opinion'
              control={TextArea}
              label='Opinion'
              placeholder='Describe your opinion...'
          />
          <Form.Field
              id='form-input-control-error-email'
              control={Input}
              label='Email'
              placeholder='joe@schmoe.com'
              error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
              }}
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
