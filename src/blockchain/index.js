import  Web3 from 'web3';
import { EventEmitter } from '../utils/EventEmitter';

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

        }catch(err){
            EventEmitter.emit('error',err.message);
        }
    }

    async update() {

        try{

            //gas estimation
            const gas = await this.dieselPriceContract.methods.update().estimateGas();

            await this.dieselPriceContract.methods.update().send({
                from: this.currentAccount,
                value: this.web3.utils.toWei('0.0035', 'ether'), 
                gas
            });
        }catch(err){
            EventEmitter.emit('error',err.message);
        }
    }

    registerEventsListener() {
        
        //log event handler
        this.dieselPriceContract.events.LogNewOraclizeQuery()
        .on('data', (e) => EventEmitter.emit('log' , e.returnValues.description))
        .on('error', error => this.emit('error' , error));

        //price event handler
        this.dieselPriceContract.events.LogNewDieselPrice({fromBlock: 0 , toBlock: 'latest'})
        .on('data', (e) => EventEmitter.emit('price' , e.returnValues.price))
        .on('error', error => this.emit('error' , error));
    }

}


export default DieselPrice;