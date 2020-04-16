import React from 'react';
import { Input, Image, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {
  render() {
    return (
        <div>
          <Image src='/images/default-profile.jpg' size='small' />
          <Input placeholder={'First Name'} disabled></Input>
          <Input placeholder={'Last Name'} disabled></Input>
          <TextArea placeholder={'Description'} disabled></TextArea>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
User.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(User);
