exports.persons_by_name =
  map: (doc) ->
    if doc.type is "person"
      emit [ doc.name ], null