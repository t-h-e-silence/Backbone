define([
    'backbone'
], function (Backbone) {

    var Contact = Backbone.Model.extend({
        defaults: {
            coverImage: 'app/css/img/img.png',
            name:'',
            phone:'',
            group: ''
        },


        validate: function (attrs) {
            var errors = [];
            if (!$.trim(attrs.name)) {
                errors.push({name: 'name', message: 'Please enter the name field.'});
            }
            if (!$.trim(attrs.group)) {
                errors.push({name: 'group', message: 'Please enter the group field.'});
            }
            if (!$.trim(attrs.phone) || !this.validatePhone(attrs.phone)) {
                errors.push({name: 'phone', message: 'Please enter the valid phone field.'});
            }
            return errors.length > 0 ? errors : false;
        },

        validatePhone: function (phone) {
            var re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
            return re.test(phone);
        }
    });
    return Contact;
});