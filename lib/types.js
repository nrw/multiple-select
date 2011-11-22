(function() {
  var Type, fields;

  Type = require("couchtypes/types").Type;

  fields = require("couchtypes/fields");

  exports.person = new Type("person", {
    fields: {
      name: fields.string()
    }
  });

  exports.registration = new Type("registration", {
    fields: {
      persons: fields.array()
    }
  });

}).call(this);
