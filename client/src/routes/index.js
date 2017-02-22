import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import LoginRoute from './Auth/Login';
import Home from './Home';

import ContactRoute from './Contact/Index';
import ContactNewRoute from './Contact/New';

import CustomFieldRoute from './CustomField/Index';
import CustomFieldNewRoute from './CustomField/New';


export const authMetric = store => {
  return (nextState, replace) => {
    if (store.getState().auth.logged || nextState.location.pathname == '/auth/prosite/login') {
      return true
    }
    replace({
      pathname: '/auth/prosite/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
};

export const createRoutes = store => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  onEnter     : authMetric(store),
  store       : store,
  childRoutes : [
    LoginRoute(store),

    ContactRoute(store),
    ContactNewRoute(store),

    CustomFieldRoute(store),
    CustomFieldNewRoute(store)
  ]
});

export default createRoutes
