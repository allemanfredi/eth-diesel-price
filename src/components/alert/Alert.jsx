import React from 'react';

function Alert(props){

    return(
        <div className="container">
            <div className="alert alert-danger" role="alert">
                <strong>Error!</strong> {props.error}
            </div>
        </div>
       
    )
}

export default Alert;