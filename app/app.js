define([
    'backbone',
    'app/view/app',
    'app/router',
    'app/collections/contactsList'
], function (Backbone, AppView, Router, ContactsList) {

    var initialize = function() {
        var contactsCollections = new ContactsList();
        var appView = new AppView();
        App.router = new Router({view: appView, collection: contactsCollections});
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});

