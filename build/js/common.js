$(document).ready(function() {

    // Onfocus input
    $('.form__item_input').focusout(function(){
        if ($(this).val().length == 0) {
            $(this).next().removeClass("input-no-empty");
        } else if ($(this).val() == "+7(___) ___-____") {
            $(this).next().removeClass("input-no-empty");
        }
        else {
            $(this).next().addClass("input-no-empty");
        }


    });

    // Phone mask
    $(".tel").mask("+7(999) 999-9999");

    //Modal logic
    $(".modal-call").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("model-open");
        $("#modal-recall").css("display","block");
    });

    $(".close").click(function () {
        $(".modal").css("display","none");
        $("body").toggleClass("model-open");
    });

    $(".modal").click(function(e){
        if(e.target == this) {
            $(this).css("display","none");
            $("body").toggleClass("model-open");
        }
    });

});