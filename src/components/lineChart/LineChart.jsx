
import React from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends React.Component{

    constructor(){
        super();

        this.state = {
            data : {
                labels: [],
                datasets: [
                    {
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data : []
                    }
                ]
            },
            options : {
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 0.1,
                                max: 5
                            }
                        }]
                },
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.data.length > this.state.data.datasets[0].data.length){
            this.setState(prevState => {
                let data = prevState.data;
                data.datasets[0].data = nextProps.data
                return{
                    data
                }
            })
        }
    }

    render(){
        return(
            <Line data={this.state.data} options={this.state.options}/>
        )
    }
}

export default LineChart;