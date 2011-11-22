(function() {
  var Form, fields, types, widgets, _;

  Form = require("couchtypes/forms").Form;

  fields = require("couchtypes/fields");

  widgets = require('./widgets');

  types = require('./types');

  _ = require('underscore')._;

  exports.registration_form = function(rows) {
    return new Form({
      fields: _.extend(types.registration.fields, {
        events: fields.array({
          parse: function(raw) {
            return JSON.parse(raw);
          },
          widget: widgets.multicheckbox({
            rows: rows
          })
        })
      })
    });
  };

}).call(this);
