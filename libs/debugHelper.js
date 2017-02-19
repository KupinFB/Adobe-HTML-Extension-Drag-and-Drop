var appDebugMode = true;


if(appDebugMode == true){

    $( document ).contextmenu(function(event) {
        event.preventDefault();
        location.reload();
    });
}else{
    $( document ).contextmenu(function(event) {
        if(!(event.target.type
            && (event.target.type == 'text' 
                || event.target.type == 'password' 
                || event.target.type == 'textarea'
                || event.target.type == 'date'))){
            event.preventDefault();
        }        
    });
}
