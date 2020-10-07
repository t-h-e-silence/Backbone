define([
    'backbone',
    'app/model/contact',
    'localstorage',
    'paginator',
], function (Backbone, Contact) {
    var ContactsList = Backbone.PageableCollection.extend({
        url: "/api/contacts",
        model: Contact,
     //   localStorage: new Backbone.LocalStorage("сontactsStore"),
        localStorage: new Store("contactsStore"),
        mode: "client",

        state: {
            currentPage: 1,
            firstPage: 1,
            pageSize: 3,
        },
    });
    return ContactsList;
});