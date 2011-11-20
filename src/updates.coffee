forms = require('couchtypes/forms')
types = require('./types')
utils = require('duality/utils')

exports.create_person = (doc, req) ->
  form = new forms.Form(types.person, null, exclude: ["type"])
  form.validate req
  if form.isValid()
    [form.values, null]
  else
    log "invalid form"

exports.create_registration = (doc, req) ->
  selections = JSON.parse req.form.event_selections or []
  form = new forms.Form(types.registration, null, {})
  form.validate req
  if form.isValid()
    [ form.values, null ]
  else
    log "invalid form"