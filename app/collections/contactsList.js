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
            totalRecords: 3
        },
        queryParam: {
            currentPage: "current_page",
            pageSize: 3
        },
    });
    return ContactsList;
});