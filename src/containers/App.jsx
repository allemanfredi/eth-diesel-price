import React , { Component }from 'react';
import Content from '../components/content/Content';
import DieselPrice from '../blockchain';
import { EventEmitter } from '../utils/EventEmitter';

import '../styles/styles.css'

class App extends Component{

  constructor(){
    super();

    this.startUpdatePrice = this.startUpdatePrice.bind(this);
    this.registerListenerUpdatePrice = this.registerListenerUpdatePrice.bind(this);
    this.updatePrice = this.updatePrice.bind(this);

    this.dieselPrice = new DieselPrice();

    this.state = {
      isLoading : false,
      error : false,
      price : false
    }
  }

  async componentWillMount(){

    try{
      await this.dieselPrice.init();
      this.registerListenerUpdatePrice();
    }catch(err){
      this.setState({error: err.message});
    }
  }

  async startUpdatePrice(){
    
    try{
      
      this.setState({
        isLoading : true,
        error : false
      });

      //query oraclize
      this.dieselPrice.update();

    }catch(err){
      this.setState({
        isLoading:false,
        error: err.message
      });
    }
  }

  registerListenerUpdatePrice(){
    EventEmitter.on('price', price => this.updatePrice(price));
    EventEmitter.on('error', error => console.log(error));
  }

  updatePrice(price){
    this.setState({
      price,
      isLoading : false
    });
  }

  render(){
    return(
      <Content  price={this.state.price} 
                isLoading={this.state.isLoading} 
                error={this.state.error} 
                onClick={this.startUpdatePrice}/>
    )
  }

}
  


export default App;
