import React from 'react';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField, NumField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Items } from '../../api/item/Item';
import { Categories } from '../../api/category/Category';

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

  constructor() {
    super();
    this.state = {
      group: 'School',
    };
  }

  handleChange = (data) => {
    this.setState({ group: data });
    return this.state.group;
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { categoryGroup, categoryName, picture, name, quantity, price, owner, description } = data;
    const user = Meteor.user().username;
    const createdAt = new Date();
    const forSale = true;
    const approvedForSale = true;
    const sold = false;
    const flagged = false;
    const reportReason = 'None';

    Items.insert({
          categoryGroup, categoryName, picture, name, quantity, price, owner, description, createdAt,
          forSale, approvedForSale, sold, flagged, reportReason, user,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item listed successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const array = _.uniq(_.pluck((Categories.find({}).fetch()), 'group'));
    const groups = _.map(array, function (cat) {
      return { key: cat, value: cat, label: cat };
    });

    const groupName = this.state.group;

    const cats = Categories.find({}).fetch();
    const lol = _.filter(cats, function (item) {
      return item.group === groupName;
    });
    const names = _.pluck(lol, 'name');
    const names2 = _.map(names, function (cat) {
      return { key: cat, value: cat, label: cat };
    });

    return (
        <Container className='add-item-form'>
          <Header as='h2' textAlign='center'>Create a Listing</Header>
          <Segment>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <TextField name='name' placeholder='What are you selling?'/>
              <TextField name='picture' label='Image' placeholder='Insert the URL to your photo.'/>
              <TextField name='owner' label='Email' placeholder='Enter your email here.'/>
              <LongTextField name='description' label='Description' placeholder='Describe your item.'/>
              <Grid stackable columns={4}>
                <Grid.Column><NumField name='price' decimal={false} icon={'dollar'} iconLeft/></Grid.Column>
                <Grid.Column><NumField name='quantity' decimal={false}/></Grid.Column>
                <Grid.Column>
                  <SelectField placeholder='Select a category' value={this.state.group}
                               onChange={this.handleChange} options={groups} name='categoryGroup'
                               label='Category Group'/>
                </Grid.Column>
                <Grid.Column>
                  <SelectField name='categoryName' placeholder='Select a category' options={names2} label='Subcategory'
                  />
                </Grid.Column>
                <Grid.Column>
                  <SubmitField value='List'/>
                </Grid.Column>
              </Grid>
              <ErrorsField/>
            </AutoForm>
          </Segment>
        </Container>
    );
  }
}

AddItem.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Categories');
  return {
    categories: Categories.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddItem);
