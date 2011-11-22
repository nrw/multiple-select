Form = require("couchtypes/forms").Form
fields = require("couchtypes/fields")
widgets = require('./widgets')
types = require('./types')
_ = require('underscore')._

exports.registration_form = (rows) ->
  new Form(fields: _.extend(types.registration.fields,
    events: fields.array(
      parse: (raw) ->
        JSON.parse raw

      widget: widgets.multicheckbox({rows: rows})
    )
  ))

