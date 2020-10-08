define([
    'jquery',
    'underscore',
    'backbone',
    'app/view/contact',
], function ($, _, Backbone, ContactView ) {

    var ContactsListView = Backbone.View.extend({
        template: _.template($('#tpl-contacts').html()),
        pageTemplate: _.template($('#tmpClientPagination').html()),
        initialize: function () {
            this.listenTo(this.collection, 'remove', this.render);
            this.$el.html(this.template);
            this.contactsContainer = this.$('.contacts-container');
            this.emptyContactsPlaceholder = this.$('.empty-contacts-placeholder');
            this.emptySearchPlaceholder = this.$('.empty-search-contacts-placeholder');
        },

        events: {
            'click #submitSearch': 'searchContacts',
            'click #return': 'searchClose',
            'click #next' : 'paginateNext',
            'click #prev' :  'paginatePrev',
        },
        paginateNext: function(e){
                e.preventDefault();
            this.emptySearchPlaceholder.empty();
                this.collection.getNextPage();
                 this.render();
            },
        paginatePrev:  function(e){
            e.preventDefault();
            this.emptySearchPlaceholder.empty();
            this.collection.getPreviousPage();
            this.render();
        },

        searchContacts: function (e) {
            var searchTerm = $.trim(this.$('.contact-searchValue').val());
            if (searchTerm) {

                var searchContactsByName =   this.collection.fullCollection.where({name: searchTerm});
                var searchContactsByGroup =   this.collection.fullCollection.where({group: searchTerm});
                var searchContactsByPhone =  this.collection.fullCollection.where({phone: searchTerm});
                if (searchContactsByName.length || searchContactsByGroup.length || searchContactsByPhone.length) {
                    this.$('.contacts-container').empty();
                    this.emptySearchPlaceholder.empty();

                    _.each(searchContactsByName, this.renderOne, this);
                    _.each(searchContactsByGroup, this.renderOne, this);
                    _.each(searchContactsByPhone, this.renderOne, this);
                    this.$('.pages').empty();
                    this.emptySearchPlaceholder.html('<a id="return" class="backFromSearch"> Return</a></div>');
                }
                    else {
                    this.$('.contacts-container').empty();
                    this.emptySearchPlaceholder.html('<div class="well text-center"><h3>There is no contacts starting with <strong>' + searchTerm + '.</strong></h3></div> <div> <a id="return" class="backFromSearch"> Return</a></div>');
                }
            } else {
                this.emptySearchPlaceholder.empty();
                this.render();
            }
        },
        searchClose: function(){
            this.emptySearchPlaceholder.empty();
            this.render();
        },
       render: function () {
           return this.contactsContainer.empty(),
               this.collection.length ? this.collection.each(this.renderOne, this)
                   : this.emptyContactsPlaceholder.html('<div class="well text-center"><h3>There is no contacts.</h3> <a href="#contacts/new" class="btn btn-lg btn-outline">Add Contact</a></div>'),
               this
        },
        renderOne: function(contact) {
            var contactView = new ContactView({
                model: contact
            });
            this.$('.contacts-container').append(contactView.render().$el)
        }
    });
    return ContactsListView;
});
