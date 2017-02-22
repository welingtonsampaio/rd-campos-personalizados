
export default (store) => ({
  path : 'custom_fields',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CustomFieldList = require('./containers/CustomFieldContainer').default
      cb(null, CustomFieldList)
    }, 'custom_field-list')
  }
})
