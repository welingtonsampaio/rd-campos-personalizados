
export default (store) => ({
  path : 'contacts',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ContactList = require('./containers/ContactContainer').default
      cb(null, ContactList)
    }, 'contact-list')
  }
})
