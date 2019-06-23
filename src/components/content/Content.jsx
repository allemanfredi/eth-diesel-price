import React, { Component } from 'react';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';


class Content extends Component {

    constructor() {
        super();

        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-12 col-md-7 text-center">
                        <div className="card mt-5">
                            <div className="mt-5 fs-40 fw-bold">
                                Live Diesel Price
                            </div>
                            <div className="mt-4 text-center">
                                <img src="./material/icons/oil-tank.png" heigth="100" width="100"  alt="gas" />
                            </div>
      
                            <div className="mt-5 fs-30"> 
                                {this.props.price ? this.props.price + '$'  : ""} 
                            </div>
           
                            <div className="mt-100 mb-3">
                                {!this.props.isLoading ? <button onClick={() => this.props.onClick()} className="btn btn-red fw-bold">Get price</button> : <Loader/> }
                            </div>

                            <div className="mt-1">
                                {this.props.log}
                            </div>

                            {this.props.error ? <Alert error={this.props.error}/> : '' }

                        </div>
                    </div>
                </div>
            </div>   
        )
    }

}



export default Content;
