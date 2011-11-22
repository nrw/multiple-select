templates = require("duality/templates")
forms = require('./forms')

exports.persons = (head, req) ->
  start
    code: 200
    headers:
      "Content-Type": "text/html"
  rows = []
  while row = getRow()
    rows.push row.doc
  
  form = forms.registration_form(rows)
  content = templates.render("register.html", req,
    creator: req.userCtx.name
    rows: rows
    form: form.toHTML(req)
  )
  
  title: "Register"
  content: content

