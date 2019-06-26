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
        this.currentBlockNumber = 0;
        this.defaultBlockNumber = 11753766; //smart contract deployment block height
    }

    async init() {

        try{
            
            if (typeof web3 !== 'undefined') {
                this.web3 = new Web3(window.web3.currentProvider);
                
                //enable metamask interaction with this app
                await window.ethereum.enable();
            } else {
                EventEmitter.emit('error',' Install Metamask');
                return;
            }

            //get the current account address
            const accounts = await this.web3.eth.getAccounts();
            this.currentAccount = accounts[0];

            //contract instance
            this.dieselPriceContract = new this.web3.eth.Contract(DieselPriceContract.abi,this.contractAddress, {
                defaultAccount: this.currentAccount, // default from address
            });

            //get current blockNumber
            this.currentBlockNumber = StorageService.getBlockNumber();
            if (!this.currentBlockNumber)
                this.currentBlockNumber = 0;
            
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
                value: this.web3.utils.toWei('0.004', 'ether')  //200,000 gas * 20 Gwei = 4,000,000 Gwei = 0.004 ETH
                //gas
            });
        }catch(err){
            EventEmitter.emit('error',err.message);
        }
    }

    registerEventsListener() {
        
        this.dieselPriceContract.events.LogNewDieselPrice({fromBlock: this.currentBlockNumber === 0 ? this.defaultBlockNumber : this.currentBlockNumber + 1, toBlock:'latest'})
        .on('data', async e => {

            //get block in order to get the block timestamp
            const block = await this.web3.eth.getBlock(e.blockNumber);
            
            //events can arrive not ordered because of getBlock => price are ordered in the front end
            if ( e.blockNumber > this.currentBlockNumber ){ 
                this.currentBlockNumber = e.blockNumber;
                StorageService.storeBlockNumber(e.blockNumber);
            }

            const price = {
                price : parseFloat(e.returnValues.price),
                date : new Date(block.timestamp * 1000)
            }

            EventEmitter.emit('prices' , [price]);
            
            //save the price and blockNumber in the local storage
            StorageService.storePrice(price);
        });

        this.dieselPriceContract.events.LogNewOraclizeQuery()
        .on('data', async e => {

            //get block in order to get the block timestamp
            const block = await this.web3.eth.getBlock(e.blockNumber);

            EventEmitter.emit('log' , {
                value : e.returnValues[0],
                date : new Date(block.timestamp * 1000)
            })
        })
    }

}


export default DieselPrice;