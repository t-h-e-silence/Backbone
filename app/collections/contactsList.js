define([
    'backbone',
    'app/model/contact',
    'localstorage',
    'paginator',
], function (Backbone, Contact) {

    var ContactsList = Backbone.Collection.extend({
        url: "/api/contacts",
        //   localStorage: new Backbone.LocalStore("сontactsStore"),
        model: Contact,
        localStorage: new Store("contactStore"),
    });
    return ContactsList;
});