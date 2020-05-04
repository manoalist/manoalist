import React from 'react';
import { Grid, Loader, Header, Segment, Image } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, NumField, SelectField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { User } from '../../api/user/User';
import 'uniforms-bridge-simple-schema-2';
import { Categories } from '../../api/category/Category';
import { Items, ItemSchema } from '../../api/item/Item';

/** Renders the Page for editing a single document. */
class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferer: false,
      // eslint-disable-next-line react/prop-types
      group: props.match.params.group,
    };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, price, quantity, picture, categoryGroup, categoryName, description, _id } = data;
    Items.update(_id, { $set: { name, price, quantity, description, picture, categoryGroup, categoryName } },
        (error) => {
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

  getGroup(category, array) {
    const temp = category.group;
    let isInArray = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === temp) {
        isInArray = true;
      }
    }
    if (!isInArray) {
      array.push(temp);
    }
    array.sort();
  }

  handleChange = (name, value) => {
    if (name === 'categoryGroup') {
      this.setState({ group: value });
    }
  };

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/profile'}/>;
    }
    const array = [];
    this.props.categories.map((category) => this.getGroup(category, array));
    const groups = [];
    const names = [];
    array.map((category) => groups.push({ key: category, value: category, label: category }));
    this.props.categories.filter((category) => category.group === this.state.group)
        .map((category) => names.push({ key: category.name, value: category.name, label: category.name }));
    return (
    <Grid container
          centered>
      {this.props.doc && this.props.oldGroup === this.props.doc.categoryGroup
      && User.findOne({}).email === this.props.doc.owner ?
       <Grid.Column>
         <Image centered size='tiny' src={'/images/manoalist-circle.png'}/>
        <Header as="h2"
                textAlign="center">Edit Item</Header>
        <AutoForm schema={ItemSchema}
                  onSubmit={data => this.submit(data)}
                  model={this.props.doc}
                  onChange={this.handleChange}>
          <Segment>
            <Grid stackable
                  container>
              <Grid.Row>
                <TextField name='name'/>
              </Grid.Row>
              <Grid.Row>
                <Grid stackable
                      columns={'equal'}>
                  <Grid.Column>
                    <NumField name='price' iconLeft='dollar'/>
                  </Grid.Column>
                  <Grid.Column>
                    <NumField name='quantity'
                              decimal={false}/>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
              <Grid.Row>
                <TextField name='picture'
                           iconLeft='image'/>
              </Grid.Row>
              <Grid.Row>
                <Grid columns={'equal'}>
                  <Grid.Column>
                    <SelectField name='categoryGroup'
                                 options={groups}
                                 label={'MainCategory'}/>
                  </Grid.Column>
                  <Grid.Column>
                    <SelectField name='categoryName'
                                 label='Subcategory'
                                 options={names}/>
                  </Grid.Column>
                </Grid>
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
      </Grid.Column> : <Header as="h2" textAlign="center">Page not found</Header>}
    </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditItem.propTypes = {
  doc: PropTypes.object,
  oldGroup: PropTypes.string.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const documentGroup = match.params.group;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  const subscription2 = Meteor.subscribe('Categories');
  return {
    doc: Items.findOne(documentId),
    oldGroup: documentGroup,
    categories: Categories.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(EditItem);
