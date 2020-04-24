import React from 'react';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/Item';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  categoryGroup: String,
  categoryName: String,
  picture: String,
  name: String,
  quantity: Number,
  price: Number,
  owner: String,
  description: String,
});

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { categoryGroup, categoryName, picture, name, quantity, price, owner, description } = data;
    const user = Meteor.user().username;
    Items.insert({ categoryGroup, categoryName, picture, name, quantity, price, owner, description, user },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Container className='add-item-form'>
          <Header as='h2' textAlign='center'>Create a Listing</Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
            <Segment className='test'>
              <TextField name='name' placeholder='What are you selling?'/>
              <TextField name='picture' label='Image' placeholder='Insert the URL to your photo.'/>
              <TextField name='owner' label='Email' placeholder='Enter your email here.'/>
              <LongTextField name='description' label='Description' placeholder='Describe your item.'/>
              <Grid stackable columns={4}>
                  <Grid.Column><NumField name='price' decimal={false} icon={'dollar'} iconLeft/></Grid.Column>
                  <Grid.Column><NumField name='quantity' decimal={false}/></Grid.Column>
                  <Grid.Column><TextField name='categoryGroup'/></Grid.Column>
                  <Grid.Column><TextField name='categoryName'/></Grid.Column>
                <Grid.Column>
                  <SubmitField value='List'/>
                </Grid.Column>
              </Grid>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Container>
    );
  }
}

export default AddItem;
