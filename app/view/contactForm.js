define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var ContactForm = Backbone.View.extend({
        template: _.template($('#newContactTemp').html()),
        events: {
            'click #submitForm': 'submitClicked',
            'click #close-form': 'onFormClose'
        },
        initialize: function () {
                this.listenTo(this.model, 'invalid', function(model, error, options) {
                    this.cleanFormErrors();
                    _.each(error, this.showFormErrors, this);
                });
        },
        render: function () {
            this.$el.empty();
            var html = this.template(_.extend(this.model.toJSON(), {
                isNew: this.model.isNew()
            }));
            this.$el.append(html);
            return this;
        },

        submitClicked: function (e) {
            e.preventDefault();
            var attrs = {
                name: this.$('.name').val(),
                phone: this.$('.phone').val(),
                group: this.$('.group').val()
            };
            if (this.model.isNew()) {
                var error = this.model.validate(attrs);
                if (error) {
                    this.cleanFormErrors();
                    _.each(error, this.showFormErrors, this);
                    return;
                }
            }
            this.trigger('form:submitted', attrs);
        },

        showFormErrors: function (error) {
            this.$('.form-group-' + error.name).addClass('has-error').find('.help-block').html(error.message);
        },

        cleanFormErrors: function () {
            this.$('.form-group').removeClass('has-error');
            this.$('.help-block').html('');
        },
        onFormClose: function(e) {
            e.preventDefault();
            this.trigger('form:close');
        }

    });
    return ContactForm;
});