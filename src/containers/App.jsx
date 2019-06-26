import React , { Component }from 'react';
import Content from '../components/content/Content';
import DieselPrice from '../blockchain';
import { EventEmitter } from '../utils/EventEmitter';

import '../styles/styles.css'

class App extends Component{

  constructor(){
    super();

    this.startUpdatePrice = this.startUpdatePrice.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    this.updatePrices = this.updatePrices.bind(this);

    this.dieselPrice = new DieselPrice();

    this.state = {
      isLoading : false,
      error : false,
      prices : [],
      logs : []
    }
  }

  async componentWillMount(){

    try{
      
      this.registerListeners();
      await this.dieselPrice.init();

    }catch(err){
      this.setState({error: err.message});
    }
  }

  async startUpdatePrice(){
    
    this.setState({
      isLoading : true,
      error : false,
      log : false
    });

    //query oraclize
    this.dieselPrice.update();
  }

  registerListeners(){
    EventEmitter.on('prices', prices => this.updatePrices(prices));
    EventEmitter.on('log', log =>  this.setState(prevState => { return {logs : [...prevState.logs , log]}}));
    EventEmitter.on('error', error => this.setState({error , isLoading:false}));
  }

  updatePrices(prices){
    this.setState(prevState => {

      //ordering needed since can arrive a date of a price that is between 2 date already set
      const newPrices = [...prevState.prices, ...prices].sort( (a , b) => new Date(a.date) - new Date(b.date))
      
      return {
        prices : newPrices ,
        isLoading : false
      }
    });
  }

  render(){
    return(
      <Content  prices={this.state.prices} 
                logs={this.state.logs}
                isLoading={this.state.isLoading} 
                error={this.state.error} 
                onClick={this.startUpdatePrice}/>
    )
  }

}
  


export default App;
