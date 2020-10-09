define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var AppView = Backbone.View.extend({
        el: $('#main-container'),
        setViews : function(view) {
            var closingView = this.view;
            this.view = view;
            this.view.render();
            this.view.$el.hide();
            this.$el.append(this.view.el);
            this.openView(this.view);
            this.closeView(closingView);
        },

        openView: function(view){
            view.$el.slideToggle(5);
        },

        addView: function (temp) {
            this.$el.prepend(temp.render().el);
        },

        closeView: function (view) {
            if (view){
                view.unbind();
                view.$el.slideToggle(5, function(){
                    $(this).remove();
                });
            }
        }
    });
    return AppView;
});

