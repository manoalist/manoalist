import React from 'react';
import { Grid, Header, Image, Segment, Button, Container, Input, Divider, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Categories } from '../../api/category/Category';

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: '',
      newName: '',
      error: '',
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

  render() {
    const array = [];
    this.props.categories.map((category) => this.getGroup(category, array));
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
          <Container><Segment stacked>
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
        </div>
    );
  }
}
AddCategory.propTypes = {
  categories: PropTypes.array.isRequired,
};
const subscription = Meteor.subscribe('Categories');
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const AddContainer = withTracker(() => ({
  categories: Categories.find({}).fetch(),
  ready: subscription.ready(),
}))(AddCategory);
export default withRouter(AddContainer);
