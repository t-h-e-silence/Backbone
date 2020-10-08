define([
    'jquery',
    'underscore',
    'backbone',
    'layoutmanager',
    'app/view/contactsList',
    'app/view/contactForm',
    'app/view/HeaderView'
], function($, _, Backbone, Layout, ContactsListView, ContactForm, HeaderView) {
    var MainView = new Backbone.Layout({
        el: ".layoutPlace",
        template: "#forLayout",
        events : {
            "click #showSource" : "showContent2",
            "click #back" : "showContent"
        },

        views : {
            "header" : new HeaderView(),
            "section" : new ContactsListView(),
            "footer" : new ContactForm()
        }
    });

});

