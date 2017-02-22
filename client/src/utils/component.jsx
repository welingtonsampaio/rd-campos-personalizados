// Importing vendors.
import React from 'react';

// Importing Boom UI Utils
import Request from 'utils/request';

// Defining the <Component />.
class Component extends React.Component {
  constructor(props) {
    super(props);

    this.bindEvent = this.bindEvent.bind(this);
    this.loadApiData = this.loadApiData.bind(this);
    this.defaultError = this.defaultError.bind(this);
  }

  bindEvent(key, kind, fn) {
    let self = this;
    return (event, ...args) => {
      switch(kind) {
        case 'input':
        case 'textarea':
          this.setState({
            [key]: event.target.value
          }, fn);
          break;
        case 'select':
          this.setState({
            [key]: args[0]
          }, fn);
          break;
        case 'check':
          this.setState({
            [key]: args[0]
          }, fn);
          break;
      }
    }
  }

  loadApiData(path, fn, err) {
    let self = this;
    let request = new Request();
    request
      .setUrl(`${window.API_URL}/api/${path}`)
      .do()
      .then((...args) => {
        if (self.loaded >= 0) {
          self.loaded++
        }
        fn.apply(self, args)
      })
      .catch((...args) => {
        err.apply(self, args)
      })
  }

  defaultError(err) {
    // TODO: Aplicar toastr
    console.log(err);
    alert(JSON.stringify(err));
  }
}

export default Component;
