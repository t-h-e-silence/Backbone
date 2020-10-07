define([
    'jquery',
    'underscore',
    'backbone',
    'app/model/contact',
    'app/view/contactsList',
    'app/view/contactForm',
    //'app/view/PaginationView',
    'app/view/HeaderView'
], function ($, _, Backbone, Contact, ContactsListView, ContactForm, HeaderView) {

    var Router = Backbone.Router.extend({

        routes: {
            '': 'home',
            'home': 'home',
            'newContact': 'newContact',
            'home/edit/:id': 'editContact',
            'home/page/:page': 'showContactList',
        },
        initialize: function (options) {
            this.appView = options.view;
            this.collection = options.collection;
            this.collection.fetch();

        },

        home: function () {
            var header = new HeaderView();
            var contactsList = new ContactsListView({
                collection: this.collection
            });
           this.appView.setViews(contactsList);
           $('.main-container').append(contactsList.render());
           this.appView.addView(header);
           // $('.main-container').prepend(header.render().el);
        },

        newContact: function() {
            var createContactsView = new ContactForm({
                model: new Contact
            });
            this.appView.setViews(createContactsView);

            createContactsView.on('form:submitted', function(attrs) {
                var newContact = new Contact(attrs);
                var modelError = newContact.isValid();
                if(modelError !== false) {
                    this.collection.add(newContact);
                    newContact.save();
                    App.router.navigate('home', true);
                }
            }, this);

            createContactsView.on('form:close', this.contactFormClose);
        },

        editContact: function(id) {
            var contact = this.collection.get(id);
            var editContactsView = new ContactForm({
                model: contact
            });
            this.appView.setViews(editContactsView);

            editContactsView.on('form:submitted', function(attrs) {
                var modelError = contact.save(attrs, {validate:true});
                if(modelError !== false) {
                    App.router.navigate('home', true);
                }
            });

            editContactsView.on('form:close', this.contactFormClose);
        },

        contactFormClose: function() {
            App.router.navigate('home', true);
        }

    });

    return Router;
});
