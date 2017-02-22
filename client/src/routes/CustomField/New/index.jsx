export default (store) => ({
  path : '/custom_fields/new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CustomFieldNew = require('./containers/CustomFieldContainer').default
      cb(null, CustomFieldNew)
    }, 'custom_field-new')
  }

})
