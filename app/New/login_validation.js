$(function() {
    // body...


    $('#loginform').validate({
        rules:{
            username: 
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
            username:{
                required: 'Please enter your email.',
                email: 'Please enter a <em>valid</em> email address.'
            }
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

   

