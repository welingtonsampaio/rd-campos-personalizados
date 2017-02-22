// Importing vendors
import React from 'react';
import {browserHistory, Link} from 'react-router';
import { Paper, RaisedButton, MenuItem } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import {toastr} from 'react-redux-toastr'

// Importing Material UI components.

// Project Imports
import {Component, Request} from 'utils';

// Importing component's styles.
import css from './Contact.scss';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingCustomFields: true,

      custom_fields: []
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.doForm = this.doForm.bind(this);
  }

  componentWillMount() {
    let r2 = new Request();
    r2.setUrl('/v1/custom_fields')
      .do()
      .then((response) => {
        this.setState({
          custom_fields: response,
          loadingCustomFields: false
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

  renderCustomFields() {
    if (this.state.loadingCustomFields) {
      return (
        <div>
          <h2>Campos Presonalizados</h2>
          {this.renderLoading()}
        </div>
      )
    }

    if (this.state.custom_fields.length == 0) {
      return (
        <div>
          <h2>Campos Presonalizados</h2>
          <p>nenhum campo personalizado encontrado.</p>
          <Link to="/custom_fields/new">
            <RaisedButton primary={true} label="Adicionar campo personalizado" />
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h2>Campos Presonalizados</h2>
        {this.state.custom_fields.map((cf) => {
          switch (cf.model) {
            case 'text':
              return (
                <FormsyText
                  name={`customField_${cf.id}`}
                  required={cf.required}
                  floatingLabelText={cf.label}
                  fullWidth={true}
                  onChange={this.bindEvent(`customField_${cf.id}`, 'input')}
                />
              );
              break;
            case 'textarea':
              return (
                <FormsyText
                  name={`customField_${cf.id}`}
                  required={cf.required}
                  floatingLabelText={cf.label}
                  fullWidth={true}
                  multiLine={true}
                  onChange={this.bindEvent(`customField_${cf.id}`, 'input')}
                />
              );
            case 'combobox':
              return (
              <FormsySelect
                name={`customField_${cf.id}`}
                required={cf.required}
                floatingLabelText={cf.label}
                fullWidth={true}
                onChange={this.bindEvent(`customField_${cf.id}`, 'select')}>
                {(cf.options || []).map((opt) => {
                  return <MenuItem value={opt} primaryText={opt} />
                })}
              </FormsySelect>
              );
          }
        })}
      </div>
    );
  }

  doForm() {
    let data = {
      contact: {
        name: this.state.name,
        email: this.state.email
      }
    };
    if (this.state.custom_fields && this.state.custom_fields.length > 0) {
      data.field_contents = this.state.custom_fields.map((cf) => {
        return {
          value: this.state[`customField_${cf.id}`],
          custom_field_id: cf.id
        }
      })
    }
    let r = new Request();
    r.setUrl('/v1/contacts')
      .setMethod('POST')
      .setData(data)
      .do()
      .then(() => {
        toastr.success('Contato', 'contato criado com sucesso');
        browserHistory.push('/contacts');
      })
      .catch(this.defaultError)
  }

  renderForm() {
    return (
      <Paper zDepth={3} style={{padding: '25px', margin: '25px'}}>
        <h1>Novo contact</h1>
        <Formsy.Form onValidSubmit={this.doForm}>
          <FormsyText
            name="nameField"
            floatingLabelText="Nome completo"
            fullWidth={true}
            onChange={this.bindEvent('name', 'input')}
            validations="minLength:6"
            validationErrors={{
              minLength: 'Deve conter pelo menos 6 caracteres'
            }}
          />

          <FormsyText
            name="emailField"
            required
            floatingLabelText="e-mail*"
            fullWidth={true}
            onChange={this.bindEvent('email', 'input')}
            validations="isEmail"
            validationErrors={{
              isEmail: 'O e-mail inserido não é válido.'
            }}
          />

          {this.renderCustomFields()}

          <RaisedButton type="submit" label="cadastrar" primary={true} />

        </Formsy.Form>
      </Paper>
    )
  }

  render() {
    return this.props.loading ? this.renderLoading() : this.renderForm()
  }
}

// Prop Type definitions
Contact.propTypes = {
};

export default Contact

