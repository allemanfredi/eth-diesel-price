
import React from 'react';
import { convertDate } from '../../utils/utils';

function EventLog(props){
    return(
       <div className="container container-events-log">
           {props.logs.map( (log, index) => {
               return (
                   <div key={log.date.toString()} className="row">
                       <div className="col-12 text-left fs-12">
                            [ {convertDate(props.logs[props.logs.length-1-index].date)} ] {props.logs[props.logs.length-1-index].value}
                        </div>
                    </div>
               )
           })}
       </div>
    )
}

export default EventLog;

//