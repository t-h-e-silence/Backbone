define([
    'jquery',
    'underscore',
    'backbone',
    "jqueryui",
  //  'layoutmanager',
    'app/collections/contactsList'
], function($, _, Backbone, ContactsList) {

    var HeaderView = Backbone.View.extend({
       // tagName: 'div',
        //className: 'contactContainer',
        template: _.template($('#headerTemp').html()),
        initialize: function () {
            this.listenTo(this.collection, 'remove', this.render);
            this.$el.html(this.template);
            this.contactsContainer = this.$('.contacts-container');
            //  this.searchBar = this.$('.empty-contacts-placeholder');
            this.emptyContactsPlaceholder = this.$('.empty-contacts-placeholder');
            this.emptySearchPlaceholder = this.$('.empty-search-contacts-placeholder');
        },
        events: {
            'click #submitSearch': 'searchContacts',
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        searchContacts: function (e) {
          //   this.collection= new ContactsList();
            // this.collection.fetch();
            var searchTerm = $.trim(this.$('.contact-searchValue').val());
            if (searchTerm) {
                var searchContactsByName = this.collection.where({name: searchTerm});
                var searchContactsByGroup = this.collection.where({group: searchTerm});
                var searchContactsByPhone = this.collection.where({phone: searchTerm});
                if (searchContactsByName.length || searchContactsByGroup.length || searchContactsByPhone.length) {
                    this.$('.contacts-container').empty();
                    this.emptySearchPlaceholder.empty();

                    _.each(searchContactsByName, this.renderOne, this);
                    _.each(searchContactsByGroup, this.renderOne, this);
                    _.each(searchContactsByPhone, this.renderOne, this);
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
    });
    return HeaderView;
});