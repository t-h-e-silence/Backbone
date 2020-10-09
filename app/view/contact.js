define([
    'jquery',
    'underscore',
    'backbone',
    "jqueryui",
], function($, _, Backbone) {

    var ContactView = Backbone.View.extend({
       tagName: 'div',
       className: 'contactContainer',
        template: _.template($('#tpl-contact').html()),
        initialize: function () {
            this.listenTo(this.model, 'remove', this.remove)
        },
        events: {
            'click #delete': 'deleteContactwithConfirmation',
        },
        deleteContact: function () {
            this.model.destroy();
            this.remove();
        },

        deleteContactwithConfirmation: function () {
            const name = this.model.get('name');
            var object = this;
            $('<div></div>').appendTo('html')
                .html('<div><h2>' + "Do you really want to delete " + name + '?</h2></div>')
                .dialog({
                    modal: true,
                    title: 'Delete confirmation',
                    zIndex: 1000,
                    autoOpen: true,
                    width: 600,
                    resizable: false,
                    buttons: {
                        Delete: function () {
                            $(this).dialog("close");
                            object.model.destroy();
                            object.remove();
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    },
                    close: function (event, ui) {
                        $(this).remove();
                    }
                });

        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });
    return ContactView;
});