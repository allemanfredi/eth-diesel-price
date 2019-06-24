import React, { Component } from 'react';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';
import LineChart from '../lineChart/LineChart';
import EventLog from '../eventLog/EventLog';
import { convertDate } from '../../utils/utils';


class Content extends Component {

    constructor() {
        super();

        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-12 col-md-12  text-center">
                        <div className="card mt-5 container">

                            <div className="row mt-3">
                                <div className="col-12 col-sm-7 text-center text-sm-left fs-40">
                                    Diesel Price:
                                </div>
                                <div className="col-12 col-sm-5 text-center text-sm-right fs-40 fw-bold">
                                    {this.props.prices[this.props.prices.length - 1] ? this.props.prices[this.props.prices.length - 1].price + '$' : '-' } 
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-12 col-sm-3 text-center text-sm-left">
                                    Last update:
                                </div>
                                <div className="col-12 col-sm-9 text-center text-sm-right fw-bold">
                                    {this.props.prices[this.props.prices.length - 1] ? this.props.prices[this.props.prices.length - 1].date.toString() : '-' } 
                                </div>
                            </div>

                            
                            <div className="mt-100 mb-3">
                                {!this.props.isLoading ? <button onClick={() => this.props.onClick()} className="btn btn-yellow fw-bold fs-20">Update price</button> : <Loader/> }
                            </div>

                            {this.props.error ? <Alert error={this.props.error}/> : '' }

                            <hr/>

                            <div className="row mt-3">
                                <div className="col-12 col-lg-7 mb-3">
                                    <div className="text-left mb-3 fw-bold">Chart</div>
                                    <LineChart data={this.props.prices.map( obj => obj.price)}
                                               labels={this.props.prices.map( obj => convertDate(obj.date))}/>
                                </div>
                                <div className="col-12 col-lg-5 mb-3">
                                <   div className="text-left mb-3 fw-bold">Logs</div>
                                    <EventLog logs={this.props.logs}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>   
        )
    }

}



export default Content;
