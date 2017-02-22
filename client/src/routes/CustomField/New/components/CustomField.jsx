// Importing vendors
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Paper, RaisedButton, MenuItem, Checkbox } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import {toastr} from 'react-redux-toastr'

// Importing Material UI components.

// Project Imports
import {Component, Request} from 'utils';

// Importing component's styles.
import css from './CustomField.scss';


class CustomField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      label: null,
      required: false,
      options: ''
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.doForm = this.doForm.bind(this);
  }

  componentWillMount() {

  }

  renderLoading() {
    return (
      <div style={{width: 500}}>
        <h1>Loading...</h1>
      </div>
    )
  }

  optionsComponent() {
    if (this.state.model != 'combobox') {
      return <div />
    }

    return (
      <div>
        <p>Adicione uma opção por linha</p>
        <FormsyText
          name="optionsField"
          required
          floatingLabelText="Opções, uma por linha"
          fullWidth={true}
          onChange={this.bindEvent('options', 'input')}
          validations="minLength:4"
          multiLine={true}
        >
        </FormsyText>
      </div>
    )
  }

  doForm() {
    let r = new Request();
    r.setUrl('/v1/custom_fields')
      .setMethod('POST')
      .setData({
        custom_field: {
          label: this.state.label,
          model: this.state.model,
          required: this.state.required,
          options: (this.state.options || "").split("\n")
        }
      })
      .do()
      .then(() => {
        toastr.success('Campo presonalizado', 'Campo adicionado com sucesso');
        browserHistory.push('/custom_fields');
      })
      .catch(this.defaultError)
  }

  renderForm() {
    return (
      <Paper zDepth={3} style={{padding: '25px', margin: '25px'}}>
        <h1>Novo contact</h1>
        <Formsy.Form onValidSubmit={this.doForm}>
          <FormsyText
            name="labelField"
            required
            floatingLabelText="Label"
            fullWidth={true}
            onChange={this.bindEvent('label', 'input')}
            validations="minLength:4"
            validationErrors={{
              minLength: 'Deve conter pelo menos 4 caracteres'
            }}
          />

          <FormsySelect
            name="modelField"
            required
            fullWidth={true}
            floatingLabelText="Tipo do campo"
            onChange={this.bindEvent('model', 'select')}>
            <MenuItem value="text"     primaryText="Texto" />
            <MenuItem value="textarea" primaryText="Caixa de texto" />
            <MenuItem value="combobox" primaryText="Caixa de seleção" />
          </FormsySelect>

          <div>
            {this.optionsComponent()}
          </div>

          <div>
            <Checkbox label="Campo obrigatório?" onCheck={this.bindEvent('required', 'check')}/>
          </div>

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
CustomField.propTypes = {
};

export default CustomField

