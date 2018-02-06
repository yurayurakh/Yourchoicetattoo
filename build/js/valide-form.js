(function(){

    var app = {

        initialize : function () {
            this.setUpListeners();
        },

        setUpListeners : function () {
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.removeError);
        },

        submitForm : function (e) {
            e.preventDefault();

            var form = $(this),
                submitBtn = form.find('button');

            if ( app.validateForm(form) === false ) return false;

            submitBtn.attr('disabled', 'disabled');

            var str = form.serialize();

            $.ajax ({
                url: 'contact_form/contact_process.php',
                type: 'POST',
                data: str
            })
                .done(function(msg){
                    if(msg === "OK"){
                        setTimeout(function(){
                            $(".modal").css("display","none");
                        }, 150);
                        setTimeout(function(){
                            $("#modal-success").css("display","block");
                        }, 500);
                        setTimeout(function(){
                            $("#modal-success").css("display","none");
                            $("body").removeClass("model-open");
                            $(".form__item_input").val("").next().removeClass("input-no-empty");
                        }, 3000);

                    } else {
                        form.html(msg);
                    }
                })
                .always(function(){
                    submitBtn.removeAttr('disabled');
                });
        },

        validateForm : function (form) {
            var inputs = form.find('input'),
                valid = true;

            $.each(inputs, function(index, val) {
                var input = $(val),
                    val = input.val(),
                    formGroup = input;

                if (val.length === 0) {
                    formGroup.addClass('has-error').removeClass('has-success');
                    valid = false;
                }else {
                    formGroup.addClass('has-success').removeClass('has-error');
                }
            });

            return valid;
        },

        removeError : function () {
            $(this).removeClass('has-error')
        }
    };

    app.initialize();

}());
