import React from 'react';
import { Grid, Segment, Header, Container, Image } from 'semantic-ui-react';
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
  description: String,
});

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  constructor() {
    super();
    this.state = {
      group: 'General',
    };
  }

  currentCat = (data) => {
    this.setState({ group: data });
    return this.state.group;
  }

  handleSubmit = () => {
    const { group } = this.state;
    this.setState({ categoryGroup: group });
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { categoryGroup, categoryName, picture, name, quantity, price, description } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date();
    const forSale = true;
    const approvedForSale = true;
    const sold = false;
    const flagged = false;
    const reportReason = 'None';

    Items.insert({
          categoryGroup, categoryName, picture, name, quantity, price, description, createdAt, forSale,
          approvedForSale, sold, flagged, reportReason, owner,
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
    const getGroups = _.uniq(_.pluck((Categories.find({}).fetch()), 'group'));
    const groups = _.map(getGroups, function (cat) { return { key: cat, value: cat, label: cat }; });

    const currentGroup = this.state.group;
    const getNames = _.filter((Categories.find({}).fetch()), function (item) { return item.group === currentGroup; });
    const names = _.map((_.pluck(getNames, 'name')), function (cat) { return { key: cat, value: cat, label: cat }; });

    return (
        <Container className='add-item-form'>
          <Image centered size='tiny' src={'/images/manoalist-circle.png'}/>
          <Header as='h2' textAlign='center'>CREATE A LISTING</Header>
          <Segment>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Grid stackable container>
                <Grid.Row>
                  <TextField name='name' label='Item Name' placeholder='What are you selling?'/>
                </Grid.Row>
                <Grid.Row>
                  <Grid columns={'equal'}>
                    <Grid.Column>
                      <NumField name='price' decimal={false} iconLeft={'dollar'}
                                placeholder={''}/>
                    </Grid.Column>
                    <Grid.Column>
                      <NumField name='quantity' decimal={false} placeholder={'How many are you selling?'}/>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
                <Grid.Row>
                  <TextField name='picture' label='Image' iconLeft='image'
                             placeholder='Insert the URL to your photo.'/>
                </Grid.Row>
                <Grid.Row>
                  <Grid columns={'equal'}>
                    <Grid.Column>
                      <SelectField name='categoryGroup' placeholder='Select a category' onChange={this.currentCat}
                                   value={this.state.group} options={groups} label='Main Category'/>
                    </Grid.Column>
                    <Grid.Column>
                      <SelectField name='categoryName' placeholder='Select a category' options={names}
                                   label='Subcategory'/>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
                <Grid.Row>
                  <LongTextField name='description' label='Description' placeholder='Describe your item.'/>
                </Grid.Row>
                <Grid.Row>
                  <SubmitField value='List'/>
                </Grid.Row>
                <ErrorsField/>
              </Grid>
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
