// Importing vendors
import React from 'react';
import cx from 'classnames';

// Importing Material UI components.

// Project Imports

// Importing component's styles.
import css from './Contact.scss';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    this.setState({loading: true});
  }


  renderLoading() {
    return (
      <div style={{width: 500}}>
        <h1>Loading...</h1>
      </div>
    )
  }

  render() {
    return this.props.loading ? this.renderLoading() : this.renderSignin()
  }
}

// Prop Type definitions
Login.propTypes = {
};

export default Contact

