var Form, Widget, fields, templates, types, _;
templates = require("duality/templates");
Form = require("couchtypes/forms").Form;
fields = require("couchtypes/fields");
types = require('./types');
_ = require('underscore')._;
exports.persons = function(head, req) {
  var content, form, row, rows;
  start({
    code: 200,
    headers: {
      "Content-Type": "text/html"
    }
  });
  rows = [];
  while (row = getRow()) {
    rows.push(row.doc);
  }
  form = exports.registration_form(rows);
  content = templates.render("register.html", req, {
    creator: req.userCtx.name,
    rows: rows,
    form: form.toHTML(req)
  });
  return {
    title: "Register",
    content: content
  };
};
Widget = require('couchtypes/widgets').Widget;
exports.multicheckbox = function(options) {
  this.rows = options.rows;
  options.toHTML = function(name, value, raw, field, options) {
    var html, r, _i, _len;
    this.id = this._id(name, options.offset, options.path_extra);
    html = "<div id=\"" + this.id + "\">";
    html += "<input name=\"" + this._name(name, options.offset) + "\" " + "type=\"hidden\" value=\"[]\"/>";
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      r = rows[_i];
      html += '<input type="checkbox" value="' + r + '">';
    }
    return html += "</div>";
  };
  options.clientInit = function(field, path, value, raw, errors, options) {
    return $(this.id).click(function(event) {
      var box, index, list, selections;
      if (event.target.type === "checkbox") {
        selections = $("#" + this.id(' input[type=hidden]')).first();
        list = JSON.parse(selections.attr("value"));
        box = event.target;
        index = list.indexOf(box.value);
        if (box.checked && index === -1) {
          list.push(box.value);
        } else if (index !== -1) {
          list = _.reject(list, function(id) {
            return id === box.value;
          });
        }
        return selections.attr("value", JSON.stringify(list));
      }
    });
  };
  return new Widget('multicheckbox', options);
};
exports.registration_form = function(rows) {
  return new Form({
    fields: _.extend(types.registration.fields, {
      events: fields.array({
        parse: function(raw) {
          return JSON.parse(raw);
        },
        widget: exports.multicheckbox(rows)
      })
    })
  });
};