window.ContactManager = {
    Models: {},
    Collections: {},
    Views: {},

    start: function (data) {
        var contacts = new ContactManager.Collections.Contacts(data.contacts),
            router = new ContactManager.Router();

        router.on('route:home', function () {
            router.navigate('contacts', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showContacts', function () {
            var contactsView = new ContactManager.Views.Contacts({
                collection: contacts

            });

            $('.main-container').html(contactsView.render().$el);
        });



        router.on('route:newContact', function () {
            var newContactForm = new ContactManager.Views.ContactForm({
                model: new ContactManager.Models.Contact()
            });

            //max id is 4
            var max = contacts.size();//Take the number of contacts

            if (max > 3) {

                alert("Unfortunatly you can't insert more than 4 contacts for now. A fix is comming soon !!!");
                console.log(max);

                //Go back to main page   
                router.navigate('contacts', true);
            }

            else {

                newContactForm.on('form:submitted', function (attrs) {
                    attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);

                    //Regex Validation Info
                    //https://www.regexlib.com/REDetails.aspx?regexp_id=2421
                    //https://stackoverflow.com/questions/32004990/javascript-regular-expression-validation

                    var phone = attrs.tel;
                    console.log(phone);
                    // var pattern = /^(\+?)(\d{2,4})(\s?)(\-?)((\(0\))?)(\s?)(\d{2})(\s?)(\-?)(\d{3})(\s?)(\-?)(\d{2})(\s?)(\-?)(\d{2})$/
                    var pattern = /^\+41(\s*\d\s*){9}$/

                    //Check the telephone number
                    if (!pattern.test(phone)) {
                        alert("Error in telephone number.Please type a 9-digit number following exactly this pattern '+41 44 123 12 34' ")
                    }
                    else {
                        //alert("matched");
                        contacts.add(attrs);
                        router.navigate('contacts', true);
                    }

                });

                $('.main-container').html(newContactForm.render().$el);
            }

        });


        router.on('route:editContact', function (id) {
            var contact = contacts.get(id),
                editContactForm;

            if (contact) {
                editContactForm = new ContactManager.Views.ContactForm({
                    model: contact
                });

                editContactForm.on('form:submitted', function (attrs) {
                    var phone = attrs.tel;
                    console.log(phone);
                    //var pattern = /^(\+?)(\d{2,4})(\s?)(\-?)((\(0\))?)(\s?)(\d{2})(\s?)(\-?)(\d{3})(\s?)(\-?)(\d{2})(\s?)(\-?)(\d{2})/
                    var pattern = /^\+41(\s*\d\s*){9}$/
                    
                    //Regex Validation Info
                    //https://www.regexlib.com/REDetails.aspx?regexp_id=2421
                    //https://stackoverflow.com/questions/32004990/javascript-regular-expression-validation

                    //Check the telephone number
                    if (!pattern.test(phone)) {
                        alert("Error in telephone number.Please type a 9-digit number following exactly this pattern '+41 44 123 12 34' ")
                    }
                    else {
                        //alert("matched");
                        contact.set(attrs);
                        router.navigate('contacts', true);
                    }
                });

                $('.main-container').html(editContactForm.render().$el);
            } else {
                router.navigate('contacts', true);
            }
        });


        Backbone.history.start();
    }
};