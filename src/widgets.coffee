Widget = require('couchtypes/widgets').Widget
_ = require('underscore')._

exports.multicheckbox = (options) ->
    w = new Widget('multicheckbox', options)
    w.rows = options.rows || []
    w.toHTML = (name, value, raw, field, options) ->
      @id = @_id(name, options.offset, options.path_extra)
      html = "<div id=\"" + @id + "\">"
      html += "<input name=\"" + @_name(name, options.offset) + "\" " + "type=\"hidden\" value=\"[]\"/>"
      html += '<ul>'
      for r in @rows
        r_id = @id + '_' + r._id
        html += '<li>'
        html += '<input type="checkbox" id="' + r_id + '" value="' + r.name + '" />'
        html += '<label for="' + r_id + '">' + r.name + '</label>'
        html += '</li>'
      html += "</ul>"
      html += "</div>"
    
    w.clientInit = (field, path, value, raw, errors, options) ->
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
          
    return w
