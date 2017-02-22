import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'
import ReduxToastr from 'react-redux-toastr';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { actions } from 'store/auth';

import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenu() {
    return (
      <header>
        <nav>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <Link to='/contacts'>
                <MenuItem>
                  Contatos
                </MenuItem>
              </Link>
              <Link to='/custom_fields'>
                <MenuItem>
                  Campos personalizados
                </MenuItem>
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </nav>
      </header>
    );
  }

  renderHeader() {
    return  (
      <div>
        {this.handleMenu()}
      </div>
    );
  }

  render() {
    const login = <div style={{height: '100%'}}>{this.props.children}</div>;

    const logged = (
      <div>
        {this.renderHeader()}
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates={true}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <div>
          {this.props.children}
        </div>
      </div>
    );

    return (
      <MuiThemeProvider>
        {this.props.auth.logged ? logged : login}
      </MuiThemeProvider>
    );
  }
}

CoreLayout.defaultProps = {
  isLiveEditor: false,
};

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  auth: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  request: actions.request,
  logout: () => actions.logout(),
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
