import Firestore from "./class.js";
const connection = new Firestore('waitList');

const email_input =$('#email');
const error = $(".error");
const errorHead = $("#errH");
const errorDesc = $("#errDesc");

error.addClass('hide');

$('#notify-btn').click(function(e){
    
        insertMail(email_input.val());
        
    
});


async function insertMail(email)
{
    
    
    if(email)
    {
        email = connection.sanitize(email);
        var isValid =connection.validate(email);

        var exist = await connection.check(email);
       // console.log(exist);

        if(isValid)
        {
            if(exist)
            {
                //console.log("found");
                error.addClass('show').addClass('alert').removeClass('success');
                errorHead.html("Exist");
                errorDesc.html("The email you entered already exists");
            }
            else
            {
                connection.insertMail(email);
                //alert("valid "+ email);
                error.addClass('show').removeClass('alert').addClass('success');
                errorHead.html("Success");
                errorDesc.html("You will be Notified");
            }
            
        }

        else
        {
            //alert("invalid");
            error.addClass('show').removeClass('alert').removeClass('success');
            errorHead.html("Invalid email");
            errorDesc.html("The email you entered is Invalid");
        }
    }

    else
    {
        //alert("Empty");
        error.addClass('show').addClass('alert').removeClass('success');
        errorHead.html("Empty");
        errorDesc.html("The field cant be empty");
    }
}




