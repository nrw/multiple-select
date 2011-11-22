
  module.exports = [
    {
      from: "/static/*",
      to: "static/*"
    }, {
      from: "/",
      to: "_update/create_registration",
      method: "POST"
    }, {
      from: "/",
      to: "_list/persons/persons_by_name",
      query: {
        include_docs: "true"
      }
    }, {
      from: "/create_person",
      to: "_update/create_person",
      method: "POST"
    }, {
      from: "*",
      to: "_show/not_found"
    }
  ];
