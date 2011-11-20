exports.persons_by_name = {
  map: function(doc) {
    if (doc.type === "person") {
      return emit([doc.name], null);
    }
  }
};