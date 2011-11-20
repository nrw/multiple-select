templates = require("duality/templates")
Form = require("couchtypes/forms").Form
fields = require("couchtypes/fields")
types = require('./types')
_ = require('underscore')._

exports.persons = (head, req) ->
  start
    code: 200
    headers:
      "Content-Type": "text/html"
  rows = []
  while row = getRow()
    rows.push row.doc
  
  form = exports.registration_form(rows)
  content = templates.render("register.html", req,
    creator: req.userCtx.name
    rows: rows
    form: form.toHTML(req)
  )
  
  title: "Register"
  content: content


Widget = require('couchtypes/widgets').Widget

exports.multicheckbox = (options) ->
    @rows = options.rows
    options.toHTML = (name, value, raw, field, options) ->
      @id = @_id(name, options.offset, options.path_extra)
      html = "<div id=\"" + @id + "\">"
      html += "<input name=\"" + @_name(name, options.offset) + "\" " + "type=\"hidden\" value=\"[]\"/>"
      for r in rows
        html += '<input type="checkbox" value="' + r + '">'
      html += "</div>"
    
    options.clientInit = (field, path, value, raw, errors, options) ->
      $(@id).click (event) ->
        if event.target.type is "checkbox"
          selections = $("#" + this.id ' input[type=hidden]').first()
          list = JSON.parse(selections.attr "value")
          box = event.target
          index = list.indexOf box.value
          if box.checked and index is -1
            list.push box.value
          else if index isnt -1
            list = _.reject list, (id) -> id == box.value
          selections.attr "value", JSON.stringify(list)
          
    new Widget('multicheckbox', options)

exports.registration_form = (rows) ->
  new Form(fields: _.extend(types.registration.fields,
    events: fields.array(
      parse: (raw) ->
        JSON.parse raw

      widget: exports.multicheckbox(rows)
    )
  ))

