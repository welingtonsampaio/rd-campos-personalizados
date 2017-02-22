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
import css from './CustomField.scss';


class CustomField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    let req = new Request();
    req.setUrl('/v1/custom_fields')
      .do()
      .then((response) => {
        this.setState({
          custom_fields: response,
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
      if (!this.state.custom_fields) { return null; }
      return (
        this.state.custom_fields.map((custom_field) => {
          return (
            <TableRow>
              <TableRowColumn>{custom_field.id}</TableRowColumn>
              <TableRowColumn>{custom_field.label}</TableRowColumn>
              <TableRowColumn>{custom_field.model}</TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          )
        })
      );
    };

    return (
      <Paper zDepth={3} style={{padding: '25px', margin: '25px'}}>
        <div style={{marginBottom: '25px'}}>
          <Link to="/custom_fields/new">
            <RaisedButton primary={true} label="Criar novo campo personalizado" />
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>Tipo</TableHeaderColumn>
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
CustomField.propTypes = {
};

export default CustomField

