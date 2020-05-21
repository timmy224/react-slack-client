import React from 'react';


const AlertUser = ({alert}) =>{
         return(
            <div class="alert alert-danger alert-dismissible text-center h-4">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>{alert}</strong> 
            </div>
            )
};

export default AlertUser;

