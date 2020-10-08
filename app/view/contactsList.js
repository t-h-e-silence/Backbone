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
            this.currentElement=0;
        },

        events: {
            'click #submitSearch': 'searchContacts',
            'click #return': 'searchClose',
            'click #next' : 'paginateNext',
            'click #prev' :  'paginatePrev',
        },

        paginateNext: function(e){
            if(this.checkSize(e)) {
                this.$('.contacts-container').empty();
                for (this.currentElement, i = 0; i < 3; i++, this.currentElement++) {
                    if (this.currentElement > this.collection.length) {
                        this.currentElement = 0;
                        return;
                    }
                    var add1 = this.collection.at(this.currentElement);
                    this.renderOne(add1);
                }
            }
            },
        //maximum call stack
        checkSize: function(e){
          if(this.collection.length<3){
              this.render();
              return false;
          }
          return true;
        },
        paginatePrev:  function(e){
            if(this.checkSize(e)) {
                this.$('.contacts-container').empty();
                var position = this.currentElement;
                for (this.currentElement, i = 3; i > 0; i--, this.currentElement--) {
                    if (0 >= this.currentElement) {
                        this.paginateNext();
                        return;
                    }
                    if (this.currentElement > this.collection.length) {
                        this.paginatePrev();
                        return;
                    }
                    var add1 = this.collection.at(position - i);
                    this.renderOne(add1);
                }
            }
        },

        searchContacts: function (e) {
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
              this.searchClose();
            }
        },
        searchClose: function(){
            this.emptySearchPlaceholder.empty();
            this.currentElement=0;
            this.paginateNext();
        },
       render: function () {
           return this.contactsContainer.empty(),
               this.collection.length ? this.collection.each(this.renderOne, this)
                   : this.emptyContactsPlaceholder.html('<div class="well text-center"><h3>There is no contacts.</h3>'),
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
