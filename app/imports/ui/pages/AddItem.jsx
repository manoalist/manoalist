import React from 'react';
import { Grid, Segment, Header, Container, Image, Button, Loader } from 'semantic-ui-react';
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
import { User } from '../../api/user/User';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  categoryGroup: String,
  categoryName: String,
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
      images: '',
      processingImages: false, // Used to make sure images are processed before submission
    };

    this.processPhoto = this.processPhoto.bind(this);
    this.submit = this.submit.bind(this);
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    console.log(data, formRef);
    let picture = this.state.images;
    
    const { categoryGroup, categoryName, name, quantity, price, description } = data;
    const owner = Meteor.user().username;
    const buyer = '';
    const createdAt = new Date();
    const forSale = true;
    const approvedForSale = true;
    const sold = false;
    const flagged = false;
    const reportReason = 'None';
    const ownerImage = User.find({}).fetch()[0].image;
    const numberOfLike = 0;

    Items.insert({
          categoryGroup, categoryName, picture, name, quantity, price, description, createdAt, forSale,
          approvedForSale, sold, flagged, reportReason, ownerImage, owner, buyer, numberOfLike,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item listed successfully', 'success');
            formRef.reset();
            this.setState({ images: '' });
          }
        });
  }

  processPhoto(event) {
    event.preventDefault();
    console.log(event.target.files);
    
    var i = 0;
    var read = false;
    let reader = new FileReader();
    let processedImages = [];
    const files = event.target.files;
    
    this.setState({ processingImages: true }, () => {
      console.log(files);
      
      reader.onloadend = () => {
        console.log(i);
        
        console.log(reader.result)
        processedImages.push(reader.result);
        console.log(processedImages);
        i++;
  
        if (files[i]) {
          reader.readAsDataURL(files[i]);
        } else if (processedImages.length === files.length) {
          this.setState({ images: processedImages.join(',:;'), processingImages: false })
          console.log(processedImages, "This almost did it");
        }
      }

      reader.readAsDataURL(files[0]);
    })
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const getGroups = _.uniq(_.pluck((Categories.find({}).fetch()), 'group'));
    const groups = _.map(getGroups, function (cat) {
      return { key: cat, value: cat, label: cat };
    });

    const currentGroup = this.state.group;
    const getNames = _.filter((Categories.find({}).fetch()), function (item) {
      return item.group === currentGroup;
    });
    const names = _.map((_.pluck(getNames, 'name')), function (cat) {
      return { key: cat, value: cat, label: cat };
    });

    return (
        <Container className='add-item-form'>
          <Image centered size='tiny' src={'/images/manoalist-circle.png'}/>
          <Header as='h2' textAlign='center'>CREATE A LISTING</Header>
          <Segment>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}
                      onChange={(key, value) => {
                        if (key === 'categoryGroup') {
                          this.setState({ group: value });
                          return this.state.group;
                        }
                        return this.state.group;
                      }}>
              <Grid stackable container>
                <Grid.Row>
                  <TextField name='name' label='Item Name' placeholder='What are you selling?'/>
                </Grid.Row>
                <Grid.Row>
                  <Grid stackable columns={'equal'}>
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
                  <label for="profile_pic">Choose images to upload</label>
                  <input type="file" id="profile_pic" name="picture"
                        accept=".jpg, .jpeg, .png" onChange={this.processPhoto} multiple/>
                </Grid.Row>
                <Grid.Row>
                  <Grid stackable columns={'equal'}>
                    <Grid.Column>
                      <SelectField name='categoryGroup' placeholder='Select a category' options={groups}
                                   label='Main Category'/>
                    </Grid.Column>
                    <Grid.Column>
                      <SelectField name='categoryName' placeholder='Select a subcategory' options={names}
                                   label='Subcategory'/>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
                <Grid.Row>
                  <LongTextField name='description' label='Description' placeholder='Describe your item.'/>
                </Grid.Row>
                <Grid.Row>
                  { !this.state.processingImages ? <SubmitField value='List'/> : <div><Loader active inline /> <span>Processing data...</span></div> }
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
  const subscription2 = Meteor.subscribe('User');
  return {
    categories: Categories.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(AddItem);
