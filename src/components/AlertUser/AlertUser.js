import React from 'react';


const AlertUser = (props) =>{
        let alert = props.alert ? props.alert : props.location.state.alert;
         return(
            <div className="alert alert-danger alert-dismissible text-center h-4">
                <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>{alert}</strong> 
            </div>
            )
};

export default AlertUser;

