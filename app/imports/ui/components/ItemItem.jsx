import React from 'react';
import { Card, Image, Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter, Link } from 'react-router-dom';
import { Items } from '../../api/item/Item';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ItemItem extends React.Component {
  handleClick = () => this.reportItem(this.props.item._id);

  reportItem(id) {
    swal({
      title: 'Report',
      text: 'Please provide the reason for reporting\n(no more than 100 words):',
      content: 'input',
      buttons: {
        cancel: 'Cancel',
        confirm: 'Report',
      },
    }).then((value) => {
      let str = value;
      if (value !== null) {
        str = str.replace(/(^\s*)|(\s*$)/gi, '');
        str = str.replace(/[ ]{2,}/gi, ' ');
        str = str.replace(/\n /, '\n');
        if (str.split(' ').length <= 100) {
          Items.update({ _id: id.toString() }, { $set: { flagged: 'true' } });
          Items.update({ _id: id.toString() }, { $set: { reportReason: value } });
        } else {
          swal('Error', 'Input cannot exceed 100 words', 'error');
        }
      }
    });
  }

  render() {
    return (
        <Link to={`/details/${this.props.item._id}`}>
        <Card centered>
          <Container style={{ height: '300px' }}>
              <Image centered src={this.props.item.picture} style={{ maxHeight: '300px' }}/>
          </Container>
          <Card.Content>
              <Card.Header>{this.props.item.name}</Card.Header>
              <Card.Meta>price: ${this.props.item.price}</Card.Meta>
              <Card.Meta>quantity: {this.props.item.quantity}</Card.Meta>
              <Card.Description>{this.props.item.description}</Card.Description>
              <Card.Meta>post at {this.props.item.createdAt.toLocaleDateString('en-US')}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
                Contact Information: <a href={'/profile'}>{this.props.item.owner}</a>
          </Card.Content>
          <Card.Content extra>
            <Button content={'report'} disabled={this.props.item.flagged}
                    color={'red'} onClick={this.handleClick}/>
            <Button toggle icon={'heart'} color={'red'} inverted floated={'right'}/>
          </Card.Content>
        </Card>
        </Link>
    );
  }
}

/** Require a document to be passed to this component. */
ItemItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ItemItem);
