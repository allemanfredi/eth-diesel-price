
const StorageService =  {

    storePrice(price){

        const obj = {
            price : price.price,
            date : price.date.toString()
        }

        let prices = JSON.parse(localStorage.getItem('prices'));
        if ( !prices )
            prices = [];
        
        prices.push(obj);
        localStorage.setItem('prices', JSON.stringify(prices));
    },

    getAllPrices(){
        let prices = JSON.parse(localStorage.getItem('prices'));
        if ( !prices ) {
            localStorage.setItem('prices', JSON.stringify([]));
            return [];
        }
        prices = prices.map( obj => {
            return{
                price : obj.price,
                date : new Date(obj.date)
            }
        })

        return prices;
    },

    storeBlockNumber(blockNumber){
        localStorage.setItem('blockNumber', blockNumber);
    },

    getBlockNumber(){
        const blockNumber = localStorage.getItem('blockNumber');
        return blockNumber;
    }
}

export default StorageService;