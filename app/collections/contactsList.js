define([
    'backbone',
    'app/model/contact',
    'localstorage',
     'paginator',
], function (Backbone, Contact) {
    var ContactsList = Backbone.PageableCollection.extend({
        model: Contact,
        localStorage: new Backbone.LocalStorage("contactsStore"),
        mode: "client",

        state: {
            firstPage: 1,
            currentPage: 1,
            totalRecords: 25
        },
        queryParam: {
            currentPage: 1,
            pageSize: 3
        },
    });
    return ContactsList;
});