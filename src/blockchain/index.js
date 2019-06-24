import  Web3 from 'web3';
import { EventEmitter } from '../utils/EventEmitter';
import StorageService from '../utils/StorageService';

//dieselPrice contract interface built with truffle
import DieselPriceContract from './build/contracts/DieselPrice';


class DieselPrice {

    constructor(){

        this.web3 = null;
        this.dieselPriceContract = null;
        this.currentAccount = null;
        this.contractAddress = '0xdF72d651D999c89d8AC31a12Fe652CeB6C8380FD';
    }

    async init() {

        try{
            
            if (typeof web3 !== 'undefined') {
                this.web3 = new Web3(window.web3.currentProvider);
                
                //enable metamask interaction with this app
                await window.ethereum.enable();
            } else {
                EventEmitter.emit('error',' Install Metamask');
            }

            //get the current account address
            const accounts = await this.web3.eth.getAccounts();
            this.currentAccount = accounts[0];

            //contract instance
            this.dieselPriceContract = new this.web3.eth.Contract(DieselPriceContract.abi,this.contractAddress, {
                defaultAccount: this.currentAccount, // default from address
            });
            
            //event listeners
            this.registerEventsListener();

            const prices = StorageService.getAllPrices();
            if ( prices.length > 0 )
                EventEmitter.emit('prices', prices);

        }catch(err){
            EventEmitter.emit('error',err.message);
        }
    }

    async update() {

        try{

            //gas estimation...sometimes metamask generates an exception in calculating the estimated gas
            //const gas = await this.dieselPriceContract.methods.update().estimateGas();

            await this.dieselPriceContract.methods.update().send({
                from: this.currentAccount,
                value: this.web3.utils.toWei('0.0045', 'ether'), 
                //gas
            });
        }catch(err){
            EventEmitter.emit('error',err.message);
        }
    }

    registerEventsListener() {
        
        this.dieselPriceContract.events.allEvents()
        .on('data', async e => {

            const block = await this.web3.eth.getBlock(e.blockNumber);

            switch(e.event){
                case 'LogNewDieselPrice' : {

                    const price = {
                        price : parseFloat(e.returnValues.price),
                        date : new Date(block.timestamp * 1000)  
                    }
                    EventEmitter.emit('prices' , [price]);
                    
                    //save the price in the local storage
                    StorageService.storePrice(price)
                }
                default : {
                    EventEmitter.emit('log' , {
                        value : e.returnValues[0],
                        date : new Date(block.timestamp * 1000)
                    })
                }
                //"break" not intentionally set so that a price event log is generated as well

            }
        })
    }

}


export default DieselPrice;