import React from 'react';
import { Grid, Header, Image, Segment, Button, Container,
  Input, Divider, Message, Dropdown, Select } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Categories } from '../../api/category/Category';
import { Items } from '../../api/item/Item';

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: '',
      newName: '',
      error: '',
      deleteGroup: '',
      deleteName: '',
      deleteError: '',
    };
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

  handleInputGroupChange = (e) => {
    this.setState({ newGroup: e.target.value });
  };

  handleInputNameChange = (e) => {
    this.setState({ newName: e.target.value });
  };

  // click add will add new category
  handleClick = () => {
    if (this.state.newName.length <= 0) {
      this.setState({ error: 'the category name cannot be empty!' });
    } else if (this.state.newGroup.length <= 0) {
      this.setState({ error: 'the category group cannot be empty!' });
    } else {
      // check if category is already exist in this group
      const groups = this.props.categories.filter(category => category.group === this.state.newGroup);
      const isInList = groups.includes(groups.find((category) => (category.name === this.state.newName)));
      if (isInList) {
        this.setState({ error: 'this category already exist!!' });
      } else {
        this.setState({ error: '' });
        // Categories.Insert({ group: this.state.newGroup, name: this.state.newName });
        swal('Congrats!', 'New Category has been created.', 'success');
        Categories.insert({ group: this.state.newGroup, name: this.state.newName });
      }
    }
    };

  handleGroupChange = (e, { value }) => {
    this.setState({ deleteGroup: value });
  };

  handleNameChange = (e, { value }) => {
    this.setState({ deleteName: value });
  };

  handleDeleteClick = () => {
    const numOfItemsInCategory = this.props.items
        .filter((item) => item.categoryGroup === this.state.deleteGroup)
        .filter((item) => item.categoryName === this.state.deleteName).length;
    if (numOfItemsInCategory > 0) {
      this.setState({ deleteError: 'ERROR: There are items in this category!!!' });
    } else {
      Categories.remove({ _id: this.props.categories.filter((category) => category.group === this.state.deleteGroup)
            .find((category) => category.name === this.state.deleteName)._id });
    }
  };

  render() {
    const array = [];
    const options = [];
    const deleteOptions = [];
    this.props.categories.map((category) => this.getGroup(category, array));
    array.map((category) => options.push({ text: category, value: category }));
    this.props.categories.filter((cate) => cate.group === this.state.deleteGroup)
        .map((category) => deleteOptions.push({ text: category.name, value: category.name }));
    return (
        <div>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
                  <Segment stacked>
                    <Header as="h1" textAlign="center" style={{ color: '#024731', marginBottom: '25px' }}>
                      Create New Category
                    </Header>
                    <div style={{ marginBottom: '15px' }}>
                      <Image src={'/images/manoalist-circle.png'} size={'tiny'} centered/>
                    </div>
                    <Container textAlign={'center'}>
                      <Input label={{ content: 'Category Group: ', color: 'green' }} style={{ marginRight: '20px' }}
                             onChange={this.handleInputGroupChange}/>
                      <Input label={{ content: 'Category Name: ', color: 'teal' }}
                             onChange={this.handleInputNameChange}/>
                      <Divider hidden/>
                      <Button style={{ backgroundColor: '#024731', color: 'white', float: 'right' }}
                              onClick={this.handleClick}>ADD</Button>
                    </Container>
                    <Divider hidden/>
                    <Divider hidden/>
                  </Segment>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Adding was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          {/* the list of category */}
          <Container>
            <Header as={'h1'} content={'Category List'}/>
            <Segment stacked>
            <Grid container>
              {array.map((group) => <Grid.Row key={array.indexOf(group)}
                                              group={group}
                                              columns={8}>
                <Header as={'h2'} color={'green'} content={group}/>
                {Categories.find({ group: group }).fetch().map((category) => <Grid.Column
                    key={category.name}><Header as={'h3'} color={'teal'}>{category.name}</Header></Grid.Column>)}
              </Grid.Row>)}
            </Grid>
          </Segment>
          <Divider/>
          </Container>

          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column style={{ marginTop: '65px', marginBottom: '100px' }}>
              <Segment stacked style={{ backgroundColor: '#FFF6F6', borderColor: '#912D2B' }}>
                <Header as="h1" textAlign="center" style={{ color: '#912D2B', marginBottom: '25px' }}>
                  Delete Category
                </Header>
                <div style={{ marginBottom: '15px' }}>
                  <Image src={'/images/manoalist-circle.png'} size={'tiny'} centered/>
                </div>
                <Container textAlign={'center'}>
                  <Grid columns={2}>
                    <Grid.Column><Header color={'green'} content={'Category Group'}/>
                    <Select onChange={this.handleGroupChange} options={options} clearable/>
                  </Grid.Column>
                    <Grid.Column><Header color={'teal'} content={'Category Name'}/>
                      <Dropdown clearable
                                options={deleteOptions}
                                onChange={this.handleNameChange}
                                selection/>
                    </Grid.Column></Grid>
                  <Divider hidden/>
                  <Button style={{ float: 'right' }}
                          onClick={this.handleDeleteClick} color={'red'}>Delete</Button>
                </Container>
                <Divider hidden/>
                <Divider hidden/>
              </Segment>
              {this.state.deleteError === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Deleting was not successful"
                      content={this.state.deleteError}
                  />
              )}
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
AddCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};
const subscription = Meteor.subscribe('Categories');
const subscription2 = Meteor.subscribe('Items');
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const AddContainer = withTracker(() => ({
  categories: Categories.find({}).fetch(),
  items: Items.find({}).fetch(),
  ready: subscription.ready() && subscription2.ready(),
}))(AddCategory);
export default withRouter(AddContainer);
