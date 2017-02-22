import { connect } from 'react-redux'

// Importing stored methods.
import { request, set } from 'store/auth'

import Login from '../components/Login'

const mapDispatchToProps = {
  set,
  request,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
