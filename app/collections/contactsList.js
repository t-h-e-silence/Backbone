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

    });
    return ContactsList;
});