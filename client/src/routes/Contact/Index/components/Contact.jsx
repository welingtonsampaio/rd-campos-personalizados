// Importing vendors
import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { Paper, RaisedButton } from 'material-ui';

// Importing Material UI components.

// Project Imports
import {Component, Request} from 'utils';

// Importing component's styles.
import css from './Contact.scss';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    let req = new Request();
    req.setUrl('/v1/contacts')
      .do()
      .then((response) => {
        this.setState({
          contacts: response,
          loading: false
        });
      })
      .catch((err) => {
        console.error(err);
        alert(arguments)
      });
  }

  renderLoading() {
    return (
      <div style={{width: 500}}>
        <h1>Loading...</h1>
      </div>
    )
  }

  renderTable() {
    let tableContent = () => {
      if (!this.state.contacts) { return null; }
      return (
        this.state.contacts.map((contact) => {
          return (
            <TableRow>
              <TableRowColumn>{contact.id}</TableRowColumn>
              <TableRowColumn>{contact.name}</TableRowColumn>
              <TableRowColumn>{contact.email}</TableRowColumn>
              <TableRowColumn>{contact.email}</TableRowColumn>
            </TableRow>
          )
        })
      );
    };

    return (
      <Paper zDepth={3} style={{padding: '25px', margin: '25px'}}>
        <div style={{marginBottom: '25px'}}>
          <Link to="/contacts/new">
            <RaisedButton primary={true} label="Criar novo contato" />
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableContent()}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    return this.props.loading ? this.renderLoading() : this.renderTable()
  }
}

// Prop Type definitions
Contact.propTypes = {
};

export default Contact

