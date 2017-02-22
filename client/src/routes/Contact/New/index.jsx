export default (store) => ({
  path : '/contacts/new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ContactNew = require('./containers/ContactContainer').default
      cb(null, ContactNew)
    }, 'contact-new')
  }
})
