
const StorageService =  {

    storePrice(price){
        let prices = JSON.parse(localStorage.getItem('prices'));
        if ( !prices )
            prices = [];
        
        prices.push(price);
        
        localStorage.setItem('prices', JSON.stringify(prices));
    },

    getAllPrices(){
        const prices = JSON.parse(localStorage.getItem('prices'));
        if ( !prices ) {
            localStorage.setItem('prices', JSON.stringify([]));
            return [];
        }

        return prices;
    }
}

export default StorageService;