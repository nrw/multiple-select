var forms, types, utils;
forms = require('couchtypes/forms');
types = require('./types');
utils = require('duality/utils');
exports.create_person = function(doc, req) {
  var form;
  form = new forms.Form(types.person, null, {
    exclude: ["type"]
  });
  form.validate(req);
  if (form.isValid()) {
    return [form.values, null];
  } else {
    return log("invalid form");
  }
};
exports.create_registration = function(doc, req) {
  var form, selections;
  selections = JSON.parse(req.form.event_selections || []);
  form = new forms.Form(types.registration, null, {});
  form.validate(req);
  if (form.isValid()) {
    return [form.values, null];
  } else {
    return log("invalid form");
  }
};