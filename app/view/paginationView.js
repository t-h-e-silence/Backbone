define([
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    'app/view/contact',
], function ($, _, Backbone) {
    var PaginationView = Backbone.View.extend({
        tagName: 'aside',
        pagingTemplate: _.template($('#tmpClientPagination').html()),
        events: {
            'click a.first': 'gotoFirst',
            'click a.prev': 'gotoPrev',
            'click a.next': 'gotoNext',
            'click a.last': 'gotoLast',
            'click a.page': 'gotoPage',
        },

        initialize: function () {
            this.collection.on('reset', this.render, this);
            this.collection.on('change', this.render, this);
            this.$el.appendTo('#pagination');
            this.$el.html(this.template);
            this.gotoFirst(this);
        },
        render: function () {
            var html = this.pagingTemplate(this.collection);
            this.$el.html(html);
        },
        gotoFirst: function (e) {
            e.preventDefault();
            this.collection.getPage(1);
        },
        gotoPrev: function (e) {
            e.preventDefault();
            this.collection.previousPage();
        },
        gotoNext: function (e) {
            e.preventDefault();
            this.collection.getNextPage();
        },
        gotoLast: function (e) {
            e.preventDefault();
            this.collection.getPage();
        },
        gotoPage: function (e) {
            e.preventDefault();
            var page = $(e.target).text();
            this.collection.getPage(page, true);
        },
    });
    return PaginationView;
});