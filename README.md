# eth-diesel-price
eth-diesel-price allows you to receive the price of the diesel using oraclize

### Installing

```
git clone https://github.com/allemanfredi/eth-diesel-price.git
```

```
cd eth-diesel-price
```


```
npm install
```

If you want to deploy the Smart Contract using INFURA:

```
cd src/blockchain
```

```
echo "your mnemonic" > .secret
```

```
truffle migrate
```

Copy the contract address within index.js 

```javascript
contractAddress : 'your contract address'
```

insert also your own access key to infura within __`truffle-config.json`__ 

```javascript
const infuraKey = "your infura key";
```
