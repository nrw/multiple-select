(function() {
  var forms, templates;

  templates = require("duality/templates");

  forms = require('./forms');

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
    form = forms.registration_form(rows);
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

}).call(this);
