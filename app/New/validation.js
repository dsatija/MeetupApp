$( document ).ready(function() {
    console.log( "ready!" );
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});


    // body...

    $('#valform').validate({
        rules:{
            name: 
            {
                required: true,
            },
            email:
            {
                required: true,
                email: true,
            },
            password:
            {
            required:true,
            minlength:3,
            maxlength:8,
            },    
        },
        messages: {
            email:{
                required: 'Please enter an email address.',
                email: 'Please enter a <em>valid</em> email addrerss.'
            },
        },
         highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
})
});

   

